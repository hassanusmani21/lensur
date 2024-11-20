import {React} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { deleteDetail, getAllSales } from '../../apis/SalesInquiryApi';
import '../../App.css'




export default function EditSales() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const [isDeleted, setIsDeleted] = useState(false);  
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();  
  


  useEffect(() => {
    getAllSales(currentPage,itemsPerPage,setData,setIsDeleted);

    }, [currentPage, itemsPerPage]);
    

  
    const editDetail = (detail) => {
            // setEditData(detail.customerReferenceNumber);
            console.log("edit detail is ", detail.inquiryNumber);
            navigate(`/SalesInquiry/${detail.inquiryNumber}`)
          };
          
     
        const paginate = (items)=>{
           setItemsPerPage(items);
            setCurrentPage(0)
        }


return (
  <div className='editContainer' style={{ width:'83%', marginLeft:'5%'}} >
  {/* <div style={{width:"85%" , margin:'2rem auto'}}> */}

{/* <div style={{backgroundColor:"white",border:"1px solid #ddd",boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px",margin:"1rem auto", borderRadius:"8px",width:"85%"}}>
<div style={{display:"flex", justifyContent:"space-between",flexWrap:"wrap",gap:"18px",padding:"25px",}}>



<Grid item xs={12} sm={4}>
<InputLabel className="ip-label">Customer Reference No</InputLabel>
    <TextField
      size="small"
      className="text-field"
      name="customerRef"
      value={customerRef}
      onChange={(e)=>setcustomerRef(e.target.value)}
    />
  </Grid>
<Grid item xs={12} sm={4}>
  <InputLabel className="ip-label">Branch</InputLabel>
  <TextField
    size="small"
    className="text-field"
    name="branch"
    value={branch}
    onChange={(e)=>setBranch(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <InputLabel className="ip-label">Customer Name</InputLabel>
  <TextField
    size="small"
    className="text-field"
    name="customerName"
    value={customerName}
    onChange={(e)=>setcustomerName(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={5}>
        <InputLabel className="ip-label">Start Date</InputLabel>
        <TextField
        size="small"
        type="datetime-local"
        value={startDate}
        onChange={(e)=>setStartDate(e.target.value)}
      />
      </Grid>

<Grid item xs={12} sm={4}>
        <InputLabel className="ip-label">End Date</InputLabel>
        <TextField
        size="small"
        type="datetime-local"
        value={endDate}
        onChange={(e)=>setEndDate(e.target.value)}
      />
      </Grid>

</div>

<Button onClick={()=>searchFilter(startDate,endDate,branch,customerName,customerRef,currentPage,itemsPerPage,setData)}  style={{width:"15%",margin:"1rem 2rem", color:"white", backgroundColor:"#03C9D7"}} variant="contained">
  Search
</Button>

</div> */}
  <h2>Sales Enquiry Details :</h2>

    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">Sales Inquiry Number</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Branch ID</TableCell>
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
                <TableCell align="right">{row.inquiryNumber}</TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.branchId}</TableCell>
                <TableCell align="right">{row.insertedOn}</TableCell>
                <TableCell align="right">{row.lastUpdatedOn}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.inquiryNumber,data,setData, setIsDeleted)}>
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
  </div>
  // </div>
);
}





