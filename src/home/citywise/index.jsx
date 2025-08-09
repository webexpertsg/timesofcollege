import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import LocationCityIcon from '@mui/icons-material/LocationCity';

import {isMobile} from 'react-device-detect';

function Citywise({ imglite }) {
  var settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };

  const [bycity, setBycity] = useState({
    cit_id: "",
    city_name: "",
    city_url: "",
  });

  useEffect(() => {
    axios
      .get("/api/home/studybycities")
      .then((response) => {
        setBycity(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderCity = (citem) => (
    <div className="city-card" id={citem.cit_id}>
      <div>
        <a href={"studybycity/" + citem.city_url}>
          {/* <img src={imglite} alt="" style={{margin:'0 auto'}}/> */}
          <LocationCityIcon style={{fontSize: '35px', color: '#402756', width: '100%'}} />
          <p>{citem.city_name}</p>
        </a>
      </div>
    </div>
  );

  const conditionalCity = (bycity) => {
    if(isMobile)
    return(
      <>
        {bycity.length > 0 &&
          bycity.map((citem) => <div>{renderCity(citem)}</div>)
        }
      </>
    )
 
    else
    return(
      <Slider {...settings}>
        {bycity.length > 0 &&
        bycity.map((citem) => <div>{renderCity(citem)}</div>)}
      </Slider>
    )
  } 

  return (
    <section className="by-cities">
      <div className="container">
        <div className="head-line">Study by Cities</div>
        <div className="by-cities-list">
          {conditionalCity(bycity)}
        </div>
      </div>
    </section>
  );
}

export default Citywise;
