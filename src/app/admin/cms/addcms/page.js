"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { hasNotEmptyValue } from "@/utils";
import { useSearchParams } from "next/navigation";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocTextarea from "@/components/ui/atoms/tocTextarea";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import TocButton from "@/components/ui/atoms/tocButtom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const TocClientSideCustomEditor = dynamic(
  () => import("@/components/ui/atoms/tocCkEditor"),
  { ssr: false }
);

import axios from "axios";

function Addcms() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [cmsdescvalue, setCmsdescvalue] = useState();
  const [errForm, setErrForm] = useState({});
  const [cmsstatus, setCmsstatus] = useState("A");
  const [editdata, setEditdata] = useState({
    cmsid: "",
    cms_title: "",
    cms_url: "",
    cms_description: "",
    cms_meta_title: "",
    cms_meta_description: "",
    cms_meta_keyword: "",
    cms_status: cmsstatus,
  });
  const searchParams = useSearchParams();
  const cmsid = searchParams.get("cmsid");
  useEffect(() => {
    if (cmsid > 0) {
      axios
        .get("/api/admin/editcms/?cmsid=" + cmsid)
        .then((response) => {
          if (response.data.length > 0) {
            setEditdata(response.data[0]);
            setCmsstatus(response.data[0].cms_status);
          } else {
            toast.error("Edit id not exits.", {
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
              window.location.replace("/admin/cms");
            }, 3000);
          }
        })
        .catch((error) => {
          //console.error(error);
          toast.success(error, {
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
        });
      //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
    }
  }, []);
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitAddcms = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      cmsid,
      cms_title,
      cms_url,
      cms_meta_title,
      cms_meta_keyword,
      cms_meta_description,
    } = e.target.elements;

    if (!cms_title.value.trim()) {
      newErrors.cms_title = "Title cann't be blank!";
    }
    if (!cms_url.value.trim()) {
      newErrors.cms_url = "URL cann't be blank!";
    }
    if (!cms_meta_title.value.trim()) {
      newErrors.cms_meta_title = "Meta title cann't be blank!";
    }
    if (!cms_meta_description.value.trim()) {
      newErrors.cms_meta_description = "Meta description cann't be blank!";
    }
    if (!cms_meta_keyword.value.trim()) {
      newErrors.cms_meta_keyword = "Meta keyword cann't be blank!";
    }

    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        cmsid: cmsid.value,
        cms_title: cms_title.value,
        cms_url: cms_url.value,
        cms_description: cmsdescvalue,
        cms_meta_title: cms_meta_title.value,
        cms_meta_description: cms_meta_description.value,
        cms_meta_keyword: cms_meta_keyword.value,
        cms_status: cmsstatus,
      };
      if (cmsid.value > 0) {
        //update form data
        axios({
          method: "POST",
          url: "/api/admin/updatecms/",
          data: payload,
        })
          // axios
          //   .post("/api/admin/getupdatecms/", payload, {
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   })
          .then(function (response) {
            //console.log(response);
            //console.log(response.statusText);
            if (response.statusText === "OK") {
              toast.success("Successfully Updated.", {
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
                window.location.replace("/admin/cms");
              }, 3000);
            }
          })
          .catch(function (error) {
            //console.log(error);
            toast.error(error, {
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
          });
        //end update form data
      } else {
        axios({
          method: "post",
          url: "/api/admin/addnewcms",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
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
                window.location.replace("/admin/cms");
              }, 3000);
            } else {
              toast.error(response.error, {
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
            }
          })
          .catch(function (error) {
            //console.log(error);
            toast.error(error, {
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
          });
      }
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
            {cmsid > 0 ? "Edit" : "Add New"} CMS
          </h1>
          <div className="actions">
            <Link
              href={"/admin/cms"}
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
        <form action="" method="post" id="addcmsForm" onSubmit={submitAddcms}>
          <div className="mt-2">
            <input
              type="hidden"
              name="cmsid"
              value={editdata.cmsid && editdata.cmsid}
            />
            <TocInputWithLabel
              id="cms_title"
              label="Title"
              placeholder="Please enter title."
              value={editdata.cms_title ? editdata.cms_title : ""}
              required={true}
              errmsg={errForm.cms_title}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="cms_url"
              label="Title Url"
              placeholder="Please enter url."
              value={editdata.cms_url ? editdata.cms_url : ""}
              required={true}
              errmsg={errForm.cms_url}
              onChange={handleChangeFormdata}
            />
          </div>

          <div className="mt-2">
            <TocClientSideCustomEditor
              initialData={
                editdata.cms_description ? editdata.cms_description : ""
              }
              onChange={handleEditorChange}
              label={"Description"}
              required
              errmsg={errForm.cms_description}
            />
          </div>

          <div className="mt-2">
            <TocInputWithLabel
              id="cms_meta_title"
              label="Title Meta Title"
              placeholder="Please enter meta title."
              value={editdata.cms_meta_title ? editdata.cms_meta_title : ""}
              required={true}
              errmsg={errForm.cms_meta_title}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocTextarea
              id="cms_meta_description"
              label="Title Meta Description"
              placeholder="Please enter meta description."
              value={
                editdata.cms_meta_description
                  ? editdata.cms_meta_description
                  : ""
              }
              required={true}
              errmsg={errForm.cms_meta_description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="cms_meta_keyword"
              label="Title Meta Description"
              placeholder="Please enter meta keyword."
              value={editdata.cms_meta_keyword ? editdata.cms_meta_keyword : ""}
              required={true}
              errmsg={errForm.cms_meta_keyword}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label>Status</label>
            <div className="flex gap-4">
              <TocRadioInput
                id="cms_statusa"
                name="cms_status"
                value="A"
                label="Active"
                checked={cmsstatus === "A"}
                onChange={(e) => setCmsstatus(e.target.value)}
              />

              <TocRadioInput
                id="cms_statusd"
                name="cms_status"
                value="D"
                label="Inactive"
                checked={cmsstatus === "D"}
                onChange={(e) => setCmsstatus(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-section">
            <button type="button">Cancle</button>
            <TocButton type="submit" className="pl-10 pr-10 h-10">
              {editdata.cmsid > 0 ? "Update" : "Submit"}
            </TocButton>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Addcms;
