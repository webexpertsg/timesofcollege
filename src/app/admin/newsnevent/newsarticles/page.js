"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocButton from "@/components/ui/atoms/tocButtom";
import dynamic from "next/dynamic";
const TocClientSideCustomEditor = dynamic(
  () => import("@/components/ui/atoms/tocCkEditor"),
  { ssr: false }
);
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  List,
  Table,
} from "ckeditor5";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
//import "react-toastify/ReactToastify.min.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function Newsarticles() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }

  const [errorMsg, setErrorMsg] = useState([]);
  const [catgoryarr, setCatgoryarr] = useState([]);
  const [categoryvalue, setCategoryvalue] = useState([]);
  const [tradingarr, setTradingarr] = useState([]);
  const [tradingvalue, setTradingvalue] = useState([]);
  const [descriptionvalue, setDescriptionvalue] = useState();

  const [editdata, setEditdata] = useState({
    na_id: "",
    na_type: "",
    na_title: "",
    na_url: "",
    exam_date: "",
    na_description: "",
    na_brief_description: "",
    na_categories: "",
    na_metatitle: "",
    na_metadescription: "",
    na_metakeyword: "",
    na_postedby: "",
    na_status: "A",
  });
  const [na_date, setNa_date] = useState(new Date());

  const [na_image, setNa_image] = useState();

  //const { na_id } = useParams();
  const { na_id } = "";
  useEffect(() => {
    /*fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));*/
    axios
      .get("/api/getcategoryarr")
      .then((response) => {
        setCatgoryarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/gettradingarr")
      .then((response) => {
        setTradingarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    if (na_id > 0) {
      axios
        .get("/api/editnewsart/" + na_id)
        .then((response) => {
          setEditdata(response.data[0]);
          setNa_date(response.data[0].exam_date);
        })
        .catch((error) => {
          console.error(error);
        });
      //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
    }
  }, []);
  const categoryCheck = (event) => {
    var category_array = [...categoryvalue];
    if (event.target.checked) {
      category_array = [...categoryvalue, event.target.value];
    } else {
      category_array.splice(categoryvalue.indexOf(event.target.value), 1);
    }
    setCategoryvalue(category_array);
  };
  const tradingCheck = (event) => {
    var trading_array = [...tradingvalue];
    if (event.target.checked) {
      trading_array = [...tradingvalue, event.target.value];
    } else {
      trading_array.splice(tradingvalue.indexOf(event.target.value), 1);
    }
    setTradingvalue(trading_array);
  };
  const createUrl = (e) => {
    var title = e.target.value;
    var url = title.replace(/[_\s]/g, "-").replace(/[^a-z0-9-\s]/gi, "");
    editdata.na_url = url.toLowerCase();
  };
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    //console.log("formData", formData);
    formData.append("na_image", na_image);
    formData.append("na_id", event.target.na_id.value);
    formData.append("na_type", event.target.na_type.value);
    formData.append("na_title", event.target.na_title.value);
    formData.append("na_url", event.target.na_url.value);
    formData.append(
      "na_brief_description",
      event.target.na_brief_description.value
    );
    formData.append("na_description", descriptionvalue);
    formData.append("na_metatitle", event.target.na_metatitle.value);
    formData.append(
      "na_metadescription",
      event.target.na_metadescription.value
    );
    formData.append("na_metakeyword", event.target.na_metakeyword.value);
    formData.append("na_postedby", event.target.na_postedby.value);
    formData.append("na_status", event.target.na_status.value);
    formData.append("added_by", localStorage.login_id);
    formData.append("na_trends", tradingvalue.join(","));
    formData.append("na_categories", categoryvalue.join(","));
    formData.append("old_image", event.target.old_image.value);
    formData.append("na_date", moment(na_date).format("YYYY-MM-DD"));

    //const result = await axios.post("/api/images", formData, {
    if (event.target.na_id.value > 0) {
      //update form data
      await axios({
        method: "post",
        url: "/api/getupdatenewsarticles",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //console.log(response);
          console.log(response.statusText);
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
              window.location.replace("../../newsnevent");
            }, 3000);
            //window.location.href = "../../newsnevent";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      //end update form data
    } else {
      const result = await axios
        .post("/api/addnewsarticle", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
          //console.log(response);
          console.log(response.statusText);
          if (response.statusText === "OK") {
            toast.success("Successfully added.", {
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
              window.location.replace("../newsnevent");
            }, 3000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleEditorChange = (data) => {
    setDescriptionvalue(data);
  };

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">News & Articles</h1>
          <div className="actions">
            <Link
              href={"../newsnevent"}
              alt="Back To News & Articles Listing"
              title="Back To News & Articles Listing"
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
          id="facilitesForm"
          // onSubmit_={addnews}
          onSubmit={submit}
          encType="multipart/form-data"
        >
          {/* returndspmsg && returndspmsg */}
          <div className="mt-2">
            <label
              htmlFor="na_type"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Type
            </label>
            <div>
              <select
                name="na_type"
                id="na_type"
                type="select"
                className="block w-auto p-2 mb-6 text-sm text-gray-900  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {/* <option
                value=""
                //defaultValue={editdata.na_type == "" ? "selected" : ""}
              >
                --Select One--
              </option>
              <option
                value="a"
                //selected={editdata.na_type == "a" ? "selected" : ""}
              >
                Article
              </option>
              <option
                value="e"
                // selected={editdata.na_type == "e" ? "selected" : ""}
              >
                Exam
              </option>
              <option
                value="n"
                // selected={editdata.na_type == "n" ? "selected" : ""}
              >
                News
              </option> */}
              </select>
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="na_title"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Title
            </label>
            <div>
              <input
                type="hidden"
                name="na_id"
                value={editdata.na_id && editdata.na_id}
              />
              {/* <input
                type="text"
                name="na_title"
                id="na_title"
                value={editdata.na_title ? editdata.na_title : ""}
                required="required"
                onChange={handleChangeFormdata}
                onChangeCapture={createUrl}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              /> */}
              <TocInputWithLabel
                id="na_title"
                label="Title"
                placeholder="Please enter title."
                value={editdata.na_title && editdata.na_title.trim()}
                required={true}
                //errmsg={errForm.description}
                onChange={handleChangeFormdata}
                onChangeCapture={createUrl}
              />
            </div>
            <div className="errmsg">{errorMsg[0]}</div>
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="na_url"
              label="URL"
              placeholder="Please enter URL."
              value={editdata.na_url && editdata.na_url.trim()}
              required={true}
              //errmsg={errForm.description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="na_date"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Date
            </label>
            <div>
              <DatePicker
                selected={na_date}
                onChange={(na_date) => setNa_date(na_date)}
                // value={na_date}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                dateFormat="YYYY-MM-dd"
              />
            </div>
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="na_brief_description"
              label="Brief Description"
              placeholder="Please enter URL."
              value={
                editdata.na_brief_description &&
                editdata.na_brief_description.trim()
              }
              required={true}
              //errmsg={errForm.description}
              onChange={handleChangeFormdata}
            />
          </div>

          {/* <div className="mt-2">
            <label
              htmlFor="college_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Description
            </label>
            <TocClientSideCustomEditor
              data={editdata.na_description ? editdata.na_description : ""}
              onChange={handleEditorChange}
            />
          </div> */}
          <div className="sm:col-span-4">
            <label className="block text-sm font-bold leading-6 text-gray-900">
              Category
            </label>
            <div className="flex flex-wrap ">
              {catgoryarr.map((item, i) => (
                <div key={i} className="mt-2 text-sm">
                  <input
                    type="checkbox"
                    name="categories"
                    value={item.cat_id}
                    onClick={categoryCheck}
                    onChange={handleChangeFormdata}
                    //onChange={(e) => handleCheckBox(e, i)}
                    className="py-2  text-sm font-semibold"
                    defaultChecked={
                      editdata.na_categories?.length
                        ? editdata.na_categories.includes(
                            JSON.stringify(item.cat_id)
                          )
                        : false
                    }
                  />
                  <span className="py-2 px-2 text-sm font-normal text-justify">
                    {item.category_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:col-span-4">
            <label className="block text-sm font-bold leading-6 text-gray-900">
              Trading
            </label>
            <div className="flex flex-wrap ">
              {tradingarr.map((item, i) => (
                <div key={i} className="mt-2 text-sm">
                  <input
                    type="checkbox"
                    name="trading"
                    value={item.tid}
                    onClick={tradingCheck}
                    onChange={handleChangeFormdata}
                    className="py-2  text-sm font-semibold"
                    defaultChecked={
                      editdata.na_trends?.length
                        ? editdata.na_trends.includes(",")
                          ? editdata.na_trends
                              .split(",")
                              .includes(JSON.stringify(item.tid))
                          : editdata.na_trends.includes(
                              JSON.stringify(item.tid)
                            )
                        : false
                    }
                  />
                  <span className="py-2 px-2 text-sm font-normal text-justify">
                    {item.trading_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="na_metatitle"
              label=" Meta Title"
              placeholder="Please enter URL."
              value={editdata.na_metatitle && editdata.na_metatitle.trim()}
              required={true}
              //errmsg={errForm.description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="na_metadescription"
              label=" Meta Description"
              placeholder="Please enter meta description."
              value={
                editdata.na_metadescription &&
                editdata.na_metadescription.trim()
              }
              required={true}
              //errmsg={errForm.description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="na_metakeyword"
              label=" Meta Keyword"
              placeholder="Please enter meta keyword."
              value={editdata.na_metakeyword && editdata.na_metakeyword.trim()}
              required={true}
              //errmsg={errForm.description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="na_postedby"
              label="Author / Posted By"
              placeholder="Please enter Author / Posted By."
              value={editdata.na_postedby && editdata.na_postedby.trim()}
              required={true}
              //errmsg={errForm.description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="na_metakeyword"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Image
            </label>
            <input
              type="file"
              name="na_image"
              filename={na_image}
              //onChange={handleChangeFormdata}
              onChange={(e) => setNa_image(e.target.files[0])}
              accept="image/*"
              className="ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
            <input
              type="hidden"
              name="old_image"
              value={editdata.na_image ? editdata.na_image : ""}
            ></input>
            {/* <div className="errmsg">{imageName && <img src={imageName} />}</div> */}
          </div>
          <div className="flex mt-2 sm:size-4 lx zl alt ars ary">
            <div className="lk acf cct cgl chn chu">
              <label className="block text-sm font-bold leading-6 text-gray-900">
                Status
              </label>
              <div className="flex">
                <div className="lx zg">
                  <input
                    type="radio"
                    name="na_status"
                    value="A"
                    checked={editdata.na_status == "A" && true}
                    required="required"
                    onChange={handleChangeFormdata}
                    className="oc se agc ayn bnu"
                  />
                  <label className="jw lu awg awk awv ayb">Active</label>
                </div>
                <div className="lx zg">
                  <input
                    type="radio"
                    name="na_status"
                    value="D"
                    checked={editdata.na_status == "D" && true}
                    required="required"
                    onChange={handleChangeFormdata}
                    className=""
                  />
                  <label className="jw lu awg awk awv ayb">Inactive</label>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-section flex">
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
export default Newsarticles;
