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
import { deleteDetail } from '../../../apis/CustomerApi';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { searchFilter } from '../../../apis/CustomerApi';
import useToken from '../../../contextApi/useToken';



export default function EditCustomer() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const [isDeleted, setIsDeleted] = useState(false);  
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();  
  const [customerRef, setcustomerRef] = useState();
  const [customerName, setcustomerName] = useState();
  const [branch, setBranch] = useState();
  //added for msearch criteria
  const [contactDetailReferenceNo,setContactDetailReferenceNo] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const token = useToken();



  useEffect(() => {
    searchFilter(startDate,endDate,branch,customerName,customerRef,currentPage,itemsPerPage,setData,token)

    }, [currentPage, itemsPerPage]);
    

  
    const editDetail = (detail) => {
      // setEditData(detail.customerReferenceNumber);
      console.log("edit detail is ", detail.customerReferenceNumber);
      navigate(`/Customer/${detail.customerReferenceNumber}`)
    };
    

  const paginate = (items)=>{
     setItemsPerPage(items);
      setCurrentPage(0)
  }


return (

<Container>
<div className="editContainer">
<h2>Search and Filter</h2>

<Grid container spacing={2} >

<Grid container spacing={2} alignItems="center" sx={{mx:3, my:1}}>

<Grid item  xs={12} sm={3} >
{/* <InputLabel className="ip-label">Customer Reference No</InputLabel> */}
    <TextField
      size="small"
      className="custom-text-field"
      name="customerRef"
      value={customerRef}
      onChange={(e)=>setcustomerRef(e.target.value)}
      label="Customer Reference No"
    />
  </Grid>



  <Grid item  xs={12} sm={3}>
  {/* <InputLabel className="ip-label">Customer Name</InputLabel> */}
  <TextField
    size="small"
    className="custom-text-field"
    name="customerName"
    value={customerName}
    onChange={(e)=>setcustomerName(e.target.value)}
    label="Customer Name"
  />
</Grid>


<Grid item  xs={12} sm={3} >
{/* <InputLabel className="ip-label">Customer Reference No</InputLabel> */}
    <TextField
      size="small"
      className="custom-text-field"
      name="contactDetailReferenceNo"
      value={contactDetailReferenceNo}
      onChange={(e)=>setcustomerRef(e.target.value)}
      label="Contact Detail Reference No"
    />
  </Grid>

  

<Grid item xs={12} sm={3} >
  {/* <InputLabel className="ip-label">Branch</InputLabel> */}
  <TextField
    size="small"
    className="custom-text-field"
    name="branch"
    value={branch}
    onChange={(e)=>setBranch(e.target.value)}
    label="Branch"
  />
</Grid>


      </Grid>

{/* </div> */}

<Button onClick={()=>searchFilter(startDate,endDate,branch,customerName,customerRef,currentPage,itemsPerPage,setData,token)}  style={{width:"15%",margin:"0.8rem 2.5rem", color:"white", backgroundColor:"#03C9D7"}} variant="contained">
  Search
</Button>

    <TableContainer sx={{ml:'4%'}} component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">Contact Detail Reference No</TableCell>
            {/* <TableCell align="right">Reference Number</TableCell> */}
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Contact Person</TableCell>
            <TableCell align="right">Mobile Number</TableCell>
            <TableCell align="right">Customer Address</TableCell>
            <TableCell align="right">Branch</TableCell>
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
                <TableCell align="right">{row?.contactDetailReferenceNo}</TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row?.contactPerson}</TableCell>
                <TableCell align="right">{row?.mobileNumber}</TableCell>
                <TableCell align="right">{row?.customerAddress}</TableCell>
                <TableCell align="right">{row?.branch}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.customerReferenceNumber, data, setIsDeleted, setData,token)}>
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
        <select value={itemsPerPage} onChange={(e) => paginate(e.target.value)} className="pagination-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <label className="pagination-label">Select Page:</label>
        <button className="pagination-button" disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <KeyboardDoubleArrowLeftIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>

        <span className="pagination-span">{currentPage + 1}</span>
        <button className="pagination-button" disabled={data.length < itemsPerPage && !isDeleted} onClick={() => setCurrentPage(currentPage + 1)}>
          <KeyboardDoubleArrowRightIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
      </div>
      
      <hr style={{ border: '1px solid lightGray' }} />
    </TableContainer>
    
    </Grid>
    </div>
  </Container>
);
}





