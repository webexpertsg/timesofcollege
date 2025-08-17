import React, { useState, useEffect } from "react";
import axios from "axios";

// import mapIcon from "/images/map-icon.png";

function Relatednews(props) {
  const {
    data: { courses },
    vtype,
    heading,
  } = props;

  const [newslist, setNewslist] = useState({
    na_id: "",
    na_title: "",
    na_brief_description: "",
    na_url: "",
    na_image: "",
    na_date: "",
  });

  //const { cms_url } = useParams();
  useEffect(() => {
    axios
      .get(`/api/relatednews/${courses}`)
      .then((response) => {
        setNewslist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
  }, []);
  
  return (
    <div className="related-collegesss">
      <h2 className="font-bold text-2xl mb-5">
        {heading ? heading : "News / Articles"}
      </h2>
      <div className="news-wrapper mb-5">
        {newslist.length > 0 &&
          newslist.map((item, id) => (
            <div
              key={id}
              id={item.cid}
              style={{ display: "flex", float: "left" }}
            >
              <div className="news-card">
                <div className="heading">
                  <h3>{item.na_title}</h3>
                </div>
                {/* <div className="date">Date: {item.na_date}</div> */}
                <div className="date">Date: </div>

                <p className="details">
                  {item.na_brief_description.substring(0, 200)}
                </p>
                <hr className="hr-x" />
                <span className="link">
                  <a href={"../exam/" + item.na_url}>Continue Reading... </a>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Relatednews;
