// components/MultiStepForm.js
import React, { useState, useEffect } from 'react';
import axios from "axios";

import { MultiStepFormContext } from '@/components/ui/containers/context';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import StepSix from './stepSix';
import StepSevevn from './stepSeven';
import StepEight from './stepEight';
import StepNine from './stepNine';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [approvedbyarr, setApprovedbyarr] = useState([]);
  const [catgoryarr, setCatgoryarr] = useState([]);
  const [coursearr, setCoursearr] = useState([]);
  const [subcoursestypearr, setSubcoursestypearr] = useState([]);
  const [subcoursearr, setSubcoursearr] = useState([]);
  const [tradingarr, setTradingarr] = useState([]);
  const [examarr, setExamarr] = useState([]);
  const [feetypearr, setFeetypearr] = useState([]);
  const [facilityarr, setFacilityarr] = useState([]);
  const [collegetypearr, setCollegetypearr] = useState([]);
  const [countryarr, setCountryarr] = useState([]);
  const [statearr, setStatearr] = useState([]);
  const [cityarr, setCityarr] = useState([]);

  // const [collegetypevalue, setCollegetypevalue] = useState([]);
  // const [tradingvalue, setTradingvalue] = useState([]);
  // const [approvedbyvalue, setApprovedbyvalue] = useState([]);
  // const [facilityvalue, setFacilityvalue] = useState([]);
  // const [categoryvalue, setCategoryvalue] = useState([]);

  const formState = {
    approvedbyarr, setApprovedbyarr,
    catgoryarr, setCatgoryarr,
    coursearr, setCoursearr,
    subcoursestypearr, setSubcoursestypearr,
    tradingarr, setTradingarr,
    examarr, setExamarr,
    feetypearr, setFeetypearr,
    facilityarr, setFacilityarr,
    collegetypearr, setCollegetypearr,
    countryarr, setCountryarr,
    statearr, setStatearr,
    cityarr, setCityarr,
  }

  const [formData, setFormData] = useState({
    clgName: '',
    clgUrl: '',
    clgTagLine: '',
    clgUspRemark: '',
    clgFoundationYear: '',
    clgIntake: '',
    clgHostelAvl: '',
    clgDescription: '',
    clgType: '',
    clgTrending: '',
    clgApprovedBy: '',
    clgFacility: '',
    clgCategories: '',
    clgExam: '',
    clgFacilityProfile: '',
    clgMetaTile: '',
    clgMetaDescription: '',
    clgMetaKeywords: '',
    clgCoupon: '',
    clgNIRF: '',
    ClgApplicationStatus: '',
    clgLogoImg: '',
    ClgBannerImg: '',

    address: '',
    city: '',
    state: '',
    country: ''
  });

  useEffect(() => {
    axios
      .get("/api/admin/getapprovedby")
      .then((response) => {
        setApprovedbyarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getcategoriesarr")
      .then((response) => {
        setCatgoryarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getcoursesarr")
      .then((response) => {
        setCoursearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getsubcoursestypearr")
      .then((response) => {
        setSubcoursestypearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getsubcoursearr")
      .then((response) => {
        setSubcoursearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/gettradingarr")
      .then((response) => {
        setTradingarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getexamlisting")
      .then((response) => {
        setExamarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getfeetypearr")
      .then((response) => {
        setFeetypearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getfacilityarr")
      .then((response) => {
        setFacilityarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getcollegetypearr")
      .then((response) => {
        setCollegetypearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getcountrylisting")
      .then((response) => {
        setCountryarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getstatelisting")
      .then((response) => {
        setStatearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    /*  axios
      .get(apiurl+"/getcityarr")
      .then((response) => {
        setCityarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      }); */

    // if (cid > 0) {
    //   axios
    //     .get("/api/admin/editcolleges/" + cid)
    //     .then((response) => {
    //       setEditdata(response.data[0]);
    //       if (response.data[0].highlights) {
    //         setHighLights(
    //           response.data[0]?.highlights
    //             ? response.data[0]?.highlights
    //             : { highParameter: "", highDetails: "" }
    //         );
    //       } else {
    //         setHighLights([{ highParameter: "", highDetails: "" }]);
    //       }
    //       /* */
    //       if (response.data[0].sub_course_details) {
    //         setSubcoursesoptions(response.data[0]?.sub_course_details);
    //       } else {
    //         setSubcoursesoptions([
    //           {
    //             subcourseId: "",
    //             course_duration: "",
    //             course_fee: "",
    //             feetype_id: "",
    //             course_seats: "",
    //             subcoursedescription: "",
    //             subcourseselectioncriteria: "",
    //             subcourseselectiioneligibility: "",
    //             subcoursestype: "",
    //           },
    //         ]);
    //       }

    //       //console.log("sd-->", response.data[0].facilities);
    //       //setFacilityvalue(JSON.stringify(response.data[0].facilities));
    //       let editfacilityArr = response.data[0].facilities;
    //       let editcollegetypeArr = response.data[0].ctype;
    //       let edittradingArr = response.data[0].trading;
    //       let editapprovedArr = response.data[0].approvedby;
    //       let editcategoriesArr = response.data[0].categories;
    //       let editexamsArr = response.data[0].exams;
    //       let editcourseArr = response.data[0].courses;
    //       setFacilityvalue(
    //         editfacilityArr.length > 0 ? editfacilityArr.split(",") : []
    //       );
    //       setCollegetypevalue(
    //         editcollegetypeArr.length > 0 ? editcollegetypeArr.split(",") : []
    //       );
    //       setTradingvalue(
    //         edittradingArr.length > 0 ? edittradingArr.split(",") : []
    //       );
    //       setApprovedbyvalue(
    //         editapprovedArr.length > 0 ? editapprovedArr.split(",") : []
    //       );
    //       setCategoryvalue(
    //         editcategoriesArr.length > 0 ? editcategoriesArr.split(",") : []
    //       );
    //       setExamvalue(editexamsArr.length > 0 ? editexamsArr.split(",") : []);
    //       setCoursevalue(
    //         editcourseArr.length > 0 ? editcourseArr.split(",") : []
    //       );
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
    //   // getting faq
    //   axios
    //     .get("/api/admin/getcollegefaq/" + cid)
    //     .then((response) => {
    //       setCollegefaqdata(response.data);
    //       //setDatas(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   // end getting faq
    // }

  }, []);

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    // Perform final submission of formData to a backend API
    console.log('Submitting form data:', formData)
    // await fetch('/api/submit-form', { method: 'POST', body: JSON.stringify(formData) });
    alert('Form submitted successfully!')
  };

  
  return (
    <MultiStepFormContext.Provider value={{ formState }}>
      <div className='p-10'>
        <div className='mb-10'>
          <ul className='flex flex-wrap gap-2 text-sm font-medium text-center text-white border-b border-gray-200 dark:border-gray-700'>
            <li className='cursor-pointer inline-block p-4 text-white-600 bg-[#5c3a7c] rounded-t-lg dark:bg-[#5c3a7c] active'>Basic Info</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Contacts</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Highlights</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Gallery / Brouchure</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Admissions / Scholarship</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Rating</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Placements</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>FAQ</li>
            <li className='cursor-pointer inline-block p-4 rounded-t-lg bg-[#bbb4c1] hover:bg-[#5c3a7c]'>Courses</li>
          </ul>
        </div>

        {currentStep === 1 && (
          <StepOne data={formData} onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <StepTwo data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 3 && (
          <StepThree data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 4 && (
          <StepFour data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 5 && (
          <StepFive data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 6 && (
          <StepSix data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 7 && (
          <StepSevevn data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 8 && (
          <StepEight data={formData} onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 9 && (
          <StepNine data={formData} onSubmit={handleSubmit} onPrevious={handlePrevious} />
        )}

        {/* Optional: Progress indicator */}
        <div className='text-center text-xl'>
          Step {currentStep} of 9
        </div>
      </div>
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepForm;