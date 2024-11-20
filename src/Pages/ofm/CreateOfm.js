import React, { useState, useEffect } from 'react';
import { TextField ,Tabs, Tab, Box, Button,  Container, Grid, InputLabel , IconButton, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
// import { getBranches } from '../../apis/SignupApi';
import PersonIcon from "@mui/icons-material/Person";
import { handleSubmit, getOfm, handleUpdate } from '../../apis/OfmApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import axiosInstance from '../../axios/axiosInstance';



export default function CreateOfm() {

  const navigate = useNavigate();
  let {oId} = useParams();
  const cbranch= ['exports'];
  const prOptions= ['High','Medium','Low'];
  const ivOptions= ['Customer'];
  const ftOptions= ['Agitator Seal', 'Pump Seal', 'Other Seal'];
  const oType = ['Regular', 'Annual rate Contract', 'Tender'];
  const catOptions = ["API Plan", "Grafoil", "Mechanical Seal", "Re-conditioning","Rotary Joints"]
  const ptOptions = ['Air Frieght', 'Courier', 'Hand Delivery', 'Insured Registered post Parcel', 'Rail','Sea','Speed Post','Value Payable Parcel']
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [inspection, setInspection] = useState(oId!==undefined);
  const [insurance, setInsurance] = useState(oId!==undefined);

  console.log("oId is ",oId);

 
  const [formData, setFormData] = useState({
  
     // General Section
     branch: "",
     poNo: "",
     orderType: "",
     category: "",
     invoiceTo: "",
     transportThrough: "",
     customer: "",
     quotationNo: "",
     kindAttentionTo: "",
     customerAddress: "",
     priority: "",
     transport: "",
     deliveryPeriod: "",
     preQANo: "",
     statutoryRegulatoryRequirements: true,
     specialInformation: "",
     paymentTerms: "",
     engineer: "",
     oaNo: "",
     industry: "",
     projectOrder: true,
     penaltyApplicable: true,
     poReceived: true,

     // Insurance
     rawMaterialTC: true,
     qcReport: true,
     testReport: true,
     guaranteeCertificate: true,
     fitmentCertificate: true,
     complianceCertificate: true,
 
 // Consignee
     ofmStatus: "",
     externalInspection: inspection,
     externalInspectionWhere: "",
     externalInspectionByWhom: "",
     consigneeName: "",
     insertedByUserId: "",
     lastUpdatedByUserId: "",
     insuranceBy: "",
     insuranceBorneBy: "",
     ofmItems: [
       {
         srNo: 0,
         factor: "",
         type: "",
         size: "",
         face: "",
         description: "",
         ciCode: "",
         drfNo: "",
         quantity: 0,
         unit: "",
         unitPrice: 0,
         unitLPrice: 0,
         discount: 0,
         totalValue: 0
       }
     ]
    });
   
 


    // useEffect(() => {
    //   if (!isInitialized) {
    //     // Initialize formData or perform any setup needed
    //     setIsInitialized(true);
    //   }
    // }, [isInitialized, savedItems]);
  
  
  useEffect(()=>{
    if(oId!==undefined){
    getOfm(oId, setFormData,setSavedItems)
  


  }else{

      setFormData({
   // General Section
   branch: "",
   poNo: "",
   orderType: "",
   category: "",
   invoiceTo: "",
   transportThrough: "",
   customer: "",
   quotationNo: "",
   kindAttentionTo: "",
   customerAddress: "",
   priority: "",
   transport: "",
   deliveryPeriod: "",
   preQANo: "",
   statutoryRegulatoryRequirements: true,
   specialInformation: "",
   paymentTerms: "",
   engineer: "",
   oaNo: "",
   industry: "",
   projectOrder: true,
   penaltyApplicable: true,
   poReceived: true,
   
   // Insurance
   rawMaterialTC: true,
   qcReport: true,
   testReport: true,
   guaranteeCertificate: true,
   fitmentCertificate: true,
   complianceCertificate: true,

// Consignee
   ofmStatus: "",
   externalInspection: inspection,
   externalInspectionWhere: "",
   externalInspectionByWhom: "",
   consigneeName: "",
   insertedByUserId: "",
   lastUpdatedByUserId: "",
   insurance: true,
   insuranceBy: "",
   insuranceBorneBy: "",
   ofmItems: [
     {
       srNo: 0,
       factor: "",
       type: "",
       size: "",
       face: "",
       description: "",
       ciCode: "",
       drfNo: "",
       quantity: 0,
       unit: "",
       unitPrice: 0,
       unitLPrice: 0,
       discount: 0,
       totalValue: 0
     }
   ]
  });
  setSavedItems([]);
  
}
 },[oId])


  useEffect(()=>{
    console.log("Saved Items is ",savedItems)
  },[savedItems])


  



  const handleChange = (e, index) => {
    const { name, type, checked, value } = e.target;
    const newFormData = { ...formData };
  
    if (type === "checkbox") {
      newFormData[name] = checked;
    }else if (type === "radio" && name === "statutoryRegulatoryRequirements") {
        // Handle radio buttons by converting the value to a boolean
        newFormData[name] = value === "true";
  } else if (name === "warranty" || name === "guarantee") {
      newFormData.guarantee = name === "guarantee" ? value : "";
      newFormData.warranty = name === "warranty" ? value : "";
  } else if (index === undefined) {
      newFormData[name] = value;
  } else {
      // Update specific item in items array
      newFormData.ofmItems[index] = {
          ...newFormData.ofmItems[index],
          [name]: value
      };
  }
  
    setFormData(newFormData);
    console.log("Updated form data:", newFormData);
  };



  const handleAddItems = () => {
    setFormData(prevState => ({
      ...prevState,
      ofmItems: [
        ...prevState.ofmItems,
        {
          srNo: 0,
          factor: "",
          type: "",
          size: "",
          face: "",
          description: "",
          ciCode: "",
          drfNo: "",
          quantity: 0,
          unit: "",
          unitPrice: 0,
          unitLPrice: 0,
          discount: 0,
          totalValue: 0
        }
      ]
    }));
  };

  

  const handleDeleteItems = index => {
    setFormData(prevState => {
      const newItemDetails = [...prevState.ofmItems];
      newItemDetails.splice(index, 1);
      return { ...prevState, ofmItems: newItemDetails };
    });
  };


  const handleSaveItem = (index) => {
    // Save the current item to the savedItems array
    const newSavedItems = [...savedItems, formData.ofmItems[index]];
    console.log("SaveItems is ", newSavedItems)
    setSavedItems(newSavedItems);

    formData.ofmItems[index]={
          srNo: 0,
          factor: "",
          type: "",
          size: "",
          face: "",
          description:"",
          ciCode: "",
          drfNo: "",
          quantity: 0,
          unit: "",
          unitPrice: 0,
          unitLPrice: 0,
          discount: 0,
          totalValue: 0
        }

    console.log("Saved items:", newSavedItems);
};

  
  

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  console.log("tab No is ",selectedTab)

  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }


  const handleEditItem = (index) => {
    const itemToEdit = savedItems[index];


    const items = [...formData.ofmItems];
    items[0] = itemToEdit;
    setFormData({ ...formData, ofmItems:items });
     // Update the first item in the ofmItems array
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };


  const handleDelete = (index) => {
    const updatedItems = savedItems.filter((_, i) => i !== index);
    setSavedItems(updatedItems);
  };




  return (

<Container className="container" sx={{ marginTop: "20px", backgroundColor: "rgb(250, 251, 251)" }}>
  <form onSubmit={handleSubmit}>
    <div className="card">
      {!oId ? <h1>OFM</h1> : <h1>Update OFM</h1>}

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        underline="none"
        indicatorColor="transparent"
        textColor="primary"
        centered
      >
        <Tab icon={<PersonIcon />} label="General" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Other" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Items & Charges" iconPosition="start" />
      </Tabs>

      <Grid container spacing={2} sx={{ marginTop: "0.5rem" }}>
        {selectedTab === 0 && (
          <>
            <Grid item xs={4}>
              <TextField
                label="Branch"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.branch}
                onChange={(event) =>
                  setFormData({ ...formData, branch: event.target.value })
                }
              />
            </Grid>

            {oId && (
              <Grid item xs={4}>
                <TextField
                  label="Ofm Number"
                  size="small"
                  fullWidth
                  className="custom-text-field"
                  variant="outlined"
                  value={formData.ofmNo}
                />
              </Grid>
            )}

            <Grid item xs={4}>
              <TextField
                label="PoNo"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.poNo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Transport Through"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.transportThrough}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Customer"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.customer}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="kindAttention To"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.kindAttentionTo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Customer Address"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.customerAddress}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="preQANo"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.preQANo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Special Information"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.specialInformation}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="Payment Terms"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.paymentTerms}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Engineer"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.engineer}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="oaNo"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.oaNo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Industry"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}

        {selectedTab === 1 && (
          <>
            <Grid item xs={6}>
              <TextField
                label="External Inspection Where"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.externalInspectionWhere}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="External Inspection By Whom"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.externalInspectionByWhom}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Consignee Name"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.consigneeName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="kind Attention to"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.kindAttentionTo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Consignee Address"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.customerAddress}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Invoice Name"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.consigneeName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="kind Attention to"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.kindAttentionTo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Invoice Address"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.customerAddress}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  </form>
</Container>

  );

}

