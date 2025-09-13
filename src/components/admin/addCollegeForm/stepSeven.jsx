import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";

import { useSearchParams  } from 'next/navigation';

import TocButton from '@/components/ui/atoms/tocButtom';
import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';

const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
)

const StepSevevn = ({ data, onNext, onPrevious }) => {

    const [clgPlacementInfo, setClgPlacementInfo] = useState(data.clgPlacementInfo);
    const [clgTotalPlacementRatio, setClgTotalPlacementRatio] = useState(data.clgTotalPlacementRatio);
    const [clgAvgPlacement, setClgAvgPlacement] = useState(data.clgAvgPlacement);
    const [clgHighPlacement, setClgHighPlacement] = useState(data.clgHighPlacement);
    const [clgLowPlacement, setClgLowPlacement] = useState(data.clgLowPlacement);
    const [clgTopRecruiter, setClgTopRecruiter] = useState(data.clgTopRecruiter);
    const [clgRecruitSector, setClgRecruitSector] = useState(data.clgRecruitSector);
    const [clgTopProfile, setClgTopProfile] = useState(data.clgTopProfile);

  
    const [error, setErrors] = useState({})
    const searchParams = useSearchParams()
    const cid = searchParams.get('cid')
  
    const handlePlacementEditorChange = (data) => {
      setClgPlacementInfo(data);
    }

    const handlePlacementSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()

      formData.append("cid", cid);
      formData.append("placement_overview", clgPlacementInfo);
      formData.append("totalplacementratio", clgTotalPlacementRatio);
      formData.append("averageplacementrecord", clgAvgPlacement);
      formData.append("higestplacementrecord", clgHighPlacement);
      formData.append("lowestplacementrecord", clgLowPlacement);
      formData.append("toprecruiters", clgTopRecruiter);
      formData.append("toprecuitingsectors", clgRecruitSector);
      formData.append("topprofile", clgTopProfile);


      if (cid > 0) {
        axios({
          method: "POST",
          url: "/api/admin/updateplacement",
          data: formData,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            //console.log(response);
            console.log(response.statusText);
            if (response.statusText === "OK") {
              toast.success("Placement details sucessfully updated", {
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
      <form onSubmit={handlePlacementSubmit}>
        <div className='flex justify-between'>
          <h2 className='text-2xl mb-10 font-bold'>Step 7: Placements</h2>
          <div className='flex gap-4'>     
            <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
            <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
          </div>
        </div>

          <h2 className='pt-5 pb-2 font-semibold'>Overview</h2>
          <TocClientSideCustomEditor 
          id="clgPlacementInfo"
          label='Admission Details' 
          initialData={clgPlacementInfo}
          // required={true}
          // errmsg={error.college_descripton}
          onChange={(handlePlacementEditorChange)}
        />
          <br />

          <TocInputWithLabel
            id="clgTotalPlacementRatio"
            label="Total Placement Ratio"
            placeholder="In %"
            value={clgTotalPlacementRatio}
            onChange={(e) => setClgTotalPlacementRatio(e.target.value)}
          />

          <TocInputWithLabel
            id="clgAvgPlacement"
            label="Average Placement Record"
            placeholder="In LPA"
            value={clgAvgPlacement}
            onChange={(e) => setClgAvgPlacement(e.target.value)}
          />

          <TocInputWithLabel
            id="clgHighPlacement"
            label="Higest Placement Record"
            placeholder="In LPA"
            value={clgHighPlacement}
            onChange={(e) => setClgHighPlacement(e.target.value)}
          />

          <TocInputWithLabel
            id="clgLowPlacement"
            label="Lowest Placement Record"
            placeholder="In LPA"
            value={clgLowPlacement}
            onChange={(e) => setClgLowPlacement(e.target.value)}
          />     

          <TocInputWithLabel
            id="clgTopRecruiter"
            label="Top Recruiters"
            placeholder="Like- Google, IBM, Microsoft, Delloit etc."
            value={clgTopRecruiter}
            onChange={(e) => setClgTopRecruiter(e.target.value)}
          />     

          <TocInputWithLabel
            id="clgRecruitSector"
            label="Top Recruiting Sectors"
            placeholder="Finance, IT etc."
            value={clgRecruitSector}
            onChange={(e) => setClgRecruitSector(e.target.value)}
          />  

          <TocInputWithLabel
            id="clgTopProfile"
            label="Top Profile"
            placeholder="Trainee, Accounts, Marketing Heads"
            value={clgTopProfile}
            onChange={(e) => setClgTopProfile(e.target.value)}
          />                                   


        <div className='flex gap-4 justify-end'>
          <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 mr-2'>Save & Exit</TocButton>
          <TocButton type="button" onClick={cid && onNext({})} className='pl-10 pr-10'>Next</TocButton>
        </div>

      </form>
    )

};

export default StepSevevn;