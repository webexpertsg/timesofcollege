// components/MultiStepForm.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSearchParams  } from 'next/navigation';

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
          setFormData((prevData) => ({ ...prevData, clgName: data.college_name}));
          setFormData((prevData) => ({ ...prevData, clgName: data.college_name}));
          setFormData((prevData) => ({ ...prevData, clgUrl: data.college_url}));
          setFormData((prevData) => ({ ...prevData, clgTagLine: data.tag_line}));
          setFormData((prevData) => ({ ...prevData, clgUspRemark: data.usp_remark}));
          setFormData((prevData) => ({ ...prevData, clgFoundationYear: data.found_year}));
          setFormData((prevData) => ({ ...prevData, clgIntake: data.intake}));
          setFormData((prevData) => ({ ...prevData, clgHostelAvl: data.hostel_available}));
          setFormData((prevData) => ({ ...prevData, clgType: data.ctype}));


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
      {console.log('isLoading-----', isLoading)}
      { !isLoading 
      ?
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
        {
        console.log('formData--->', formData)
        }
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
      : <div className=''>Hold on few seconds, we are loading form data.</div>
    }
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepForm;