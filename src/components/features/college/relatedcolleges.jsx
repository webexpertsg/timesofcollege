import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image';
import axios from "axios";

import mapIcon from "../../../../public/images/map-icon.png";

function Relatedcolleges(props) {
  const {
    data: { courses },
    vtype,
    heading,
    headingClass,
  } = props;

  const [dispcolleges, setDispcolleges] = useState({
    cid: "",
    college_name: "",
    college_url: "",
    logo: "",
    banner: "",
  });

  //const { cms_url } = useParams();
  useEffect(() => {
    axios
      .get(`/api/relatedcolleges/${courses}`)
      .then((response) => {
        setDispcolleges(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
  }, []);
  return (
    <>
      <h2 className={`font-bold pb-1 text-2xl mt-10 mb-2 ${headingClass}`}>
        {heading}
      </h2>
      <div className="related-colleges mt-5 mb-5">
        {dispcolleges.length > 0 &&
          dispcolleges.map((item, id) => (
            <div id={item.cid} key={`Related-collegs-${id}`}>
              <div className="related-colleges-box">
                <div className="details">
                  <div className="img-box">
                    {/* <img src={getImageURL(item.logo)} alt="" /> */}
                    {/* <Image 
                      src={Star}
                      alt=''
                    /> */}
                  </div>
                  <div className="info">
                    <Link href={"../college/" + item.college_url}>
                      <p className="underline">{item.college_name}</p>
                    </Link>
                    <div>
                      <span className="location">
                        <img src={mapIcon} alt="" />
                        <span>
                          <Link href={"./../studybycity/" + item.city_url}>
                            {item.city_name}
                          </Link>
                        </span>
                      </span>
                      <span className="view-more">
                        <Link href={"./" + item.college_url}>Placement</Link>
                        <Link href={"./" + item.college_url}>Apply</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Link className="viewAll-btn" href={"/listing"}>
        View All Related Collages
      </Link>
    </>
  );
}
export default Relatedcolleges;
