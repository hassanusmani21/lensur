import React, { useState, useEffect } from "react";
import Topbar from "./components/global/TopBar";
import CustomSidebar from "./components/global/SideBar";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./theme";
import AllRoute from "./router/allRoute.js";
import { useLoader } from "./LoaderContext/LoaderContext.js";
import { setupInterceptors } from "../src/axios/axiosInstance.js";
import Loader from "./Loader/Loader.js";

const App = () => {
  const { showLoader, hideLoader } = useLoader();
  const [isSidebar, setIsSidebar] = useState(true); // Sidebar state
  const savedToken = localStorage.getItem("token"); // Token from localStorage
  const isLogin = false; // Example login state
  const resetPath = false; // Example reset path state

  // Set up Axios interceptors for loader
  useEffect(() => {
    setupInterceptors(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  // Debugging: Log state values
  console.log({ isSidebar, savedToken, resetPath });

  return (
    <ColorModeContext.Provider value={{}}>
      <ThemeProvider theme={{}}>
        <CssBaseline />
        <Loader />
        <div className="app">
          {/* Sidebar is rendered conditionally */}
          {isSidebar && savedToken && savedToken !== "null" && !resetPath && (
            <CustomSidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          )}

          <main className="content">
            {/* Topbar is always shown when not in login/reset paths */}
            {!isLogin && !resetPath && (
              <Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
            )}
            {/* Main content with routing */}
            <AllRoute isSidebar={isSidebar} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
