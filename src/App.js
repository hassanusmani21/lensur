import { useState } from "react";
import Topbar from "./components/global/TopBar";
import CustomSidebar from "./components/global/SideBar";
import './App.css'                                                                              
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AllRoute from './router/allRoute.js'
import { useEffect } from "react";
import { useAuth } from "./contextApi/AuthContext.js";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "./contextApi/useToken.js";
import Cookies from "js-cookie";






function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const resetPath = location.pathname === '/reset';
  const savedToken = Cookies.get('access_token');
  

  const navigate = useNavigate();
  const token = useToken();

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }

  },[])





  console.log("isSidebar is ",isSidebar)

  return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
        {!isSidebar&&(savedToken!=='null' && savedToken)&&!resetPath&&<CustomSidebar  isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}
      {(isLogin===false&&resetPath==false)?(<Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />):null }
          <AllRoute  isSidebar={isSidebar}/> 
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;

