// Implement Header to display file name and date/time

import React from "react";

const Header = ({ fileName }) => {
  const currentDateTime = new Date().toLocaleString();
  //   format date to include only date and time in HH::MM AM/PM
  const formattedDateTime = new Date(currentDateTime).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div className="header" style={headerStyle}>
      <p>{fileName}</p>
      <p>{formattedDateTime}</p>
    </div>
  );
};

export default Header;
