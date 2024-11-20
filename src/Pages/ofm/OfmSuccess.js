import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const OfmSuccess = () => {
    const navigate = useNavigate();

    return (
    <Container maxWidth="sm" className="successContainer">
      <CheckCircleOutlineIcon  className="checkIcon"/>
      <Typography variant="h3" gutterBottom className="typoSuccess">
        Order Forwading Memo Updated Successfully!
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editOfm')}>
        Home
      </Button>
    </Container>
  );
};

export default OfmSuccess;
