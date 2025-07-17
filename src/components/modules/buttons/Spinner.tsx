import React from "react";
import "./Spinner.css";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`spinner h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent ${className} `}
    />
  );
};

export default Spinner;
