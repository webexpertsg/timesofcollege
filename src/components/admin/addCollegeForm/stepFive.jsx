import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";

import { useSearchParams  } from 'next/navigation';
import { MultiStepFormContext } from '@/components/ui/containers/context';

import TocButton from '@/components/ui/atoms/tocButtom';

const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
)

const StepFive = ({ data, onNext, onPrevious }) => {
  const { formState  } = useContext(MultiStepFormContext)
  
  const [clgAdmission, setAdmission] = useState(data.clgAdmission);
  const [clgScholarship, setScholarship] = useState(data.clgScholarship);

  const [error, setErrors] = useState({})
  const searchParams = useSearchParams()
  const cid = searchParams.get('cid')

  const handleClgAdmissionChange = (data) => {
    setAdmission(data);
  }

  const handleScholarshipChange = (data) => {
    setScholarship(data)
  }

  const handleAdmissionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("cid", cid);
    formData.append("adminssiondetails", clgAdmission);
    formData.append("scholarshipoffer", clgScholarship);
    
    if (cid > 0) {
      //update form data
      axios({
        method: "POST",
        url: "/api/admin/updateadmission",
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //console.log(response);
          console.log(response.statusText);
          if (response.statusText === "OK") {
            toast.success("Admission details sucessfully updated", {
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

    onNext({ });
  }


  return (
    <form onSubmit={handleAdmissionSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 5: Admissions / Scholarship</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

      <TocClientSideCustomEditor 
        id="clgAdmission"
        label='Admission Details' 
        initialData={clgAdmission}
        // required={true}
        // errmsg={error.college_descripton}
        onChange={(handleClgAdmissionChange)}
      />

      <TocClientSideCustomEditor 
        id="clgScholarship"
        label='Scholarship Offers' 
        initialData={clgScholarship}
        // required={true}
        // errmsg={error.college_descripton}
        onChange={handleScholarshipChange}
      />

      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10 mr-2'>Save & Exit</TocButton>
        <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepFive;