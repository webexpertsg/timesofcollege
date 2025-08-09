import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import Relatedcolleges from "../../college/relatedcolleges";
import Relatednews from "../../college/relatednews";
import Rating from "../../commonComps/ratings";
import Contact from "../../commonComps/contact";
import Facilities from "../../commonComps/facilities";
import { getImageURL } from "../../../../utils/utils-image";

function CollegeFaculties(props) {
  const {
    college_name,
    facultyprofile,
    facilities,
    meta_title,
    meta_description,
    meta_keyword,
    college_url,
    logo,
    city_name,
  } = props.data;

  const { openModal } = props;
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  const metaTitle = `${college_name} ${city_name} Faculty: Students Reviews,  Faculty Experience & Qualification, Strength & Teaching methodology`;
  const metaDescription = `Check ${college_name} ${city_name} Top Faculty Lists, experience, Student Feedback, strength, qualification, teaching methodology & current research running by faculty members of various departments.`;
  const metakeyword = `Check ${college_name} ${city_name} Faculty lists, experience and qualification, student feedback, strength, teaching methodology & current research running by faculty members of various departments.`;
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metakeyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}+faculties`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}+faculties`}
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
      <section className="faculties">
        <h2 className="font-bold text-2xl mb-5">{`${college_name} Faculty`}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: facultyprofile,
          }}
        ></div>
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

export default CollegeFaculties;
