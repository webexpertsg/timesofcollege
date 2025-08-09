"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import NavLink from "@/components/ui/navlink";

// import ScrollToTop from "react-scroll-to-top";

// import emailIcon from "/images/email-icon.svg";
// import phoneIcon from "/images/phone-icon.svg";
// import fbIcon from "/images/fb.svg";
// import instaIcon from "/images/insta.svg";
// import xIcon from "/images/x.svg";
// import inIcon from "/images/linkdin.svg";
// import youtubeIcon from "/images/linkdin.svg";
import axios from "axios";

function Footer(props) {
  const [adsdisplist, setAdsdisplistlist] = useState([]);
  
  useEffect(() => {
    axios
      .get("/api/ads/")
      .then((response) => {
        setAdsdisplistlist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="website-wrapper">
        <footer className="footer">
          <div className="footer-menu">
            <nav>
              <ul>
                <li>
                  <NavLink
                    href={`/cms/about-us`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href={`/`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href={`/`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    Help
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href={`/`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    Careers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href={`/cms/privacy-policy`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <Link
                    href={`/cms/terms-conditions`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/sitemap`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-lists">
            <div className="footer-links">
              <h3>Top Links</h3>
              <ul>
                <li>
                  <Link
                    href={`/categorywise/engineering-colleges`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>Top Engineering Colleges</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/categorywise/medical-colleges`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>Top Medical Colleges</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/categorywise/management1`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>Top Management Colleges</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/categorywise/law`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>Top Low Colleges</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/categorywise/commerce`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>Top Commerce Colleges</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Top Courses</h3>
              <ul>
                <li>
                  <Link
                    href={`/course/bebtech`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>B.Tech/BE</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/course/mba-pgdm`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>MBA/PGDM</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/course/mca`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>MCA</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/course/bca`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>BCA</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/course/bsc`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    <span>B.Sc</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Top Exams</h3>
              <ul>
                <li>
                  <span>GATE 2025</span>
                </li>
                <li>
                  <span>JEE-MAIN 2025</span>
                </li>
                <li>
                  <span>CAT 2025</span>
                </li>
                <li>
                  <span>NEET 2025</span>
                </li>
                <li>
                  <span>XAT 2025</span>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Latest Updates</h3>
              <ul>
                <li>
                  <span>GATE Admit Card 2025</span>
                </li>
                <li>
                  <span>NEET Application Form 2025</span>
                </li>
                <li>
                  <span>CTET Admit Card 2025</span>
                </li>
                <li>
                  <span>CUET Application Form 2025</span>
                </li>
                <li>
                  <span>UGC NET Result 2024</span>
                </li>
              </ul>
            </div>
            <div className="footer-contact">
              <div className="social-media-links">
                <span>
                  <a
                    href="https://m.facebook.com/timesofcollege/"
                    target="_blank"
                  >
                    {/* <img src={fbIcon} alt="" /> */}
                  </a>
                </span>
                <span>
                  {/* <img src={instaIcon} alt="" /> */}
                </span>
                <span>
                  {/* <img src={xIcon} alt="" /> */}
                </span>
                <span>
                  {/* <img src={inIcon} alt="" /> */}
                </span>
                <span>
                  <a
                    href="https://www.youtube.com/@timesofcollege"
                    target="_blank"
                  >
                    {/* <img src={youtubeIcon} alt="" /> */}
                  </a>
                </span>
              </div>
              <p>
                Times of College 91st Floor, Ruparel Niwas, Valuiladha Road,
                Near Hera Mongi Hospital,Mulund West, Mumbai- 400080
              </p>
              <div className="contact">
                {/* <img src={phoneIcon} alt="" fill="red" /> */}
                <span>+91-9266424348</span>
              </div>
              <div className="contact">
                {/* <img src={emailIcon} alt="" fill="red" /> */}
                <span>info@timesofcollege.com</span>
              </div>
            </div>
          </div>
          <div className="copy-right">
            Trade Marks belong to the respective owners. Copyright &copy;{" "}
            {new Date().getFullYear()} TimesTek Edge Pvt. Ltd. All rights
            reserved.
          </div>
        </footer>
        {/* <ScrollToTop smooth color="#6f00ff" /> */}
      </div>
    </>
  );
}
export default Footer;
