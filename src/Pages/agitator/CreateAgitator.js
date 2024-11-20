import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, InputLabel, IconButton, Autocomplete } from '@mui/material';
import '../../App.css'
import { MenuItem, Select, FormControl } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, handleSubmit, handleUpdate } from '../../apis/AgitatorApi';
import { PDFDownloadLink, Image, Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import Logo from '../../assets/Picture1.png'


// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
    border: 1,
    borderRadius: 5,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 500,
    flex: 1,
    padding: 5,
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    padding: 5,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 500
  },
  logoImg: {
    width: 40, // Set a fixed width for the logo
    height: 40, // Set a fixed height for the logo
  },
  compDetails: {
    flexDirection: 'row', // Set to row to align items horizontally
    justifyContent: 'flex-start', // Align children to the start
    alignItems: 'center', // Vertically center the children
    marginBottom: 20,
    border: '1px solid black',
    padding: '10px',
    marginLeft: 15,
    flexWrap: 'wrap',
    borderRadius: '8px',
    maxWidth: '95%'
  },
  compSec: {
    display: 'flex',
    flexDirection: 'column'
  },
  compDesc: {
    fontSize: 11,
    fontWeight: 450,
    marginLeft: 22,
    marginTop: 6
  }
});

export default function AgitatorSeal() {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Simulating fetched data
    const fetchedUsers = [
      "User 1",
      "User 2",
      "User 3",
      "User 4"
    ];
    setUserList(fetchedUsers); // Set userList with fetched data
  }, []); // Empty dependency array means this runs once on component mount


  const navigate = useNavigate();
  let { aId } = useParams();
  const costReq = ['true', 'false'];


  const [formData, setFormData] = useState({
    branch: "",
    customerName: "",
    customerAddress: "",
    costingRequirement: true,
    enquiryNumber: "",
    refDrawingNumber: "",
    make: "",
    model: "",
    tagNo: "",
    type: "",
    entry: "",
    existingMake: "",
    existingSeries: "",
    existingPerformance: "",
    proposedSealSeries: "",
    proposedSealSize: "",
    vesselOperatingPR: "",
    vesselDesignPR: "",
    speed: "",
    temperature: "",
    directionOfRotation: "",
    vesselOperatingTemperature: "",
    padPlate: "",
    vesselDesignTemperature: "",
    fluid: "",
    fluidTemperature: "",
    boilPoint: "",
    grainSize: "",
    nature: "",
    spGravity: "",
    viscosity: "",
    percentageOfSolid: "",
    freezePoint: "",
    description: ""
  });



  useEffect(() => {
    if (aId !== undefined) {
      getApi(aId, setFormData)

    } else {
      setFormData(
        {
          // Agitator seal
          branch: "",
          customerName: "",
          customerAddress: "",
          costingRequirement: false,
          enquiryNumber: "",

          // General
          refDrawingNumber: "",

          // Agitor data
          make: "",
          model: "",
          tagNo: "",
          type: "",
          entry: "",

          // Not found 
          existingMake: "",
          existingSeries: "",
          existingPerformance: "",
          proposedSealSeries: "",
          proposedSealSize: "",
          vesselOperatingPR: "",
          vesselDesignPR: "",


          speed: "",
          temperature: "",
          directionOfRotation: "",
          vesselOperatingTemperature: "",
          padPlate: "",
          vesselDesignTemperature: "",
          fluid: "",
          fluidTemperature: "",
          boilPoint: "",
          grainSize: "",
          nature: "",
          spGravity: "",
          viscosity: "",
          percentageOfSolid: "",
          freezePoint: "",
          description: ""

        })
    }
  }, [aId])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const cancelUpdate = () => {

    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    // If user confirms, navigate to the home page and reload the window
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  }


  // PDF Component
  const PDFFile = ({ formData }) => (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.compDetails}>
          <Image style={styles.logoImg} src={Logo} alt="logo" />
          <View style={styles.compSec}>
            <Text style={styles.title}>Agitator Seal Information</Text>
            <Text style={styles.compDesc}>Leak-Proof® Engineering Pvt. Ltd.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>General Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Branch</Text>
              <Text style={styles.tableCell}>{formData.branch || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Customer Name</Text>
              <Text style={styles.tableCell}>{formData.customerName || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Customer Address</Text>
              <Text style={styles.tableCell}>{formData.customerAddress || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Costing Requirement</Text>
              <Text style={styles.tableCell}>{String(formData.costingRequirement)}</Text>
            </View>
          </View>

          <Text style={styles.header}>Agitator Data</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Make</Text>
              <Text style={styles.tableCell}>{formData.make || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Model</Text>
              <Text style={styles.tableCell}>{formData.model || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Tag No</Text>
              <Text style={styles.tableCell}>{formData.tagNo || 'N/A'}</Text>
            </View>
          </View>

          <Text style={styles.header}>Operation Parameters</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Proposed Seal Series</Text>
              <Text style={styles.tableCell}>{formData.proposedSealSeries || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Proposed Seal Size</Text>
              <Text style={styles.tableCell}>{formData.proposedSealSize || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Pad Plate</Text>
              <Text style={styles.tableCell}>{formData.padPlate || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );


  return (
    <Container className="container">
      <form >
        <div className='card'>
          {!aId ? <h1 >Agitator Seal</h1> : <h1>Update Agitator Seal :</h1>}
          {/* <h3>Agitator Seal:-</h3> */}
          <div className="MuiBox-root css-2e6lci" style={{ marginTop: '1rem' }}><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Agitator Seal:-</div></div>
          <Grid container spacing={2}>
            {aId &&
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Agitator Drf Number</InputLabel> */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="agitatorSealDrfNumber"
                  value={formData.agitatorSealDrfNumber}
                  onChange={handleChange}
                  label="Agitator Drf Number"
                  InputLabelProps={{
                    shrink: Boolean(formData.agitatorSealDrfNumber),
                  }}
                  autoFocus={!formData.agitatorSealDrfNumber} // Autofocus if the value exists
                />
              </Grid>
            }



            {/* Sales Inquiry Item Reference No. (Autogenerated) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Sales Inquiry Item Reference No. (Autogenerated)"
                name="itemReferenceNo"
                value={formData.itemReferenceNo || 'Auto-generated'}
                InputProps={{ readOnly: true }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Created By User (Selectable from login details) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Created By User"
                name="createdByUser"
                value={formData.createdByUser || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                select
              >
                {/* Replace with actual user data options */}
                {userList.map((user, index) => (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Created On (Auto-generated) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Created On"
                name="createdOn"
                value={formData.createdOn || new Date().toLocaleDateString()}
                InputProps={{ readOnly: true }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Updated By User (Selectable from login details) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Updated By User"
                name="updatedByUser"
                value={formData.updatedByUser || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                select
              >
                {/* Replace with actual user data options */}
                {userList.map((user, index) => (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Updated On (Auto-generated) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Updated On"
                name="updatedOn"
                value={formData.updatedOn || new Date().toLocaleDateString()}
                InputProps={{ readOnly: true }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>

        {/*Agitator Seal:- End  */}


        {/* Existing Seal - Start  */}

        <div className="card">
          <div className="MuiBox-root css-2e6lci">
            <svg
              width="18"
              height="24"
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
            <div className="MuiBox-root css-1isemmb">Existing Seal :-</div>
          </div>
          <Grid container spacing={2}>
            {/* Series */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Series"
                name="series"
                value={formData.series}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Performance */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                select
                label="Performance"
                name="performance"
                value={formData.performance}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="Satisfactory">Satisfactory</MenuItem>
                <MenuItem value="Unsatisfactory">Unsatisfactory</MenuItem>
              </TextField>
            </Grid>

            {/* Seal Arrangement */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                select
                label="Seal Arrangement"
                name="sealArrangement"
                value={formData.sealArrangement}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
              </TextField>
            </Grid>

            {/* Make */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Size */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Moc */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Moc"
                name="moc"
                value={formData.moc}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* API Plan */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="API Plan"
                name="apiPlan"
                value={formData.apiPlan}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>


        {/* Existing Seal :- End */}

        {/* Operating Parameters And Fluid Detail - Start */}

        <div className="card">
          <div className="MuiBox-root css-2e6lci">
            <svg
              width="18"
              height="24"
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
            <div className="MuiBox-root css-1isemmb">Measurement :-</div>
          </div>
          <h3 style={{ paddingBottom: '10px' }}>Parameters:-</h3>
          <Grid container spacing={2}>
            {/* Vessel Pressure (Operating) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Vessel Pressure (Operating)"
                name="vesselPressureOperating"
                value={formData.vesselPressureOperating || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Vessel Pressure Operating Unit (Dropdown) */}
            <Grid item xs={4}>
              <TextField
                select
                className="custom-text-field"
                label="Vessel Pressure Operating Unit"
                name="vesselPressureOperatingUnit"
                value={formData.vesselPressureOperatingUnit || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              >
                {/* Populate options dynamically based on Pump DRF */}
                <MenuItem value="unit1">Unit 1</MenuItem>
                <MenuItem value="unit2">Unit 2</MenuItem>
              </TextField>
            </Grid>

            {/* Vessel Pressure (Design) */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Vessel Pressure (Design)"
                name="vesselPressureDesign"
                value={formData.vesselPressureDesign || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Vessel Pressure Design Unit */}
            <Grid item xs={4}>
              <TextField
                select
                className="custom-text-field"
                label="Vessel Pressure Design Unit"
                name="vesselPressureDesignUnit"
                value={formData.vesselPressureDesignUnit || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              >
                {/* Populate options dynamically based on Pump DRF */}
                <MenuItem value="unit1">Unit 1</MenuItem>
                <MenuItem value="unit2">Unit 2</MenuItem>
              </TextField>
            </Grid>

            {/* Direction of Rotation */}
            <Grid item xs={4}>
              <TextField
                select
                className="custom-text-field"
                label="Direction of Rotation"
                name="directionOfRotation"
                value={formData.directionOfRotation || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="CW">CW</MenuItem>
                <MenuItem value="CCW">CCW</MenuItem>
              </TextField>
            </Grid>

            {/* Speed */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Speed"
                name="speed"
                value={formData.speed || ''}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          <div>
            <h3 style={{ padding: '10px 0' }}>Fluids :-</h3>

            <Grid container spacing={2}>
              {/* Fluid */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Fluid"
                  name="fluid"
                  value={formData.fluid || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Nature */}
              <Grid item xs={4}>
                <TextField
                  select
                  className="custom-text-field"
                  label="Nature"
                  name="nature"
                  value={formData.nature || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="nature1">Nature 1</MenuItem>
                  <MenuItem value="nature2">Nature 2</MenuItem>
                </TextField>
              </Grid>

              {/* Pumping Temperature */}
              <Grid item xs={4}>
                <TextField
                  select
                  className="custom-text-field"
                  label="Pumping Temperature"
                  name="pumpingTemperature"
                  value={formData.pumpingTemperature || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="℃">℃</MenuItem>
                  <MenuItem value="℉">℉</MenuItem>
                </TextField>
              </Grid>

              {/* Maximum Temperature */}
              <Grid item xs={4}>
                <TextField
                  select
                  className="custom-text-field"
                  label="Maximum Temperature"
                  name="maximumTemperature"
                  value={formData.maximumTemperature || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="℃">℃</MenuItem>
                  <MenuItem value="℉">℉</MenuItem>
                </TextField>
              </Grid>

              {/* SP Gravity */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="SP Gravity"
                  name="spGravity"
                  value={formData.spGravity || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Freezing Point */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Freezing Point"
                  name="freezingPoint"
                  value={formData.freezingPoint || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Boiling Point */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Boiling Point"
                  name="boilingPoint"
                  value={formData.boilingPoint || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Viscosity */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Viscosity"
                  name="viscosity"
                  value={formData.viscosity || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Percentage Of Solid */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Percentage Of Solid"
                  name="percentageOfSolid"
                  value={formData.percentageOfSolid || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Solid Size */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Solid Size"
                  name="solidSize"
                  value={formData.solidSize || ''}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Special Note */}
              <Grid item xs={12}>
                <TextField
                  className="custom-text-field"
                  label="Special Note (150 character limit)"
                  name="specialNote"
                  value={formData.specialNote || ''}
                  onChange={handleChange}
                  inputProps={{ maxLength: 150 }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Operating Parameters And Fluid Detail - End */}


        <Grid item xs={4}>
          <Grid item xs={4}>

            {!aId ? (<Button className="submit-btn" type="submit" onClick={(e) => handleSubmit(e, formData, navigate)} variant="contained" >Submit</Button>) : (
              <>
                <Button className="update-btn" variant="contained" onClick={(e) => handleUpdate(e, formData, navigate, aId)} >Update</Button>
                <Button className="cancel-btn" variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
          <PDFDownloadLink document={<PDFFile formData={formData} />} fileName="AgitatorSeal.pdf">
            {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
        </Grid>
      </form>
    </Container>
  );

}



