import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import {isMobile} from 'react-device-detect';

import NoteAltIcon from '@mui/icons-material/NoteAlt';

function Exams({ clgSmallImg }) {
  var settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const [exams, setExams] = useState({
    na_id: "",
    na_image: "",
    na_url: "",
    na_title: "",
  });

  useEffect(() => {
    axios
      .get("/api/home/landingexams")
      .then((response) => {
        setExams(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderExams = (eitem) => (
    <a href={"exams/" + eitem.na_url}>
      <div className="exam-card" id={eitem.na_id}>
        <div className="exam-meta">
          {/* <img src={clgSmallImg} alt="" /> */}
          <NoteAltIcon style={{fontSize: '35px', color: '#402756'}} />

          <div>
            <h3>{eitem.na_title}</h3>
            <span>online</span>
          </div>
        </div>
        <div className="exam-info-list">
          <div className="exam-info">
            <span>Exam Level</span>
            <span>National</span>
          </div>
          <div className="exam-info">
            <span>Exam Date</span>
            <span>{eitem.disp_date}</span>
          </div>
        </div>
        <hr className="hr-x" />
        <div className="exam-link">
          <span className="link">Registration Process</span>
          <span className="link">Exam Information</span>
        </div>
      </div>
    </a>
  );

  const conditionalExams = (exams) => {
    if(isMobile)
    return(
      <>
      {exams.length > 0 &&
        exams.map((eitem, index) => <div>{renderExams(eitem)}</div>)
      }
      </>
    )
 
    else
    return(
      <Slider {...settings}>
      {exams.length > 0 &&
        exams.map((eitem, index) => <div>{renderExams(eitem)}</div>)
      }
      </Slider>
    )
  } 

  return (
    <section className="container exams">
      <div className="head-line">Exams</div>
      <div className="exams-container">
        <ul className="tabs">
          <li className="active">All</li>
          <li>Popular</li>
          <li>After 12th</li>
        </ul>
        <div className="exam-card-list">
          {conditionalExams(exams)}
        </div>
      </div>
    </section>
  );
}

export default Exams;
