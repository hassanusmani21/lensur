import { Box, Button, IconButton, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate } from "react-router-dom";
import { alpha } from '@mui/material/styles';
import { useAuth } from '../../contextApi/AuthContext';
import useToken from "../../contextApi/useToken";
import Logo from '../../assets/Picture1.svg';



const Topbar = ({ isSidebar, setIsSidebar }) => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const token = useToken();

  console.log("authState is ",authState);


  const iconStyle = { 
    width: "1.6em",
    height: "100%",
    color: '#5A5A5A',
    position: "sticky",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  };



 

  
  return (
    <Box 
      display="flex" 
      justifyContent="space-between"
      position="fixed"
      top="0"
      zIndex="100"
      backgroundColor="white"
      p={2} 
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        width: "100%"
      }}
    >
      
     {token&&<>
      {isSidebar ? 
        <MenuIcon onClick={() => setIsSidebar(!isSidebar)} sx={iconStyle} />
        : 
        <KeyboardBackspaceIcon onClick={() => setIsSidebar(!isSidebar)} sx={iconStyle} />
      }
      </>}
      

        <img src={Logo} className="logoImg" alt="Logo" />

        <span className="logoName" >Leak-Proof</span><span>®</span>


      {/* ICONS */}
      <Box display="flex"  justifyContent='flex-end' alignItems="center"  sx={{ ml: "auto" }}>
    
        <IconButton>
          <PersonOutlinedIcon />
          {authState ? 
            <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              Welcome, <b>{authState.sub}</b>
            </span> 
            : null}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

