import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  InputLabel,
  IconButton,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPumpSeal, handleSubmit } from '../../apis/PumpSealApi';
import { handleUpdatePumpSeal } from '../../apis/PumpSealApi';
import { getColumnData } from '../../apis/PumpSealApi';

export default function CreatePumpSeal() {
  const navigate = useNavigate();
  let { pId } = useParams();
  const [ptOption, setptOption] = useState([]);
  const [arOption, setarOption] = useState([]);
  const [saOption, setsaOption] = useState([]);
  const [stOption, setstOption] = useState([]);
  const [stgOption, setstgOption] = useState([]);
  const [cstOption, setcstOption] = useState([]);
  const [pfOption, setpfOption] = useState([]);
  const [fnOption, setfnOption] = useState([]);

  // Add new state for mechanical seal section
  const [sealType, setSealType] = useState('existing');
  const [selectedSealType, setSelectedSealType] = useState('single');

  const [formData, setFormData] = useState({
    branch: '',
    endUser: '',
    costingRequirement: '',
    customerAddress: '',
    customerName: '',
    make: '',
    model: '',
    impeller: '',
    shaft: '',
    sealChamber: '',
    bearingBracket: '',
    tagNumber: '',
    arrangement: '',
    pumpType: '',
    stuffingBox: '',
    stage: '',
    casting: '',
    series: '',
    sealArrangement: '',
    sealType: '',
    performance: '',
    flushPlan: '',
    barrierOrBufferPlan: '',
    quenchPlan: '',
    barrierOrBufferFluid: '',
    designOffered: '',
    sizeAvailable: '',
    materialCode: '',
    sealSeries: '',
    shaftSize: '',
    boreDia: '',
    boreDepth: '',
    nearestObstruction: '',
    allPressureUnit: '',
    totalHeat: '',
    suctionPressure: '',
    dischargePressure: '',
    directionOfRotation: '',
    speed: '',
    boxPressure: '',
    operatingFluid: '',
    allTempPressureUnit: '',
    nature: '',
    operatingTemperature: '',
    minOperatingTemperature: '',
    spGravity: '',
    freezePoint: '',
    boilPoint: '',
    viscosity: '',
    viscosityUnit: '',
    percentageOfSolid: '',
    grainPoint: '',
    description: '',
    d1SleeveOd: '',
    studHoles: '',
    d2StuffingBoxId: '',
    d4StuffingBoxBore: '',
    d5SpigotDia: '',
    d51: '',
    d52: '',
    d9BoltCircle: '',
    boltSize: '',
    l11: '',
    l12: '',
    l1SleeveExten: '',
    l2ShaftHub: '',
    l3ThreadLength: '',
    l8sbDepth: '',
    l9NearObstr: '',
    alpha: '',
    beta: '',
    theta: '',
    createdByUserGUID: '',
    lastEditedByUserGUID: '',
    rowguid: '',
    region: '',
    address: '',
    emailId: '',
    srNo: '',
    dshaftOd: '',
    sboxCover: '',
    mnumberOfBolts: '',
    lraisedCol: '',
    existingSeal: {
      gaNumber: '',
      sealSeries: '',
      shaftDia: '',
      sealSize: '',
      sealType: 'single',
      ibMoc: {
        face: '',
        elastomer: '',
        springElement: '',
        contactHardware: '',
        nonContactHardware: ''
      },
      obMoc: {
        face: '',
        elastomer: '',
        springElement: '',
        contactHardware: '',
        nonContactHardware: ''
      }
    },
    newSeal: {
      shaftDia: '',
      boreDia: '',
      boreDepth: '',
      nearestObstruction: '',
      sealType: 'single',
      ibMoc: {
        face: '',
        elastomer: '',
        springElement: '',
        contactHardware: '',
        nonContactHardware: ''
      },
      obMoc: {
        face: '',
        elastomer: '',
        springElement: '',
        contactHardware: '',
        nonContactHardware: ''
      }
    }
  });

  useEffect(() => {
    if (pId !== undefined) {
      getPumpSeal(pId, setFormData);
    }
  }, [pId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSealTypeChange = (event) => {
    setSealType(event.target.value);
  };

  const handleSealConfigChange = (event) => {
    const newValue = event.target.value;
    setSelectedSealType(newValue);

    if (sealType === 'existing') {
      setFormData(prev => ({
        ...prev,
        existingSeal: {
          ...prev.existingSeal,
          sealType: newValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        newSeal: {
          ...prev.newSeal,
          sealType: newValue
        }
      }));
    }
  };

  const handleMocChange = (section, type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: {
          ...prev[section][type],
          [field]: value
        }
      }
    }));
  };

  const cancelUpdate = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  };

  const renderMocFields = (section, type) => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3 style={{ paddingTop: '12px' }}>{type === 'ibMoc' ? 'IB MOC' : 'OB MOC'}</h3>      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Face"
          value={formData[section][type].face}
          onChange={(e) => handleMocChange(section, type, 'face', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Elastomer"
          value={formData[section][type].elastomer}
          onChange={(e) => handleMocChange(section, type, 'elastomer', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Spring Element"
          value={formData[section][type].springElement}
          onChange={(e) => handleMocChange(section, type, 'springElement', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Contact Hardware"
          value={formData[section][type].contactHardware}
          onChange={(e) => handleMocChange(section, type, 'contactHardware', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Non-Contact Hardware"
          value={formData[section][type].nonContactHardware}
          onChange={(e) => handleMocChange(section, type, 'nonContactHardware', e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );

  return (
    
    <Container className="container">
      <form>
        {/* Existing Drawing Requisition Section */}
        <div className='card'>
          {!pId ? <h1>New Pump Seal :</h1> : <h1>Update Pump Seal :</h1>}
          <div className="MuiBox-root css-2e6lci">
            <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Drawing Requisition - Pump Seal :-</div>
          </div>
          <hr />
          {/* Your existing Drawing Requisition form fields */}
          <Grid container spacing={2}>
            {pId && <Grid item xs={4}>
              <InputLabel className="ip-label" >PumpSeal Drf Number</InputLabel >
              <TextField
                size="small"
                className="custom-text-field"
                name="pumpSealDrfNumber"
                InputLabelProps={{
                  shrink: Boolean(formData.pumpSealDrfNumber),
                }}
                autoFocus={!formData.pumpSealDrfNumber}
                value={formData.pumpSealDrfNumber}
                onChange={handleChange} />
            </Grid>
            }

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Custormer Name"
              />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Drf Number"
              />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Sales Inquiry"
              />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Created By User"
              />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Updated By user"
              />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Updated On"
              />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Branch</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                label="Branch"
              />

            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                label="Name"
              />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >endUser</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="endUser"
                value={formData.endUser}
                onChange={handleChange}
                label="endUser"
              />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Customer Address</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                label="Customer Address"
              />
            </Grid>


            <Grid item xs={4}>
              <Autocomplete
                size="small"
                value={formData.costingRequirement || ''}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    costingRequirement: newValue || ''
                  });
                }}

                inputValue={formData.costingRequirement || ''}
                onInputChange={(event, newInputValue) => {
                  setFormData({
                    ...formData,
                    costingRequirement: newInputValue || ''
                  });
                }}

                options={["true", "false"].map((src) => src)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="outlined"
                    placeholder='select Costing Requirement'
                    fullWidth
                    className='custom-text-field'
                    label="Costing Requirement"
                  />
                )}
              />
            </Grid>

          </Grid>
        </div>

        {/* Existing Pump Data Section */}
        <div className='card'>
          {/* Your existing Pump Data form fields */}
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Pump Data :-</div></div>
          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="make"
                value={formData.make}
                onChange={handleChange}
                label="Make"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="model"
                value={formData.model}
                onChange={handleChange}
                label="Model"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="pumpMOC"
                value={formData.pumpMOC}
                onChange={handleChange}
                label="Pump MOC"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="impellerCasingMOC"
                value={formData.impellerCasingMOC}
                onChange={handleChange}
                label="Impeller/Casing MOC"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="shaftMOC"
                value={formData.shaftMOC}
                onChange={handleChange}
                label="Shaft MOC"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="bearingBracket"
                value={formData.bearingBracket}
                onChange={handleChange}
                label="Bearing BKT"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
                label="Tag Number"
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                value={formData.arrangement}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    arrangement: newValue
                  });
                }}
                options={['Horizontal', 'Vertical']}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Select Arrangement"
                    variant="outlined"
                    className='custom-text-field'
                    fullWidth
                    label="Arrangement"
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                value={formData.pumpType}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpType: newValue
                  });
                }}
                options={ptOption}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Select Pump Type"
                    variant="outlined"
                    fullWidth
                    className='custom-text-field'
                    label="Pump Type"
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                value={formData.stage}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    stage: newValue
                  });
                }}
                options={stgOption}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Select Stage"
                    variant="outlined"
                    className='custom-text-field'
                    label="Stage"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                value={formData.casing}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    casing: newValue
                  });
                }}
                options={cstOption}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Select Casing Type"
                    variant="outlined"
                    className='custom-text-field'
                    label="Casing"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                multiline
                className="custom-text-field"
                name="casingDetails"
                value={formData.casingDetails}
                onChange={handleChange}
                label="Casing Details"
                fullWidth
              />
            </Grid>

          </Grid>
        </div>

        {/* Existing Seal Section */}
        <div className='card'>
          {/* Your existing Seal form fields */}
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Existing Seal :-</div></div>

          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="series"
                value={formData.series}
                label="Series"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                value={formData.performance}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    performance: newValue
                  });
                }}
                onFocus={() => getColumnData('Performance', setptOption, setarOption, setsaOption, setstOption, setstgOption, setcstOption, setpfOption, setfnOption)}
                inputValue={formData.performance || ''}
                onInputChange={(event, newInputValue) => {
                  setFormData({
                    ...formData,
                    performance: newInputValue
                  });
                }}
                options={['Satisfactory', 'Unsatisfactory']}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    className="custom-text-field"
                    placeholder="Select Performance Type"
                    variant="outlined"
                    label="Performance"
                    fullWidth
                  />
                )}
              />
            </Grid>
              


            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                value={formData.sealArrangement}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    sealArrangement: newValue
                  });
                }}

                onFocus={() => getColumnData('Seal Arrangement', setptOption, setarOption, setsaOption, setstOption, setstgOption, setcstOption, setpfOption, setfnOption)}
                inputValue={formData.sealArrangement || ''}
                onInputChange={(event, newInputValue) => {
                  setFormData({
                    ...formData,
                    sealArrangement: newInputValue
                  });
                }}
                
                options={['Single', 'Double']}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Select Seal Arrangement"
                    variant="outlined"
                    label="Seal Arrangement"
                    className='custom-text-field'
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="make"
                value={formData.make}
                label="Make"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="size"
                value={formData.size}
                label="Size"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="moc"
                value={formData.moc}
                label="MOC"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="apiPlan"
                value={formData.apiPlan}
                label="API Plan"
                multiline
                onChange={handleChange}
                fullWidth
              />
            </Grid>

          </Grid>
        </div>

        {/* Operating Parameters And Fluid Detail Section */}
        
        <div className='card'>
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Operating Parameters And Fluid Detail :-</div></div>
          <div className=''>
            <h3 style={{ paddingBottom: '10px' }}>Parameters:-</h3>
            <Grid container spacing={2}>

              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.suctionPressure}
                  onChange={handleChange}
                  label="Suction Pressure"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small" variant="outlined">
                          <Select
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev, suctionPressure: `${prev.suctionPressure.split(' ')[0]} ${selectedUnit}`
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.suctionPressure}
                            disableUnderline
                            sx={{
                              height: '100%', // Set dropdown height to match TextField
                              borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Show left border only
                              borderRadius: 0, // Remove other borders
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
                              '& .MuiSelect-select': {
                                padding: '0 8px',
                                outline: 'none',
                                border: 'none',
                                height: '100%', // Match height to TextField
                                display: 'flex',
                                alignItems: 'center',
                              },
                              minWidth: 60, // Set width for dropdown
                            }}
                          >
                            {!formData.suctionPressure && <MenuItem>Unit</MenuItem>}
                            <MenuItem value="kg/cm2">kg/cm2</MenuItem>
                            <MenuItem value="kg/cm2 a">kg/cm2 a</MenuItem>
                            <MenuItem value="kg/cm2 g">kg/cm2 g</MenuItem>
                            <MenuItem value="bar">bar</MenuItem>
                            <MenuItem value="bar (a)">bar (a)</MenuItem>
                            <MenuItem value="bar (g)">bar (g)</MenuItem>
                            <MenuItem value="Mpa">Mpa</MenuItem>
                            <MenuItem value="Mpa (a)">Mpa (a)</MenuItem>
                            <MenuItem value="Mpa (g)">Mpa (g)</MenuItem>
                            <MenuItem value="Kpa">Kpa</MenuItem>
                            <MenuItem value="Kpa (g)">Kpa (g)</MenuItem>
                            <MenuItem value="PSI">PSI</MenuItem>
                            <MenuItem value="PSIG">PSIG</MenuItem>
                            <MenuItem value="MLC">MLC</MenuItem>
                            <MenuItem value="MWC">MWC</MenuItem>
                            <MenuItem value="Meter">Meter</MenuItem>
                            <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>


              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.suctionPressure}
                  onChange={handleChange}
                  label="Discharge Pressure"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small" variant="outlined">
                          <Select
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev, suctionPressure: `${prev.suctionPressure.split(' ')[0]} ${selectedUnit}`
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.suctionPressure}
                            disableUnderline
                            sx={{
                              height: '100%', // Set dropdown height to match TextField
                              borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Show left border only
                              borderRadius: 0, // Remove other borders
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
                              '& .MuiSelect-select': {
                                padding: '0 8px',
                                outline: 'none',
                                border: 'none',
                                height: '100%', // Match height to TextField
                                display: 'flex',
                                alignItems: 'center',
                              },
                              minWidth: 60, // Set width for dropdown
                            }}
                          >
                            {!formData.suctionPressure && <MenuItem>Unit</MenuItem>}
                            <MenuItem value="kg/cm2">kg/cm2</MenuItem>
                            <MenuItem value="kg/cm2 a">kg/cm2 a</MenuItem>
                            <MenuItem value="kg/cm2 g">kg/cm2 g</MenuItem>
                            <MenuItem value="bar">bar</MenuItem>
                            <MenuItem value="bar (a)">bar (a)</MenuItem>
                            <MenuItem value="bar (g)">bar (g)</MenuItem>
                            <MenuItem value="Mpa">Mpa</MenuItem>
                            <MenuItem value="Mpa (a)">Mpa (a)</MenuItem>
                            <MenuItem value="Mpa (g)">Mpa (g)</MenuItem>
                            <MenuItem value="Kpa">Kpa</MenuItem>
                            <MenuItem value="Kpa (g)">Kpa (g)</MenuItem>
                            <MenuItem value="PSI">PSI</MenuItem>
                            <MenuItem value="PSIG">PSIG</MenuItem>
                            <MenuItem value="MLC">MLC</MenuItem>
                            <MenuItem value="MWC">MWC</MenuItem>
                            <MenuItem value="Meter">Meter</MenuItem>
                            <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.suctionPressure}
                  onChange={handleChange}
                  label="Box Pressure "
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small" variant="outlined">
                          <Select
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev, suctionPressure: `${prev.suctionPressure.split(' ')[0]} ${selectedUnit}`
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.suctionPressure}
                            disableUnderline
                            sx={{
                              height: '100%', // Set dropdown height to match TextField
                              borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Show left border only
                              borderRadius: 0, // Remove other borders
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
                              '& .MuiSelect-select': {
                                padding: '0 8px',
                                outline: 'none',
                                border: 'none',
                                height: '100%', // Match height to TextField
                                display: 'flex',
                                alignItems: 'center',
                              },
                              minWidth: 60, // Set width for dropdown
                            }}
                          >
                            {!formData.suctionPressure && <MenuItem>Unit</MenuItem>}
                            <MenuItem value="kg/cm2">kg/cm2</MenuItem>
                            <MenuItem value="kg/cm2 a">kg/cm2 a</MenuItem>
                            <MenuItem value="kg/cm2 g">kg/cm2 g</MenuItem>
                            <MenuItem value="bar">bar</MenuItem>
                            <MenuItem value="bar (a)">bar (a)</MenuItem>
                            <MenuItem value="bar (g)">bar (g)</MenuItem>
                            <MenuItem value="Mpa">Mpa</MenuItem>
                            <MenuItem value="Mpa (a)">Mpa (a)</MenuItem>
                            <MenuItem value="Mpa (g)">Mpa (g)</MenuItem>
                            <MenuItem value="Kpa">Kpa</MenuItem>
                            <MenuItem value="Kpa (g)">Kpa (g)</MenuItem>
                            <MenuItem value="PSI">PSI</MenuItem>
                            <MenuItem value="PSIG">PSIG</MenuItem>
                            <MenuItem value="MLC">MLC</MenuItem>
                            <MenuItem value="MWC">MWC</MenuItem>
                            <MenuItem value="Meter">Meter</MenuItem>
                            <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>


              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="totalHead"
                  value={formData.totalHead}
                  onChange={handleChange}
                  label="Total Head"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small" variant="outlined">
                          <Select
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev, totalHead: `${prev.totalHead.split(' ')[0]} ${selectedUnit}`
                              }))
                            }}
                            displayEmpty
                            disabled={!formData.totalHead}
                            disableUnderline
                            sx={{
                              height: '100%',
                              borderLeft: '1px solid rgba(0, 0, 0, 0.23)',
                              borderRadius: 0,
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiSelect-select': {
                                padding: '0 8px',
                                outline: 'none',
                                border: 'none',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                              },
                              minWidth: 60,
                            }}>
                            {!formData.totalHead && <MenuItem>Unit</MenuItem>}
                            <MenuItem value="Meter">Meter</MenuItem>
                            <MenuItem value="MWC">MWC</MenuItem>
                            <MenuItem value="MLC">MLC</MenuItem>
                            <MenuItem value="kg/cm2">kg/cm2</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>






              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >All Pressure Unit</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="allPressureUnit"
                  value={formData.allPressureUnit}
                  onChange={handleChange}
                  label="All Pressure Unit"
                />
              </Grid>

              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Total Heat</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="totalHeat"
                  value={formData.totalHeat}
                  onChange={handleChange}
                  label="Total Heat"
                />
              </Grid>


              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Suction Pressure</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.suctionPressure}
                  onChange={handleChange}
                  label="Suction Pressure"
                />
              </Grid>

              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Discharge Pressure</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="dischargePressure"
                  value={formData.dischargePressure}
                  onChange={handleChange}
                  label="Discharge Pressure"
                />
              </Grid>

              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Direction of Rortation</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="directionOfRotation"
                  value={formData.directionOfRotation}
                  onChange={handleChange}
                  label="Direction of Rortation"
                />
              </Grid>

              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Speed</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                  label="Speed"
                />
              </Grid>


              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Box Pressure</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="boxPressure"
                  value={formData.boxPressure}
                  onChange={handleChange}
                  label="Box Pressure"
                />
              </Grid>

            </Grid>
          </div>

          <div >

            <h3 style={{ padding: '10px 0' }}>Fluids :-</h3>

            <Grid container spacing={2}>
              {/* Fluid */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="fluid"
                  value={formData.fluid}
                  onChange={handleChange}
                  label="Fluid"
                  fullWidth
                />
              </Grid>

              {/* Nature (Dropdown) */}
              <Grid item xs={4}>
                <Autocomplete
                  style={{ width: '100%' }}
                  size="small"
                  value={formData.nature}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      nature: newValue
                    });
                  }}
                  inputValue={formData.nature || ''}
                  onInputChange={(event, newInputValue) => {
                    setFormData({
                      ...formData,
                      nature: newInputValue
                    });
                  }}
                  options={['Option1', 'Option2', 'Option3']} // Replace with actual options
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      className="custom-text-field"
                      placeholder="Select Nature"
                      variant="outlined"
                      label="Nature"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Pumping Temperature */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="pumpingTemperature"
                  value={formData.pumpingTemperature}
                  onChange={handleChange}
                  label="Pumping Temperature"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small" variant="outlined">
                          <Select
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev, pumpingTemperature: `${prev.pumpingTemperature.split(' ')[0]} ${selectedUnit}`
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpingTemperature}
                            disableUnderline
                            sx={{ minWidth: 60 }}
                          >
                            <MenuItem value="℃">℃</MenuItem>
                            <MenuItem value="℉">℉</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* Maximum Temperature */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="maximumTemperature"
                  value={formData.maximumTemperature}
                  onChange={handleChange}
                  label="Maximum Temperature"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small" variant="outlined">
                          <Select
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev, maximumTemperature: `${prev.maximumTemperature.split(' ')[0]} ${selectedUnit}`
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.maximumTemperature}
                            disableUnderline
                            sx={{ minWidth: 60 }}
                          >
                            <MenuItem value="℃">℃</MenuItem>
                            <MenuItem value="℉">℉</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* SP Gravity */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="spGravity"
                  value={formData.spGravity}
                  onChange={handleChange}
                  label="SP Gravity"
                  fullWidth
                />
              </Grid>

              {/* Freezing Point */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="freezingPoint"
                  value={formData.freezingPoint}
                  onChange={handleChange}
                  label="Freezing Point"
                  fullWidth
                />
              </Grid>

              {/* Boiling Point */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="boilingPoint"
                  value={formData.boilingPoint}
                  onChange={handleChange}
                  label="Boiling Point"
                  fullWidth
                />
              </Grid>

              {/* Viscosity */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="viscosity"
                  value={formData.viscosity}
                  onChange={handleChange}
                  label="Viscosity"
                  fullWidth
                />
              </Grid>

              {/* Percentage Of Solid */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="percentageOfSolid"
                  value={formData.percentageOfSolid}
                  onChange={handleChange}
                  label="Percentage Of Solid"
                  fullWidth
                />
              </Grid>

              {/* Solid Size */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="solidSize"
                  value={formData.solidSize}
                  onChange={handleChange}
                  label="Solid Size"
                  fullWidth
                />
              </Grid>

              {/* Special Note */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="specialNote"
                  value={formData.specialNote}
                  onChange={handleChange}
                  label="Special Note"
                  inputProps={{ maxLength: 150 }}
                  fullWidth
                />
              </Grid>
            </Grid>

          </div>
          {/* Your existing Operating Parameters and Fluid Detail fields */}
        </div>

        {/* New Mechanical Seal Section */}

        <div className='card'>
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Proposed Mechanical Seal :-</div></div>

          <FormControl component="fieldset">
            <h3 style={{ padding: '10px 0' }}>Select Seal Type</h3>
            <RadioGroup row value={sealType} onChange={handleSealTypeChange}>
              <FormControlLabel value="existing" control={<Radio />} label="Existing Seal" />
              <FormControlLabel value="new" control={<Radio />} label="New Seal" />
            </RadioGroup>
          </FormControl>

          {sealType === 'existing' && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="G.A Number"
                    value={formData.existingSeal.gaNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSeal: { ...prev.existingSeal, gaNumber: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Seal Series"
                    value={formData.existingSeal.sealSeries}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSeal: { ...prev.existingSeal, sealSeries: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Shaft Dia"
                    value={formData.existingSeal.shaftDia}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSeal: { ...prev.existingSeal, shaftDia: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Seal Size"
                    value={formData.existingSeal.sealSize}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSeal: { ...prev.existingSeal, sealSize: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>

                {/* Option selector */}

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Seal Type</InputLabel>
                    <Select
                      size="small"
                      value={formData.existingSeal.sealType}
                      onChange={handleSealConfigChange}
                      label="Seal Type"
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="double">Double</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                
              </Grid>

              {renderMocFields('existingSeal', 'ibMoc')}
              {formData.existingSeal.sealType === 'double' && renderMocFields('existingSeal', 'obMoc')}
            </div>
          )}

          {sealType === 'new' && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Shaft Dia"
                    value={formData.newSeal.shaftDia}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSeal: { ...prev.newSeal, shaftDia: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Bore Dia"
                    value={formData.newSeal.boreDia}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSeal: { ...prev.newSeal, boreDia: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Bore Depth"
                    value={formData.newSeal.boreDepth}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSeal: { ...prev.newSeal, boreDepth: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>


                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Nearest Obstruction"
                    value={formData.newSeal.nearestObstruction}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSeal: { ...prev.newSeal, nearestObstruction: e.target.value }
                    }))}
                    fullWidth
                  />
                </Grid>


                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Seal Type</InputLabel>
                    <Select
                      size="small"
                      value={formData.newSeal.sealType}
                      onChange={handleSealConfigChange}
                      label="Seal Type"
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="double">Double</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {renderMocFields('newSeal', 'ibMoc')}
              {formData.newSeal.sealType === 'double' && renderMocFields('newSeal', 'obMoc')}
            </div>
          )}
        </div>

        {/* Api Plane */}
        <div className='card'>
          <Grid container spacing={2}>
            {/* API Plan Section */}
            <Grid item xs={12}>
              <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb"> API Plan :-</div></div>
            </Grid>

            {/* Flushing Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="flushingPlan"
                value={formData.flushingPlan || ''}
                onChange={handleChange}
                label="Flushing Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Barrier/Buffer Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="barrierBufferPlan"
                value={formData.barrierBufferPlan || ''}
                onChange={handleChange}
                label="Barrier/Buffer Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Atmospheric Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="atmosphericPlan"
                value={formData.atmosphericPlan || ''}
                onChange={handleChange}
                label="Atmospheric Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Collection Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="collectionPlan"
                value={formData.collectionPlan || ''}
                onChange={handleChange}
                label="Collection Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Your existing Section 5&6 fields */}
        </div>

        {/* Measurement Section */}

        <div className='card'>
          <Grid container spacing={2}>
            {/* Type of Stuffing Box */}
            <Grid item xs={12}>
              <div className="MuiBox-root css-2e6lci">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle">
                  <g>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </g>
                </svg>
                <div className="MuiBox-root css-1isemmb">Measurement :-</div>
              </div>
              <FormControl component="fieldset">
                <h3 style={{ padding: '1px 0' }}>Type of Stuffing Box:-</h3>
                <RadioGroup
                  row
                  aria-label="typeOfStuffingBox"
                  name="typeOfStuffingBox"
                  value={formData.typeOfStuffingBox}
                  onChange={(e) => {
                    handleChange(e);
                    // Logic for displaying different images based on selection
                  }}
                >
                  <FormControlLabel value="Type I" control={<Radio />} label="Type I" />
                  <FormControlLabel value="Type II" control={<Radio />} label="Type II" />
                  <FormControlLabel value="Type III" control={<Radio />} label="Type III" />
                </RadioGroup>
                {formData.typeOfStuffingBox && (
                  <div>
                    <img src={`/path/to/${formData.typeOfStuffingBox}-image.jpg`} alt={formData.typeOfStuffingBox} />
                  </div>
                )}
              </FormControl>
            </Grid>

            {/* Mandatory Inputs */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="shaftOD"
                label="Shaft OD"
                value={formData.shaftOD || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="stuffingBoxID"
                label="Stuffing Box ID"
                value={formData.stuffingBoxID || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="stuffingBoxDepth"
                label="Stuffing Box Depth"
                value={formData.stuffingBoxDepth || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="nearestObstruction"
                label="Nearest Obstruction"
                value={formData.nearestObstruction || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>

            {/* Spigot Details */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="spigotDia"
                label="Spigot Dia"
                value={formData.spigotDia || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="socketDepth"
                label="Socket Depth"
                value={formData.socketDepth || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Shaft Sleeve Availability */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h3 style={{ padding: '1px 0' }}>Shaft Sleeve Available?</h3>
                <RadioGroup
                  row
                  name="shaftSleeveAvailable"
                  value={formData.shaftSleeveAvailable}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.shaftSleeveAvailable === 'Yes' && (
              <>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="sleeveOD"
                    label="Sleeve OD"
                    value={formData.sleeveOD || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="stuffingBoxThroatDia"
                    label="Stuffing Box Throat Dia"
                    value={formData.stuffingBoxThroatDia || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="sleeveShoulderLength"
                    label="Sleeve Shoulder Length"
                    value={formData.sleeveShoulderLength || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="sleeveExtensionLength"
                    label="Sleeve Extension Length"
                    value={formData.sleeveExtensionLength || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="shaftHubDistance"
                    label="Shaft Hub Distance"
                    value={formData.shaftHubDistance || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </>
            )}

            {/* Gland Bolting */}
            <Grid item xs={3}>
              <TextField
                className="custom-text-field"
                size="small"
                name="numberOfStuds"
                label="No. of Studs"
                value={formData.numberOfStuds || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className="custom-text-field"
                size="small"
                name="studSize"
                label="Stud Size"
                value={formData.studSize || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className="custom-text-field"
                size="small"
                name="boltCircleDiameter"
                label="Bolt Circle Diameter"
                value={formData.boltCircleDiameter || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className="custom-text-field"
                size="small"
                name="startAngle"
                label="Start Angle"
                value={formData.startAngle || ''}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Connections */}
            <Grid item xs={12}>
              <h3 style={{ paddingBottom: '10px' }}>Flush Connection:-</h3>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    select
                    size="small"
                    name="flushSize"
                    label="Size"
                    value={formData.flushSize || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options as needed */}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="flushAngle"
                    label="Angle"
                    value={formData.flushAngle || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Repeat the same structure for Quench and Drain connections */}

            {/* Stuffing Box Type */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h3 style={{ padding: '1px 0' }}>Stuffing Box Type:-</h3>
                <RadioGroup
                  row
                  name="stuffingBoxType"
                  value={formData.stuffingBoxType}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Stepped" control={<Radio />} label="Stepped" />
                  <FormControlLabel value="Straight" control={<Radio />} label="Straight" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>


        {/* Mesurment section end */}


        {/* Submit/Update Buttons */}
        <Grid item xs={4}>
          <Grid item xs={4}>
            {!pId ? (
              <Button
                className="submit-btn"
                style={{ margin: "2rem 1rem" }}
                onClick={(e) => handleSubmit(e, formData, navigate)}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            ) : (
              <>
                <Button
                  className="update-btn"
                  variant="contained"
                  type="submit"
                  onClick={(e) => handleUpdatePumpSeal(e, formData, pId, navigate)}
                >
                  Update
                </Button>
                <Button
                  className="cancel-btn"
                  variant="contained"
                  onClick={cancelUpdate}
                >
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
