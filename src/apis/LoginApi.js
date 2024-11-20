import axios from "axios";
import Cookies from 'js-cookie';
import axiosInstance from "../axios/axiosInstance";




export const handleSubmit = async (e, setToken, formData, navigate) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post(`/auth/authenticate`, formData);
    const { data } = res;
    console.log("the response is ",res);


    const token = String(data.access_token); // Ensure token is a string
    const expiryTime = new Date(new Date().getTime() + 10 * 60 * 60* 1000); // 30 minutes from now


    // Set the token as a cookie
    await Cookies.set('access_token', token, { expires: expiryTime, secure: true  });
    setToken(token); // Store the decoded token in global state


    console.log("Token is ", token);

    // Check if the access_token is null or an empty string
    const savedToken = Cookies.get('access_token');
    if (savedToken === 'null' || !savedToken) {
      navigate('/reset');
    } else {
        navigate('/');
       }
      
  } catch (err) {
    console.log(err);
  }
};


