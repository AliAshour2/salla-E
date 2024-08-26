import React from "react";
import styles from "./LayOut.module.css";
import NavBar from "./../NavBar/NavBar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
function LayOut() {
  return (
    <>
      <NavBar className="mb-5" />

      <Outlet />
      <Toaster
        position="bottom-center"
        icons={{
          success: (
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "#3afd3a" }}
            />
          ),
          error: (
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "#e91c1c" }}
            />
          ),
        }}
      />

      <Footer />
    </>
  );
}

export default LayOut;
