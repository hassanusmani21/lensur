import axiosInstance from "../axios/axiosInstance";
import moment from 'moment';




//Submit form
export const handleSubmit = async(e,formData, navigate, savedItems)=>{
    e.preventDefault();
    // Update the formData with the new items array
    const updatedFormData = { ...formData, ofmItems: savedItems };

    console.log("Updated formData:", updatedFormData);

    try {
      const res = await axiosInstance.post('lens/OrderForwardingMemo/save',updatedFormData);
      const {data} = res;
      console.log("data is ",data)
      navigate('/editOfm')
    } catch (error) {
      console.log(error)
    }
  
  }


//getApi
export const getOfm = async(oId,setFormData, setSavedItems)=>{

  try{
    const res = await axiosInstance.get(`lens/OrderForwardingMemo/get?ofmNo=${oId}`)
    const {data} = res;
    console.log("the oId fetched data is ",data)
    setFormData({...data,ofmItems:[]});
    setSavedItems(data.ofmItems);
    }
    catch(err){
      console.log(err);
    }
    
}


//Update API
export const handleUpdate = async (e, formData,oId,savedItems, navigate)=>{
  e.preventDefault();
  console.log("Saved Items are ",savedItems);

  const updatedFormData = { ...formData, ofmItems: savedItems };
    console.log("sending request data is ",updatedFormData);

    try{
        const res = await axiosInstance.put(`lens/OrderForwardingMemo/update`, updatedFormData);
        console.log("response from update is ",res.data);
        oId="";
        navigate(`/ofmSuccess`);
    }
    catch(err){
      console.log(err)
    }

  
}

//get All 
export const getAllApi = async(setData,setIsDeleted)=>{

  try{
    const res = await axiosInstance.get(`lens/OrderForwardingMemo/getAll`)
    setData(res.data);
    console.log("the fetched data is ",res.data);
    setIsDeleted(false)
  
  }catch(err){
    console.log(err)
  }

} 


// delete One
export const deleteDetail = async (ofId,data, setData,setIsDeleted) => {
  try {
    await axiosInstance.delete(`lens/OrderForwardingMemo/delete?ofmNo=${ofId}`);
    const newData = data.filter(item => item.ofmNo !== ofId);
    console.log("data is ",data)
    console.log("New data is ",newData)
    setData(newData);
    setIsDeleted(true)
  } catch (err) {
    console.log(err);
  }
}


export const searchFilter = async (startDate, endDate, branch, ofmNo,engineer,customer,poNo, currentPage,industry,category, itemsPerPage, setData) => {
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
    let url = `lens/getAllOrderForwardingMemoByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (ofmNo) url += `ofmNo=${ofmNo}&`;
    if (engineer) url += `engineer=${engineer}&`;
    if (customer) url += `customer=${customer}&`;
    if (poNo) url += `poNo=${poNo}&`;
    if (industry) url += `industry=${industry}&`;
    if (category) url += `category=${category}&`;
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