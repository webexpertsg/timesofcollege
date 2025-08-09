import React, { useState, useEffect } from "react";
import Link from 'next/link'
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
      .get("/api/relatedcollges/" + courses)
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
            <div id={item.cid} key={id}>
              <div className="related-colleges-box">
                <div className="details">
                  <div className="img-box">
                    <img src={getImageURL(item.logo)} alt="" />
                  </div>
                  <div className="info">
                    <a href={"../college/" + item.college_url}>
                      <p className="underline">{item.college_name}</p>
                    </a>
                    <div>
                      <span className="location">
                        <img src={mapIcon} alt="" />
                        <span>
                          <a href={"./../studybycity/" + item.city_url}>
                            {item.city_name}
                          </a>
                        </span>
                      </span>
                      <span className="view-more">
                        <a href={"./" + item.college_url}>Placement</a>
                        <a href={"./" + item.college_url}>Apply</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Link className="viewAll-btn" to={"/listing"}>
        View All Related Collages
      </Link>
    </>
  );
}
export default Relatedcolleges;
