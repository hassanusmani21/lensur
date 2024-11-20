import React, { useState, useEffect, useContext } from "react";
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
  MenuItem,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPumpSeal, handleSubmit } from '../../apis/PumpSealApi';
import { handleUpdatePumpSeal } from '../../apis/PumpSealApi';
import { getColumnData } from '../../apis/PumpSealApi';
import dayjs from "dayjs";


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
  const loggedInUser = { name: "John Doe" }; // Hardcoded user data
  const [referenceNo, setReferenceNo] = useState("");
  const [createdOn, setCreatedOn] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  const [updatedOn, setUpdatedOn] = useState("");

  const seriesOptions = ['Option 1', 'Option 2', 'Option 3']; // Example series options
  const makeOptions = ['Make 1', 'Make 2', 'Make 3']; // Example make options
  const sizeOptions = ['Size 1', 'Size 2', 'Size 3']; // Example size options
  const mocOptions = ['MOC 1', 'MOC 2', 'MOC 3']; // Example MOC options
  const apiPlanOptions = ['Plan 1', 'Plan 2', 'Plan 3']; // Example API plan options
  const [performance, setPerformance] = useState("");


  // Common units for pressure-related fields
  const unitOptions = ["℃", "℉"];


  useEffect(() => {
    const generateReferenceNo = () => `SI-${Date.now()}`;
    setReferenceNo(generateReferenceNo());
  }, []);

  // Add new state for mechanical seal section
  const [sealType, setSealType] = useState('existing');
  const [selectedSealType, setSelectedSealType] = useState('single');

  const [formData, setFormData] = useState({
    salesInquiryRef: 'AUTO1234',
    customerRef: '',
    customerName: '',  // Not editable
    customerAddress: '', // Editable
    contactPerson: '', // Editable
    mobileNumber: '', // Editable
    sourceOfInquiry: '',
    industry: '', // Not editable
    branch: '', // Selectable
    createdBy: '', // Selectable
    createdOn: '2024-11-16', // Auto-generated
    updatedBy: '', // Selectable
    updatedOn: '2024-11-16', // Auto-generated
    branch: '',
    endUser: '',
    sealArrangement: "",
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
      },

      pump: {
        make: '',
        model: '',
        moc: '',
        impellerCasingMoc: '',
        shaftMoc: '',
        bearingBkt: '',
        tagNumber: '',
        arrangement: '',
        pumpType: '',
        stage: '',
        casingType: ''
      },

    }
  });

  useEffect(() => {
    if (pId !== undefined) {
      getPumpSeal(pId, setFormData);
    }
  }, [pId]);

  const handleChange = (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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

  const handleUpdate = () => {
    setUpdatedOn(dayjs().format("YYYY-MM-DD HH:mm:ss"));
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

  const PumpData = (section, type) => (

    <form>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {/* Autogenerated Reference Number */}
        <Grid item xs={4}>
          <TextField
            size="small"
            className="custom-text-field"
            label="Sales Inquiry Item Reference No."
            value="Autogenerated"
            disabled
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        {/* Created By User */}
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
                label="Updated By user"
              />
            )}
          />
        </Grid>

        {/* Created On (Autogenerated) */}
        <Grid item xs={4}>
          <TextField
            size="small"
            className="custom-text-field"
            label="Created On"
            value={new Date().toLocaleDateString()} // Auto-generated value
            disabled
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>



        {/* Updated On (Autogenerated) */}
        <Grid item xs={4}>
          <TextField
            size="small"
            className="custom-text-field"
            label="Updated On"
            value={new Date().toLocaleDateString()} // Auto-generated value
            disabled
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        {/* Text Area for Additional Notes */}
        <Grid item xs={4}>
          <TextField
            size="small"
            className="custom-text-field"
            label="Additional Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}

            fullWidth
          />
        </Grid>
      </Grid>


      {/*////////////////// 2nd form staring here   ///////  */}

      <h3 style={{ padding: '10px 0' }}>Pump Data :-</h3>
      <Grid container spacing={2}>
        {/* Make */}

        <Grid item xs={4}>
          <TextField
            size="small"
            label="Make"
            value={formData.pump?.make || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, make: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Model */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Model"
            value={formData.pump?.model || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, model: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Pump MOC */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Pump MOC"
            value={formData.pump?.moc || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, moc: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Impeller/Casing MOC */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Impeller/Casing MOC"
            value={formData.pump?.impellerCasingMoc || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, impellerCasingMoc: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Shaft MOC */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Shaft MOC"
            value={formData.pump?.shaftMoc || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, shaftMoc: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Bearing BKT */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Bearing BKT"
            value={formData.pump?.bearingBkt || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, bearingBkt: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Tag Number */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Tag Number"
            value={formData.pump?.tagNumber || ''}
            onChange={(e) => setFormData({
              ...formData,
              pump: { ...formData.pump, tagNumber: e.target.value }
            })}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Arrangement (Autocomplete Dropdown) */}
        <Grid item xs={4}>
          <Autocomplete
            value={formData.pump?.arrangement || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              pump: { ...formData.pump, arrangement: newValue }
            })}
            options={['Horizontal', 'Vertical']}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Arrangement"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Pump Type (Autocomplete Dropdown) */}
        <Grid item xs={4}>
          <Autocomplete
            value={formData.pump?.pumpType || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              pump: { ...formData.pump, pumpType: newValue }
            })}
            options={['Centrifugal', 'Positive Displacement']}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Pump Type"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Stage (Autocomplete Dropdown) */}
        <Grid item xs={4}>
          <Autocomplete
            value={formData.pump?.stage || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              pump: { ...formData.pump, stage: newValue }
            })}
            options={['Single', 'Multiple']}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Stage"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Casing Type (Autocomplete Dropdown) */}
        <Grid item xs={4}>
          <Autocomplete
            value={formData.pump?.casingType || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              pump: { ...formData.pump, casingType: newValue }
            })}
            options={['Split', 'Unsplitted']}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Casing Type"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>
      </Grid>

      {/* //////////////////////////////////3rd form ////////////////////// */}

      <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>
      <Grid container spacing={2}>
        {/* Series */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={seriesOptions || []}
            value={formData.seal?.series || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, series: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="Series"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Performance (Dropdown) */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={['Satisfactory', 'Unsatisfactory']}
            value={formData.seal?.performance || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, performance: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="Performance"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Seal Arrangement (Dropdown) */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={['Single', 'Double']}
            value={formData.seal?.arrangement || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, arrangement: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="Seal Arrangement"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Make */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={makeOptions || []}
            value={formData.seal?.make || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, make: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="Make"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Size */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={sizeOptions || []}
            value={formData.seal?.size || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, size: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="Size"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* MOC */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={mocOptions || []}
            value={formData.seal?.moc || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, moc: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="MOC"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* API Plan */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            options={apiPlanOptions || []}
            value={formData.seal?.apiPlan || ''}
            onChange={(event, newValue) => setFormData({
              ...formData,
              seal: { ...formData.seal, apiPlan: newValue }
            })}
            renderInput={(params) => (
              <TextField {...params}
                label="API Plan"
                variant="outlined"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>
      </Grid>

      {/*/////////////  4th form ////////////////////// */}
      <h3 style={{ padding: '10px 0' }}>Parameters :-</h3>

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

        {/* Speed */}
        <Grid item xs={4}>
          <TextField
            size="small"
            className="custom-text-field"
            name="speed"
            value={formData.speed}
            onChange={handleChange}
            label="Speed"
            fullWidth
          />
        </Grid>
      </Grid>


      {/* //////////// 5th section start ///////// */}

      <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Fluid"
            name="fluid"
            value={formData.fluid}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Nature */}
        <Grid item xs={4}>
          <Autocomplete
            options={['Option 1', 'Option 2', 'Option 3']} // Replace with actual options
            renderInput={(params) => (
              <TextField {...params} label="Nature" size="small" fullWidth className="custom-text-field" />
            )}
            onChange={(event, value) => setFormData((prev) => ({ ...prev, nature: value }))}
          />
        </Grid>

        {/* Pumping Temperature */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Pumping Temperature"
            name="pumpingTemperature"
            value={formData.pumpingTemperature}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FormControl size="small" variant="outlined">
                    <Select
                      onChange={(e) => {
                        const selectedUnit = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          pumpingTemperature: `${prev.pumpingTemperature.split(' ')[0]} ${selectedUnit}`,
                        }));
                      }}
                      displayEmpty
                      sx={{
                        height: '100%',
                        borderLeft: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 0,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiSelect-select': {
                          padding: '0 8px',
                          outline: 'none',
                          height: '100%',
                        },
                        minWidth: 60,
                      }}
                    >
                      <MenuItem value="">Unit</MenuItem>
                      {unitOptions.map((unit) => (
                        <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Maximum Temperature */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Maximum Temperature"
            name="maximumTemperature"
            value={formData.maximumTemperature}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FormControl size="small" variant="outlined">
                    <Select
                      onChange={(e) => {
                        const selectedUnit = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          maximumTemperature: `${prev.maximumTemperature.split(' ')[0]} ${selectedUnit}`,
                        }));
                      }}
                      displayEmpty
                      sx={{
                        height: '100%',
                        borderLeft: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 0,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiSelect-select': {
                          padding: '0 8px',
                          outline: 'none',
                          height: '100%',
                        },
                        minWidth: 60,
                      }}
                    >
                      <MenuItem value="">Unit</MenuItem>
                      {unitOptions.map((unit) => (
                        <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* SP Gravity */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="SP Gravity"
            name="spGravity"
            value={formData.spGravity}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Freezing Point */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Freezing Point"
            name="freezingPoint"
            value={formData.freezingPoint}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Boiling Point */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Boiling Point"
            name="boilingPoint"
            value={formData.boilingPoint}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Viscosity */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Viscosity"
            name="viscosity"
            value={formData.viscosity}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Percentage of Solid */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Percentage of Solid"
            name="percentageOfSolid"
            value={formData.percentageOfSolid}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Solid Size */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Solid Size"
            name="solidSize"
            value={formData.solidSize}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Special Note */}
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Special Note"
            name="specialNote"
            value={formData.specialNote}
            onChange={handleChange}
            fullWidth
            className="custom-text-field"
            inputProps={{ maxLength: 150 }}
          />
        </Grid>
      </Grid>


    </form>
  );



  ///////////////// Agitor from ////////////////////

  const Agitator = (section, type) => (

    <div>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {/* Sales Inquiry Item Reference No */}
        <Grid item xs={4}>
          <TextField
            label="Sales Inquiry Item Reference No."
            value={referenceNo}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            disabled
            className="custom-text-field"
          />
        </Grid>

        {/* Created By User */}
        <Grid item xs={4}>
          <TextField
            label="Created By User"
            value={loggedInUser.name}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            disabled
            className="custom-text-field"
          />
        </Grid>

        {/* Created On */}
        <Grid item xs={4}>
          <TextField
            label="Created On"
            value={createdOn}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            disabled
            className="custom-text-field"
          />
        </Grid>

        {/* Updated By User */}
        <Grid item xs={4}>
          <TextField
            label="Updated By User"
            value={loggedInUser.name}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            disabled
            className="custom-text-field"
          />
        </Grid>

        {/* Updated On */}
        <Grid item xs={4}>
          <TextField
            label="Updated On"
            value={updatedOn}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            className="custom-text-field"
          />
        </Grid>
      </Grid>

      {/* //////// 2nd form ///////////// */}

      <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

      <Grid container spacing={2}>
        {/* Series */}
        <Grid item xs={4}>
          <TextField
            label="Series"
            value={formData.series}
            onChange={handleChange("series")}
            size="small"
            fullWidth
            className="custom-text-field"
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
                sealArrangement: newValue,
              });
            }}
            options={['Single', 'Double']}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                placeholder="Seal Arrangement"
                variant="outlined"
                className="custom-text-field"
                fullWidth
                label="Seal Arrangement"
              />
            )}
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
            options={['Satisfactory', 'Unsatisfactory']}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                placeholder="Performance"
                variant="outlined"
                className='custom-text-field'
                fullWidth
                label="Performance"
              />
            )}
          />
        </Grid>

        {/* Make */}
        <Grid item xs={4}>
          <TextField
            label="Make"
            value={formData.make}
            onChange={handleChange("make")}
            size="small"
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* Size */}
        <Grid item xs={4}>
          <TextField
            label="Size"
            value={formData.size}
            onChange={handleChange("size")}
            size="small"
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* MOC */}
        <Grid item xs={4}>
          <TextField
            label="MOC"
            value={formData.moc}
            onChange={handleChange("moc")}
            size="small"
            fullWidth
            className="custom-text-field"
          />
        </Grid>

        {/* API Plan */}
        <Grid item xs={4}>
          <TextField
            label="API Plan"
            value={formData.apiPlan}
            onChange={handleChange("apiPlan")}
            size="small"
            fullWidth
            className="custom-text-field"
          />
        </Grid>
      </Grid>

      {/*///////////////3rd form ////////////// */}

      <h3 style={{ padding: '10px 0' }}>Operating Parameters And Fluid Detail :-</h3>

      <Grid container spacing={2}>
        {/* Vessel Pressure (Operating) */}
        <Grid item xs={4}>
          <TextField
            label="Vessel Pressure (Operating)"
            name="vesselPressureOperating"
            value={formData.vesselPressureOperating}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Vessel Pressure Operating Unit */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            value={formData.vesselPressureOperatingUnit}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                vesselPressureOperatingUnit: newValue,
              });
            }}
            options={['Unit1', 'Unit2', 'Unit3']} // Replace with Pump DRF values
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vessel Pressure Operating Unit"
                variant="outlined"
                size="small"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Vessel Pressure (Design) */}
        <Grid item xs={4}>
          <TextField
            label="Vessel Pressure (Design)"
            name="vesselPressureDesign"
            value={formData.vesselPressureDesign}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Vessel Pressure Design Unit */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            value={formData.vesselPressureDesignUnit}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                vesselPressureDesignUnit: newValue,
              });
            }}
            options={['Unit1', 'Unit2', 'Unit3']} // Replace with Pump DRF values
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vessel Pressure Design Unit"
                variant="outlined"
                size="small"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Direction of Rotation */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            value={formData.directionOfRotation}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                directionOfRotation: newValue,
              });
            }}
            options={['CW', 'CCW']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Direction of Rotation"
                variant="outlined"
                size="small"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Speed */}
        <Grid item xs={4}>
          <TextField
            label="Speed"
            name="speed"
            value={formData.speed}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>
      </Grid>

      {/*/////////////// 4th form /////////////// */}
      <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
      <Grid container spacing={2}>
        {/* Fluid */}
        <Grid item xs={4}>
          <TextField
            label="Fluid"
            name="fluid"
            value={formData.fluid}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Nature */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            value={formData.nature}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                nature: newValue,
              });
            }}
            options={['Option1', 'Option2']} // Replace with actual nature options
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nature"
                variant="outlined"
                size="small"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Pumping Temperature */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            value={formData.pumpingTemperature}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                pumpingTemperature: newValue,
              });
            }}
            options={['℃', '℉']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pumping Temperature"
                variant="outlined"
                size="small"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* Maximum Temperature */}
        <Grid item xs={4}>
          <Autocomplete
            size="small"
            value={formData.maximumTemperature}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                maximumTemperature: newValue,
              });
            }}
            options={['℃', '℉']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Maximum Temperature"
                variant="outlined"
                size="small"
                fullWidth
                className="custom-text-field"
              />
            )}
          />
        </Grid>

        {/* SP Gravity */}
        <Grid item xs={4}>
          <TextField
            label="SP Gravity"
            name="spGravity"
            value={formData.spGravity}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Freezing Point */}
        <Grid item xs={4}>
          <TextField
            label="Freezing Point"
            name="freezingPoint"
            value={formData.freezingPoint}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Boiling Point */}
        <Grid item xs={4}>
          <TextField
            label="Boiling Point"
            name="boilingPoint"
            value={formData.boilingPoint}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Viscosity */}
        <Grid item xs={4}>
          <TextField
            label="Viscosity"
            name="viscosity"
            value={formData.viscosity}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Percentage Of Solid */}
        <Grid item xs={4}>
          <TextField
            label="Percentage Of Solid"
            name="percentageOfSolid"
            value={formData.percentageOfSolid}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Solid Size */}
        <Grid item xs={4}>
          <TextField
            label="Solid Size"
            name="solidSize"
            value={formData.solidSize}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

        {/* Special Note */}
        <Grid item xs={4}>
          <TextField
            label="Special Note"
            name="specialNote"
            value={formData.specialNote}
            onChange={handleChange}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
            inputProps={{ maxLength: 150 }}
          />
        </Grid>
      </Grid>

    </div>

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
          <Grid container spacing={2}>
            {/* Sales Inquiry Reference No. */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Sales Inquiry Reference No."
                value={formData.salesInquiryRef}
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                disabled
                fullWidth
              />
            </Grid>

            {/* Customer Reference No. */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Customer Reference No."
                name="customerRef"
                value={formData.customerRef}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Customer Name (Not Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Customer Name"
                value={formData.customerName}
                InputProps={{
                  readOnly: true, // Read-only as it's fetched and not editable
                }}
                fullWidth
              />
            </Grid>

            {/* Customer Address (Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Customer Address"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Contact Person (Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Mobile Number (Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Source of Inquiry */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Source of Inquiry"
                name="sourceOfInquiry"
                value={formData.sourceOfInquiry}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Industry (Not Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Industry"
                value={formData.industry}
                InputProps={{
                  readOnly: true, // Read-only for non-editable field
                }}
                fullWidth
              />
            </Grid>

            {/* Branch (Selectable) */}
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
                    label="Branch"
                  />
                )}
              />
            </Grid>


            {/* Created By User */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Created By User"
                value={formData.createdBy}
                InputProps={{
                  readOnly: true, // Read-only as it's filled automatically
                }}
                fullWidth
              />
            </Grid>

            {/* Created On (Auto Generated) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Created On"
                value={formData.createdOn}
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                fullWidth
              />
            </Grid>

            {/* Updated By User */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Updated By User"
                value={formData.updatedBy}
                InputProps={{
                  readOnly: true, // Read-only as it's filled automatically
                }}
                fullWidth
              />
            </Grid>

            {/* Updated On (Auto Generated) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Updated On"
                value={formData.updatedOn}
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                fullWidth
              />
            </Grid>
          </Grid>

        </div>

        {/* ebd dndndjdjdfiuiurfufujhj  */}

        {/* Select Seal Type */}


        <div className='card'>
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
            <div className="MuiBox-root css-1isemmb">Proposed Mechanical Seal :-</div>
          </div>

          {/* Wrapper div with consistent height */}

          <div style={{ minHeight: '200px' }}>
            {sealType === 'existing' && (
              <div>
                <Grid container spacing={2}>
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
                        <MenuItem value="Pump">Double</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Conditionally render fields based on seal type */}
                {formData.existingSeal.sealType === 'single' && (
                  <div>
                    {Agitator('existingSeal', 'obMoc')}
                    {/* Add more fields/components for single seal if needed */}
                  </div>
                )}

                {formData.existingSeal.sealType === 'Pump' && (
                  <div>
                    {PumpData('existingSeal', 'obMoc')}
                    {/* Add more fields/components for double seal if needed */}
                  </div>
                )}
              </div>
            )}

            {sealType === 'new' && (
              <div>
                <Grid container spacing={2}>
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
                        <MenuItem value="Pump">Double</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Conditionally render fields based on seal type */}
                {formData.newSeal.sealType === 'single' && (
                  <div>
                    {renderMocFields('newSeal', 'ibMoc')}
                    {/* Add more fields/components for single seal if needed */}
                  </div>
                )}

                {formData.newSeal.sealType === 'Pump' && (
                  <div>
                    {renderMocFields('newSeal', 'ibMoc')}
                    {renderMocFields('newSeal', 'obMoc')}
                    {/* Add more fields/components for double seal if needed */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>



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
