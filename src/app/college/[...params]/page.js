"use client"

import React, { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from 'next/image';

import axios from "axios";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import arrowTilt from "../../../../public/images/arrow-tilt.svg";
import downlaod from "../../../../public/images/downloads.svg";
import mapIcon from "../../../../public/images/map-icon.png";
import compare from "../../../../public/images/compare.svg";
import adsImg1 from "../../../../public/images/ads/ads1.gif";
import adsImg2 from "../../../../public/images/ads/ads2.gif";
import star from "../../../../public/images/star.png";

import Tabs from "@/components/features/collegeDetails/header";

import CollegeOverview from "@/components/features/collegeDetails/overview";
import CollegeCoursesFees from "@/components/features/collegeDetails/coursesAndFees";
import CollegeAdmissions from "@/components/features/collegeDetails/admissions";
import CollegePlacements from "@/components/features/collegeDetails/placements";
import CollegeScholarships from "@/components/features/collegeDetails/scholarships";
import CollegeFaculties from "@/components/features/collegeDetails/faculties";
import CollegeGallery from "@/components/features/collegeDetails/gallery";
import CollegeReviews from "@/components/features/collegeDetails/reviews";
import CollegeNews from "@/components/features/collegeDetails/news";
import CollegeQuesAns from "@/components/features/collegeDetails/questionAnswer";

import Address from "@/components/ui/address";
// import Relatednews from "@/components/features/college/relatednews";
// import GetHelp from "@/components/ui/getNotify";
import Login from "@/components/ui/login";
import Modal from "@/components/ui/modal";

function CollegeDetails(props) {
  // const router = useRouter();
  // const { params } = router.query;
  
  
  const [nameUrl, setNameUrl] = useState("");
  const [tabName, setTabName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [modalContent, setModalContent] = useState("");
  const [subcoursestypearr, setSubcoursestypearr] = useState([]);
  const [subcoursearr, setSubcoursearr] = useState([]);
  const [popupEvents, setPopupEvents] = useState({
    cid: "",
    btnName: "",
    btnTitle: ""
  });
  const pathname = usePathname();
  // const { college_url } = useParams();
  const collegeKey = pathname.split('/college/')[1]?.split('/'); 
  // console.log('collegeKey======>', collegeKey[0]);

  // console.log('params======>', router);
  // console.log('college_url======>', pathname, college_url);
  
  //const topCourselinks = ""

  const [displaycollegdetail, setDisplaycollegdetail] = useState({
    cid: "",
    college_name: "",
    college_description: "",
    courses: "",
  });

  const [collegetitleappend, setCollegetitleappend] = useState("");
  //const setAlltopcourse = "";
  useEffect(() => {
    const updatecollegeviews = (cid) => {
      axios({
        method: "post",
        url: "/api/updatecollegeviews",
        data: { cid: cid },
      });
    };
    //  displaycollegdetail.cid && updatecollegeviews(displaycollegdetail.cid);
  }, [displaycollegdetail]);

  useEffect(() => {

    const detailsUrl = pathname.split("+")[0];
    const detailsTabs = pathname.split("+")[1];

    // const detailsUrl = pathname;
    // const detailsTabs = pathname;
    
    setNameUrl(detailsUrl);
    setTabName(detailsTabs);
    
  }, [pathname]);
  // console.log('detailsUrl=-=--=->', collegeKey[0]);
  
  useEffect(() => {
    axios
      .get(`/api/college/${collegeKey[0]}`, {  headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // no-cache requires revalidation, no-store prevents caching
        'Pragma': 'no-cache', // For backward compatibility with HTTP/1.0
        'Expires': '0' // Forces the browser to treat the response as expired
      }})
      .then((response) => {
        setIsLoader(false)
        setDisplaycollegdetail(response.data[0])
      })
      .catch((error) => {
        console.error(error);
      });
      
    //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
    axios
      .get("/api/college/getsubcoursestypecollegelist")
      .then((response) => {
        const returnResponse = {}
        response.data.forEach((repo) => {
          returnResponse[repo.coursetype_id] = repo.course_type_name;
        })
        setSubcoursestypearr(returnResponse)
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/college/getsubcoursecollegelist")
      .then((response) => {
        const returnResponse = {}
        response.data.forEach((repo) => {
          returnResponse[repo.courb_id] = repo.branch_name;
        })
        setSubcoursearr(returnResponse)
      })
      .catch((error) => {
        console.error(error);
      });

    // axios
    //   .get("/api/college/getsubcoursecollegearr")
    //   .then((response) => {
    //     setSubcoursearr(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    axios
      .get("/api/college/getcollegetitleappend")
      .then((response) => {
        setCollegetitleappend(response.data[0]["college_title_append"]);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [nameUrl]);

  const openModal = (event) => {
    event.stopPropagation();
    const { name, title } = event.target.dataset;
    setPopupEvents({
      cid: displaycollegdetail.cid,
      btnName: name,
      btnTitle: title,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //var courlink = "";
  const display_top_course = (topcourses) => {
    let links = [];
    if (topcourses) {
      const courarrs = topcourses.split(", ");
      courarrs.map((cor, c) => {
        //  console.log("coursse****", cor);
        if (c < 3) {
          links.push(
            <div key={`top-courses-${c}`}>
              <p>
                <b>
                  <a href={"../course/" + cor.split("~")[0]}>
                    {cor.split("~")[1]}
                  </a>
                </b>
              </p>
            </div>
          );
        }
      });
    }
    //return <div>{links}</div>;
    return (
      <ul className="phCards">
        <hr style={{ color: "#32325d40", margin: "15px" }} />
        <li>
          <div>
            <h2 className="headingSeaGreen font-bold pb-1 text-2xl text-center mb-2">
              Top Courses
            </h2>
          </div>
          {links}
        </li>
      </ul>
    );
  };


  // console.log('displaycollegdetail--------', displaycollegdetail);
  
  return (
    <>
      <section
        className="detailsBanner"
        style={{
          // backgroundImage: `url(${getImageURL(displaycollegdetail.banner ? displaycollegdetail.banner : "")})`,
        }}
      >
        {/* {console.log('subcoursearr======>', subcoursearr)} */}
        <div className="bgColor">
          <div className="container detaisHead">
            <div className="image">
              {/* <img
                src={getImageURL(displaycollegdetail.logo)}
                alt="college logo"
              /> */}
              {/* <Image 
                src={getImageURL(displaycollegdetail.logo)}
                alt="college logo"
              /> */}
            </div>
            <div className="title">
              <h1>
                {(tabName === "overview" || tabName == '' || tabName == undefined) &&
                  collegetitleappend &&
                  `${displaycollegdetail.college_name + collegetitleappend}`}

                {tabName === "courses-and-fees" &&
                  `${displaycollegdetail.college_name} : Courses, Fees, Intake & Eligibility 2025`}

                {tabName === "admissions" &&
                  `${displaycollegdetail.college_name} : Admissions, Fees, Eligibility, Dates, Cut off & Selection Process`}
                {tabName === "placements" &&
                  `${displaycollegdetail.college_name} : Highest Placement ` +
                    displaycollegdetail.higestplacementrecord +
                    ", Average Placement " +
                    displaycollegdetail.averageplacementrecord +
                    ", Lowest Placement"}
                {tabName === "scholarships" &&
                  `${displaycollegdetail.college_name} : Types of Scholarship Details`}
                {tabName === "faculties" &&
                  `${displaycollegdetail.college_name} : Faculty Profile Details & Reviews`}
                {tabName === "gallery" &&
                  `${displaycollegdetail.college_name} : Campus Photo & Video`}
                {tabName === "reviews" &&
                  `${displaycollegdetail.college_name} : Reviews of Placements, Faculty & Details`}
                {tabName === "news" &&
                  `${displaycollegdetail.college_name} : New like Events & Activity`}
                {tabName === "question-answer" &&
                  `${displaycollegdetail.college_name} : Questions & Answered`}
              </h1>
            </div>
          </div>
          <div className="container otherInfo">
            <ul className="rankInfo">
              <li>
                <span className="location">
                  <Image 
                    src={mapIcon}
                    alt=""
                  />
                  <span>
                    {displaycollegdetail.city_name},{" "}
                    {displaycollegdetail.state_name}
                  </span>
                </span>
              </li>
              <li>
                <span className="location">
                  <span>{displaycollegdetail.approved_by}</span>
                </span>
              </li>
              <li>
                <span className="clg-rating">
                  <Image 
                    src={star}
                    alt=""
                  />                  
                  <span>
                    <b>
                      {displaycollegdetail.total_rating
                        ? displaycollegdetail.total_rating.slice(0, 3)
                        : "0"}
                    </b>{" "}
                    /10
                  </span>
                </span>
              </li>
              {displaycollegdetail.nirg_ranking > 0 && 
              <li>
                <span className="nirfRank">
                  <b>#NIRF </b>
                  <span>{displaycollegdetail.nirg_ranking}</span>
                </span>
              </li>
              }
            </ul>
            <ul className="historyInfo">
              <li>
                <span className="location">
                  <span>{displaycollegdetail.college_types}</span>
                </span>
              </li>
              <li>
                <span className="location">
                  <span>Est. {displaycollegdetail.found_year}</span>
                </span>
              </li>
            </ul>
            <div
              className="apply-link"
              data-name="Apply"
              data-title="Header Apply"
              onClick={(e) => openModal(e)}
            >
              <span>Apply</span>
              <span>
                <img src={arrowTilt} alt="" />
              </span>
            </div>
            <div className="action-btns">
              <div
                className="download"
                data-name="Download Brochure"
                data-title="Header Download Brochure"
                onClick={(e) => openModal(e)}
              >
                <img src={downlaod} alt="" />
                <span>{"Download Brochure"}</span>
              </div>
              <div
                className="compare"
                data-name="Compare Colleges"
                data-title="Header Compare Colleges"
                onClick={(e) => openModal(e)}
              >
                <img src={compare} alt="" />
                <span>{"Compare Colleges"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tabs tabName={tabName} collageUrl={nameUrl} />

      <section className="container detailsWrapper">
        <div className="contentWrapper">
          {isLoader 
          ? 
          <>
            <div className="mx-auto w-full rounded-md border border-[#ccc] p-4 mb-5">
              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-[#ccc]"></div>
                  <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-[#ccc]"></div>
                      <div className="col-span-1 h-2 rounded bg-[#ccc]"></div>
                    </div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                  </div>
                  <div className="space-y-12">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-[#ccc]"></div>
                      <div className="col-span-1 h-2 rounded bg-[#ccc]"></div>
                    </div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                  </div>
                  <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-[#ccc]"></div>
                      <div className="col-span-1 h-2 rounded bg-[#ccc]"></div>
                    </div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                  </div>
                  <div className="space-y-12">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-[#ccc]"></div>
                      <div className="col-span-1 h-2 rounded bg-[#ccc]"></div>
                    </div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                    <div className="h-2 rounded bg-[#ccc]"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :   
          <>
          {(tabName === "overview" || tabName == '' || tabName == undefined) && (
            <CollegeOverview
              data={displaycollegdetail}
              courses={subcoursearr}
              openModal={openModal}
            />
          )}
          {tabName === "courses-and-fees" && (
            <CollegeCoursesFees
              data={displaycollegdetail}
              courses={subcoursearr}
              openModal={openModal}
            />
          )}
          {tabName === "admissions" && (
            <CollegeAdmissions
              data={displaycollegdetail}
              openModal={openModal}
            />
          )}
          {tabName === "placements" && (
            <CollegePlacements
              data={displaycollegdetail}
              openModal={openModal}
            />
          )}
          {tabName === "scholarships" && (
            <CollegeScholarships
              data={displaycollegdetail}
              openModal={openModal}
            />
          )}
          {tabName === "faculties" && (
            <CollegeFaculties
              data={displaycollegdetail}
              openModal={openModal}
            />
          )}
          {tabName === "gallery" && (
            <CollegeGallery data={displaycollegdetail} openModal={openModal} />
          )}
          {tabName === "reviews" && (
            <CollegeReviews data={displaycollegdetail} openModal={openModal} />
          )}
          {tabName === "news" && (
            <CollegeNews data={displaycollegdetail} openModal={openModal} />
          )}
          {tabName === "question-answer" && (
            <CollegeQuesAns data={displaycollegdetail} openModal={openModal} />
          )}
          {/* {displaycollegdetail.courses && (
            <Relatedcolleges data={displaycollegdetail} vtype="v" />
          )} */}
          </>      
          }
        </div>

        <div className="relatedWrapper">
          <div className="others">
            <ul className="phCards">
              <li>
                <div>
                  <h2 className="headingSeaGreen font-bold pb-1 text-2xl text-center mb-2">
                    Placement Highlights
                  </h2>
                </div>

                <div>
                  <p>
                    <b>{displaycollegdetail.totalplacementratio}</b>
                  </p>
                  <span>Total Placement Ratio</span>
                </div>

                <div>
                  <p>
                    <b>{displaycollegdetail.averageplacementrecord}</b>
                  </p>
                  <span>Average Placement Record</span>
                </div>

                <div>
                  <p>
                    <b>{displaycollegdetail.higestplacementrecord}</b>
                  </p>
                  <span>Higest Placement Record</span>
                </div>

                <div>
                  <div className="compare" onClick={openModal}>
                    {/* <img src="/images/compare.svg" alt="" /> */}
                    <img src="/images/downloads.svg" alt="" />
                    <span>Latest Placements</span>
                  </div>
                </div>
              </li>
            </ul>
            {display_top_course(displaycollegdetail.top_courses)}

            {/*} <ul className="phCards">
                <hr style={{ color: "#32325d40", margin: "15px" }} />
                <li>
                  <p>
                    <h2 className="headingSeaGreen font-bold pb-1 text-2xl text-center mb-2">
                      Top Courses
                    </h2>
                  </p>
                  <div>
                    {topcourses.map((tc, cid) => (
                      <p key={cid}>
                        <b>
                          <a href={"../course/" + tc.courseurl}>
                            {tc.coursename}
                          </a>
                        </b>
                      </p>
                    ))}
                  </div>
                </li>
              </ul> */}

            <hr style={{ color: "#32325d40", margin: "15px" }} />

            {/* <GetHelp
              heading={"Let Us Help You"}
              openModal={openModal}
              headingClass={"headingSeaGreen"}
            /> */}

            {/* <div onClick={openModal}>
              Let Us Help You
            </div> */}

            <button onClick={openModal} type="button" className="text-white bg-[#0b67ec] hover:bg-[#0b67ec] focus:ring-4 focus:outline-none focus:ring-[#0b67ec] font-medium rounded-lg text-sm px-6 py-3.5 w-5/6 justify-center m-auto text-center flex items-center">
              Let Us Help You
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>

            <hr style={{ color: "#32325d40", margin: "15px" }} />

            <Address data={displaycollegdetail} />

            {displaycollegdetail.courses && (
              <div className="relatedColg">
                {/* <Relatedcolleges
                  data={displaycollegdetail}
                  heading={"Top Viewed Colleges"}
                  headingClass={"headingSeaGreen"}
                  vtype="v"
                /> */}
              </div>
            )}

            <div className="ads">
              <a href="https://timesofcollege.com/college/jaipuria-school-of-business-ghaziabad"><img src={adsImg1} alt="JAIPURIA" /></a>
            </div>
            <div className="ads">
              <a href="https://timesofcollege.com/college/bimtech-greater-noida"><img src={adsImg2} alt="BIMTECH" /></a>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky-bottom">
        <div className="action-btns">
          <div className="download-btn" onClick={(e) => openModal(e)}>
            <span>Download Brochure</span>
          </div>
          <div className="apply-btn" onClick={(e) => openModal(e)}>
            <button>Apply Now</button>
          </div>
        </div>
      </div>

      <Modal isModalOpen={isModalOpen} onClose={closeModal}>
        <Login heading={"Get Notify !"} data={Object.assign({}, popupEvents, {collageName: displaycollegdetail.college_name, logo: displaycollegdetail.logo})} />
      </Modal>
      <span className="sticky-help" onClick={(e) => openModal(e)}>
        Help?
      </span>
    </>
  );
}

export default CollegeDetails;