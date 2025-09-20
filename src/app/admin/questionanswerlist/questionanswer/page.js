"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { hasNotEmptyValue, commaWithSingleQuotes, createUrl } from "@/utils";
import { useSearchParams } from "next/navigation";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocTextarea from "@/components/ui/atoms/tocTextarea";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import TocCheckbox from "@/components/ui/atoms/tocCheckbox";
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
  const [errForm, setErrForm] = useState({});
  const [anservalue, setAnswervalue] = useState("");
  const [catgoryarr, setCatgoryarr] = useState([]);
  const [tradingarr, setTradingarr] = useState([]);
  const [tradingvalue, setTradingvalue] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectTrading, setSelectTrading] = useState([]);

  const [qstatus, setQstatus] = useState("A");
  const [editdata, setEditdata] = useState({
    qid: "",
    question: "",
    question_url: "",
    qmeta_title: "",
    qmeta_description: "",
    qmeta_keyword: "",
    answer: anservalue,
    catgories: "",
    qstatus: qstatus,
    categories: selectCategory,
    trading: selectTrading,
  });
  const searchParams = useSearchParams();
  const qid = searchParams.get("qid");
  useEffect(() => {
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
            //setAnswervalue(response.data[0].answer);
            setSelectCategory(
              commaWithSingleQuotes(response.data[0].catgories)
            );
            setSelectTrading(commaWithSingleQuotes(response.data[0].trading));
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
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitAddquestion = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      qid,
      question,
      question_url,
      qmeta_title,
      qmeta_description,
      qmeta_keyword,
    } = e.target.elements;
    if (!question.value.trim()) {
      newErrors.question = "Title can not be blank!";
    }
    if (!question_url.value.trim()) {
      newErrors.question_url = "URL can not be blank!";
    }
    if (!anservalue) {
      newErrors.answer = "Answer can not be blank!";
    }
    if (!selectCategory) {
      newErrors.category = "Please select category!";
    }
    if (!selectTrading) {
      newErrors.trading = "Please select trading!";
    }
    if (!qmeta_title.value.trim()) {
      newErrors.qmeta_title = "Meta title can not be blank!";
    }
    if (!qmeta_description.value.trim()) {
      newErrors.qmeta_description = "Meta description can not be blank!";
    }
    if (!qmeta_keyword.value.trim()) {
      newErrors.qmeta_keyword = "Meta keyword can not be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        qid: qid.value,
        question: question.value,
        answer: anservalue,
        question_url: question_url.value,
        qmeta_title: qmeta_title.value,
        qmeta_description: qmeta_description.value,
        qmeta_keyword: qmeta_keyword.value,
        //trading: tradingvalue.join(","),
        //catgories: categoryvalue.join(","),
        trading: selectTrading.join(","),
        catgories: selectCategory.join(","),
        qstatus: qstatus,
      };
      if (qid.value > 0) {
        //update form data
        axios({
          method: "post",
          url: "/api/admin/updatequestion/",
          data: payload,
        })
          .then(function (response) {
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
                window.location.replace("/admin/questionanswerlist");
              }, 3000);
            }
          })
          .catch(function (error) {
            console.log(error);
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
          url: "/api/admin/addquestion",
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
                window.location.replace("/admin/questionanswerlist");
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
            console.log(error);
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
  // end add new question
  // const createUrl = (e) => {
  //   var questions = e.target.value;
  //   var qsturl = questions.replace(/[_\s]/g, "-").replace(/[^a-z0-9-\s]/gi, "");
  //   editdata.question_url = qsturl.toLowerCase();
  // };
  const urlLink = (e) => {
    editdata.question_url = createUrl(e);
  };

  const handleEditorChange = (data) => {
    setAnswervalue(data);
  };
  const handleCheckboxCategory = (event) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectCategory([...selectCategory, checkedId]);
    } else {
      setSelectCategory(selectCategory.filter((id) => id !== checkedId));
    }
  };
  const handleCheckboxTrading = (event) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectTrading([...selectTrading, checkedId]);
    } else {
      setSelectTrading(selectTrading.filter((id) => id !== checkedId));
    }
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
        <form
          action=""
          method="post"
          id="questionForm"
          onSubmit={submitAddquestion}
        >
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
              errmsg={errForm.question}
              onChange={handleChangeFormdata}
              onChangeCapture={urlLink}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="question_url"
              label="Question URL"
              placeholder="Please enter question url ."
              value={editdata.question_url ? editdata.question_url.trim() : ""}
              required={true}
              errmsg={errForm.question_url}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocClientSideCustomEditor
              initialData={editdata.answer ? editdata.answer : ""}
              onChange={handleEditorChange}
              label={"Question Answer"}
              required
              errmsg={errForm.answer}
            />
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="categories"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Category <span className="text-red-700">*</span>
            </label>
            <div className="flex flex-wrap gap-1 ">
              {catgoryarr.map((item, i) => (
                <div
                  key={`cat-${i}`}
                  className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700"
                >
                  <TocCheckbox
                    id={`modules-${item.value}`}
                    value={item.value}
                    label={item.label}
                    checked={selectCategory.includes(
                      JSON.stringify(item.value)
                    )}
                    onChange={handleCheckboxCategory}
                  />
                </div>
              ))}
            </div>
            {errForm.category && (
              <div className="text-red-700">{errForm.category}</div>
            )}
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="trading-title"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Trading <span className="text-red-700">*</span>
            </label>
            <div className="flex flex-wrap gap-1">
              {tradingarr.map((item, i) => (
                <div
                  key={`tkeys-${i}`}
                  className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700"
                >
                  <TocCheckbox
                    id={`trad-${item.tid}`}
                    value={item.tid}
                    label={item.trading_name}
                    checked={selectTrading.includes(JSON.stringify(item.tid))}
                    onChange={handleCheckboxTrading}
                  />
                </div>
              ))}
            </div>
            {errForm.trading && (
              <div className="text-red-700">{errForm.trading}</div>
            )}
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="qmeta_title"
              label="Title Meta Title"
              placeholder="Please enter meta title."
              value={editdata.qmeta_title ? editdata.qmeta_title : ""}
              required={true}
              errmsg={errForm.qmeta_title}
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
              errmsg={errForm.qmeta_description}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              id="qmeta_keyword"
              label="Title Meta Keyword"
              placeholder="Please enter meta keyword."
              value={editdata.qmeta_keyword ? editdata.qmeta_keyword : ""}
              required={true}
              errmsg={errForm.qmeta_keyword}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label>Status</label>
            <div className="flex gap-4">
              <TocRadioInput
                id="q_statusa"
                name="q_status"
                value="A"
                label="Active"
                checked={qstatus === "A"}
                onChange={(e) => setQstatus(e.target.value)}
              />

              <TocRadioInput
                id="q_statusd"
                name="q_status"
                value="D"
                label="Inactive"
                checked={qstatus === "D"}
                onChange={(e) => setQstatus(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-section">
            <button type="button">Cancle</button>
            <TocButton type="submit" className="pl-10 pr-10 h-10">
              {editdata.nid > 0 ? "Update" : "Submit"}
            </TocButton>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Questionanswer;
