import React from "react";

const Heading1 = ({ children, ...props }) => {
  return <h5 {...props}>{children}</h5>;
};

export default Heading1;
