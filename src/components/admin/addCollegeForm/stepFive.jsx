import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import TocButton from '@/components/ui/atoms/tocButtom';

const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
)

const StepFive = ({ data, onNext, onPrevious }) => {
  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');

  const handleEditorChange = (data) => {
    setEditorData(data);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ });
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 5: Admissions / Scholarship</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

        <h2 className='pt-5 pb-2 font-semibold'>Admission Details</h2>
        <TocClientSideCustomEditor data={editorData} onChange={handleEditorChange} />
        <br />

        <h2 className='pt-5 pb-2 font-semibold'>Scholarship Offers</h2>
        <TocClientSideCustomEditor data={editorData} onChange={handleEditorChange} />

      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepFive;