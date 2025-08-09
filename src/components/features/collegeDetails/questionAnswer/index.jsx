import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Relatedcolleges from "../../college/relatedcolleges";
import Relatednews from "../../college/relatednews";
import Rating from "../../commonComps/ratings";
import Contact from "../../commonComps/contact";
import Facilities from "../../commonComps/facilities";
import Accordion from "../../commonComps/accordion";

import { getImageURL } from "../../../../utils/utils-image";

function CollegeQuesAns(props) {
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
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const metaTitle = `${college_name} ${city_name} Q&A of Campus, Placements, Program & Fees, Loan, Hostel, Scholarship and ranking.`;
  const metaDescription = `Check ${college_name} ${city_name} frequently asked question on Campus, Placements, Ranking, Classroom, Infrastructure, Approvals, admission process and students feedback`;
  const metakeyword = `${college_name} student question, ${college_name} f&q, ${college_name} faculty question, ${college_name} q&a, ${college_name} frequently asked question`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metakeyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}+question-answer`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}+question-answer`}
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

      <div>
        {/* <h1>Question Answer</h1> */}

        <section className="p-2">
          <h2 className="font-bold text-2xl mb-5">{`${college_name} Q&A`}</h2>
          <div dangerouslySetInnerHTML={{ __html: props.data.faq }}></div>
        </section>

        {/* <section className="max-w-6xl mx-auto text-center">
        <Accordion title={<b>What Is The Flagship Program Offered?</b>} content={lorem} />
        <Accordion title={<b>Is It Mandatory To Have Work Experience For The PGDM/MBA Program?</b>} content={lorem} />
        <Accordion title={<b>What Admission Test Scores Are Used in MBA and PGDM program?</b>} content={lorem} />
      </section> */}
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

export default CollegeQuesAns;
