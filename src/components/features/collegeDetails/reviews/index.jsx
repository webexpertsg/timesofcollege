import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import star from "/images/star.png";
import Relatedcolleges from "../../college/relatedcolleges";
import Relatednews from "../../college/relatednews";
import Rating from "../../commonComps/ratings";
import Contact from "../../commonComps/contact";
import Facilities from "../../commonComps/facilities";
import { getImageURL } from "../../../../utils/utils-image";

function CollegeReviews(props) {
  const {
    openModal,
    data: {
      college_name,
      facilities,
      meta_title,
      meta_description,
      meta_keyword,
      college_url,
      logo,
      total_rating,
      city_name,
    },
  } = props;
  const metaTitle = `Check ${college_name} ${city_name} Review of Faculty, Placements, Infrastructure, Campus & Facility.`;
  const metaDescription = `${college_name} ${city_name}: Find the Experts Reviews on Placements, Faculty, Infrastructure & Facilities given by experts and students across various courses and streams.`;
  const metakeyword = `${college_name} ${city_name} review, ${college_name} student review, ${college_name} student feedback, ${college_name} campus review, ${college_name} placement review, ${college_name} faculty review, ${college_name} infrastructure review, ${college_name} accomodation`;
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metakeyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}+reviews`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}+reviews`}
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

      <div className="container reviews">
        {/* <h1 className="">Reviews</h1> */}
        <h2 className="font-bold text-2xl mb-5 text-center	">{`${college_name} Reviews`}</h2>

        <span className="clg-rating-avg">
          <img src={star} alt="" />
          <span>
            <b>{total_rating ? total_rating.slice(0, 3) : "0"}</b> /10
          </span>
        </span>
      </div>

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

export default CollegeReviews;
