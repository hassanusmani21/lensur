import {React, createContext, useContext} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { getAllApi,deleteDetail, searchFilter } from '../../apis/OfmApi';
import'../../App.css'



export default function EditOfm() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const [isDeleted, setIsDeleted] = useState(false);  
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();  
  const [ofmNo, setOfmNo] = useState();
  const [poNo, setPoNo] = useState();
  const [category, setCategory] = useState();
  const [customer, setCustomer] = useState();
  const [industry, setIndustry] = useState();
  const [branch, setBranch] = useState();
  const [engineer, setEngineer] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();



  useEffect(() => {
    searchFilter(startDate, endDate, branch, ofmNo,engineer,customer,poNo, currentPage,industry,category, itemsPerPage, setData);
  }, [currentPage, itemsPerPage]);


//   useEffect(() => {
//     getAllApi(setData)
//   }, []);
  




  const handleSearch = () => {
    setCurrentPage(0);  // Reset to first page on new search
    searchFilter(startDate, endDate, branch, ofmNo,engineer,customer, poNo, 0,industry,category, itemsPerPage, setData);  
};
  
  
  
  const editDetail = (detail) => {
    // setEditData(detail.customerReferenceNumber);
    console.log("edit detail is ", detail.ofmNo);
    const oId = encodeURIComponent(detail.ofmNo);
    navigate(`/createOfm/${oId}`);
  };
  



const paginate = (items)=>{
   setItemsPerPage(items);
    setCurrentPage(0)
}
  

    const handleItemsPerPageChange = (e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(0);  // Reset to first page when items per page change
    };



return (
  <div >

<div className='editContainer'>
    <h2>Search and Filter</h2>
<div style={{display:"flex", justifyContent:"space-between",flexWrap:"wrap",gap:"18px",padding:"25px",}}>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="ofmNo"
    label="OFM No"
    value={ofmNo}
    onChange={(e) => setOfmNo(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="branch"
    label="Branch"
    value={branch}
    onChange={(e) => setBranch(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="poNo"
    label="Po No"
    value={poNo}
    onChange={(e) => setPoNo(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="category"
    label="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}

  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="industry"
    label="Industry"
    value={industry}
    onChange={(e) => setIndustry(e.target.value)}

  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="customer"
    label="Customer"
    value={customer}
    onChange={(e) => setCustomer(e.target.value)}

  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="engineer"
    label="Engineer"
    value={engineer}
    onChange={(e) => setEngineer(e.target.value)}
 
  />
</Grid>

<Grid item xs={12} sm={5}>
  <TextField
    size="small"
    type="datetime-local"
    label="Start Date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
    InputProps={{ style: { fontSize: 14 } }}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    size="small"
    type="datetime-local"
    label="End Date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
    InputProps={{ style: { fontSize: 14 } }}
  />
</Grid>

</div>

<Button onClick={handleSearch}  style={{width:"15%",margin:"1rem 2rem", color:"white", backgroundColor:"#03C9D7"}} variant="contained">
  Search
</Button>





    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">OFM Number</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Branch</TableCell>
            <TableCell align="right">Industry</TableCell>
            <TableCell align="right">Inserted On</TableCell>
            <TableCell align="right">Last Updated On</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>


        {data?.length ? (
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={index} className="table-row">
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.ofmNo}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.branch}</TableCell>
                <TableCell align="right">{row.industry}</TableCell>
                <TableCell align="right">{row.insertedOn}</TableCell>
                <TableCell align="right">{row.lastUpdatedOn}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.ofmNo, data,setData,setIsDeleted)}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <h2 style={{ textAlign: 'center' }}>No More Data Found!</h2>
        )}
      </Table>
      <hr style={{ border: '1px solid lightGray' }} />

      <div className="pagination-container">
        <label className="pagination-label">Items Per Page:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="pagination-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <label className="pagination-label">Select Page:</label>
        <button className="pagination-button" disabled={currentPage <= 0}  onClick={() =>setCurrentPage(currentPage-1)}>
          <KeyboardDoubleArrowLeftIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
        <span className="pagination-span">{currentPage + 1}</span>
        <button className="pagination-button" disabled={data.length < itemsPerPage && !isDeleted} onClick={() =>setCurrentPage(currentPage+1) }>
          <KeyboardDoubleArrowRightIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
      </div>
      <hr style={{ border: '1px solid lightGray' }} />
    </TableContainer>
  </div>
  </div>
);
}






