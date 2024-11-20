import axiosInstance from "../axios/axiosInstance";
import moment from "moment";



  

  // delete One
 export const deleteDetail = async (crId,data, setData) => {
    try {
      await axiosInstance.delete(`lens/agitatorSeal/delete?agitatorSealDrfNumber=${crId}`);
      const newData = data.filter(item => item.agitatorSealDrfNumber !== crId);
      console.log("data is ",data)
      console.log("New data is ",newData)
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  
  }




  
  export const handleSubmit = async(e,formData, navigate) => {
    e.preventDefault();

      console.log("formData sales is ",formData);
      const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');    

    if (formData && formData.lastUpdatedOn) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.lastUpdatedOn = dateTime;
    } 

    // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
    formData.insertedOn = dateTime;
    formData.lastUpdatedOn = dateTime;
    
     try{
          const res = await axiosInstance.post(`lens/agitatorSeal/save`, formData);
        console.log("response is ",res.data);
        navigate(`/agitatorSuccess/${res.data}`);
      }  
      catch(err){
        console.log(err)
      }


  };



  export const handleUpdate = async (e,formData,navigate,aId)=>{
    e.preventDefault();
   
      try{
          const res = await axiosInstance.put(`lens/agitatorSeal/update`, formData);
          console.log("response from update is ",res.data);
          
          aId="";
          navigate(`/agitatorSuccess/${formData.agitatorSealDrfNumber}`);
      }
      catch(err){
        console.log(err)
      }

  }



  //get One

export const getApi = (aId,setFormData)=>{
    axiosInstance.get(`lens/agitatorSeal/get?agitatorSealDrfNumber=${aId}`)
    .then(res=>{
      const {data} = res;
        setFormData(data);
        console.log("the aId fetched data is ",data)

    }) 
    .catch(err=>{
      console.log(err)
    })
} 




//Search Filter

export const searchFilter = async (startDate,endDate,branch,customerName,agitatorSealDrfNumber,currentPage,itemsPerPage,setData) => {
  console.log("recieved Page number is",currentPage)
  const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;
  const formattedEndDate = endDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;

  if (formattedStartDate) {
    console.log("start date is", formattedStartDate);
  }
  if (formattedEndDate) {
    console.log("end date is", formattedEndDate);
  }

  try {
    let url = `lens/agitatorSeal/getAllAgitatorSealByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (agitatorSealDrfNumber) url += `agitatorSealDrfNumber=${agitatorSealDrfNumber}&`;
    url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;

    console.log("URL:", url); // Log the constructed URL

    const res = await axiosInstance.get(url);
    const { data } = res;
    setData(data);
    console.log("response is", res);
  } catch (err) {
    console.log(err);
  }
}

