// components/MultiStepForm.js
import React, { useState } from 'react';
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
  );
};

export default MultiStepForm;