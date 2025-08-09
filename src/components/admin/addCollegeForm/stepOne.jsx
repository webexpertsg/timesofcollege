import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';
import TocCheckbox from '@/components/ui/atoms/tocCheckbox';
import TocTextarea from '@/components/ui/atoms/tocTextarea';
import TocImageUploader from '@/components/ui/atoms/tocImageUploader';
import TocButton from '@/components/ui/atoms/tocButtom';

const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
);

const StepOne = ({ data, onNext }) => {
  const [clgName, setClgName] = useState(data.clgName);
  const [clgUrl, setClgUrl] = useState(data.clgUrl);

  const [clgTagLine, setClgTagLine] = useState(data.clgTagLine);
  const [clgUspRemark, setClgUspRemark] = useState(data.clgUspRemark);
  const [clgFoundationYear , setClgFoundationYear ] = useState(data.clgFoundationYear );
  const [clgIntake, setClgIntake] = useState(data.clgIntake);
  const [clgHostelAvl, setClgHostelAvl] = useState(data.clgHostelAvl);
  const [clgMetaTile, setClgMetaTile] = useState(data.clgMetaTile);
  const [clgMetaDescription, setClgMetaDescription] = useState(data.clgMetaDescription);
  const [clgMetaKeywords, setSlgMetaKeywords] = useState(data.clgMetaKeywords);
  const [clgCoupon, setClgCoupon] = useState(data.clgCoupon);
  const [clgNIRF, setClgNIRF] = useState(data.clgNIRF);



  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleEditorChange = (data) => {
    setEditorData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ clgName, clgUrl, clgTagLine });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 1: Basic Info</h2>
        <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgName"
          label="College Name *"
          placeholder="Please Enter College Name."
          value={clgName}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgUrl"
          label="College URL *"
          placeholder="Please Enter College URL."
          value={clgUrl}
          onChange={(e) => setClgUrl(e.target.value)}
        />

        <TocInputWithLabel
          id="clgTagLine"
          label="Tag Line *"
          value={clgTagLine}
          onChange={(e) => setClgTagLine(e.target.value)}
        />

        <TocInputWithLabel
          id="clgUspRemark"
          label="USP Remark *"
          value={clgUspRemark}
          onChange={(e) => setClgUspRemark(e.target.value)}
        />
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgFoundationYear"
          label="Foundation Year *"
          value={clgFoundationYear}
          onChange={(e) => setClgFoundationYear(e.target.value)}
        />

        <TocInputWithLabel
          id="clgIntake"
          label="Intake"
          value={clgIntake}
          onChange={(e) => setClgIntake(e.target.value)}
        />

        <TocInputWithLabel
          id="clgHostelAvl"
          label="Hostel Available"
          value={clgHostelAvl}
          onChange={(e) => setClgHostelAvl(e.target.value)}
        />
      </div>
 



      <h2 className='pt-5 pb-2 font-semibold'>Description *</h2>
      <TocClientSideCustomEditor data={editorData} onChange={handleEditorChange} />
      {/* <h2>Editor Content:</h2> */}
      {/* <div dangerouslySetInnerHTML={{ __html: editorData }} /> */}

      <h2 className='pt-5 pb-3 font-semibold'>College Type</h2>

    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Autonomous"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Autonomous"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>


    <h2 className='pt-5 pb-2 font-semibold'>Trending</h2>

    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Abroad Admission"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Admission Process"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>


    <h2 className='pt-5 pb-2 font-semibold'>Approved By</h2>

    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Abroad Admission"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Admission Process"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>


    <h2 className='pt-5 pb-2 font-semibold'>Facility Available</h2>

    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Abroad Admission"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Admission Process"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>

    
    <h2 className='pt-5 pb-2 font-semibold'>Categories</h2>
    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Abroad Admission"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
    
    <h2 className='pt-5 pb-2 font-semibold'>Exam</h2>
    <div className='flex gap-1'>
      <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
        <TocCheckbox
          id="myCheckbox"
          label="Abroad Admission"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>

    <h2 className='pt-5 pb-2 font-semibold'>Faculty Profile</h2>
    <TocClientSideCustomEditor data={editorData} onChange={handleEditorChange} />
    <br/>
    
    <TocInputWithLabel
      id="clgMetaTile"
      label="Meta Title *"
      value={clgMetaTile}
      onChange={(e) => setClgMetaTile(e.target.value)}
    />

    <TocTextarea
      id="clgMetaDescription"
      label="Meta Description *"
      placeholder="Enter your message here..."
      value={clgMetaDescription}
      onChange={(e) => setClgMetaDescription(e.target.value)}
      rows={4}
    />

    <div className='flex gap-10'>
      <TocInputWithLabel
        id="clgMetaKeywords"
        label="Meta Keyword *"
        value={clgMetaKeywords}
        onChange={(e) => setSlgMetaKeywords(e.target.value)}
      />

      <TocInputWithLabel
        id="clgCoupon"
        label="Coupon Code"
        value={clgCoupon}
        onChange={(e) => setClgCoupon(e.target.value)}
      />

      <TocInputWithLabel
        id="clgNIRF"
        label="NIRF Ranking"
        value={clgNIRF}
        onChange={(e) => setClgNIRF(e.target.value)}
      />
      
      <TocCheckbox 
        id="myCheckbox"
        label="Application Open"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>

    <div className='flex gap-10'>    
      <TocImageUploader />
      <TocImageUploader />
    </div>

    <br/>
 
   <div className='flex justify-end'>
      <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
   </div>
              
    </form>
  );
};

export default StepOne;