import React from "react";

export const FormBase = (props) => {
  const { children, nombre, ...other } = props;
  return (
    <>
      <h2>{nombre}</h2>
      <form autoComplete="off" {...other}>
        {children}
      </form>
    </>
  );
};
