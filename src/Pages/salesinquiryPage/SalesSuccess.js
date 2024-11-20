import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css';



const SalesSuccessPage = () => {
    const {sId} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" className="successContainer">
      <CheckCircleOutlineIcon className="checkIcon"/>
      <Typography variant="h3" gutterBottom className="typoSuccess">
        Sales Entry Successful!
      </Typography>
      <Typography variant="body1" className='typoBody'>
        Thank you for Connecting with us, Your Sales Number is <b>: {sId}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editSales')}>
        Home
      </Button>
    </Container>
  );
};

export default SalesSuccessPage;
