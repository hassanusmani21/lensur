import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importing named export
import { useAuth } from '../../contextApi/AuthContext';
import { handleSubmit } from '../../apis/LoginApi';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();



  const[formData,setFormData] = useState({
    empId:'',
    password:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };




  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div className='card'>
          <CssBaseline />
          <Box
          className="loginBox">
            <Typography component="h5" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={(e)=>handleSubmit(e,setToken,formData,navigate)} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
              
                <Grid item xs={12}>
                  <TextField
                  className='custom-text-field'
                    size="small"
                    value={formData.empId}
                    required
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    onChange={(e)=>handleChange(e)}
                    name="empId"
                    autoComplete="empId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  className='custom-text-field'
                    size="small"
                    value={formData.password}
                    required
                    fullWidth
                    onChange={(e)=>handleChange(e)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

               

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Login
              </Button>
              <Grid container justifyContent="center" flexDirection="column" alignItems="center">

              </Grid>
            </Box>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}

