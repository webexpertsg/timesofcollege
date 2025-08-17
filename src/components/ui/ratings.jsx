import React from "react";
import Image from 'next/image';

import Star from "../../../public/images/star.png";
import academic from "../../../public/images/reward/academic.png";
import accomodation from "../../../public/images/reward/accomodation.png";
import faculty from "../../../public/images/reward/faculty.png";
import infra from "../../../public/images/reward/infra.png";
import placements from "../../../public/images/reward/placements.png";
import social from "../../../public/images/reward/social.png";
import throughout from "../../../public/images/reward/throughout.png";


const Rating = (props) => {
 const {
    ratingacademic,
    rattingaccommodation,
    rattingfaculty,
    rattinginfrastructure,
    rattingplacements,
    rattingsocial,
    rattingthroughout
    } = props.data;
    
 return (
   <section className="rating-wrapper">
      <ul>
        <li className="shadow-md">
            <Image 
                src={academic}
                alt='Academic'
            />
            <span><b>Academic</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />
                <span><b>{ratingacademic ? ratingacademic : '0'}</b>/10</span>
            </span>
        </li>
        <li className="shadow-md">
            <Image 
                src={accomodation}
                alt='Accommodation'
            />
            <span><b>Accommodation</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />
                <span><b>{rattingaccommodation ? rattingaccommodation : '0'}</b>/10</span>
            </span>
        </li>
        <li className="shadow-md">
            <Image 
                src={faculty}
                alt='Faculty'
            />
            <span><b>Faculty</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />               
                <span><b>{rattingfaculty ? rattingfaculty : '0'}</b>/10</span>
            </span>
        </li>
        <li className="shadow-md">
            <Image 
                src={infra}
                alt='Infrastructure'
            />
            <span><b>Infrastructure</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />
                <span><b>{rattinginfrastructure ? rattinginfrastructure : '0'}</b>/10</span>
            </span>
        </li>
        <li className="shadow-md">
            <Image 
                src={placements}
                alt='Placements'
            />
            <span><b>Placements</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />
                <span><b>{rattingplacements ? rattingplacements : '0'}</b>/10</span>
            </span>
        </li>
        <li className="shadow-md">
            <Image 
                src={social}
                alt='Social'
            />
            <span><b>Social</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />                
                <span><b>{rattingsocial ? rattingsocial : '0'}</b>/10</span>
            </span>
        </li>
        <li className="shadow-md">
            <Image 
                src={throughout}
                alt='Throughout'
            />
            <span><b>Throughout</b></span>
            <span className="clg-rating">
                <Image 
                    src={Star}
                    alt=''
                />
                <span><b>{rattingthroughout ? rattingthroughout : '0'}</b>/10</span>
            </span>
        </li>
      </ul>  
   </section>
 );
};

export default Rating;