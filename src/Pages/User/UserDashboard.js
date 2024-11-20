import {React, useState, useEffect} from 'react'
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { deleteDetail, getAllUser } from '../../apis/UserDashboardApi';




function UserDashboard(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  
    const [isDeleted, setIsDeleted] = useState(false);  
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
    const navigate = useNavigate();  



    useEffect(() => {
        getAllUser(setData,currentPage,itemsPerPage,setIsDeleted)
        }, [currentPage, itemsPerPage])
        
  
        
  



    const editDetail = (detail) => {
        console.log("edit detail is ", detail.empId);
        navigate(`/CreateUser/${detail.empId}`)
      };
     
        const paginate = (items)=>{
           setItemsPerPage(items);
            setCurrentPage(0)
        }


return (    
  <div className='editContainer' style={{ width:'83%', marginLeft:'5%'}} >
    <h1 style={{marginLeft:'2.5%'}}>User Details :</h1>

    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">Employee ID</TableCell>
            <TableCell align="right">First Name</TableCell>
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
                <TableCell align="right">{row?.empId}</TableCell>
                <TableCell align="right">{row?.firstName}</TableCell>
                <TableCell align="right">{row?.insertedOn}</TableCell>
                <TableCell align="right">{row?.lastUpdatedOn}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.empId,data,setData, setIsDeleted)}>
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
        <button className="pagination-button" disabled={data?.length < itemsPerPage && !isDeleted} onClick={() => setCurrentPage(currentPage + 1)}>
          <KeyboardDoubleArrowRightIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
      </div>
      <hr style={{ border: '1px solid lightGray' }} />
    </TableContainer>
  </div>   
)
}

export default UserDashboard