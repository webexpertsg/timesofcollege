"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { hasNotEmptyValue, commaWithSingleQuotes } from "@/utils";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocSelectList from "@/components/ui/atoms/tocSelectlist";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import TocButton from "@/components/ui/atoms/tocButtom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
function Advertisementadd() {
  //   if (localStorage.getItem("login_id") <= 0) {
  //     window.location = "/login";
  //   }
  const [errForm, setErrForm] = useState({});
  const [displayposition, setDisplayposition] = useState("");
  const [displaypage, setDisplaypage] = useState("");
  const [editdata, setEditdata] = useState({
    ad_id: "",
    ad_title: "",
    ad_disp_position: "",
    ad_disp_page: "",
    ad_disp_date_from: "",
    ad_disp_date_to: "",
    ad_url: "",
    ad_image: "",
  });
  const [ad_image, setAd_image] = useState();
  const [ad_disp_date_from, setAd_disp_date_from] = useState(new Date());
  const [ad_disp_date_to, setAd_disp_date_to] = useState(new Date());
  const searchParams = useSearchParams();
  const ad_id = searchParams.get("adid");

  useEffect(() => {
    if (ad_id > 0) {
      axios
        .get("/api/admin/editadvertisement/?adid=" + ad_id)
        .then((response) => {
          setEditdata(response.data[0]);
          setAd_disp_date_from(response.data[0].date_from);
          setAd_disp_date_to(response.data[0].date_to);
          setDisplayposition(response.data[0].ad_disp_position);
          setDisplaypage(response.data[0].ad_disp_page);
          console.log("...>>>", response.data[0].date_from);
        })
        .catch((error) => {
          console.error(error);
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

  const submitAddadvertisement = async (event) => {
    const newErrors = {};
    setErrForm(newErrors);
    event.preventDefault();
    if (!hasNotEmptyValue(newErrors)) {
    }

    const formData = new FormData();
    formData.append("ad_image", ad_image);
    formData.append("ad_id", event.target.ad_id.value);
    formData.append("ad_title", event.target.ad_title.value);
    formData.append("ad_disp_position", displayposition);
    formData.append("ad_disp_page", displaypage);
    //formData.append("ad_disp_date_from", event.target.ad_disp_date_from.value);
    formData.append(
      "ad_disp_date_from",
      moment(ad_disp_date_from).format("YYYY-MM-DD")
    );
    //formData.append("ad_disp_date_to", event.target.ad_disp_date_to.value);
    formData.append(
      "ad_disp_date_to",
      moment(ad_disp_date_to).format("YYYY-MM-DD")
    );
    formData.append("ad_url", event.target.ad_url.value);
    formData.append("old_image", event.target.ad_old_images.value);

    if (event.target.ad_id.value > 0) {
      //update form data
      axios({
        method: "POST",
        //url: "/api/updatevertisement/${ad_id}",
        url: "/api/admin/updatevertisement/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
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
              window.location.replace("../../advertisement");
            }, 3000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      //end update form data
    } else {
      axios({
        method: "post",
        url: "/api/admin/addadvertisement",
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
              window.location.replace("../advertisement");
            }, 3000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    /*  } else {
      setErrorMsg(errorsForm);
    } */
  };
  // end add new Cms
  console.log("ad_disp_date_to", ad_disp_date_to);
  const displaypositionarr = [
    { value: "top", label: "Top" },
    { value: "right", label: "Right" },
    { value: "bottom", label: "Bottom" },
  ];
  const displaypagearr = [
    { value: "home", label: "Home" },
    { value: "exam", label: "Exam Listing" },
    { value: "course", label: "Course Listing" },
    { value: "search", label: "Search Page" },
  ];
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">
            {ad_id > 0 ? "Edit" : "Add New"} Advertisement
          </h1>
          <div className="actions">
            <Link
              href={"../advertisement"}
              alt="Back To Advertisement Listing"
              title="Back To Advertisement Listing"
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
        <form
          action=""
          method="post"
          id="advertisementForm"
          onSubmit={submitAddadvertisement}
          encType="multipart/form-data"
        >
          <div className="mt-2">
            <input
              type="hidden"
              name="ad_id"
              value={editdata.ad_id && editdata.ad_id}
            />
            <TocInputWithLabel
              id="ad_title"
              label="Title"
              placeholder="Please enter title."
              value={editdata.ad_title ? editdata.ad_title : ""}
              required={true}
              // errmsg={errForm.ad_title}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="ad_url"
              label="URL"
              placeholder="Please enter url."
              value={editdata.ad_url ? editdata.ad_url : ""}
              required={true}
              // errmsg={errForm.ad_url}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="ad_disp_date_from"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Date From
            </label>
            <DatePicker
              selected={ad_disp_date_from}
              onChange={(ad_disp_date_from) =>
                setAd_disp_date_from(ad_disp_date_from)
              }
              // value={ad_disp_date_from}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              dateFormat="YYYY-MM-dd"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="ad_disp_date_to"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Date To
            </label>
            <DatePicker
              selected={ad_disp_date_to}
              onChange={(ad_disp_date_to) =>
                setAd_disp_date_to(ad_disp_date_to)
              }
              //value={ad_disp_date_to}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="mt-2">
            <TocSelectList
              id="ad_disp_position"
              label="Display Position"
              options={displaypositionarr}
              value={displayposition}
              required={true}
              //errmsg={errForm.ad_disp_position}
              onChange={(e) => setDisplayposition(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <TocSelectList
              id="ad_disp_page"
              label="Display Page"
              options={displaypagearr}
              value={displaypage}
              required={true}
              //errmsg={errForm.ad_disp_page}
              onChange={(e) => setDisplaypage(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="ad_image"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Banner
            </label>

            <input
              type="hidden"
              name="ad_old_images"
              value={editdata.ad_image}
            />
            <input
              type="file"
              name="ad_image"
              required={!editdata.ad_id ? "required" : ""}
              filename={ad_image}
              onChange={(e) => setAd_image(e.target.files[0])}
              accept="image/*"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="btn-section">
            <button type="button">Cancle</button>
            <TocButton type="submit" className="pl-10 pr-10 h-10">
              {editdata.ad_id > 0 ? "Update" : "Submit"}
            </TocButton>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Advertisementadd;
