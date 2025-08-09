import React, { useState, useEffect } from "react";

import studentIcon from "../../../public/images/students-icon.svg";
import emailIcon from "../../../public/images/email-icon.svg";
import phoneIcon from "../../../public/images/phone-icon.svg";
import mapIcon from "../../../public/images/map-icon.png";

function GetHelp(props) {
  const { heading, headingClass, openModal } = props;

  return (
    <>
      <section className="container get-help">
        <div className={`head-line ${headingClass}`}>{heading}</div>
        <form action="">
          <div className="get-help-container">
            <div className="form-element">
              <span>
                <img src={studentIcon} alt="" />
              </span>
              <input type="text" name="" id="" placeholder="Enter Your Name" />
            </div>
            <div className="form-element">
              <span>
                <img src={emailIcon} alt="" />
              </span>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Your Email"
              />
            </div>
            <div className="form-element">
              <span>
                <img src={phoneIcon} alt="" />
              </span>
              <input type="text" name="" id="" placeholder="Enter Your Phone" />
            </div>
            <div className="form-element">
              <span>
                <img src={mapIcon} alt="" />
              </span>
              <input type="text" name="" id="" placeholder="Enter Your City" />
            </div>
            <div className="form-element">
              <span>
                <img src={studentIcon} alt="" />
              </span>
              <select name="course-list" id="">
                <option value="-Select-">Choose courses</option>
                <option value="option">Option</option>
              </select>
            </div>
            <button type="button" onClick={openModal}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default GetHelp;
