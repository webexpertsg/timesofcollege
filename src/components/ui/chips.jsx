import React from "react";
import arrowTilt from "/images/arrow-tilt.svg";

const Chips = ({ text, url }) => {

 return (
    <div className="chips-link">
    <span>{text}</span>
    <span>
        <img src={arrowTilt} alt="" />
    </span>
    </div>
 );
};

export default Chips;