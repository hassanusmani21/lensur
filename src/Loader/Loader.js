import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoader } from "../LoaderContext/LoaderContext";

const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null; // Only show loader when loading is true

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
