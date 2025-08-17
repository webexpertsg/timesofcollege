"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import adsImg1 from "../../../public/images/ads/ads1.gif";
import adsImg2 from "../../../public/images/ads/ads2.gif";
import clgSmallImg from "../../../public/images/img-dummy-sm.png";
import arrowTilt from "../../../public/images/arrow-tilt.svg";

import GetHelp from "@/components/ui/getNotify";
import Modal from "@/components/ui/modal";
import Login from "@/components/ui/login";

function Couses(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupEvents, setPopupEvents] = useState({
    cid: "",
    btnName: "",
    btnTitle: "",
  });
  const [displaycourselisting, setDisplaycourselisting] = useState({
    cms_description: "",
    cms_title: "",
  });
  //const { cms_url } = useParams();

  useEffect(() => {
    axios
      .get("/api/courses/courseslisting")
      .then((response) => {
        setDisplaycourselisting(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
  }, []);

  const openModal = (event) => {
    event.stopPropagation();
    const { name, title } = event.target.dataset;
    setPopupEvents({ cid: "", btnName: name, btnTitle: title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderCourses = (eitem) => (    
    <Link href={`/courses/${eitem.course_url}`}>
      <div className="chips-link">
        <span>{eitem.course_name}</span>
        <span>
            <Image 
                src={arrowTilt}
                alt={eitem.course_name}
            />
        </span>
      </div>
    </Link>
  );

  //console.log(cms_url);
  return (
    <>
      <section className="container college-filter-wrapper exams-listing">
        <section className="college-list-wrapper exams-container">
          <div className="font-bold text-2xl pb-3 pt-3">Courses</div>
          <div className="exam-card-list">
            {displaycourselisting.length > 0 &&
              displaycourselisting.map((item, id) => (
                <div key={`key-course-${id}`}>{renderCourses(item)}</div>
              ))}
          </div>
        </section>
        <div className="others">
          <GetHelp
            heading={"Let Us Help You"}
            openModal={openModal}
            headingClass={"headingSeaGreen"}
          />

          <div className="ads">
            <a href="https://timesofcollege.com/college/jaipuria-school-of-business-ghaziabad">
                <Image 
                    src={adsImg1}
                    alt='JAIPURIA'
                />
            </a>
          </div>
          <div className="ads">
            <a href="https://timesofcollege.com/college/bimtech-greater-noida">
                <Image 
                    src={adsImg2}
                    alt='BIMTECH'
                />
            </a>
          </div>

        </div>
      </section>
      <Modal isModalOpen={isModalOpen} onClose={closeModal}>
        <Login heading={"Get Notify !"} data={popupEvents} />
      </Modal>
    </>
  );
}

export default Couses;
