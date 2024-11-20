import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const RotarySuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm"className="successContainer">
      <CheckCircleOutlineIcon className="checkIcon" />
      <Typography variant="h3" gutterBottom className="typoSuccess">
        Rotary Joint Created Successfully!
      </Typography>
      <Typography variant="body1" className='typoBody'>
          Rotary DRF Number is <b>: {id}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editRotary')}>
         Rotary Details
      </Button>
    </Container>
  );
};

export default RotarySuccessPage;
