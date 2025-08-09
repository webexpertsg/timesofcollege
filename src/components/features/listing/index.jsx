import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { getImageURL } from "../../../utils/utils-image";

import arrowUpIcon from "/images/arrowUp.svg";
import clgSmallImg from "/images/img-dummy-sm.png";
import mapIcon from "/images/map-icon.png";
import star from "/images/star.png";
import downlaod from "/images/downloads.svg";
import compare from "/images/compare.svg";
import searchIcon from "/images/search.svg";
import arrowTilt from "/images/arrow-tilt.svg";
import studentIcon from "/images/students-icon.svg";
import emailIcon from "/images/email-icon.svg";
import phoneIcon from "/images/phone-icon.svg";
import adsImg from "/images/ads.svg";
import adsImg1 from "/images/ads/ads1.gif";
import adsImg2 from "/images/ads/ads2.gif";

import NewsAndUpdates from "./../home/newsAndUpdates";
import Filter from "../listing/filter";
import GetHelp from "../commonComps/getNotify";
import Relatedcolleges from "../college/relatedcolleges";
import Modal from "../commonComps/modal";
import Login from "../commonComps/login";

function Listing(props) {
  const { courfilter } = useParams();
  //const params = useParams();
  console.log(
    "path link-->",
    new URLSearchParams(location.search).get("courfilter")
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupEvents, setPopupEvents] = useState({
    cid: "",
    btnName: "",
    btnTitle: "",
  });
  const [collegelisting, setCollegelisting] = useState({
    cid: "",
    college_name: "",
    college_url: "",
    logo: "",
    banner: "",
    state_name: "",
    city_name: "",
    totalplacementratio: "",
    exam_name: "",
    total_courses: "",
    lowestplacementrecord: "",
    higestplacementrecord: "",
    approved_by: "",
    college_types: "",
  });
  const [filterct, setFilterct] = useState({
    col_type: "",
    college_type: "",
    total_count: "",
  });
  const [filtercourse, setFiltercourse] = useState({
    col_type: "",
    college_type: "",
    total_count: "",
  });
  const [filterstate, setFilterstate] = useState({
    sta_id: "",
    state_name: "",
  });
  const [filtercity, setFiltercity] = useState({
    cit_id: "",
    city_name: "",
  });
  useEffect(() => {
    axios
      //.get("/api/cmsdetails/" + cms_url)
      .get("/api/collegelisting/", {
        params: {
          city_url: props.city_url,
          category_url: props.category_url,
          course_url: props.course_url,
          search_parameter: props.search_parameter,
          coursefilter: new URLSearchParams(location.search).get("courfilter"),
        },
      })
      .then((response) => {
        setCollegelisting(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
    axios
      //.get("/api/cmsdetails/" + cms_url)
      .get("/api/filtercollegetypes/")
      .then((response) => {
        setFilterct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      //.get("/api/cmsdetails/" + cms_url)
      .get("/api/filtercourses/")
      .then((response) => {
        setFiltercourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/filterstate/")
      .then((response) => {
        setFilterstate(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/filtercity/")
      .then((response) => {
        setFiltercity(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //console.log("collegelisting", collegelisting.length);
  //console.log("props", props.city_url);
  const filterurl = "/listing?filter=college";
  const openModal = (event) => {
    event.stopPropagation();
    const { name, title } = event.target.dataset;
    setPopupEvents({ cid: "", btnName: name, btnTitle: title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //filter section
  var cfilterarr = [];
  const coursefilter = (e) => {
    //alert(e.target.value);
    if (e.target.value > 0) {
      cfilterarr.push(e.target.value);
    }
    console.log("cfilterarr-->", cfilterarr);
    cfilterarr
      ? (window.location = filterurl + "&courfilter=" + cfilterarr)
      : "";
  };
  // end filter section

  return (
    <>
      <section className="header"></section>
      <section className="container college-filter-wrapper">
        <section className="filter-section mt-5">
          <Filter header="Ownership Type" fdata={filterct} search={false} />
          <Filter
            header="Course"
            filtercourse={filtercourse}
            search={true}
            click={coursefilter}
          />
          <Filter header="State" filterstate={filterstate} search={true} />
          <Filter header="City" filtercity={filtercity} search={true} />

          <div className="filter-card study-type">
            <div className="header">
              <span>Study Type</span>
              <span>
                <img src={arrowUpIcon} alt="" />
              </span>
            </div>
            <ul>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Distance / Correspondence</label>
                </span>
                <span>(22)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Online</label>
                </span>
                <span>(110)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Part Time</label>
                </span>
                <span>(30)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Regular</label>
                </span>
                <span>(1100)</span>
              </li>
            </ul>
          </div>

          <div className="filter-card specialization">
            <div className="header">
              <span>Specialization</span>
              <span>
                <img src={arrowUpIcon} alt="" />
              </span>
            </div>
            <div className="search">
              <input type="text" placeholder="Search" />
              <img src={searchIcon} alt="" />
            </div>
            <ul>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Computer Science Engineering</label>
                </span>
                <span>(200)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Civil Engineering</label>
                </span>
                <span>(100)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Electrical Engineering</label>
                </span>
                <span>(350)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Electronics Engineering</label>
                </span>
                <span>(310)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Information Technology</label>
                </span>
                <span>(140)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">Robotics Engineering</label>
                </span>
                <span>(120)</span>
              </li>
            </ul>
          </div>

          <div className="filter-card exams-type">
            <div className="header">
              <span>Accepted Exams</span>
              <span>
                <img src={arrowUpIcon} alt="" />
              </span>
            </div>
            <ul>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">CBSE 12th</label>
                </span>
                <span>(42)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">CUET</label>
                </span>
                <span>(2110)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">JEE Main</label>
                </span>
                <span>(300)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">NEET</label>
                </span>
                <span>(500)</span>
              </li>
            </ul>
          </div>

          <div className="filter-card total-fees">
            <div className="header">
              <span>Total Fees</span>
              <span>
                <img src={arrowUpIcon} alt="" />
              </span>
            </div>
            <ul>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">{"< 1 Lakh"}</label>
                </span>
                <span>(1200)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">{"1 - 2 Lakh"}</label>
                </span>
                <span>(810)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">{"2 - 3 Lakh"}</label>
                </span>
                <span>(800)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">{"3 - 4 Lakh"}</label>
                </span>
                <span>(600)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">{"4 - 5 Lakh"}</label>
                </span>
                <span>(400)</span>
              </li>
              <li>
                <span>
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">{"> 5 Lakh"}</label>
                </span>
                <span>(350)</span>
              </li>
            </ul>
          </div>
        </section>
        <section className="college-list-wrapper">
          <div className="applied-filters"></div>
          {collegelisting.length > 0
            ? collegelisting.map((item, id) => (
                <a href={"./../college/" + item.college_url}>
                  <div
                    className="college-list-card"
                    id={item.cid}
                    key={item.cid}
                  >
                    <div className="title-section">
                      <div className="img-box">
                        <img
                          src={getImageURL(item.logo)}
                          alt={item.college_name}
                        />
                      </div>

                      <div className="heart"></div>
                      <div className="title-details">
                        <h2>{item.college_name}</h2>
                        <div>
                          <span className="location">
                            <img src={mapIcon} alt="" />
                            <span>
                              <a href={"./../studybycity/" + item.city_url}>
                                {item.city_name}
                              </a>
                              , {item.state_name}
                            </span>
                          </span>
                          <span className="tieup">{item.approved_by}</span>
                          <span className="owner medium">
                            {item.college_types}
                          </span>
                          { item.nirg_ranking > 0 && <span className="rank bold green"># NIRF {`(${item.nirg_ranking})`}</span>}
                          <span className="rating">
                            <img src={star} alt="" />
                            <span>
                              <b>
                                {item.total_rating
                                  ? item.total_rating.slice(0, 3)
                                  : "0"}
                              </b>
                              /10
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="other-details">
                      <div className="highlights">
                        <div>
                          <span>Accepted Exams</span>
                          <span>{item.exam_name ? item.exam_name : "NA"}</span>
                        </div>
                        <div>
                          <span>Courses Offered</span>
                          <span>
                            {item.total_courses ? item.total_courses : 0}{" "}
                            Courses
                          </span>
                        </div>
                        <div>
                          <span>Total Fees Range</span>
                          <span> 10 L - 12 L</span>
                        </div>
                        <div>
                          <span>Package Range</span>
                          <span>
                            {" "}
                            {item.lowestplacementrecord} -
                            {item.higestplacementrecord}
                          </span>
                        </div>
                        <div>
                          <span>Placement %</span>
                          <span className="green">
                            {item.totalplacementratio
                              ? item.totalplacementratio
                              : "NA"}
                          </span>
                        </div>
                      </div>
                      <div className="action-btns">
                        <div>
                          <div className="download">
                            <img src={downlaod} alt="" />
                            <span>Download Brochure</span>
                          </div>
                          <div className="compare">
                            <img src={compare} alt="" />
                            <span>Compare</span>
                          </div>
                        </div>
                        <div className="apply-btn">
                          <button>Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            : [1, 2, 3, 4, 5].map((item) => (
                <div class="mx-auto w-full rounded-md border border-[#ccc] p-4 mb-5">
                  <div class="flex animate-pulse space-x-4">
                    <div class="size-10 rounded-full bg-[#ccc]"></div>
                    <div class="flex-1 space-y-6 py-1">
                      <div class="h-2 rounded bg-[#ccc]"></div>
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                          <div class="col-span-2 h-2 rounded bg-[#ccc]"></div>
                          <div class="col-span-1 h-2 rounded bg-[#ccc]"></div>
                        </div>
                        <div class="h-2 rounded bg-[#ccc]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </section>

        <div className="others">
          <GetHelp
            heading={"Let Us Help You"}
            openModal={openModal}
            headingClass={"headingSeaGreen"}
          />

          <div className="ads">
            <a href="https://timesofcollege.com/college/jaipuria-school-of-business-ghaziabad">
              <img src={adsImg1} alt="JAIPURIA" />
            </a>
          </div>
          <div className="ads">
            <a href="https://timesofcollege.com/college/bimtech-greater-noida">
              <img src={adsImg2} alt="BIMTECH" />
            </a>
          </div>
        </div>
      </section>

      <NewsAndUpdates />

      <section className="container admissions">
        <div className="head-line">Admission 2024</div>
        <div className="admission-links-list">
          <div className="chips-link">
            <span>JEE Mains Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>CUET Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>MBA Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>LLB Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>B.Sc Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>MBBS Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>PhD Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>B Ed Admission 2024</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
        </div>
      </section>
      <section className="container trending">
        <div className="head-line">Trending</div>
        <div className="admission-links-list">
          <div className="chips-link">
            <span>JEE Mains</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>CUET</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>MBBS</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>AKTU Results 2023</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>IMT Ghaziabad</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>Amity University Noida</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>IIMT Engg. Collage Meerut</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>BITS Pilani</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>B.Tech</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
          <div className="chips-link">
            <span>GATE</span>
            <span>
              <img src={arrowTilt} alt="" />
            </span>
          </div>
        </div>
      </section>

      <section className="container get-notify">
        <div className="head-line"> Get Notify About Your Choices</div>
        <form action="">
          <div className="get-notify-container">
            <div className="form-element">
              <span>
                <img src={studentIcon} alt="" />
              </span>
              <select name="course-list" id="">
                <option value="-Select-">Choose courses</option>
                <option value="option">Option</option>
              </select>
            </div>
            <div className="form-element">
              <span>
                <img src={emailIcon} alt="" />
              </span>
              <input type="text" name="" id="" placeholder="Enter your email" />
            </div>
            <div className="form-element">
              <span>
                <img src={phoneIcon} alt="" />
              </span>
              <input type="text" name="" id="" placeholder="Enter your phone" />
            </div>
            <button type="button">Submit</button>
          </div>
        </form>
      </section>

      <Modal isModalOpen={isModalOpen} onClose={closeModal}>
        <Login heading={"Get Notify !"} data={popupEvents} />
      </Modal>
    </>
  );
}

Listing.propTypes = {};

export default Listing;
