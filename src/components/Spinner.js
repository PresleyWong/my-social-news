import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center m-2">
      <div
        className="text-blue-600 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
