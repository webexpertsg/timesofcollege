import React from "react";

// import arrowTilt from "/images/arrow-tilt.svg";
// import Contact from "./contact";

const Address = ({ text, url, data, openModal }) => {

 return (
    <div className="address-widget">
        <section className="address mt-5">
          

        <div className="w-full max-w-sm p-4 bg-[#ffffff] rounded-lg shadow-sm sm:p-6">
        <h5 className="mb-3 text-base text-center font-semibold text-[#1d8162]-900 md:text-xl dark:text-white">
        Contact
        </h5>
        {/* <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p> */}
        
        <ul className="my-4 space-y-3">
            <li>
                <a href="#" className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap">{data.contactno ?  `${data.contactno.slice(0,6)}XXXX` : 'XXXXXXXXXX'}</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">{data.email ?  `xxxx${data.email.slice(4)}` : ''}</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap">{data.website}</span>
                </a>
            </li>
        </ul>
        </div>

        </section>
    </div>
 );
};

export default Address;