// components/MultiStepForm.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSearchParams  } from 'next/navigation';

import { hasNotEmptyValue, commaWithSingleQuotes } from '@/utils'

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

  const [isLoading, setIsLoading] = useState(false)

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

  const searchParams = useSearchParams()
  const cid = searchParams.get('cid')

  const formState = {
    approvedbyarr, setApprovedbyarr,
    catgoryarr, setCatgoryarr,
    coursearr, setCoursearr,
    subcoursearr, setSubcoursearr,
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
    clgType: [],
    clgTrending: [],
    clgApprovedBy: [],
    clgFacility: [],
    clgCategories: [],
    clgExam: [],
    clgFacilityProfile: '',
    clgMetaTile: '',
    clgMetaDescription: '',
    clgMetaKeywords: '',
    clgCoupon: '',
    clgNIRF: '',
    clgApplicationStatus: '',
    clgLogoImg: '',
    clgBannerImg: '',

    clgCountries: '1',
    clgStates: '',
    clgCities: '',
    clgAddress: '',
    clgAddress2: '',
    clgLandmark: '',
    clgPincode: '',
    clgContact: '',
    clgFax: '',
    clgEmail: '',
    clgWebsite: '',

    clgHighlights: [{ highParameter: "", highDetails: "" }],

    clgAdmission: '',
    clgScholarship: '',

    clgRateAcademic: '',
    clgRateAccommodation: '',
    clgRateFaculty: '',
    clgRateInfra: '',
    clgRatePlacements: '',
    clgRateSocial: '',
    clgRateThroughout: '',

    clgRatePlacements: '',
    clgPlacementInfo: '',
    clgTotalPlacementRatio: '',
    clgAvgPlacement: '',
    clgHighPlacement: '',
    clgLowPlacement: '',
    clgTopRecruiter: '',
    clgRecruitSector: '',
    clgTopProfile: '',

    clgSelectCourseType: [],
    clgSubCourses: [{
      subcourseId: "",
      course_duration: "",
      course_fee: "",
      feetype_id: "",
      course_seats: "",
      subcoursedescription: "",
      subcourseselectioncriteria: "",
      subcourseselectiioneligibility: "",
      subcoursestype: "",
    }]
  })

    useEffect(() => {

    },[])

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
      .get("/api/admin/getcountrylists")
      .then((response) => {
        setCountryarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getstatelists")
      .then((response) => {
        setStatearr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getcitylists")
      .then((response) => {
        setCityarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });


    if (cid > 0) {
      setIsLoading(true)
      axios
        .get(`/api/admin/editcolleges?cid=${cid}`)
        .then((response) => {
          // setEditdata(response.data[0]);
          const data = response.data[0]
          console.log('data---->', data.ctype);
          //basic info
          setFormData((prevData) => ({ ...prevData, clgName: data.college_name}));
          setFormData((prevData) => ({ ...prevData, clgName: data.college_name}));
          setFormData((prevData) => ({ ...prevData, clgUrl: data.college_url}));
          setFormData((prevData) => ({ ...prevData, clgTagLine: data.tag_line}));
          setFormData((prevData) => ({ ...prevData, clgUspRemark: data.usp_remark}));
          setFormData((prevData) => ({ ...prevData, clgFoundationYear: data.found_year}));
          setFormData((prevData) => ({ ...prevData, clgIntake: data.intake}));
          setFormData((prevData) => ({ ...prevData, clgHostelAvl: data.hostel_available}));
          setFormData((prevData) => ({ ...prevData, clgDescription: data.college_descripton}));
          setFormData((prevData) => ({ ...prevData, clgType: commaWithSingleQuotes(data.ctype)}));
          setFormData((prevData) => ({ ...prevData, clgTrending: commaWithSingleQuotes(data.trading)}));
          setFormData((prevData) => ({ ...prevData, clgApprovedBy: commaWithSingleQuotes(data.approvedby)}));
          setFormData((prevData) => ({ ...prevData, clgFacility: commaWithSingleQuotes(data.facilities)}));
          setFormData((prevData) => ({ ...prevData, clgCategories: commaWithSingleQuotes(data.categories)}));
          setFormData((prevData) => ({ ...prevData, clgExam: commaWithSingleQuotes(data.exams)}));
          setFormData((prevData) => ({ ...prevData, clgFacilityProfile: data.facultyprofile}));
          setFormData((prevData) => ({ ...prevData, clgMetaTile: data.meta_title}));
          setFormData((prevData) => ({ ...prevData, clgMetaDescription: data.meta_description}));
          setFormData((prevData) => ({ ...prevData, clgMetaKeywords: data.meta_keyword}));
          setFormData((prevData) => ({ ...prevData, clgCoupon: data.coupon_code}));
          setFormData((prevData) => ({ ...prevData, clgNIRF: data.nirg_ranking}));

          //contacts
          setFormData((prevData) => ({ ...prevData, clgCountries: data.country}));
          setFormData((prevData) => ({ ...prevData, clgStates: data.state}));
          setFormData((prevData) => ({ ...prevData, clgCities: data.city}));
          setFormData((prevData) => ({ ...prevData, clgAddress: data.address}));
          setFormData((prevData) => ({ ...prevData, clgAddress2: data.address2}));
          setFormData((prevData) => ({ ...prevData, clgLandmark: data.landmark}));
          setFormData((prevData) => ({ ...prevData, clgPincode: data.pincode}));
          setFormData((prevData) => ({ ...prevData, clgContact: data.contactno}));
          setFormData((prevData) => ({ ...prevData, clgFax: data.faxno}));
          setFormData((prevData) => ({ ...prevData, clgEmail: data.email}));
          setFormData((prevData) => ({ ...prevData, clgWebsite: data.website}));

          //Highlights
          setFormData((prevData) => ({ ...prevData, clgHighlights: data.highlights}));

          //Admission
          setFormData((prevData) => ({ ...prevData, clgAdmission: data.adminssiondetails}));
          setFormData((prevData) => ({ ...prevData, clgScholarship: data.scholarshipoffer}));

          //Rating
          setFormData((prevData) => ({ ...prevData, clgRateAcademic: data.ratingacademic}));
          setFormData((prevData) => ({ ...prevData, clgRateAccommodation: data.rattingaccommodation}));
          setFormData((prevData) => ({ ...prevData, clgRateFaculty: data.rattingfaculty}));
          setFormData((prevData) => ({ ...prevData, clgRateInfra: data.rattinginfrastructure}));
          setFormData((prevData) => ({ ...prevData, clgRatePlacements: data.rattingplacements}));
          setFormData((prevData) => ({ ...prevData, clgRateSocial: data.rattingsocial}));
          setFormData((prevData) => ({ ...prevData, clgRateThroughout: data.rattingthroughout}));

          //Placements
          setFormData((prevData) => ({ ...prevData, clgPlacementInfo: data.placement_overview}));
          setFormData((prevData) => ({ ...prevData, clgTotalPlacementRatio: data.totalplacementratio}));
          setFormData((prevData) => ({ ...prevData, clgAvgPlacement: data.averageplacementrecord}));
          setFormData((prevData) => ({ ...prevData, clgHighPlacement: data.higestplacementrecord}));
          setFormData((prevData) => ({ ...prevData, clgLowPlacement: data.lowestplacementrecord}));
          setFormData((prevData) => ({ ...prevData, clgTopRecruiter: data.toprecruiters}));
          setFormData((prevData) => ({ ...prevData, clgRecruitSector: data.toprecuitingsectors}));
          setFormData((prevData) => ({ ...prevData, clgTopProfile: data.topprofile}));

          //FAQ


          //Courses
          setFormData((prevData) => ({ ...prevData, clgSelectCourseType: commaWithSingleQuotes(data.courses)}));
          setFormData((prevData) => ({ ...prevData, clgSubCourses: data.sub_course_details ? data.sub_course_details : formData.clgSubCourses}));

          // setFormData({clgType: data.ctype})   
        setIsLoading(false)
       
        })
        .catch((error) => {
          console.error(error);
        });


      //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
      // getting faq
      // axios
      //   .get("/api/admin/getcollegefaq/" + cid)
      //   .then((response) => {
      //     setCollegefaqdata(response.data);
      //     //setDatas(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // end getting faq
    }

  }, [])

  const handleNext = (data) => {
    // setFormData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  }

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  const handleTabs = (step) => {
    setCurrentStep(step);
  }


  const handleSubmit = async () => {
    // Perform final submission of formData to a backend API
    console.log('Submitting form data:', formData)
    // await fetch('/api/submit-form', { method: 'POST', body: JSON.stringify(formData) });
    alert('Form submitted successfully!')
  };

  
  return (
    <MultiStepFormContext.Provider value={{ formState }}>
      {/* {console.log('isLoading-----', isLoading, currentStep)} */}
      { !isLoading 
      ?
      <div className='p-10'>
        <div className='mb-10'>
          <ul className='flex flex-wrap gap-2 text-sm font-medium text-center text-white border-b border-gray-200 dark:border-gray-700'>
            <li onClick={() => handleTabs(1)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg  hover:bg-[#5c3a7c] ${ currentStep === 1 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Basic Info</li>
            <li onClick={() => handleTabs(2)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 2 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Contacts</li>
            <li onClick={() => handleTabs(3)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 3 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Highlights</li>
            <li onClick={() => handleTabs(4)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 6 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Gallery / Brouchure</li>
            <li onClick={() => handleTabs(5)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 5 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Admissions / Scholarship</li>
            <li onClick={() => handleTabs(6)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 6 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Rating</li>
            <li onClick={() => handleTabs(7)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 7 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Placements</li>
            <li onClick={() => handleTabs(8)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 8 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>FAQ</li>
            <li onClick={() => handleTabs(9)} className={`cursor-pointer inline-block px-6 py-3 rounded-t-lg hover:bg-[#5c3a7c] ${ currentStep === 9 ? 'bg-[#5c3a7c] text-white-600 active' : 'bg-[#bbb4c1]'}`}>Courses</li>
          </ul>
        </div>
        {currentStep === 1 && (
          <StepOne data={formData} onNext={()=>handleNext} />
        )}
        {currentStep === 2 && (
          <StepTwo data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 3 && (
          <StepThree data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 4 && (
          <StepFour data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 5 && (
          <StepFive data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 6 && (
          <StepSix data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 7 && (
          <StepSevevn data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 8 && (
          <StepEight data={formData} onNext={()=>handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 9 && (
          <StepNine data={formData} onSubmit={()=>handleSubmit} onPrevious={handlePrevious} />
        )}

        {/* Optional: Progress indicator */}
        <div className='text-center text-xl'>
          Step {currentStep} of 9
        </div>
      </div>
      : <div className=''>Hold on few seconds, we are loading form data.</div>
    }
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepForm;