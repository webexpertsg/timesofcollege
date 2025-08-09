import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Relatedcolleges from "../../college/relatedcolleges";
import Relatednews from "../../college/relatednews";
import Rating from "../../commonComps/ratings";
import Contact from "../../commonComps/contact";
import Facilities from "../../commonComps/facilities";
import { getImageURL } from "../../../../utils/utils-image";

function CollegeGallery(props) {
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
      city_name,
    },
  } = props;
  const metaTitle = `Check ${college_name} ${city_name} Campus Infrastructure Photo and Video`;
  const metaDescription = `${college_name} ${city_name} Campus: Photo, Video, Gallery, Campus Tours, Infrastructure, Classroom, Library, Hostel and Auditorium`;
  const metakeyword = `${college_name} Campus, ${college_name} ${city_name} campus, ${college_name} instrastructure, ${college_name} library, ${college_name} classroom, ${college_name} hostel, ${college_name} accomodation`;
  return (
    <>
      <Helmet>
        <title>{`Gallery ${metaTitle}`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metakeyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}+gallery`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}+gallery`}
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
      <div className="container detailsTab">
        <h1>Gallery</h1>
        <h2 className="font-bold text-2xl mb-5">{`${college_name} Gallery`}</h2>
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

export default CollegeGallery;
