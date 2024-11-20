import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const QuotationSuccess = () => {
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" className="successContainer">
      <CheckCircleOutlineIcon className="checkIcon" />
      <Typography variant="h3" gutterBottom className="typoSuccess">
        Quotation Created Successfully!
      </Typography>
      
      <Button variant="contained" color="primary" onClick={()=>navigate('/quotation')}>
        Home
      </Button>
    </Container>
  );
};

export default QuotationSuccess;
