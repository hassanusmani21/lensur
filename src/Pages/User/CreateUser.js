import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, InputLabel, IconButton, RadioGroup, Radio } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getDesignation, getBranches, getDepartments, getuser, handleSubmit, handleUpdate } from '../../apis/SignupApi';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateUser() {
  const [designation, setDesignation] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const navigate = useNavigate();
  const { uId } = useParams();
  const [display, setDisplay]=useState(uId !== undefined)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    empId: "",
    password: "",
    designation: '',
    title:"",
    insertedByUseuId: "",
    lastUpdatedByUseuId: "",
    resetPasswordRequired: false,
    departments: [
      {
        departmentName: ""
      }
    ],
    branches: [
      {
        branchName: "",
        region: ""
      }
    ],
    designation: [
      {
        designationName: "",
      }
    ]
  });



  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // If the radio button is for password update and value is 'yes', redirect
    if (name === 'passwordUpdate' && value === 'yes') {
      navigate('/updatePassword');
    }
    else if(name === 'passwordUpdate' && value === 'no'){
      setDisplay(false)
    }
  };


  const handleAddBranch = () => {
    setFormData(prevState => ({
      ...prevState,
      branches: [...prevState.branches, { branchName: "", region: "" }]
    }));
  };

  
  const handleDeleteBranch = (index) => {
    setFormData(prevState => {
      const updatedBranches = [...prevState.branches];
      updatedBranches.splice(index, 1);
      return { ...prevState, branches: updatedBranches };
    });
  };

  useEffect(() => {
    if (uId !== undefined) {
      getuser(uId, setFormData);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        middleName: "",
        empId: "",
        password: "",
        designation: '',
        title:"",
        insertedByUseuId: "",
        lastUpdatedByUseuId: "",
        resetPasswordRequired: false,
        departments: [
          {
            departmentName: ""
          }
        ],
        branches: [
          {
            branchName: "",
            region: ""
          }
        ]
      });
    }
  }, [uId]);


  useEffect(() => {
    const departmentName = formData.departments[0].departmentName;
    setShowAddBranch(departmentName === "MARKETING" || departmentName === "SALES");
  }, [formData.departments]);


  return (
      <Container className="container" sx= {{marginTop:"10px", backgroundColor:"rgb(250, 251, 251)"}} >
        <div className='card'>              
        
            <Box component="form" noValidate onSubmit={(e) => handleSubmit(e, formData, navigate)}>
                          <Typography component="h5" variant="h5">
                            {uId ? <h1>Update User</h1> : <h1>Create User</h1>} 
                          </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={1}>
                <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%',border:"1px solid #D6D6D6",cursor:'pointer', height: '40px', fontSize:"0.9em",borderRadius:'5px' }}>
              
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
          </Grid>

          
          <Grid item xs={12} sm={5.5}>
                  <TextField
                  className='custom-text-field'
                    size="small"
                    autoComplete="given-name"
                    name="firstName"
                    required
                    value={formData.firstName}
                    fullWidth
                    id="firstName"
                    onChange={(e) => handleChange(e)}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={5.5}>
                  <TextField
                  className='custom-text-field'
                    value={formData.lastName}
                    size="small"
                    onChange={(e) => handleChange(e)}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                  className='custom-text-field'
                    value={formData.middleName}
                    size="small"
                    required
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    id="middleName"
                    label="Middle Name"
                    name="middleName"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                  className='custom-text-field'
                    value={formData.empId}
                    size="small"
                    required
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    autoComplete="family-name"
                  />
                </Grid>



{uId&&(display) &&<Grid container alignItems="center" spacing={1} style={{ display: 'flex', justifyContent:'center', marginLeft:'1%'}}>
  <Grid item>
    <b >Want to Update a Password?</b>
  </Grid>
  <Grid item xs={12} sm={4}>
    <RadioGroup row name="passwordUpdate" onChange={handleChange} style={{ display: 'flex', alignItems: 'center' }}>
      <FormControlLabel
        value="yes"
        control={<Radio size="small" />}
        label="Yes"
      />
      <FormControlLabel
        value="no"
        control={<Radio size="small" />}
        label="No"
      />
    </RadioGroup>
  </Grid>
</Grid>}


{!uId&&<Grid item xs={12} sm={4}>
                  <TextField
                  className='custom-text-field'
                    value={formData.password}
                    size="small"
                    required
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
}


<Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData.designation?.designationName || ''} // Use designationName here
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        designation: { designationName: newValue || '' } // Store designationName
      });
    }}
    inputValue={formData.designation?.designationName || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        designation: { designationName: newInputValue || '' }
      });
    }}
    options={designation.map((d) => d)} // Ensure options are strings
    getOptionLabel={(option) => (typeof option === 'string' ? option : option?.designationName || '')} // Ensure string return
    onFocus={() => getDesignation(setDesignation)}
    renderInput={(params) => (
      <TextField
        className="custom-text-field"
        {...params}
        size="small"
        label="Designation"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>



<Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData.departments[0]?.departmentName || ''}
    onChange={(event, newValue) => {
      const updatedDepartments = [{ departmentName: newValue || '' }];
      setFormData({
        ...formData,
        departments: updatedDepartments
      });
    }}
    inputValue={formData.departments[0]?.departmentName || ''}
    onInputChange={(event, newInputValue) => {
      const updatedDepartments = [{ departmentName: newInputValue || '' }];
      setFormData({
        ...formData,
        departments: updatedDepartments
      });
    }}
    options={departments.map((d) => d.departmentName)}
    getOptionLabel={(option) => (typeof option === 'string' ? option : option.departmentName || '')}
    onFocus={() => getDepartments(setDepartments)}
    renderInput={(params) => (
      <TextField
        className="custom-text-field"
        {...params}
        size="small"
        label="Department"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>



{formData.branches.map((branch, index) => (
  <Grid item xs={12} sm={4}  key={index} style={{ display: 'flex', alignItems: 'center' }}>
    <Autocomplete
      size="small"
      style={{ width: '100%' }}
      value={branch?.branchName || ''}
      onChange={(event, newValue) => {
        const updatedBranches = [...formData.branches];
        updatedBranches[index] = { branchName: newValue || '', region: '' }; // Update branchName
        setFormData({
          ...formData,
          branches: updatedBranches
        });
      }}
      inputValue={branch?.branchName || ''}
      onInputChange={(event, newInputValue) => {
        const updatedBranches = [...formData.branches];
        updatedBranches[index] = { branchName: newInputValue || '', region: '' };
        setFormData({
          ...formData,
          branches: updatedBranches
        });
      }}
      options={branches.map((b) => b.branchName)}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.branchName || '')}
      onFocus={() => getBranches(setBranches)}
      renderInput={(params) => (
        <TextField
          className="custom-text-field"
          {...params}
          size="small"
          label={`Branch ${index > 0 ? index + 1 : ''}`}
          variant="outlined"
          fullWidth
        />
      )}
    />
    {showAddBranch && index === formData.branches.length - 1 && (
      <IconButton
        onClick={handleAddBranch}
        aria-label="add branch"
        style={{ backgroundColor: '#1976D2', color: 'white', borderRadius: '0px 5px 5px 0px' }}
      >
        <AddIcon />
      </IconButton>
    )}
    {index > 0 && (
      <IconButton onClick={() => handleDeleteBranch(index)} aria-label="delete branch" color="error">
        <DeleteIcon />
      </IconButton>
    )}
  </Grid>
))}

              </Grid>
              {!uId ? <Button
                type="submit"
                className='submit-btn'
                variant="contained"
                // onClick={(e) => handleSubmit(e, formData, navigate)}
                // onClick={handleSubmit} 
                >
                Create User
              </Button>
                :
                <Button
                type="submit"
                className='submit-btn'
                variant="contained"
                  onClick={(e) => handleUpdate(e, formData, navigate)}
                >
                  Update User
                </Button>
              }
          </Box>
        </div>
      </Container>

  );
}