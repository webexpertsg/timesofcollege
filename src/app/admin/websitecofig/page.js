"use client"
import React, { useState, useEffect } from "react";
import {Link,useParams} from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import DatePicker from "react-datepicker";
// import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";
function Websitconfig() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }

  const [editdata, setEditdata] = useState({
    college_title_append: "",
  });
  useEffect(() => {
    axios
      .get("/api/admin/websiteconfig/")
      .then((response) => {
        setEditdata(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleChangeFormdata = (e) => {
    const { name, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updatewebconfigsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "college_title_append",
      event.target.college_title_append.value
    );

    //update form data
    axios({
      method: "GET",
      //url: "/api/updatevertisement/${ad_id}",
      url: "/api/admin/getupdatewebconfing/",
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
          // setTimeout(function () {
          //   window.location.replace("../websitecofig");
          // }, 3000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //end update form data
  };

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Website Config</h1>
        </div>
      </div>

      <div className="p-2">
        <div className="mx-auto max-w-7xl py-6 sm:px-2 lg:px-2"></div>
        <form
          action=""
          method="post"
          id="advertisementForm"
          onSubmit={updatewebconfigsubmit}
          encType="multipart/form-data"
        >
          <div className="mt-2">
            <label
              htmlFor="college_title_append"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              College Title Append *
            </label>
            <input
              type="text"
              name="college_title_append"
              value={
                editdata.college_title_append
                  ? editdata.college_title_append
                  : ""
              }
              required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="btn-section">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Websitconfig;
