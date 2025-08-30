import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";
import { useParams } from 'next/navigation';

import { MultiStepFormContext } from '@/components/ui/containers/context';

import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';
import TocCheckbox from '@/components/ui/atoms/tocCheckbox';
import TocTextarea from '@/components/ui/atoms/tocTextarea';
import TocImageUploader from '@/components/ui/atoms/tocImageUploader';
import TocButton from '@/components/ui/atoms/tocButtom';

import { hasNotEmptyValue } from '../../../utils'

const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
)

const StepOne = ({ data, onNext }) => {
  const { formState  } = useContext(MultiStepFormContext)
  // console.log('formState------->', formState);
  
  const [clgName, setClgName] = useState(data.clgName);
  const [clgUrl, setClgUrl] = useState(data.clgUrl);
  const [clgTagLine, setClgTagLine] = useState(data.clgTagLine);
  const [clgUspRemark, setClgUspRemark] = useState(data.clgUspRemark);
  const [clgFoundationYear , setClgFoundationYear ] = useState(data.clgFoundationYear );
  const [clgIntake, setClgIntake] = useState(data.clgIntake);
  const [clgHostelAvl, setClgHostelAvl] = useState(data.clgHostelAvl);
  const [clgMetaTile, setClgMetaTile] = useState(data.clgMetaTile);
  const [clgDescription, setMetaDescription] = useState('test');

  const [clgMetaDescription, setClgMetaDescription] = useState(data.clgMetaDescription);
  const [clgMetaKeywords, setSlgMetaKeywords] = useState(data.clgMetaKeywords);
  const [clgCoupon, setClgCoupon] = useState(data.clgCoupon);
  const [clgNIRF, setClgNIRF] = useState(data.clgNIRF);

  const [error, setErrors] = useState({})

  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');
  const [isChecked, setIsChecked] = useState(false);
  const { cid } = useParams();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }

  const [selectClgType, setSelectClgType] = useState([]);
  const handleCheckboxClgType = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectClgType([...selectClgType, checkedId])
    }else{
      setSelectClgType(selectClgType.filter(id=>id !== checkedId))
    }
  }

  const [selectTrending, setSelectTrending] = useState([]);
  const handleCheckboxTrending = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectTrending([...selectTrending, checkedId])
    }else{
      setSelectTrending(selectTrending.filter(id=>id !== checkedId))
    }
  }

  const [selectApproved, setSelectApproved] = useState([]);
  const handleCheckboxApproved = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectApproved([...selectApproved, checkedId])
    }else{
      setSelectApproved(selectApproved.filter(id=>id !== checkedId))
    }
  }

  const [selectFacility, setSelectFacility] = useState([]);
  const handleCheckboxFacility = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectFacility([...selectFacility, checkedId])
    }else{
      setSelectFacility(selectFacility.filter(id=>id !== checkedId))
    }
  }
  
  const [selectCategory, setSelectCategory] = useState([]);
  const handleCheckboxCategory = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectCategory([...selectCategory, checkedId])
    }else{
      setSelectCategory(selectCategory.filter(id=>id !== checkedId))
    }
  }
  
  const [selectExam, setSelectExam] = useState([]);
  const handleCheckboxExam = (event) => {
    const checkedId = event.target.value;
    
    if(event.target.checked){
      setSelectExam([...selectExam, checkedId])
    }else{
      setSelectExam(selectExam.filter(id=>id !== checkedId))
    }
  }
  

  const handleEditorChange = (data) => {
    setEditorData(data);
  };

  const handleSubmit = async (event) =>  {
    event.preventDefault();
    // onNext({ clgName, clgUrl, clgTagLine });
    const formData = new FormData();
    
    formData.append("cid", cid);
    // formData.append("logo", logo);
    // formData.append("banner", banner);
    formData.append("college_name", clgName);
    formData.append("college_url", clgUrl);
    formData.append("tag_line", clgTagLine);
    formData.append("usp_remark", clgUspRemark);
    formData.append("found_year", clgFoundationYear);
    formData.append("intake", clgIntake);
    formData.append("hostel_available", clgHostelAvl);
    formData.append("college_descripton", clgDescription);
    // formData.append("facultyprofile", facultyprofilevalue);
    formData.append("ctype", selectClgType.join(","));
    formData.append("trading", selectTrending.join(","));
    formData.append("approvedby", selectApproved.join(","));
    formData.append("facilities", selectFacility.join(","));
    formData.append("categories", selectCategory.join(","));
    formData.append("exams", selectExam.join(","));
    formData.append("meta_title", clgMetaTile);
    formData.append("meta_keyword", clgMetaKeywords);
    formData.append("coupon_code", clgCoupon);
    formData.append("nirg_ranking", clgNIRF ? clgNIRF : 0);
    // formData.append("application_open", appopenvalue);
    formData.append("meta_description", clgMetaDescription);
    // formData.append("old_logo", event.target.old_logo.value);
    // formData.append("old_banner", event.target.old_banner.value);
    // formData.append("added_by", localStorage.login_id);


    const newErrors = basicifovalidateForm(
      Object.fromEntries(formData.entries())
    )
  
    setErrors(newErrors);

    if (!hasNotEmptyValue(newErrors)) {
      if (cid > 0) {
        //update form data
        console.log("update query ");
        await axios({
          method: "post",
          url: "/api/admin/updatebasicinformation",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //console.log(response);
            // console.log(response.statusText);
            if (response.statusText === "OK") {
              toast.success("Basic info. sucessfully updated", {
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
              //return;
              //setSuccessmsg("Successfully Updated.");
              /*  setTimeout(function () {
              window.location.replace("../../collegelisting");
            }, 3000); */
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        //end update form data
      } else {
        //console.log("insert query ");
        await axios({
          method: "post",
          url: "/api/admin/insertbasicinformation",
          data: formData,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            if (response.data["cid"] > 0 && response.statusText === "OK") {
              //setSuccessmsg("Successfully Updated.");
              toast.success("Basic info. sucessfully inserted", {
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
              window.location.href =
                "/admin/collegelisting/college/" + response.data["cid"];
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        //end basicinformation form data
      }
    }
  };

  const basicifovalidateForm = (data) => {
    const errors = {};
    // console.log(" college_name -->", data);
    if (!data.college_name.trim()) {
      errors.college_name = "College name is required.";
    }
    if (!data.college_url.trim()) {
      errors.college_url = "College url is required.";
    }
    if (!data.tag_line.trim()) {
      errors.tag_line = "Tag line is required.";
    }
    if (!data.usp_remark.trim()) {
      errors.usp_remark = "USP remark is required.";
    }
    if (!data.found_year.trim()) {
      errors.found_year = "Foundation Year is required.";
    }
    if (!data.college_descripton.trim()) {
      errors.college_descripton = "Description is required.";
    }
    if (!data.meta_title.trim()) {
      errors.meta_title = "Meta title is required.";
    }
    if (!data.meta_description.trim()) {
      errors.meta_description = "Meta description is required.";
    }
    if (!data.meta_keyword.trim()) {
      errors.meta_keyword = "Meta keyword is required.";
    }
    return errors;
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
          label="College Name"
          placeholder="Please Enter College Name."
          value={clgName}
          required={true}
          errmsg={error.college_name}
          onChange={(e) => setClgName(e.target.value)}
        />

        <TocInputWithLabel
          id="clgUrl"
          label="College URL"
          placeholder="Please Enter College URL."
          value={clgUrl}
          required={true}
          errmsg={error.college_url}
          onChange={(e) => setClgUrl(e.target.value)}
        />

        <TocInputWithLabel
          id="clgTagLine"
          label="Tag Line"
          value={clgTagLine}
          required={true}
          errmsg={error.tag_line}
          onChange={(e) => setClgTagLine(e.target.value)}
        />

        <TocInputWithLabel
          id="clgUspRemark"
          label="USP Remark"
          value={clgUspRemark}
          required={true}
          errmsg={error.usp_remark}
          onChange={(e) => setClgUspRemark(e.target.value)}
        />
      </div>

      <div className='flex gap-10'>
        <TocInputWithLabel
          id="clgFoundationYear"
          label="Foundation Year"
          value={clgFoundationYear}
          required={true}
          errmsg={error.found_year}
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

    <div className='flex flex-wrap gap-1'>
      {formState.collegetypearr.map((item, id)=>(
        <div key={`collegeType-${id}`} className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`col_type-${item.col_type}`}
            value={item.col_type}
            label={item.college_type}
            checked={selectClgType.includes(JSON.stringify(item.col_type))}
            onChange={handleCheckboxClgType}
          />
        </div>
      ))}
    </div>


    <h2 className='pt-5 pb-2 font-semibold'>Trending</h2>

    <div className='flex flex-wrap gap-1'>
      {formState.tradingarr.map((item, id)=>(
        <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`tid-${item.tid}`}
            value={item.tid}
            label={item.trading_name}
            checked={selectTrending.includes(JSON.stringify(item.tid))}
            onChange={handleCheckboxTrending}
          />
        </div>
      ))}
    </div>


    <h2 className='pt-5 pb-2 font-semibold'>Approved By</h2>

    <div className='flex flex-wrap gap-1'>
      {formState.approvedbyarr.map((item, id)=>(
        <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`approv_id-${item.approv_id}`}
            value={item.approv_id}
            label={item.approved_name}
            checked={selectApproved.includes(JSON.stringify(item.approv_id))}
            onChange={handleCheckboxApproved}
          />
        </div>
      ))}
    </div>


    <h2 className='pt-5 pb-2 font-semibold'>Facility Available</h2>
    
    <div className='flex flex-wrap gap-1'>
      {formState.facilityarr.map((item, id)=>(
        <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`facility_id-${item.facility_id}`}
            value={item.facility_id}
            label={item.facility_name}
            checked={selectFacility.includes(JSON.stringify(item.facility_id))}
            onChange={handleCheckboxFacility}
          />
        </div>
      ))}
    </div>

    
    <h2 className='pt-5 pb-2 font-semibold'>Categories</h2>
    
    <div className='flex flex-wrap gap-1'>
      {formState.catgoryarr.map((item, id)=>(
        <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`cat_id-${item.cat_id}`}
            value={item.cat_id}
            label={item.category_name}
            checked={selectCategory.includes(JSON.stringify(item.cat_id))}
            onChange={handleCheckboxCategory}
          />
        </div>
      ))}
    </div>

    
    <h2 className='pt-5 pb-2 font-semibold'>Exam</h2>

    <div className='flex flex-wrap gap-1'>
      {formState.examarr.map((item, id)=>(
        <div className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700">
          <TocCheckbox
            id={`exam_id-${item.exam_id}`}
            value={item.exam_id}
            label={item.exam_name}
            checked={selectExam.includes(JSON.stringify(item.exam_id))}
            onChange={handleCheckboxExam}
          />
        </div>
      ))}
    </div>

    <h2 className='pt-5 pb-2 font-semibold'>Faculty Profile</h2>
    <TocClientSideCustomEditor data={editorData} onChange={handleEditorChange} />
    <br/>
    
    <TocInputWithLabel
      id="clgMetaTile"
      label="Meta Title"
      value={clgMetaTile}
      required={true}
      onChange={(e) => setClgMetaTile(e.target.value)}
    />

    <TocTextarea
      id="clgMetaDescription"
      label="Meta Description"
      placeholder="Enter your message here..."
      value={clgMetaDescription}
      required={true}
      onChange={(e) => setClgMetaDescription(e.target.value)}
      rows={4}
    />

    <div className='flex gap-10'>
      <TocInputWithLabel
        id="clgMetaKeywords"
        label="Meta Keyword"
        value={clgMetaKeywords}
        required={true}
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
      <TocButton type="submit" className='pl-10 pr-10'>Save & Exit</TocButton>
      <TocButton type="submit" className='pl-10 pr-10'>Save & Next</TocButton>
   </div>
              
    </form>
  );
};

export default StepOne;