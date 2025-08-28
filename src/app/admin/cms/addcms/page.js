"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useParams, usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TocClientSideCustomEditor = dynamic(
  () => import('@/components/ui/atoms/tocCkEditor'),
  { ssr: false }
);
import axios from "axios";

function Addcms() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [returndspmsg, setReturndspmsg] = useState();
  const [cmsdescvalue, setCmsdescvalue] = useState();
  const [errForm, setErrForm] = useState(true);
  const [errTitle, setErrTitle] = useState('');
  const [errURL, setErrURL] = useState('');
  const [errmetatitle, setErrmetatitle] = useState('');
  const [errmetakeyword, setErrmetakeyword] = useState('');
  const [errmetadescription, setErrmetadescription] = useState('');

  const [editdata, setEditdata] = useState({
    cmsid: "",
    cms_title: "",
    cms_url: "",
    cms_description: "",
    cms_meta_title: "",
    cms_meta_description: "",
    cms_meta_keyword: "",
  });
  
  const handleChangeFormdata = (e) => {
    const { name, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addcms = (e) => {
    e.preventDefault();
    const {
      cms_title,
      cms_url,
      cms_meta_title,
      cms_meta_keyword,
      cms_meta_description,
    } = e.target.elements;
    if(cms_title.value == ""){
      setErrTitle('Title can not be blank!');
    }else{
      setErrTitle('');
      setErrForm(false);
    }
    if(cms_url.value == ""){
      setErrURL('URL can not be blank!');
    }else{
      setErrURL('');
      setErrForm(false);
    }
    if(cms_meta_title.value == ""){
      setErrmetatitle('Meta title can not be blank!');
    }else{
      setErrmetatitle('');
      setErrForm(false);
    } 
    if(cms_meta_keyword.value == ""){
      setErrmetakeyword('Meta keyword can not be blank!');
    }else{
      setErrmetakeyword('');
      setErrForm(false);
    }
    if(cms_meta_description.value == ""){
      setErrmetadescription('Meta description can not be blank!');
    }else{
      setErrmetadescription('');
      setErrForm(false);
    }
    if(!errForm){
      const payload = {
        cms_title: cms_title.value,
        cms_url: cms_url.value,
        cms_description: cmsdescvalue,
        cms_meta_title: cms_meta_title.value,
        cms_meta_description: cms_meta_description.value,
        cms_meta_keyword: cms_meta_keyword.value,
      };
     
        axios({
          method: "post",
          url: "/api/admin/addnewcms",
          data: payload,
        })
          .then(function (response) {
           // console.log(response);
            if (response.statusText === "OK") {
              //window.location.href = "../../questionanswerlist";
              toast.success("Successfully Added.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
              });
              setTimeout(function () {
                window.location.replace("../cms");
              }, 3000);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
  };
  // end add new Cms
  
  const createUrl = (e) => {
    var cmstitle = e.target.value;
    var cmsurl = cmstitle.replace(/[_\s]/g, "-").replace(/[^a-z0-9-\s]/gi, "");
    editdata.cms_url = cmsurl.toLowerCase();
  };
  const handleEditorChange = (data) => {
    setCmsdescvalue(data);
  };

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">
          Add New CMS
          </h1>
          <div className="actions">
            <Link
              href={"../cms"}
              alt="Back To cms Listing"
              title="Back To Cms Listing"
            >
              <svg
                className="h-6 w-6 text-stone-600"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="4" y1="6" x2="20" y2="6" />{" "}
                <line x1="4" y1="12" x2="20" y2="12" />{" "}
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="mx-auto max-w-7xl py-6 sm:px-2 lg:px-2"></div>
        <form action="" method="post" id="facilitesForm" onSubmit={addcms}>
          <div className="mt-2">
            <label
              htmlFor="college_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Title *
            </label>
            <input
              type="text"
              name="cms_title"
              value={editdata.cms_title ? editdata.cms_title : ""}
              //required="required"
              onChange={handleChangeFormdata}
              onChangeCapture={createUrl}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <hint className="text-red-700">{errTitle}</hint>
          </div>
          <div className="mt-2">
            <label
              htmlFor="college_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Title Url *
            </label>

            <input
              type="text"
              name="cms_url"
              value={editdata.cms_url ? editdata.cms_url : ""}
              //required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <hint className="text-red-700">{errURL}</hint>
          </div>

          <div className="mt-2">
            <label
              htmlFor="college_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Description
            </label>
            <TocClientSideCustomEditor data={editdata.cms_description ? editdata.cms_description : ""} onChange={handleEditorChange} />
          </div>
          
          <div className="mt-2">
            <label
              htmlFor="cms_meta_title"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Meta Title *
            </label>
            <input
              type="text"
              name="cms_meta_title"
              value={editdata.cms_meta_title ? editdata.cms_meta_title : ""}
              //required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <hint className="text-red-700">{errmetatitle}</hint>
          </div>
          <div className="mt-2">
            <label
              htmlFor="cms_meta_description"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Meta Description *
            </label>
            <input
              type="text"
              name="cms_meta_description"
              value={
                editdata.cms_meta_description
                  ? editdata.cms_meta_description
                  : ""
              }
              //required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <hint className="text-red-700">{errmetadescription}</hint>
          </div>
          <div className="mt-2">
            <label
              htmlFor="cms_meta_keyword"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Meta Keyword *
            </label>
            <input
              type="text"
              name="cms_meta_keyword"
              value={editdata.cms_meta_keyword ? editdata.cms_meta_keyword : ""}
              //required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <hint className="text-red-700">{errmetakeyword}</hint>
          </div>
          <div className="btn-section">
            <button type="button">Cancle</button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Addcms;