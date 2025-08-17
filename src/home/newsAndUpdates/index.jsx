import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import {isMobile} from 'react-device-detect';


function NewsAndUpdates({}) {
  var settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const [newsupdates, setNewsupdates] = useState({
    na_id: "",
    na_image: "",
    na_url: "",
    na_title: "",
  });

  useEffect(() => {
    axios
      .get("/api/home/landingnewsandupdates")
      .then((response) => {
        setNewsupdates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderNewsAndUpdates = (nuitem, id) => (
    <div className="news-card" key={id}>
      <div className="heading">
        <h3>{nuitem.na_title}</h3>
      </div>
      <div className="date">Date: {nuitem.disp_date}</div>
      <p className="details">{nuitem.na_brief_description}</p>
      <hr className="hr-x" />
      <span className="link">
        <a href={"exams/" + nuitem.na_url}>Continue Reading... </a>
      </span>
    </div>
  );

  const conditionalNewsAndUpdates = (newsupdates) => {
    if(isMobile)
    return(
      <>
      {newsupdates.length > 0 &&
        newsupdates.map((nuitem) => (
          <div>{renderNewsAndUpdates(nuitem)}</div>
        ))
      }
      </>
    )
 
    else
    return(
      <Slider {...settings}>
      {newsupdates.length > 0 &&
        newsupdates.map((nuitem) => (
          <div>{renderNewsAndUpdates(nuitem)}</div>
        ))}
      </Slider>
    )
  } 

  return (
    <section className="container news-updates">
      <div className="head-line">Latest News & Updates </div>
      <div className="news-updates-container">
        <ul className="tabs">
          <li className="active">Admission</li>
          <li>Exam</li>
          <li>College</li>
        </ul>
        <div className="news-card-list">
          {conditionalNewsAndUpdates(newsupdates)}
        </div>
      </div>
    </section>
  );
}

export default NewsAndUpdates;
