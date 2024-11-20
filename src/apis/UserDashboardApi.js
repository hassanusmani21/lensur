import axiosInstance from "../axios/axiosInstance";

 
 
export const  deleteDetail = async(empId,data,setData, setIsDeleted)=>{
    try{
         await axiosInstance.delete(`/user/deleteUser?empId=${empId}`)
        const newData = data.filter(item => item.empId !== empId);
        setData(newData);
        setIsDeleted(true);
    }
    catch(err){
    console.log(err);
    }
}



export const getAllUser = (setData,currentPage,itemsPerPage,setIsDeleted)=>{
    
    axiosInstance.get(`/user/getAllUser?pageNo=${currentPage}&pageSize=${itemsPerPage}`).then(res=>{

    const {data} = res;
    setData(data.content) 
    setIsDeleted(false)
    console.log("response Data is ",data);
})


}