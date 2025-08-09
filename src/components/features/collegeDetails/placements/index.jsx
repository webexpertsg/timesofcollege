import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import Relatedcolleges from "../../college/relatedcolleges";
import Relatednews from "../../college/relatednews";
import Rating from "../../commonComps/ratings";
import Contact from "../../commonComps/contact";
import Facilities from "../../commonComps/facilities";
import { getImageURL } from "../../../../utils/utils-image";

function CollegePlacements(props) {
  const {
    college_name,
    placement_overview,
    totalplacementratio,
    averageplacementrecord,
    higestplacementrecord,
    lowestplacementrecord,
    toprecruiters,
    toprecuitingsectors,
    topprofile,
    facilities,
    meta_title,
    meta_description,
    meta_keyword,
    college_url,
    logo,
    city_name,
  } = props.data;

  const { openModal } = props;
  const year = new Date();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  const metaTitle = `${college_name} ${city_name} Placements ${year.getFullYear()}: Check Highest Placement, Average Placement and Top Recruiters!`;
  const metaDescription = `${college_name} ${city_name} has conducted the placements for the current batch with ${totalplacementratio} placements ratio. The highest and average package offered during ${college_name} placements of the current batch stood at ${higestplacementrecord} and ${averageplacementrecord} respectively.`;
  const metakeyword = `${college_name}  placements, ${college_name}  average package, ${college_name} top recruiters, ${college_name} package, ${college_name} placement reviews, ${college_name} placement ${year.getFullYear()}, ${college_name}  placement ${year.getFullYear() - 1}, ${college_name} Highest Placement, ${college_name} Average Placement`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metakeyword} />
        <link
          id="canonicalUrl"
          rel="canonical"
          href={`https://timesofcollege.com/college/${college_url}+placements`}
        />
        <meta property="og:site_name" content="Times of College"></meta>
        <meta
          property="og:url"
          content={`https://timesofcollege.com/college/${college_url}+placements`}
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
      <section>
        <div className="placementHighlights">
          <ul className="phCards">
            <li>
              <p>
                <b>{totalplacementratio}</b>
              </p>
              <span>Total Placement Ratio</span>
            </li>
            <li>
              <p>
                <b>{averageplacementrecord}</b>
              </p>
              <span>Average Placement Record</span>
            </li>
            <li>
              <p>
                <b>{higestplacementrecord}</b>
              </p>
              <span>Highest Placement Record</span>
            </li>
            <li>
              <p>
                <b>{lowestplacementrecord}</b>
              </p>
              <span>Lowest Placement Record</span>
            </li>
          </ul>

          <div className="topRecruiter">
            <span>
              <b>Top Recruiters</b>
            </span>
            <ul className="chips">
              {toprecruiters?.split(",")?.map((item, i) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>

          <div className="topRecruiter">
            <span>
              <b>Top Recruiting Sectors</b>
            </span>
            <ul className="chips">
              {toprecuitingsectors?.split(",")?.map((item, i) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>

          <div className="topRecruiter">
            <span>
              <b>Top Profile</b>
            </span>
            <ul className="chips">
              {topprofile?.split(",")?.map((item, i) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr style={{ color: "#ebe5ec", marginBottom: "20px" }} />
        <h2 className="font-bold text-2xl mb-5">
          {`${college_name} Placement`}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: placement_overview }}></div>
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

export default CollegePlacements;
