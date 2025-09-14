import React, { useContext, useState } from 'react';
import axios from "axios";
import { useSearchParams  } from 'next/navigation';

import { MultiStepFormContext } from '@/components/ui/containers/context';

import TocButton from '@/components/ui/atoms/tocButtom';
import TocCheckbox from '@/components/ui/atoms/tocCheckbox';
import TocSelectList from '@/components/ui/atoms/tocSelectlist';
import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';


const StepNine = ({ data, onNext, onPrevious }) => {
  const { formState  } = useContext(MultiStepFormContext)
    
    const [error, setErrors] = useState({})
    const [isChecked, setIsChecked] = useState(false)
    const searchParams = useSearchParams()
    const cid = searchParams.get('cid')

  const [selectCourseType, setSelectCourseType] = useState(data.clgSelectCourseType);
  const handleCheckboxCourseType = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectCourseType([...selectCourseType, checkedId])
    }else{
      setSelectCourseType(selectCourseType.filter(id=>id !== checkedId))
    }
  }

  const [subcoursesoptions, setSubcoursesoptions] = useState(data.clgSubCourses)

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

  const handlesubcourseChange = (e, i, name) => {
    const { value } = e.target;
    const onChangeData = [...subcoursesoptions];
    onChangeData[i][name] = value;
    setSubcoursesoptions(onChangeData);
  }

  const handleSubcoursesDelete = (i) => {
    const deleteData = [...subcoursesoptions];
    deleteData.splice(i, 1);
    setSubcoursesoptions(deleteData);
  }

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("cid", cid);
    formData.append("courses", selectCourseType.join(","));
    formData.append("sub_course_details", JSON.stringify(subcoursesoptions));

    if (cid > 0) {
      //update form data
      axios({
        method: "POST",
        url: "/api/admin/updatecourses",
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //console.log(response);
          console.log(response.statusText);
          if (response.statusText === "OK") {
            toast.success("Course sucessfully updated", {
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

    // onNext({ });
  }

  return (
    <form onSubmit={handleCourseSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 9: Courses</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

    <h2 className='pt-5 pb-2 font-semibold'>Courses</h2>
    <div className='flex flex-wrap gap-1'>
      {formState.coursearr.map((item, id)=> (
        <div key={`courses-${id}`} className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`courses-${item.value}`}
            value={item.value}
            label={item.label}
            checked={selectCourseType.includes(JSON.stringify(item.value))}
            onChange={handleCheckboxCourseType}
          />
        </div>
      ))}
    </div>
    {error.ctype && <hint className="text-red-700">{error.ctype}</hint>}

    {/* {console.log("subcoursesoptions=======>", formState.subcoursearr)} */}
    <h2 className='pt-5 pb-2 font-semibold'>Courses Braches</h2>
    <div className="sm:col-span-4">
        {subcoursesoptions.map((item, i) => (
        <>
          <div className="flex items-baseline mb-2" key={`key-${i}`}>
            <div className="sm:col-span-4 px-2">
                <TocSelectList
                id="subcourseId"
                // label="Country"
                options={formState.subcoursearr}
                // onChange={handleChange}
                onChange={(e) => handlesubcourseChange(e, i, 'subcourseId')}
                // value={selectedOption}
                className="lg:w-[180px]"
                />
            </div>

            <div className="sm:col-span-1 px-2">
              <TocInputWithLabel
                id="course_duration"
                name="course_duration"
                placeholder="Course Duration"
                value={item.course_duration}
                onChange={(e) => handlesubcourseChange(e, i, 'course_duration')}
                className="lg:w-[50px]"
              />
            </div>

            <div className="sm:col-span-1 px-2">
              <TocInputWithLabel 
                id="course_fee"
                name="course_fee"
                placeholder="Course Fee"
                value={item.course_fee}
                onChange={(e) => handlesubcourseChange(e, i, 'course_fee')}
                className="lg:w-[100px]"
              />
            </div>

            <div className="sm:col-span-2 px-2">
                <TocSelectList
                id="feetype_id"
                // label="Country"
                options={formState.feetypearr}
                onChange={(e) => handlesubcourseChange(e, i, 'feetype_id')}
                // value={selectedOption}
                className="lg:w-[110px]"
                />
            </div>

            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="course_seats"
                name="course_seats"
                placeholder="Available Seats"
                value={item.course_seats}
                onChange={(e) => handlesubcourseChange(e, i, 'course_seats')}
                className="lg:w-[60px]"
              />
            </div>

            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="subcoursedescription"
                name="subcoursedescription"
                placeholder="Description"
                value={item.subcoursedescription}
                onChange={(e) => handlesubcourseChange(e, i, 'subcoursedescription')}
                className="lg:w-[100px]"
              />
            </div>

            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="subcourseselectioncriteria"
                name="subcourseselectioncriteria"
                placeholder="Accepted Exams"
                value={item.subcourseselectioncriteria}
                onChange={(e) => handlesubcourseChange(e, i, 'subcourseselectioncriteria')}
              />
            </div>

            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="subcourseselectiioneligibility"
                name="subcourseselectiioneligibility"
                placeholder="Eligibility"
                value={item.subcourseselectiioneligibility}
                onChange={(e) => handlesubcourseChange(e, i, 'subcourseselectiioneligibility')}
                className="lg:w-[100px]"
              />
            </div>
            
            <div className="sm:col-span-2 px-2">
                <TocSelectList
                id="subcoursestype"
                // label="Country"
                options={formState.subcoursestypearr}
                onChange={(e) => handlesubcourseChange(e, i, 'subcoursestype')}
                // value={selectedOption}
                className="lg:w-[100px]"
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
        <TocButton type="submit" className='pl-10 pr-10 mr-2'>Save & Exit</TocButton>
    </div>

    </form>
  );
};

export default StepNine;