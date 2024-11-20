import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App.css'; // Import the CSS file
import Customer from '../Pages/customerPage/createCustomer/Customer.js';
import EditCustomer from "../Pages/customerPage/editCustomer/EditCustomer.js";
import RegistrationSuccessPage from "../Pages/customerPage/createCustomer/CustomerSuccess.js";
import UpdateSuccessPage from "../Pages/customerPage/editCustomer/UpdateSuccess.js";
import CreateSales from "../Pages/salesinquiryPage/CreateSales.js";
import SalesSuccessPage from "../Pages/salesinquiryPage/SalesSuccess.js";
import EditSales from "../Pages/salesinquiryPage/EditSales.js";
import CreatePumpSeal from "../Pages/pumpSeal/CreatePumpSeal.js";
import PumpSealSuccessPage from "../Pages/pumpSeal/PumpSealSuccess.js";
import EditPump from "../Pages/pumpSeal/EditPumpSeal.js";
import CreateRotatory from "../Pages/rotatoryJoint/CreateRotatory.js";
import RotarySuccessPage from "../Pages/rotatoryJoint/RotarySuccess.js";
import EditRotary from "../Pages/rotatoryJoint/EditRotryJoint.js";
import CreateApi from "../Pages/apiPlan/CreateApiPlan.js";
import EditApi from "../Pages/apiPlan/EditApiPlan.js";
import ApiSuccessPage from "../Pages/apiPlan/ApiSuccess.js";
import AgitatorSeal from '../Pages/agitator/CreateAgitator';
import AgitatorSuccessPage from '../Pages/agitator/AgitatorSuccess';
import EditAgitator from '../Pages/agitator/EditAgitator';
import CreateUser from '../Pages/User/CreateUser.js';
import Login from '../Pages/login/Login.js';
import ResetPassword from '../Pages/resetPassword/ResetPassword.js';
import UserDashboard from '../Pages/User/UserDashboard.js';
import {useLocation} from 'react-router-dom';
import CreateQuotation from '../Pages/Quotation/CreateQuotation.js';
import QuotationSuccess from '../Pages/Quotation/QuotationSuceess.js';
import CreateOfm from '../Pages/ofm/CreateOfm.js';
import EditOfm from '../Pages/ofm/EditOfm.js';
import OfmSuccess from '../Pages/ofm/OfmSuccess.js';
import OfmCommunication from '../Pages/ofmCommunication/OfmCommunication.js';
import UpdatePassword from '../Pages/resetPassword/UpdateReset.js';



const AllRoute = ({isSidebar}) => {

  const location = useLocation();

  const isLogin = location.pathname === '/login';
  const reset = location.pathname === '/reset';


  const sidebarOpenStyle = {
    width: "86%", // Sidebar open, adjust width
    position: "absolute",
    right: '-5em',
    marginTop: "5.4rem",
    overflow:"hidden",

  };


  const sidebarClosedStyle = {
    width: "100%", // Sidebar closed, full width
    position: "absolute",
    right: 0,
    marginTop: "4.5rem",
  };

  
  return (
    <div style={!isSidebar&&!isLogin&&!reset ? sidebarOpenStyle : sidebarClosedStyle}>

    <Routes>
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/createAgitator" element={<AgitatorSeal />} />
          <Route path="/editAgitator" element={<EditAgitator />} />
          <Route path="/createAgitator/:aId" element={<AgitatorSeal />} />
          <Route path="/agitatorSuccess/:id" element={<AgitatorSuccessPage />} />
          <Route path="/SalesInquiry" element={<CreateSales />} />
          <Route path="/createRotary" element={<CreateRotatory />} />
          <Route path="/createRotary/:rjId" element={<CreateRotatory />} />
          <Route path="/editApi" element={<EditApi />} />
          <Route path="/createApi" element={<CreateApi />} />
          <Route path="/apiSuccess/:id" element={<ApiSuccessPage />} />
          <Route path="/createApi/:apId" element={<CreateApi />} />
          <Route path="/rotarySuccess/:id" element={<RotarySuccessPage />} />
          <Route path="/createPump" element={<CreatePumpSeal />} />
          <Route path="/createPump/:pId" element={<CreatePumpSeal />} />
          <Route path="/editPump" element={<EditPump />} />
          <Route path="/editRotary" element={<EditRotary />} />
          <Route path="/pumpSealSuccess/:id" element={<PumpSealSuccessPage />} />
          <Route path="/editSales" element={<EditSales />} />
          <Route path="/SalesInquiry/:sId" element={<CreateSales />} />
          <Route path="/Customer/:rId" element={<Customer />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/editCustomer" element={<EditCustomer />} />
          <Route path="/registerSuccess/:id" element={<RegistrationSuccessPage />} />
          <Route path="/salesSuccess/:sId" element={<SalesSuccessPage />} />
          <Route path="/updateSuccess/:id" element={<UpdateSuccessPage />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/CreateUser/:uId" element={<CreateUser />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quotation" element={<CreateQuotation />} />
          <Route path="/createOfm" element={<CreateOfm />} />
          <Route path="/createOfm/:oId" element={<CreateOfm />} />
          <Route path="/ofmSuccess" element={<OfmSuccess />} />
          <Route path="/editOfm" element={<EditOfm />} />
          <Route path="/quotationSuccess" element={<QuotationSuccess />} />
          <Route path="/ofmComm" element={<OfmCommunication />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
      
    </Routes>
  </div>

  );
};

export default AllRoute;
