import React from "react";
import { Bounce, Flip, ToastContainer } from "react-toastify";
import "./Toster.css";

const Toster = () => {
  return (
    <div>
      <ToastContainer
        bodyClassName="toast-container"
        position="top-right"
        autoClose={1700}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        transition={Flip}
      />
    </div>
  );
};

export default Toster;
