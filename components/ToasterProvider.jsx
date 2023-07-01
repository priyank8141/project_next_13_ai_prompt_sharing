"use client";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
