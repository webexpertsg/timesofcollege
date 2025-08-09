import React, { useState } from 'react';

import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';
import TocButton from '@/components/ui/atoms/tocButtom';
import TocSelectlist from '@/components/ui/atoms/tocSelectlist';
import TocSelectList from '@/components/ui/atoms/tocSelectlist';


const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

const StepTwo = ({ data, onNext, onPrevious }) => {
  const [clgName, setClgName] = useState(data.clgName);
  const [clgUrl, setClgUrl] = useState(data.clgUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 2: Contacts</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

      <div className='flex gap-10'>
        <TocSelectList
          id="fruit-select"
          label="Country"
          options={options}
        // onChange={handleChange}
        // value={selectedOption}
        />

        <TocSelectList
          id="fruit-select"
          label="State"
          options={options}
        // onChange={handleChange}
        // value={selectedOption}
        />

        <TocSelectList
          id="fruit-select"
          label="City"
          options={options}
        // onChange={handleChange}
        // value={selectedOption}
        />
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgName"
          label="Address *"
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgName"
          label="Address2"
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgName"
          label="Landmark"
          placeholder="Please Enter College Name."
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgName"
          label="Pin Code"
          placeholder="Please Enter College Name."
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgName"
          label="Contact No."
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgName"
          label="Fax No."
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgName"
          label="Email"
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgName"
          label="Website"
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />
      </div>


      <div className='flex gap-4 justify-end'>
          <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepTwo;