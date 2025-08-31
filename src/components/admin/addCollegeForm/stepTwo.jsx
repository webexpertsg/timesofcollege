import React, { useContext, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useSearchParams  } from 'next/navigation';

import { MultiStepFormContext } from '@/components/ui/containers/context';

import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';
import TocButton from '@/components/ui/atoms/tocButtom';
import TocSelectList from '@/components/ui/atoms/tocSelectlist';

import { hasNotEmptyValue } from '@/utils'

const StepTwo = ({ data, onNext, onPrevious }) => {
  const { formState  } = useContext(MultiStepFormContext)

  const [clgCountries, setClgCountries] = useState(data.clgCountries);
  const [clgStates, setClgStates] = useState(data.clgStates);
  const [clgCities, setClgCities] = useState(data.clgCities);
  const [clgAddress, setClgAddress] = useState(data.clgAddress);
  const [clgAddress2, setClgAddress2] = useState(data.clgAddress2);
  const [clgLandmark, setClgLandmark] = useState(data.clgLandmark);
  const [clgPincode, setClgPincode] = useState(data.clgPincode);
  const [clgContact, setClgContact] = useState(data.clgContact);
  const [clgFax, setClgFax] = useState(data.clgFax);
  const [clgEmail, setClgEmail] = useState(data.clgEmail);
  const [clgWebsite, setClgWebsite] = useState(data.clgWebsite);

  const [error, setErrors] = useState({})
  const searchParams = useSearchParams()
  const cid = searchParams.get('cid')

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("cid", cid);
    formData.append("country", clgCountries);    
    formData.append("state", clgStates);
    formData.append("city", clgCities);
    formData.append("address", clgAddress);
    formData.append("address2", clgAddress2);    
    formData.append("landmark", clgLandmark);
    formData.append("pincode", clgPincode);
    formData.append("contactno", clgContact);
    formData.append("faxno", clgFax);    
    formData.append("email", clgEmail);
    formData.append("website", clgWebsite);

    const newErrors = basicifovalidateForm(
      Object.fromEntries(formData.entries())
    )
  
    setErrors(newErrors)

    if (!hasNotEmptyValue(newErrors)) {
      if (cid > 0) {
        axios({
          method: "POST",
          url: "/api/admin/updatecontacts",
          data: formData,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            console.log(response.statusText);
            if (response.statusText === "OK") {
              toast.success("Contact details sucessfully updated", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                //transition: Bounce,
              });
              /*  setSuccessmsg("Successfully Updated.");
              setTimeout(function () {
                window.location.replace("../../collegelisting");
              }, 3000); */
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        //end update form data
      }
    }

    onNext({});
  }

  
  const basicifovalidateForm = (data) => {
    const errors = {};
    if (!data.country.trim()) {
      errors.country = "Country is required.";
    }
    if (!data.state.trim()) {
      errors.state = "State is required.";
    }
    if (!data.city.trim()) {
      errors.city = "City is required.";
    }
    if (!data.address.trim()) {
      errors.address = "Address is required.";
    }
    if (!data.pincode.trim()) {
      errors.pincode = "Pincode is required.";
    }
    if (!data.contactno.trim()) {
      errors.contactno = "Contact No is required.";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required.";
    }
    if (!data.website.trim()) {
      errors.website = "Website is required.";
    }
    return errors;
  }

  return (
    <form onSubmit={handleContactSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 2: Contacts</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

      <div className='flex gap-10'>
        <TocSelectList
          id="clgCountries"
          label="Country"
          options={formState.countryarr}
          value={clgCountries}
          onChange={(e) => setClgCountries(e.target.value)}
        />

        <TocSelectList
          id="clgStates"
          label="State"
          options={formState.statearr}
          value={clgStates}
          onChange={(e) => setClgStates(e.target.value)}
        />

        <TocSelectList
          id="clgCities"
          label="City"
          options={formState.cityarr}
          value={clgCities}
          onChange={(e) => setClgCities(e.target.value)}
        />
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgAddress"
          label="Address"
          value={clgAddress}
          required={true}
          errmsg={error.address}
          onChange={(e) => setClgAddress(e.target.value)}
        />

        <TocInputWithLabel
          id="clgAddress1"
          label="Address2"
          value={clgAddress2}
          onChange={(e) => setClgAddress2(e.target.value)}
        />

        <TocInputWithLabel
          id="clgLandmark"
          label="Landmark"
          placeholder="Please Enter College Name."
          value={clgLandmark}
          onChange={(e) => setClgLandmark(e.target.value)}
        />

        <TocInputWithLabel
          id="clgPincode"
          label="Pin Code"
          placeholder="Please Enter College Name."
          value={clgPincode}
          required={true}
          errmsg={error.pincode}
          onChange={(e) => setClgPincode(e.target.value)}
        />
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgContact"
          label="Contact No."
          value={clgContact}
          required={true}
          errmsg={error.contactno}
          onChange={(e) => setClgContact(e.target.value)}
        />

        <TocInputWithLabel
          id="clgFax"
          label="Fax No."
          value={clgFax}
          onChange={(e) => setClgFax(e.target.value)}
        />

        <TocInputWithLabel
          id="clgEmail"
          label="Email"
          value={clgEmail}
          required={true}
          errmsg={error.email}
          onChange={(e) => setClgEmail(e.target.value)}
        />

        <TocInputWithLabel
          id="clgWebsite"
          label="Website"
          value={clgWebsite}
          required={true}
          errmsg={error.website}
          onChange={(e) => setClgWebsite(e.target.value)}
        />
      </div>


      <div className='flex gap-4 justify-end'>
          <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 mr-2'>Save & Exit</TocButton>
          <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepTwo;