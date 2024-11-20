import React from 'react'
import  { useState, useEffect } from 'react';
import { TextField ,Tabs,Typography, Tab, Box, Button,  Container, Grid, InputLabel , IconButton, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
// import { getBranches } from '../../apis/SignupApi';
import PersonIcon from "@mui/icons-material/Person";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axiosInstance from '../../axios/axiosInstance';
import Visibility from '@mui/icons-material/Visibility';



function OfmCommunication() {
    const [data, setData] = useState([]);
    const activityList=['API plan Design', 'R&D', 'Sales','Branch','Proceed','OA']


    const [formDataState, setFormDataState] = useState({
        ofmNo:'',
        currentActivity: '',
        comments:'',
        file: null,
      });
      



      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataState({
          ...formDataState,
          [name]: value,
        });
      };

      const handleFileChange = (e) => {
        setFormDataState({
          ...formDataState,
          file: e.target.files[0],
        });
      };

      const handleDownload = () => {
        const url = URL.createObjectURL(formDataState.file);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", formDataState.file.name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        // Create FormData object
        const formData = new FormData();
        
        // Append each state field to FormData
        formData.append('ofmNo', formDataState.ofmNo);
        formData.append('currentActivity', formDataState.currentActivity);
        formData.append('comments', formDataState.comments);
            formData.append('file', formDataState.file);  // File input


        try {
          // Send formData using axios or fetch
          const response = await axiosInstance.post('lens/ofmCommunication/save', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('Response:', response.data);
          setFormDataState({ ofmNo:'',currentActivity: '',comments:'',file: null,})
          alert(response.data)

        } catch (error) {
          console.error('Error:', error);
        }
      };


      const showData = async(ofmNo) =>{
        if(ofmNo == undefined || ''){
            alert("invalid OFM No");
        }else{
            try{
                const res = await axiosInstance.get(`lens/ofmCommunication/getAll?ofmNo=${ofmNo}`);
                const {data} = res;
                setData(data)
                console.log("response is ",res);   
       
               }
               catch(err){
                   console.log(err)
               }
        }
        
    

      }


      const getFile = async (fileName)=>{
        try {
            // Fetch the file data as a binary format
            const res = await axiosInstance.get(`lens/ofmCommunication/downloadFile/${fileName}`, {
                responseType: 'blob' // Handle binary data
            });
    
            // Determine the file type from response headers
            const contentType = res.headers['content-type'];
            const url = window.URL.createObjectURL(new Blob([res.data], { type: contentType }));
    
            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Set the file name for download
    
            // Append the link to the body (it needs to be in the DOM)
            document.body.appendChild(link);
    
            // Trigger the download
            link.click();
    
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Free up memory
        } catch (err) {
            console.error('Error downloading file:', err);
        }
      }


  return (
<div>
  <div className='editContainer'>
    <h2>OFM Communication</h2>
    <div style={{ display: "flex",alignItems:'center', flexWrap: "wrap"}}>
    <Grid container spacing={2} sx={{ marginLeft: '1%' }}>
  <Grid item xs={6}>
    <TextField
      size="small"
      className="custom-text-field"
      required
      name="ofmNo"
      label="OFM No"
      placeholder='Search or Create By OFM Number'
      value={formDataState.ofmNo}
      onChange={handleChange}
    />
  </Grid>
    <Button 
      className="searchBtn"
      disabled={formDataState.ofmNo === '' || formDataState.ofmNo === undefined} 
      onClick={() => showData(formDataState.ofmNo)}
    >
      Search
    </Button>

      </Grid>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell align="right">OFM Number</TableCell>
              <TableCell align="right">Activity On</TableCell>
              <TableCell align="right">Previous Activity</TableCell>
              <TableCell align="right">Current Activity</TableCell>
              <TableCell align="right">Comments</TableCell>
              <TableCell align="right">View File</TableCell>
            </TableRow>
          </TableHead>

          {data?.length ? (
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell align="right">{row.ofmNo}</TableCell>
                  <TableCell align="right">{row?.activityOn}</TableCell>
                  <TableCell align="right">{row?.previousActivity}</TableCell>
                  <TableCell align="right">{row?.currentActivity}</TableCell>
                  <TableCell align="right">{row?.comments}</TableCell>
                  <TableCell align="right">{row?.fileName ? <Button onClick={() => getFile(row.fileName)}> <Visibility sx={{ color: 'red' }} /></Button> : null}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <h2 style={{ textAlign: 'center' }}>No Data Found!</h2>
          )}
        </Table>
        <hr style={{ border: '1px solid lightGray' }} />
      </TableContainer>

      {data?.previousActivity ?
        <Grid container spacing={2} sx={{ marginTop: "1rem", marginLeft: '1%' }}>
          <Grid item xs={4} sm={4}>
            <TextField
              size="small"
              className="custom-text-field"
              name="previousActivity"
              label="Previous Activity"
              value={data.previousActivity}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        : null}

      <Grid container spacing={2} sx={{ margin: '1% 0 0 5px' }}>
        <Grid item xs={8}>
          <Autocomplete
            size="small"
            value={formDataState.currentActivity || ''}
            onChange={(event, newValue) => {
              setFormDataState({
                ...formDataState,
                currentActivity: newValue || ''
              });
            }}
            
            inputValue={formDataState.currentActivity || ''}
            onInputChange={(event, newInputValue) => {
              setFormDataState({
                ...formDataState,
                currentActivity: newInputValue || ''
              });
            }}
            options={activityList.map((act) => act)}
            renderInput={(params) => (
              <TextField
                style={{ width: '100%' }}
                {...params}
                size="small"
                label="Current Activity"
                placeholder='Select Current Activity'
                variant="outlined"
                className='custom-text-field'
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ margin: '1% 0 0 5px' }}>
        <Grid item xs={8}>
          <TextField
            multiline
            rows={2}
            style={{ width: '100%' }}
            size="small"
            className="custom-text-field"
            name="comments"
            label="Comments"
            value={formDataState.comments}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ margin: '1% 0 1.5% 18px' }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          {/* File Input */}
          <Button
            variant="contained"
            component="label"
            startIcon={<AttachFileIcon />}
          >
            Attach File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {/* Display selected file name and Download button */}
          {formDataState.file && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1">{formDataState.file.name}</Typography>
              <IconButton color="primary" onClick={handleDownload}>
                <DownloadIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Grid>
    </div>
  </div>
  <Button className="update-btn" sx={{ position: "relative", left: "6%", bottom: "8%" }} type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
</div>

  )
}

export default OfmCommunication