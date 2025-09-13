import React, { useContext, useState } from 'react';
import axios from "axios";

import { useSearchParams  } from 'next/navigation';
import { MultiStepFormContext } from '@/components/ui/containers/context';

import TocButton from '@/components/ui/atoms/tocButtom';
import TocNumberInputWithLabel from '@/components/ui/atoms/tocNumberInputWithLabel';


const StepSix = ({ data, onNext, onPrevious }) => {

    const [clgRateAcademic, setClgRateAcademic] = useState(data.clgRateAcademic)
    const [clgRateAccommodation, setClgRateAccommodation] = useState(data.clgRateAccommodation)
    const [clgRateFaculty, setClgRateFaculty] = useState(data.clgRateFaculty)
    const [clgRateInfra, setClgRateInfra] = useState(data.clgRateInfra)
    const [clgRatePlacements, setClgRatePlacements] = useState(data.clgRatePlacements)
    const [clgRateSocial, setClgRateSocial] = useState(data.clgRateSocial)
    const [clgRateThroughout, setClgRateThroughout] = useState(data.clgRateThroughout)

    const [error, setErrors] = useState({})
    const searchParams = useSearchParams()
    const cid = searchParams.get('cid')

  const handleRatingSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("cid", cid);
    formData.append("ratingacademic", clgRateAcademic);
    formData.append("rattingaccommodation", clgRateAccommodation);
    formData.append("rattingfaculty", clgRateFaculty);
    formData.append("rattinginfrastructure", clgRateInfra);
    formData.append("rattingplacements", clgRatePlacements);
    formData.append("rattingsocial", clgRateSocial);
    formData.append("rattingthroughout", clgRateThroughout);

    if (cid > 0) {
      axios({
        method: "POST",
        url: "/api/admin/updaterating",
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //console.log(response);
          console.log(response.statusText);
          if (response.statusText === "OK") {
            toast.success("Rating sucessfully updated", {
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

    onNext({ })
  }

  return (
    <form onSubmit={handleRatingSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 6: Rating</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

        <TocNumberInputWithLabel
            id="clgRateAcademic"
            label="Ratting Academic"
            value={clgRateAcademic}
            onChange={(e) => setClgRateAcademic(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        />

        <TocNumberInputWithLabel
            id="clgRateAccommodation"
            label="Ratting Accommodation"
            value={clgRateAccommodation}
            onChange={(e) => setClgRateAccommodation(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        />

        <TocNumberInputWithLabel
            id="clgRateFaculty"
            label="Ratting Faculty"
            value={clgRateFaculty}
            onChange={(e) => setClgRateFaculty(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        />

        <TocNumberInputWithLabel
            id="clgRateInfra"
            label="Ratting Infrastructure"
            value={clgRateInfra}
            onChange={(e) => setClgRateInfra(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        />

        <TocNumberInputWithLabel
            id="clgRatePlacements"
            label="Ratting Placements"
            value={clgRatePlacements}
            onChange={(e) => setClgRatePlacements(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        />    

        <TocNumberInputWithLabel
            id="clgRateSocial"
            label="Ratting Social"
            value={clgRateSocial}
            onChange={(e) => setClgRateSocial(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        /> 

        <TocNumberInputWithLabel
            id="clgRateThroughout"
            label="Ratting Throughout"
            value={clgRateThroughout}
            onChange={(e) => setClgRateThroughout(e.target.value)}
            max="10"
            placeholder="Rate out of 100"
        />                 

      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10 mr-2'>Save & Exit</TocButton>
        <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  )
}

export default StepSix;