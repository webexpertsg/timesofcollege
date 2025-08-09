import React from "react";

const Contact = (props) => {
 const {
    address,
    state_name,
    pincode,
    contactno,
    email,
    website
    } = props.data;

    const { modelOpen } = props;

 return (
   <section className="contact-wrapper">
       <ul>
        <li>
            <span></span>
            <span><b>Address:</b></span>
            <span>{address}, Pin-{pincode}, {state_name}</span>
        </li>
        {/* <li>
            <span></span>
            <span><b>Phone No:</b></span>
            <span className='underline' onClick={modelOpen}>{contactno ?  `${contactno.slice(0,6)}XXXX` : 'XXXXXXXXXX'}</span>
        </li>
        <li>
            <span></span>
            <span><b>Email:</b></span>
            <span className='underline' onClick={modelOpen}>{email ?  `xxxx${email.slice(4)}` : ''}</span>
        </li>
        <li>
            <span></span>
            <span><b>Website:</b></span>
            <span>{website}</span>
        </li> */}
       </ul>
   </section>
 );
};

export default Contact;