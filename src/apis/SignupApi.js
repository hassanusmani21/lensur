 import axios from "axios";
 import axiosInstance from "../axios/axiosInstance";

 
 
//  const baseUrl = process.env.REACT_APP_BASE_URL
 
const baseUrl = "https://crm-api.synterratech.in/lens-svc"


 //get All Designation
 export const getDesignation = async(setDesignation)=>{
    try{
      const res = await axios.get(`${baseUrl}/user/allDesignations`)
      const{data} = res;
      setDesignation(data);
    }
    catch(err){
      console.log(err);
    }
  }
  
  
   //get All Departments
  export  const getDepartments = async(setDepartments)=>{
    try{
      const res = await axios.get(`${baseUrl}/user/getAllDepartments`)
      const{data} = res;
      setDepartments(data);
      console.log(data)
    }
    catch(err){
      console.log(err);
    }
   }
  
  
   //get All Branches
   export const getBranches = async(setBranches)=>{
    try{
      const res = await axios.get(`${baseUrl}/user/getAllBranches`)
      const{data} = res;
      setBranches(data);
      console.log(data)
    }
    catch(err){
      console.log(err);
    }
   }
  
  
  
  
  //  export const handleSubmit = async(e,formData,navigate) => {
      
  //     e.preventDefault();
  //     formData.branches[0].region = formData.branches[0].departmentName;
  //     formData.lastUpdatedByUserId = formData.empId;
  //     console.log(formData.middleName)
  

  //     try{
  //       const res = await axiosInstance.post(`${baseUrl}/user/createAccount`,formData);
  //       const{data} = res;
  //       console.log("response Data ",data);
  //       navigate('/user')
  //     }
  //     catch(err){
  //       console.log(err);
  
  //     }
  
  //   };


  export const handleSubmit = async (e, formData, navigate) => {
    e.preventDefault();
    formData.lastUpdatedByUserId = formData.empId;
    formData.branches = formData.branches.map(branch => ({
      branchName: branch.branchName,
      region: branch.branchName
    }));
    
    try {
      const res = await axiosInstance.post(`${baseUrl}/user/createUser`, formData);
      const { data } = res;
      console.log("response Data ", data);
      navigate('/user');
    } catch (err) {
      console.log(err);
    }
  };
  
    

    export const getuser = async(uId, setFormData)=>{

      const res = await axios.get(`${baseUrl}/user/getUser?empId=${uId}`);
      const{data} = res;
      setFormData(data);
      console.log("single user data is ",data)
    } 
  


    export const handleUpdate = async(e,formData,navigate)=>{
      e.preventDefault();
      formData.departments[0].region = formData.departments[0].departmentName;
      formData.lastUpdatedByUserId = formData.empId;
            console.log(formData.middleName)

  
      try{
        const res = await axiosInstance.put(`/user/updateUser`,formData);
        const{data} = res;
        console.log("response Data ",data);
        navigate('/user')
      }
      
      catch(err){
        console.log(err);
  
      }
   
   }
  