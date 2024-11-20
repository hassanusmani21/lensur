import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const AgitatorSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" className="successContainer">
      <CheckCircleOutlineIcon  className="checkIcon"/>
      <Typography variant="h3" className="typoSuccess" gutterBottom >
        Agitator Seal Created Successfully!
      </Typography>
          Agitator DRF Number is <b>: {id}</b>
      <Typography variant="body1" className='typoBody'>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editAgitator')}>
         Agitator Details
      </Button>
    </Container>
  );
};

export default AgitatorSuccessPage;
 
