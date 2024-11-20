import {React,useState,useRef,useContext, useEffect} from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ColorModeContext } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/AuthContext";
import GroupIcon from '@mui/icons-material/Group';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



const CustomSidebar = ({isSidebar,setIsSidebar}) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const colorMode = useContext(ColorModeContext);
      const backgroundColor = colorMode === "dark" ? colors.primary[900] : theme.palette.background.default;
      const sidebarRef = useRef(null);
      const {logout, authState} = useAuth();
      const navigate = useNavigate();
    
      const [activeSubMenu, setActiveSubMenu] = useState("");
      const [activeItemMenu, setActiveItemMenu] = useState("");

      
      useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
        return () => {
          document.body.style.backgroundColor = ''; // Reset background color when component unmounts
        };
      }, [backgroundColor]);
    
    

    
      const getSubMenuStyle = (menuName) => ({
        backgroundColor: activeSubMenu === menuName ? 'rgb(3, 201, 215)' : 'transparent',
        color: activeSubMenu === menuName ? 'white' : 'rgba(0, 0, 0, 0.87)',
        borderRadius: '8px',
        margin: '4px 16px',
        fontSize:'0.8rem',
        padding:"6px",
        lineHeight:'1.5',
        fontWeight:'400',
        fontFamily:'DM Sans, sans-serif'
      });
    
      const getMenuItemStyle = (menuName) => ({
        color: activeItemMenu === menuName ? 'rgb(3, 201, 215)' : 'rgba(0, 0, 0, 0.87)',
        margin: '4px 18px',
        borderRadius: '6px',
        fontFamily:'DM Sans, sans-serif',
      });

      
    
      const handleSubMenuClick = (menuName) => {
        console.log(`SubMenu ${menuName} clicked`);
        // setActiveSubMenu(menuName);
        if (activeSubMenu === menuName) {
          setActiveSubMenu(""); // Close the currently active submenu
        } else {
          setActiveSubMenu(menuName); // Open the clicked submenu and close others
        }
      };


      const userLogout = () => {
            logout();
            navigate('/login'); // Redirect to login page after logout

      };


      console.log("authstate is ",authState)

  return (
    <Box
      ref={sidebarRef}
      id="sidebar"
      height="80vh"
      className="sidebarBox"
      pr={2}
    >
      
      <div className="sideBarContent">
        <Sidebar
          id="custom-sidebar"
          collapsed={isSidebar}>
          <Menu iconShape="square">
            {!isSidebar && (
              <Box mb="25px">

                <Box textAlign="center" mt={2}>
                {/* <Typography sx={{ fontSize: '0.7rem' }} color="textSecondary">
                    Created By
                </Typography> */}
                  {/* <Typography variant="h6" color="textSecondary" fontWeight="bold">
                    Menu Bar
                  </Typography> */}
                </Box>
              </Box>
            )}
            
            <Box pl={isSidebar ? 0 : 3}>
              <Menu>
                {authState?.designation?.designationName === 'ADMIN' && (
               <SubMenu label={<Typography variant="body1">Users</Typography>} style={getSubMenuStyle("Users")} onClick={() => handleSubMenuClick("Users")} icon={<AccountCircleOutlinedIcon />}>
                  <Link to="/CreateUser" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Users")} onClick={() => setActiveItemMenu("Users")}
                    >
                      New
                    </MenuItem>
                    </Link>

                  <Link to="/user" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("editUser")} onClick={() => setActiveItemMenu("editUser")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                 ) } 



                <SubMenu label={<Typography variant="body1">Customer</Typography>} 
                style={getSubMenuStyle("Customer")} onClick={() => handleSubMenuClick("Customer")} icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users "><g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></g></svg>}>
                  <Link to="/Customer" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Customer")} onClick={() => setActiveItemMenu("Customer")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  <Link to="/editCustomer" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("Customer Edit")} onClick={() => setActiveItemMenu("Customer Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                <SubMenu label={<Typography variant="body1">Sales Inquiry</Typography>} style={getSubMenuStyle("Sales")} onClick={() => handleSubMenuClick("Sales")} icon={<LocalPhoneOutlinedIcon />}>
                  <Link to="/SalesInquiry" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Sales Inquiry Create")} onClick={() => setActiveItemMenu("Sales Inquiry Create")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  <Link to="/editSales" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("Sales Inquiry Edit")} onClick={() => setActiveItemMenu("Sales Inquiry Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                <SubMenu label="Drawing Requisition" style={getSubMenuStyle("Drawing")} 
                onClick={() => handleSubMenuClick("Drawing")} icon={<DescriptionOutlinedIcon />}>
                  <Link to='/createPump' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Pump Seal Create")} onClick={() => setActiveItemMenu("Pump Seal Create")}
                    >
                      Create PumpSeal
                    </MenuItem>
                  </Link>
                  <Link to='/editPump' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("Pump Seal Edit")} onClick={() => setActiveItemMenu("Pump Seal Edit")}
                    >
                      Edit Pump Seal
                    </MenuItem>
                  </Link>
                  <Link to='/createRotary' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Rotary Create")} onClick={() => setActiveItemMenu("Rotary Create")}
                    >
                      Create Rotary Join
                    </MenuItem>
                  </Link>
                  <Link to='/editRotary' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("Rotary Edit")} onClick={() => setActiveItemMenu("Rotary Edit")}
                    >
                      Edit Rotary Join
                    </MenuItem>
                  </Link>
                  <Link to='/createApi' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Create Api")} onClick={() => setActiveItemMenu("Create Api")}
                    >
                      Create API Plan
                    </MenuItem>
                  </Link>
                  <Link to='/editApi' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("Edit Api")} onClick={() => setActiveItemMenu("Edit Api")}
                    >
                      Edit API Plan
                    </MenuItem>
                  </Link>
                  <Link to="/createAgitator" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("Create Agitator")} onClick={() => setActiveItemMenu("Create Agitator")}
                    >
                      Create Agitator Seal
                    </MenuItem>
                  </Link>
                  <Link to="/editAgitator" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("Edit Agitator")} onClick={() => setActiveItemMenu("Edit Agitator")}
                    >
                      Edit Agitator Seal
                    </MenuItem>
                  </Link>
                </SubMenu>

                <SubMenu label={<Typography variant="body1">Quotation</Typography>} 
          style={getSubMenuStyle("qtn")} onClick={() => handleSubMenuClick("qtn")} icon={<MonetizationOnOutlinedIcon />}>
                  <Link to="/quotation" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("quotation")} onClick={() => setActiveItemMenu("quotation")}
                    >
                      New
                    </MenuItem>
                  </Link>
                 
                </SubMenu>


                <SubMenu label={<Typography variant="body1">OFM</Typography>} style={getSubMenuStyle("ofm")} onClick={() => handleSubMenuClick("ofm")} icon={<BusinessCenterOutlinedIcon />}>
                  <Link to="/createOfm" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("ofm")} onClick={() => setActiveItemMenu("ofm")}
                    >
                      New
                    </MenuItem>
                  </Link>
                  <Link to="/editOfm" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list "><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg>}
                      style={getMenuItemStyle("ofm Edit")} onClick={() => setActiveItemMenu("ofm Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>

                <SubMenu label={<Typography variant="body1">OFM Communication</Typography>} style={getSubMenuStyle("ofmcomm")} onClick={() => handleSubMenuClick("ofmcomm")} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square "><g><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></g></svg>}>
                  <Link to="/ofmComm" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit "><g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></g></svg>}
                      style={getMenuItemStyle("ofmComs")} onClick={() => setActiveItemMenu("ofmComs")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  </SubMenu>


                <SubMenu label="Logout" className="logoutBtn"  onClick={userLogout} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out "><g><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></g></svg>}></SubMenu>
              </Menu>
            </Box>
          </Menu>
        </Sidebar>
      </div>
    </Box>
  );
};

export default CustomSidebar;

