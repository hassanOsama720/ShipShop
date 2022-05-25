import React from "react";
import { NavLink } from "react-router-dom";

const NoInternet = () => {
  return (
    <>
    <div style={{fontFamily: "sansSerif",
        color: "red",
        textAlign: "center",
        fontSize: "150%"}}>
    <h1>⚠</h1>
    <h2>No connection to the internet</h2>
    <p>This Display has a connection to your network but no connection to the internet.</p>
    <p className="desc">The connection to the outside world is needed for updates and keeping the time.</p>
    </div>
    </>

  );
};

export default NoInternet;
