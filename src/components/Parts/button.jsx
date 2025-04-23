import React from "react";

export const Button = ({ children, variant = "solid", ...props }) => {
  const base = "px-4 py-2 rounded-md text-sm font-medium";
  const styles = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-500 text-blue-600 hover:bg-blue-50",
  };
  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
