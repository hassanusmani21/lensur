import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../App.css';



const RegistrationSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();    
    
    return (
    <Container maxWidth="sm" className="successContainer">
      <CheckCircleOutlineIcon  className="checkIcon"/>
      <Typography variant="h3" gutterBottom className="typoSuccess">
        Registration Successful!
      </Typography>
      <Typography variant="body1" className='typoBody'>
        Thank you for registering with us, Your Customer Reference Number is <b>: {id}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editCustomer')}>
        Home
      </Button>
    </Container>
  );
};

export default RegistrationSuccessPage;
