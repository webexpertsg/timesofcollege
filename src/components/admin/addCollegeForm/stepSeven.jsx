import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import TocButton from '@/components/ui/atoms/tocButtom';
import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';

const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
)

const StepSevevn = ({ data, onNext, onPrevious }) => {
  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>')

  const handleEditorChange = (data) => {
    setEditorData(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext({ })
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 7: Placements</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

        <h2 className='pt-5 pb-2 font-semibold'>Overview</h2>
        <TocClientSideCustomEditor data={editorData} onChange={handleEditorChange} />
        <br />

        <TocInputWithLabel
          id=""
          label="Total Placement Ratio"
          placeholder="In %"
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id=""
          label="Average Placement Record"
          placeholder="In LPA"
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id=""
          label="Higest Placement Record"
          placeholder="In LPA"
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id=""
          label="Lowest Placement Record"
          placeholder="In LPA"
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />     

        <TocInputWithLabel
          id=""
          label="Top Recruiters"
          placeholder="Like- Google, IBM, Microsoft, Delloit etc."
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />     

        <TocInputWithLabel
          id=""
          label="Top Recruiting Sectors"
          placeholder="Finance, IT etc."
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />  

        <TocInputWithLabel
          id=""
          label="Top Profile"
          placeholder="Trainee, Accounts, Marketing Heads"
        //   value={}
        //   onChange={(e) => setClgName(e.target.value)}
        />                                   


      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepSevevn;