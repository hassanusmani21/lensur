import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel ,Typography, IconButton, Autocomplete, FormHelperText   } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import "./CustomerForm.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer, handleSubmit } from '../../../apis/CustomerApi';
import { handleUpdate } from '../../../apis/CustomerApi';
import { black } from '@mui/material/colors';
import moment from 'moment';
import axiosInstance from '../../../axios/axiosInstance';
import { useAuth } from '../../../contextApi/AuthContext';



export default function Customer() {

  const navigate = useNavigate();
  let {rId} = useParams();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const [options, setOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const { authState } = useAuth();


 

  const [formData, setFormData] = useState({
    branch: '',
    customerName: '',
    branch:'',
    customerDetail:[],
    createdByUser:authState?.sub,
    updatedByUser:authState?.sub,
    createdOn:dateTime,
    updatedOn:dateTime
  });
  
  

   useEffect(()=>{
    if(rId!==undefined){
    getCustomer(rId, setFormData)
    }else{

      setFormData({ branch: '',
      customerName: '',
      branch:'',
      customerDetail:[],
      createdByUser:authState?.sub,
      updatedByUser:authState?.sub,
      createdOn:dateTime,
      updatedOn:dateTime
    })
    }
  },[rId,authState])





  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    let validationError = validateField(name, value);



    if (index === undefined) {
      newFormData[name] = value;
    } else {
      newFormData.customerDetail[index][name] = value;
    }
    setFormData(newFormData);

      // Update errors
      setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError
  }));

  };


  const handleAddCustomerDetail = () => {
    setFormData(prevState => ({
      ...prevState,
      customerDetail: [
        ...prevState.customerDetail,
        {
          ContactDetailReferenceNo: "",
          contactPerson: "",
          designation: "",
          mobileNumber: "",
          alternateMobileNumber: "",
          emailId: "",
          alternateemailId: "",
          eccNo: "",
          sstNo: "",
          cstNo: "",
          createdByUser:authState?.sub,
          updatedByUser:authState?.sub,
          createdOn:dateTime,
          updatedOn:dateTime,
          gstNo: "",
          industryType: "",
          vendorCode:"",
          panNo: "",
          referenceDrawingNo: "",
          customerAddress: ""
        }
      ]
    }));
  };
  

  const handleDeleteCustomerDetail = index => {
    setFormData(prevState => {
      const newCustomerDetail = [...prevState.customerDetail];
      newCustomerDetail.splice(index, 1);
      return { ...prevState, customerDetail: newCustomerDetail };
    });
  };
  

  const validateField = (name, value) => {
    let error = '';
  
    switch (name) {
      case 'customerName':
      case 'industryName':
      case 'contactPerson':
      case 'branch':
      case 'designation':
        // Allow only letters and spaces
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = `${name} cannot contain numbers or special characters`;
        }
        break;
  
      case 'mobileNumber':
        // Allow only numbers and check length
        if (!/^\d{0,10}$/.test(value)) {
          error = `${name} should only contain numbers and must be 10 digits or less`;
        }
        break;
      
        case 'emailId':
            // Check if value is empty
            if (value.trim() === '') {
              error = ''; // No error if the field is empty
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
              error = `Please Enter a Valid Email Id`;
            }
            break;
            case 'customerAddress':
              // Check if address exceeds 125 characters
              if (value.length > 125) {
                error = `Customer Address cannot exceed 125 characters`;
              }
              break;
      
  
      default:
        break;
    }
  
    return error;
  };
  


  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }



const getDataByName = async (newInputValue) => {
  const validInputRegex = /^[a-zA-Z\s]*$/;

  if (!validInputRegex.test(newInputValue)) {
    setErrorMessage('Customer name cannot contain numbers or special characters');
  } else {
    setErrorMessage(''); // Clear error if valid input
  }

  try {
    const { data } = await axiosInstance.get(`lens/customer/keyword?startkeyword=${newInputValue}`);
    const customerNames = data.map((item) => item.customerName); // Only customer names
    setOptions(customerNames);  // Options is now array of strings
  } catch (err) {
    console.error(err);
  }
};



 // Fetch customer data when a customer is selected
  const handleCustomerSelect = async (event, newValue) => {
    if (newValue) {
      try {
        const { data } = await axiosInstance.get(`lens/customer/keyword?startkeyword=${newValue}`);
        if (data && data.length > 0) {
          setFormData(data[0]); // Assuming the data[0] contains the full form data of the customer
        }
      } catch (err) {
        console.log(err);
      }
    }
  };



  // console.log("Options is "+options)

  return (
    <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
      <form onSubmit={(e)=>handleSubmit(e,formData,navigate,setErrors,validateField)}>
        <Grid container spacing={2} >
          <div className='card' style={{width:'100%'}}>
          {!rId ? <h1>New Customer Registration </h1> : <h1>Update Customer </h1>}
          <Grid container spacing={2} alignItems="center">

    {/* {rId && ( */}
      <Grid item xs={4}>
        <TextField
          required
          size="small"
          name="customerReferenceNumber"
          className="custom-text-field"
          id="disableItem"
          value={rId?formData.customerReferenceNumber:''}
          label="Customer Reference No"
          InputLabelProps={{
            shrink: Boolean(formData.customerReferenceNumber),
          }}
          autoFocus={formData.customerReferenceNumber} // Autofocus if the value exists
          InputProps={{
            readOnly: true,  // Prevent user input
          }}
        />
      </Grid>



    {/* )} */}

    <Grid item xs={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    name="customerName"
    value={formData.customerName}
    onChange={handleChange}
    error={Boolean(errors['customerName'])}  // Show red border if error exists
    helperText={errors['customerName']} 
    label="Customer Name"
  />
</Grid>

<Grid item xs={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    name="vendorCode"
    value={formData.vendorCode}
    onChange={handleChange}
    error={Boolean(errors['vendorCode'])}  // Show red border if error exists
    helperText={errors['vendorCode']}
    label="Vendor Code"
  />
</Grid>


<Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData?.branch || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        branch: newValue
      });
    }}
    inputValue={formData?.branch || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        branch: newInputValue
      });
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth
        error={Boolean(errors['branch'])}  // Show red border if error exists
        helperText={errors['branch']}
      />
    )}
  />
</Grid>



<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    value={formData.createdOn}
    label="Created On"
    id="disableItem"
    fullWidth
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['createdOn'])}  // Show red border if error exists
    helperText={errors['createdOn']}
  />
</Grid>


<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    value={formData.updatedOn}
    label="Updated On"
    id="disableItem"
    fullWidth
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['updatedOn'])}  // Show red border if error exists
    helperText={errors['updatedOn']}
  />
</Grid>

<Grid item xs={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    id="disableItem"
    value={formData.createdByUser}
    label="Created By User"
    InputLabelProps={{
      shrink: Boolean(formData.createdByUser),
    }}
    autoFocus={!formData.createdByUser} // Autofocus if the value exists
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['createdByUser'])}  // Show red border if error exists
    helperText={errors['createdByUser']}
  />
</Grid>

<Grid item xs={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    id="disableItem"
    value={formData.updatedByUser}
    label="Updated By User"
    InputLabelProps={{
      shrink: Boolean(formData.updatedByUser),
    }}
    autoFocus={!formData.updatedByUser} // Autofocus if the value exists
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['updatedByUser'])}  // Show red border if error exists
    helperText={errors['updatedByUser']}
  />
</Grid>
  </Grid>
</div>


          {formData?.customerDetail?.map((detail, index) => (
            <div className='card' style={{width:'100%'}}  key = {index}>
<div className="MuiBox-root css-2e6lci">
  <svg
    width="20"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-alert-circle"
  >
    <g>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </g>
  </svg>
  <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}> {/* Adjust the font size here */}
    Contact Detail
  </div>
</div>

      <Grid container  spacing={2}>

      <Grid item xs={4}>
        <TextField
          required
          size="small"
          name="ContactDetailReferenceNo"
          className="custom-text-field"
          id="disableItem"
          value={rId?formData.ContactDetailReferenceNo:''}
          label="Contact Detail ReferenceNo"
          InputLabelProps={{
            shrink: Boolean(formData.ContactDetailReferenceNo),
          }}
          autoFocus={formData.ContactDetailReferenceNo} // Autofocus if the value exists
          InputProps={{
            readOnly: true,  // Prevent user input
          }}
        />
      </Grid>



      <Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    name="contactPerson"
    value={detail.contactPerson}
    onChange={e => handleChange(e, index)}
    label="Contact Person"
    error={Boolean(errors['contactPerson'])}  // Show red border if error exists
    helperText={errors['contactPerson']} 
    fullWidth
  />
</Grid>

<Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData?.industryType || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        industryType: newValue
      });
    }}
    inputValue={formData?.industryType || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        industryType: newInputValue
      });
    }}
    options={["Telecom","Textile"].map((b) => b)}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Industry Type"
        variant="outlined"
        fullWidth
        error={Boolean(errors['industryType'])}  // Show red border if error exists
        helperText={errors['industryType']}
      />
    )}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    name="designation"
    value={detail.designation}
    onChange={e => handleChange(e, index)}
    label="Designation"
    error={Boolean(errors['designation'])}  // Show red border if error exists
    helperText={errors['designation']} 
    fullWidth
  />
</Grid>
</Grid>
<Grid container sx={{my:1}} spacing={2}>
       

       <Grid item xs={12} sm={6}>
         <TextField
           required
           size="small" 
           className="custom-text-field" 
           name="customerAddress"
           multiline
           rows={4}
           value={detail.customerAddress}
           onChange={e => handleChange(e, index)}
           label="Customer Address"
           inputProps={{ maxLength: 125 }}
           fullWidth
           error={Boolean(errors['customerAddress'])}  
           helperText={errors['customerAddress']} 
         />
         
      <FormHelperText style={{ textAlign: 'right' }}>
      {`${detail.customerAddress.length}/125`}
    
 </FormHelperText>

       </Grid>

 <Grid container spacing={1} item xs={12} sm={6} direction="column">
 <Grid item  sm={3}>
   <TextField
     required
     size="small"
     className="custom-text-field"
     name="mobileNumber"
     value={detail.mobileNumber}
     onChange={e => handleChange(e, index)}
     label="Mobile Number"
     error={Boolean(errors['mobileNumber'])}  // Show red border if error exists
     helperText={errors['mobileNumber']}
   />
 </Grid>

 <Grid item sm={3}>
   <TextField
     required
     size="small"
     type="email"
     className="custom-text-field"
     name="emailId"
     value={detail.emailId}
     onChange={e => handleChange(e, index)}
     label="Email Id"
     error={Boolean(errors['emailId'])}  // Show red border if error exists
     helperText={errors['emailId']}
   />
 </Grid>
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    value={dateTime}
    label="Created On"
    id="disableItem"
    fullWidth
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['createdOn'])}  // Show red border if error exists
    helperText={errors['createdOn']}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    value={dateTime}
    label="Updated On"
    id="disableItem"
    fullWidth
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['updatedOn'])}  // Show red border if error exists
    helperText={errors['updatedOn']}
  />
</Grid>

<Grid item xs={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    id="disableItem"
    value={detail.createdByUser}
    label="Created By User"
    InputLabelProps={{
      shrink: Boolean(detail.createdByUser),
    }}
    autoFocus={!detail.createdByUser} // Autofocus if the value exists
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['createdByUser'])}  // Show red border if error exists
    helperText={errors['createdByUser']}
  />
</Grid>

<Grid item xs={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    id="disableItem"
    value={detail.updatedByUser}
    label="Updated By User"
    InputLabelProps={{
      shrink: Boolean(detail.updatedByUser),
    }}
    autoFocus={!detail.updatedByUser} // Autofocus if the value exists
    InputProps={{
      readOnly: true,  // Prevent user input
    }}
    error={Boolean(errors['updatedByUser'])}  // Show red border if error exists
    helperText={errors['updatedByUser']}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    name="gstNo"
    value={detail.gstNo}
    onChange={e => handleChange(e, index)}
    label="GST No"
    error={Boolean(errors['gstNo'])}  // Show red border if error exists
    helperText={errors['gstNo']}
    fullWidth
  />
</Grid>

<Grid item xs={12} sm={4}>
  <TextField
    required
    size="small"
    className="custom-text-field"
    name="panNo"
    value={detail.panNo}
    onChange={e => handleChange(e, index)}
    label="Pan No"
    error={Boolean(errors['panNo'])}  // Show red border if error exists
    helperText={errors['panNo']}
    fullWidth
  />
</Grid>
       

        </Grid>


        <Grid container  spacing={2}> 
        <Grid item xs={12}>
          <IconButton className="deleteIcon" onClick={() => handleDeleteCustomerDetail(index)} >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>

))}

          </Grid>
          <Grid item xs={4}>
          <Grid item xs={4}  >
<Button className="add-btn" sx={{margin:"0rem 1rem 1rem 0rem"}}  onClick={handleAddCustomerDetail}><AddIcon/> Add Customer Details</Button>
        
        {!rId&&!formData.customerReferenceNumber?(<Button className="submit-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate,setErrors,validateField)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained" onClick={(e)=>handleUpdate(e,formData,rId,navigate)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}

