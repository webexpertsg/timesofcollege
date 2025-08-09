import React, { useState } from 'react';

import TocButton from '@/components/ui/atoms/tocButtom';
import TocImageUploader from '@/components/ui/atoms/tocImageUploader';


const StepFour = ({ data, onNext, onPrevious }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ });
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 4: Gallery / Brouchure</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

      <TocImageUploader />
      <TocImageUploader />

      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepFour;