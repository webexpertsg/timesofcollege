import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import {isMobile} from 'react-device-detect';

//import { getImageURL } from "../../../../utils/utils-image";

function FutureGoals({}) {
  var settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  const [goal, setGoal] = useState({
    cat_id: "",
    category_name: "",
    category_url: "",
    courses: "",
  });
  
  useEffect(() => {
    axios
      .get("/api/home/futuregoal")
      .then((response) => {
        setGoal(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderFutureGoals = (item, index) => (
    <div id={item.cat_id}>
    {/* console.log("courses", item.courses) */}
    <div className="course-type" key={index}>
      <div className="info">
        <h1>{item.category_name}</h1>
        <span>{item.total_colleges} Colleges</span>
      </div>
      <ul>
        {item.courses &&
          item.courses.split(",").map((c, i) => i <= 2 && <li>{c}</li>)}
      </ul>
      <div className="link">
        <a href={"college/"}>
          Find By Location
        </a>
        <a href={"college/"}>Top Colleges</a>
      </div>
    </div>
  </div>
  )

  const conditionalFutureGoals = (goal) => {
   if(isMobile)
    return(<>
    {goal.length > 0 &&
        goal.map((item, index) => (
        renderFutureGoals(item, index)
      ))}
    </>)

    else
    return(<Slider {...settings}>
    {goal.length > 0 &&
      goal.map((item, index) => (
        renderFutureGoals(item, index)
      ))
    }
    </Slider>)
  }

  return (
    conditionalFutureGoals(goal)
  );

}

FutureGoals.propTypes = {};

export default FutureGoals;
