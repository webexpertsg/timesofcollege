"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocTextarea from "@/components/ui/atoms/tocTextarea";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import TocButton from "@/components/ui/atoms/tocButtom";

const TocClientSideCustomEditor = dynamic(
  () => import("@/components/ui/atoms/tocCkEditor"),
  { ssr: false }
);
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

function Questionanswer() {
  //   if (localStorage.getItem("login_id") <= 0) {
  //     window.location = "/login";
  //   }
  const [datas, setDatas] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [errorMsg, setErrorMsg] = useState([]);
  const [anservalue, setAnswervalue] = useState();
  const [catgoryarr, setCatgoryarr] = useState([]);
  const [categoryvalue, setCategoryvalue] = useState([]);
  const [tradingarr, setTradingarr] = useState([]);
  const [tradingvalue, setTradingvalue] = useState([]);
  const [qstatus, setQstatus] = useState("A");
  const [editdata, setEditdata] = useState({
    qid: "",
    question: "",
    question_url: "",
    qmeta_title: "",
    qmeta_description: "",
    qmeta_keyword: "",
    answer: "",
    catgories: "",
    qstatus: qstatus,
    categories: "",
    trading: "",
  });
  const searchParams = useSearchParams();
  const qid = searchParams.get("qid");
  useEffect(() => {
    /*fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));*/
    axios
      .get("/api/admin/getcategoriesarr")
      .then((response) => {
        setCatgoryarr(response.data);
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
    if (qid > 0) {
      axios
        .get("/api/admin/editquestion/?qid=" + qid)
        .then((response) => {
          if (response.data.length > 0) {
            setEditdata(response.data[0]);
            setQstatus(response.data[0].qstatus);
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
              window.location.replace("/admin/questionanswerlist");
            }, 3000);
          }
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
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const addquestion = (e) => {
    e.preventDefault();
    const {
      qid,
      question,
      qstatus,
      question_url,
      qmeta_title,
      qmeta_description,
      qmeta_keyword,
    } = e.target.elements;

    //let errorsForm = [];

    /* f (facility_name.value === "") {
      errorsForm.push(
        <div key="branameErr">Facility Name cann't be blank!</div>
      );
    } else {
      errorsForm.push();
    }

    console.log("errorsForm", errorsForm); */
    //if (errorsForm.length === 0) {
    const payload = {
      qid: qid.value,
      question: question.value,
      answer: anservalue,
      qstatus: qstatus,
      question_url: question_url.value,
      qmeta_title: qmeta_title.value,
      qmeta_description: qmeta_description.value,
      qmeta_keyword: qmeta_keyword.value,
      trading: tradingvalue.join(","),
      catgories: categoryvalue.join(","),
    };
    if (qid.value > 0) {
      //update form data
      axios({
        method: "PUT",
        url: "/api/getupdatequestion/${qid}",
        data: payload,
      })
        .then(function (response) {
          //console.log(response);
          //console.log(response.statusText);
          if (response.statusText === "OK") {
            //window.location.href = "../../questionanswerlist";
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
              window.location.replace("../../questionanswerlist");
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
        //url: "/api/addfacitly",
        url: "/api/addquestion",
        data: payload,
      })
        .then(function (response) {
          console.log(response);
          setReturndspmsg(
            "<div className={sussmsg}>Record successfully added</div>"
          );
        })
        .catch(function (error) {
          console.log(error);
          setReturndspmsg(
            "<div className={errmsg}>Error in add question record</div>"
          );
        });
    }

    /*  } else {
      setErrorMsg(errorsForm);
    } */
  };
  // end add new question
  const createUrl = (e) => {
    var questions = e.target.value;
    var qsturl = questions.replace(/[_\s]/g, "-").replace(/[^a-z0-9-\s]/gi, "");
    editdata.question_url = qsturl.toLowerCase();
  };
  const handleEditorChange = (data) => {
    setCmsdescvalue(data);
  };
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Question & Answer</h1>
          <div className="actions">
            <Link
              href={"../questionanswerlist"}
              alt="Back To Question Listing"
              title="Back To Question Listing"
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
        <form action="" method="post" id="facilitesForm" onSubmit={addquestion}>
          <div className="mt-2">
            <input
              type="hidden"
              name="qid"
              value={editdata.qid && editdata.qid}
            />
            <TocInputWithLabel
              id="question"
              label="Question"
              placeholder="Please enter question."
              value={editdata.question ? editdata.question : ""}
              required={true}
              // errmsg={errForm.question}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="question"
              label="Question URL"
              placeholder="Please enter question url ."
              value={editdata.question_url ? editdata.question_url.trim() : ""}
              required={true}
              // errmsg={errForm.question_url}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocClientSideCustomEditor
              initialData={editdata.answer ? editdata.answer : ""}
              onChange={handleEditorChange}
              label={"Answer"}
              required
              //errmsg={errForm.answer}
            />
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="categories"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="flex flex-wrap ">
              {catgoryarr.map((item, i) => (
                <div key={i} className="mt-2 text-sm">
                  <input
                    type="checkbox"
                    name="categories"
                    value={item.value}
                    onClick={categoryCheck}
                    onChange={handleChangeFormdata}
                    //onChange={(e) => handleCheckBox(e, i)}
                    className="py-2  text-sm font-semibold"
                    defaultChecked={
                      editdata.categories?.length
                        ? editdata.categories.includes(
                            JSON.stringify(item.value)
                          )
                        : false
                    }
                  />
                  <span className="py-2 px-2 text-sm font-normal text-justify">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="trading"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Trading
            </label>
            <div className="flex flex-wrap ">
              {tradingarr.map((item, i) => (
                <div key={i} className="mt-2 text-sm">
                  <input
                    type="checkbox"
                    name="trading"
                    value={item.tid}
                    defaultChecked={
                      editdata.trading?.length
                        ? editdata.trading.includes(JSON.stringify(item.tid))
                        : false
                    }
                    onClick={tradingCheck}
                    onChange={handleChangeFormdata}
                    className="py-2  text-sm font-semibold"
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
              id="qmeta_title"
              label="Title Meta Title"
              placeholder="Please enter meta title."
              value={editdata.qmeta_title ? editdata.qmeta_title : ""}
              required={true}
              //errmsg={errForm.qmeta_title}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocTextarea
              id="qmeta_description"
              label="Title Meta Description"
              placeholder="Please enter meta description."
              value={
                editdata.qmeta_description ? editdata.qmeta_description : ""
              }
              required={true}
              //errmsg={errForm.qmeta_description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="qmeta_keyword"
              label="Title Meta Description"
              placeholder="Please enter meta keyword."
              value={editdata.qmeta_keyword ? editdata.qmeta_keyword : ""}
              required={true}
              //errmsg={errForm.qmeta_keyword}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label>Status</label>
            <div className="flex gap-4">
              <TocRadioInput
                id="qstatusa"
                name="qstatus"
                value="A"
                label="Active"
                checked={qstatus === "A"}
                onChange={(e) => setQstatus(e.target.value)}
              />

              <TocRadioInput
                id="qstatusd"
                name="qstatus"
                value="D"
                label="Inactive"
                checked={qstatus === "D"}
                onChange={(e) => setQstatus(e.target.value)}
              />
            </div>
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
export default Questionanswer;
