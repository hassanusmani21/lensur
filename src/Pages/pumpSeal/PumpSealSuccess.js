import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const PumpSealSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" className="successContainer">
      <CheckCircleOutlineIcon className="checkIcon"/>
      <Typography variant="h3" gutterBottom className="typoSuccess">
        Seal Pump Added Successfully!
      </Typography>
      <Typography variant="body1" className='typoBody'>
         Your Pump Seal ID is <b>: {id}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editPump')}>
         Pump Seal Details
      </Button>
    </Container>
  );
};

export default PumpSealSuccessPage;
