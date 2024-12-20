import React from "react";

export const Box = ({ children, minH }) => {
  return <div style={{ minHeight: minH }}>{children}</div>;
};
