'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter, usePathname } from "next/navigation";

import Relatedcolleges from "@/components/features/college/relatedcolleges";
import Relatednews from "@/components/features/college/relatednews";
import Rating from "@/components/ui/ratings";
import Contact from "@/components/ui/contact";
import Facilities from "@/components/ui/facilities";

import star from "../../../../../public/images/star.png";

function CollegeOverview(props) {
  const router = useRouter()
  const pathname = usePathname()
  
  const {
    college_name,
    college_descripton,
    meta_title,
    meta_description,
    meta_keyword,
    display_type,
    highlights,
    sub_course_details,
    facilities,
    city_name,
    college_url,
    logo,
    total_rating,
  } = props.data;

  // console.log('props--------', props);
  
  
  const { courses, openModal } = props;
  const detailsUrl = pathname;

  const [showDescription, setShowDescription] = useState("");
  const [isShowMore, setShowMore] = useState(false);

  useEffect(() => {
    const content = !isShowMore
      ? `${college_descripton}`
      : college_descripton;
    setShowDescription(content);
  }, [college_descripton, isShowMore]);

  return (
    <>
      {/* <Helmet>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}`}
        />
        <meta property="og:type" content="college-view" />
        <meta property="og:title" key="og:title" content={meta_title} />=
        <meta
          property="og:description"
          key="og:description"
          content={meta_description}
        />
        <meta property="og:image" key="og:image" content={getImageURL(logo)} />
      </Helmet> */}
      {/* {college_url && (
        // <Navigate to={`/college/${college_url}`} replace={true} />
        router.push(`${`/college/${college_url}`}`)
      )} */}

      <div className="overview-details">
        {/* <section className="latestNews">
          <h2 className="font-bold text-2xl">Noticeboard</h2>
          <ul className="mt-2">
            <li>
              <b>23-Dec-2024</b>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters.
              </p>
            </li>
            <li>
              <b>03-Jan-2025</b>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters.
              </p>
            </li>
          </ul>
        </section> */}

        <section className="about">
          <h2 className="font-bold text-2xl mb-2">{`About ${college_name}`}</h2>
          <div
            className={`mt-2 ${!isShowMore ? 'h-20 overflow-hidden' : ''}`}
            dangerouslySetInnerHTML={{ __html: showDescription }}
          ></div>
          {!isShowMore && <span className="overlayColor"></span>}
          <span
            className="showMoreLess"
            onClick={() => setShowMore(!isShowMore)}
          >
            {isShowMore ? `Show less` : `Show more`}
          </span>
        </section>

        <section className="tableOfContent mt-10">
          <h2 className="font-bold text-2xl">Table of Content</h2>
          <ul>
            <li>
              <Link rel="stylesheet" href={`${detailsUrl}+courses-and-fees`}>
                {college_name} {city_name} Courses and Fees{" "}
                {new Date().getFullYear()}
              </Link>
            </li>
            <li>
              <Link rel="stylesheet" href={`${detailsUrl}+admissions`}>
                {college_name} {city_name} Admissions {new Date().getFullYear()}
              </Link>
            </li>
            <li>
              <Link rel="stylesheet" href={`${detailsUrl}+placements`}>
                {college_name} {city_name} Placements {new Date().getFullYear()}
              </Link>
            </li>
            <li>
              <Link rel="stylesheet" href={`${detailsUrl}+scholarships`}>
                {college_name} {city_name} Scholarships{" "}
                {new Date().getFullYear()}
              </Link>
            </li>
            <li>
              <Link rel="stylesheet" href={`${detailsUrl}+faculties`}>
                {college_name} {city_name} Faculties {new Date().getFullYear()}
              </Link>
            </li>
          </ul>
        </section>

        <section className="highlights mt-10">
          <h2 className="font-bold text-2xl mb-5">{college_name} Highlights</h2>
          <ul
            className={
              display_type === "Tabuller" ? "tabullerDisplay" : "bulletDisplay"
            }
          >
            {highlights?.map((item, i) => (
              <li key={`overview-${i}`}>
                <span>{item.highParameter}</span>
                <span>{item.highDetails}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="courses college-list-wrapper mt-10">
          <h2 className="font-bold text-2xl mb-5">
            {college_name} Top Programs
          </h2>
          {sub_course_details?.map((item, i) => (
            <div className="college-list-card" id="34" key={`key-cdetails-${i}`}>
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
                      <span>Latest Placements</span>
                    </div>
                  </div>
                  <div className="apply-btn">
                    <button onClick={openModal}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <Link
            className="viewAll-btn"
            herf={`/college/${college_url}+courses-and-fees`}
          >
            View All Courses
          </Link> */}
        </section>

      <section className="admissions">
        <h2 className="font-bold text-2xl mb-5">
          {`${college_name} Admission Process`}
        </h2>
        <div className={`mb-2 h-20 overflow-hidden`}
          dangerouslySetInnerHTML={{
            __html: props.data.adminssiondetails,
          }}
        ></div>
          {/* <Link className="viewAll-btn" herf={`/college/${college_url}+admissions`}>
            View Details
          </Link> */}
        </section>

      <section className="mb-12">
        <h2 className="font-bold text-2xl mt-12 mb-5">
          {`${college_name} Placement`}
        </h2>
        <div className={`mb-2 h-20 overflow-hidden`}
        dangerouslySetInnerHTML={{ __html: props.data.placement_overview}}>
        </div>
          {/* <Link className="viewAll-btn" herf={`/college/${college_url}+placements`}>
            View Details
          </Link> */}
        </section>


      <section className="mb-12">
        <h2 className="font-bold text-2xl mb-5">
          {`${college_name} Scholarships`}
        </h2>
        <div className={`mb-2 h-20 overflow-hidden`}
          dangerouslySetInnerHTML={{ __html: props.data.scholarshipoffer}}
        ></div>
          {/* <Link className="viewAll-btn" herf={`/college/${college_url}+scholarships`}>
            View Details
          </Link> */}
        </section>

      <section className="faculties mb-12">
        <h2 className="font-bold text-2xl mb-5">{`${college_name} Faculty`}</h2>
        <div className={`mb-2 h-20 overflow-hidden`}
          dangerouslySetInnerHTML={{
            __html: props.data.facultyprofile,
          }}
        ></div>
          {/* <Link className="viewAll-btn" herf={`/college/${college_url}+faculties`}>
            View Details
          </Link> */}
        </section>

        <Facilities data={facilities && facilities} clgName={college_name} />

        <section className="rating wrapper mt-10">
          <h2 className="font-bold text-2xl mb-5">{college_name} Rating</h2>
          {/* <h3 className="font-bold text-xs mb-5">{college_name}</h3> */}
          <span className="shadow-md clg-rating">
            <img src={star} alt="" />
            <span>
              <b>{total_rating ? total_rating.slice(0, 3) : "0"}</b> /10
            </span>
          </span>
          <Rating data={props.data} />
        </section>

        <section className="address mt-10">
          <h2 className="font-bold text-2xl mb-5">
            {college_name} Address/Contact
          </h2>
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
          <Link className="viewAll-btn" href={"/exams"}>
            View All News and Events
          </Link>
        </section>
      </div>
    </>
  );
}

export default CollegeOverview;
