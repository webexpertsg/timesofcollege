import React, { useState } from 'react';

import TocButton from '@/components/ui/atoms/tocButtom';
import TocCheckbox from '@/components/ui/atoms/tocCheckbox';
import TocSelectList from '@/components/ui/atoms/tocSelectlist';
import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';


const StepNine = ({ data, onNext, onPrevious }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [subcoursesoptions, setSubcoursesoptions] = useState([
    {
      subcourseId: "",
      course_duration: "",
      course_fee: "",
      feetype_id: "",
      course_seats: "",
      subcoursedescription: "",
      subcourseselectioncriteria: "",
      subcourseselectiioneligibility: "",
      subcoursestype: "",
    },
  ])

    const handleSubcoursesClick = (e) => {
    setSubcoursesoptions([
      ...subcoursesoptions,
      {
        subcourseId: "",
        course_duration: "",
        course_fee: "",
        feetype_id: "",
        course_seats: "",
        subcoursedescription: "",
        subcourseselectioncriteria: "",
        subcourseselectiioneligibility: "",
        subcoursestype: "",
      },
    ]);
  }

  const handlesubcourseChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeData = [...subcoursesoptions];
    onChangeData[i][name] = value;
    setSubcoursesoptions(onChangeData);
  }

  const handleSubcoursesDelete = (i) => {
    const deleteData = [...subcoursesoptions];
    deleteData.splice(i, 1);
    setSubcoursesoptions(deleteData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ });
  }

  
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 9: Courses</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

    <h2 className='pt-5 pb-2 font-semibold'>Courses</h2>

    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="BA"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="BA.LLB"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="B. Architecture"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>

    <h2 className='pt-5 pb-2 font-semibold'>Courses Braches</h2>
    <div className="sm:col-span-4">
        {subcoursesoptions.map((item, i) => (
        <>
            <div className="flex mb-2" key={`key-${i}`}>
            <div className="sm:col-span-4 px-2">
                <TocSelectList
                id="fruit-select"
                // label="Country"
                options={[]}
                // onChange={handleChange}
                // value={selectedOption}
                />
            </div>
            <div className="sm:col-span-4 px-2">
              <TocInputWithLabel
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                // onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-4 px-2">
              <TocInputWithLabel 
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                // onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-2 px-2">
                <TocSelectList
                id="fruit-select"
                // label="Country"
                options={[]}
                // onChange={handleChange}
                // value={selectedOption}
                />
            </div>
            <div className="sm:col-span-4 px-2">
              <TocInputWithLabel 
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                // onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-4 px-2">
              <TocInputWithLabel 
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                // onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                // onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                // onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-2 px-2">
                <TocSelectList
                id="fruit-select"
                // label="Country"
                options={[]}
                // onChange={handleChange}
                // value={selectedOption}
                />
            </div>

            <div className="sm:col-span-2">
                {i === 0 && (
                <button
                    type="button"
                    onClick={handleSubcoursesClick}
                    className="addButton"
                >
                    Add
                </button>
                )}
                {i !== 0 && (
                <button
                    type="button"
                    onClick={() => handleSubcoursesDelete(i)}
                    className="removeButton"
                >
                    Delete
                </button>
                )}
            </div>
            </div>
        </>
        ))}
    </div>
    
    <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
    </div>

    </form>
  );
};

export default StepNine;