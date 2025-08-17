import React, { useState, useEffect, useLayoutEffect } from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function CollegeHeaders(props) {
  const router = useRouter();
  const pathname = usePathname();

  const { tabName, collageUrl } = props;
  
  const [detailsUrl, setDetailsUrl] = useState(
    pathname.split("+")[0]?.replace(/%20/g, "")
  );

  // console.log('detailsUrl=-=--=--=>', detailsUrl);
  
  const adminssinyear = new Date();

  useEffect(() => {
    // const detailsUrl = pathname.split("+")[0]?.replace(/%20/g, "");
    // setDetailsUrl(detailsUrl);

    // setTimeout(() => {
    //   router.push(`${pathname.replace(/%20/g, "")}`);
    // }, 500);

    // return () => false;
  }, [pathname]);

  return (
    <>
      <div className="detailsTab">
        <ul>
          <li
            className={
              tabName === "overview" || tabName == '' || tabName == undefined ? "active" : ""
            }
          >
            <Link href={`${detailsUrl}`}>Overview</Link>
          </li>
          <li className={tabName === "courses-and-fees" ? "active" : ""}>
            <Link href={`${detailsUrl}+courses-and-fees`}>Courses & Fees</Link>
          </li>
          <li className={tabName === "admissions" ? "active" : ""}>
            <Link href={`${detailsUrl}+admissions`}>
              Admission {adminssinyear.getFullYear()}
            </Link>
          </li>
          <li className={tabName === "placements" ? "active" : ""}>
            <Link href={`${detailsUrl}+placements`}>
              Placements {adminssinyear.getFullYear()}
            </Link>
          </li>
          <li className={tabName === "scholarships" ? "active" : ""}>
            <Link href={`${detailsUrl}+scholarships`}>Scholarships</Link>
          </li>
          <li className={tabName === "faculties" ? "active" : ""}>
            <Link href={`${detailsUrl}+faculties`}>Faculties</Link>
          </li>
          <li className={tabName === "gallery" ? "active" : ""}>
            <Link href={`${detailsUrl}+gallery`}>Gallery</Link>
          </li>
          <li className={tabName === "reviews" ? "active" : ""}>
            <Link href={`${detailsUrl}+reviews`}>Reviews</Link>
          </li>
          <li className={tabName === "news" ? "active" : ""}>
            <Link href={`${detailsUrl}+news`}>News</Link>
          </li>
          <li className={tabName === "question-answer" ? "active" : ""}>
            <Link href={`${detailsUrl}+question-answer`}>Q&A</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default CollegeHeaders;
