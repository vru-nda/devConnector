import React from "react";
import {Outlet} from "react-router-dom";
import Alert from "./Alert";

const Container = () => {
  return (
    <div className='container'>
      <Alert />

      <Outlet />
    </div>
  );
};

export default Container;
