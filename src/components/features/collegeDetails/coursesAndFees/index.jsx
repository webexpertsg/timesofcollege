import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import Relatedcolleges from "../../college/relatedcolleges";
import Relatednews from "../../college/relatednews";
import Rating from "../../commonComps/ratings";
import Contact from "../../commonComps/contact";
import Facilities from "../../commonComps/facilities";
import { getImageURL } from "../../../../utils/utils-image";

function CollegeCoursesFees(props) {
  const {
    sub_course_details,
    college_name,
    facilities,
    meta_title,
    meta_description,
    meta_keyword,
    college_url,
    city_name,
    logo,
  } = props.data;

  const { courses, openModal } = props;
  const placementyear = new Date();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const metaTitle = `Check ${college_name} ${city_name}: Offered Courses, Fees, Cut off, Application, Admission and Brochure`;
  const metaDescription = `${college_name} ${city_name}: Courses and their program fee details of ${college_name} , ${city_name}. Find the details of all  UG & PG programs offered by ${college_name} along with course Fees, Duration, Intake, Reviews, Eligibility, Selection Process & Apply Dates`;
  const metakeyword = `${college_name} Courses, ${college_name} fees, ${college_name} intake, ${college_name} course eligibility, ${college_name} cut off, ${college_name} program intake, ${college_name} course duration, ${college_name}, ${college_name} ${city_name} courses`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metakeyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}+courses-and-fees`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}+courses-and-fees`}
        />
        <meta property="og:type" content="college-view" />
        <meta property="og:title" key="og:title" content={metaTitle} />=
        <meta
          property="og:description"
          key="og:description"
          content={metaDescription}
        />
        <meta property="og:image" key="og:image" content={getImageURL(logo)} />
      </Helmet>
      <section className="courses-fees">
        <h2 className="font-bold text-2xl mb-5">
          {`${college_name} Courses, Eligibility and Fees`}
        </h2>
        <div>
          <table className="table-bordered">
            <thead className="table-bordered-head">
              <tr>
                <th>Course</th>
                <th>Fees</th>
                <th>Eligibility</th>
                <th>Total Seats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-bordered-body">
              {sub_course_details?.map((item, i) => (
                <tr id={"trc-" + i} key={i}>
                  <td>{courses[item.subcourseId]}</td>
                  <td>
                    <b>{item.course_fee ? item.course_fee : "-"}</b>
                    <p className="underline text-xs" onClick={openModal}>
                      Get Fee Details
                    </p>
                  </td>
                  <td>
                    {item.subcourseselectiioneligibility
                      ? item.subcourseselectiioneligibility
                      : "-"}
                  </td>
                  <td>{item.course_seats ? item.course_seats : "-"}</td>
                  <td>
                    <div className="">
                      <button
                        data-course-tag="18"
                        data-csm-title="Apply Now"
                        data-csm-track="true"
                        data-csm-value="B.Tech"
                        data-event-type="link_click"
                        data-section_name="IIT Kharagpur Fees &amp; Eligibility"
                        type="button"
                        className=""
                        onClick={openModal}
                      >
                        Apply Now
                      </button>
                      <div className=""></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="courses college-list-wrapper">
        <h2 className="font-bold text-2xl mb-5">All Programs</h2>
        {sub_course_details?.map((item, i) => (
          <div className="college-list-card" id="34">
            <div className="title-section">
              <div className="heart"></div>
              <div className="title-details">
                <h2>{courses[item.subcourseId]}</h2>
                <div>
                  {/* <span className="owner medium">25 Courses</span> */}
                  {/* <span className="rank bold green"># NIRF</span> */}
                  <span className="rating">
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="other-details">
              <div className="highlights">
                <div>
                  <span>Accepted Exams</span>
                  <span className="text-center">
                    {item.subcourseselectioncriteria
                      ? item.subcourseselectioncriteria
                      : "NA"}
                  </span>
                </div>
                <div>
                  <span>Total Fees</span>
                  <span className="text-center">
                    <b>{item.course_fee}</b>
                  </span>
                </div>
                <div>
                  <span>Eligibility</span>
                  <span className="text-center">
                    {item.subcourseselectiioneligibility}
                  </span>
                </div>
                <div>
                  <span>Course Duration</span>
                  <span className="text-center">
                    {item.course_duration} Years
                  </span>
                </div>
                <div>
                  <span>Available Seats</span>
                  <span className="text-center">{item.course_seats}</span>
                </div>
              </div>
              <div className="action-btns">
                <div>
                  <div className="download" onClick={openModal}>
                    <img src="/images/downloads.svg" alt="" />
                    <span>Download Brochure</span>
                  </div>
                  <div className="compare" onClick={openModal}>
                    {/* <img src="/images/compare.svg" alt="" /> */}
                    <img src="/images/downloads.svg" alt="" />
                    <span>Check Placements {placementyear.getFullYear()}</span>
                  </div>
                </div>
                <div className="apply-btn">
                  <button onClick={openModal}>Apply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Facilities data={facilities && facilities} />

      <section className="rating  mt-10">
        <h2 className="font-bold text-2xl mb-5">Rating</h2>
        <Rating data={props.data} />
      </section>

      <section className="address mt-10">
        <h2 className="font-bold text-2xl mb-5">Address/Contact</h2>
        <Contact data={props.data} modelOpen={openModal} />
      </section>

      <section className="RelatedNews">
        {props.data.courses && (
          <Relatedcolleges
            data={props.data}
            heading={"Related Colleges"}
            vtype="v"
          />
        )}
      </section>

      <section className="news  mt-10">
        {props.data.courses && (
          <Relatednews
            data={props.data}
            heading={"Related News and Events"}
            vtype="h"
          />
        )}

        <Link className="viewAll-btn" to={""}>
          View All News and Events
        </Link>
      </section>
    </>
  );
}

export default CollegeCoursesFees;
