"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
//import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Notificationadd() {
  //   if (localStorage.getItem("login_id") <= 0) {
  //     window.location = "/login";
  //   }
  const searchParams = useSearchParams();
  const notif_id = searchParams.get("notif_id");

  const [editdata, setEditdata] = useState({
    notif_id: "",
    notification_title: "",
    notification_url: "",
    notification_target: "Pairent",
    notification_position: "",
    notification_status: "A",
  });

  //const { notif_id } = useParams();
  //const searchParams = request.nextUrl.searchParams;
  //const notif_id = searchParams.get("notif_id"); //
  useEffect(() => {
    // if (notif_id > 0) {
    axios
      .get("/api/admin/editnotification/?notif_id=" + notif_id)
      .then((response) => {
        setEditdata(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
    //editdata.ctype != "" && setCollegetypevalue(editdata.ctype);
    // }
  }, []);
  const handleChangeFormdata = (e) => {
    const { name, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addnotification = (e) => {
    e.preventDefault();
    const {
      notif_id,
      notification_title,
      notification_url,
      notification_target,
      notification_position,
      notification_status,
    } = e.target.elements;

    const payload = {
      notif_id: notif_id.value,
      notification_title: notification_title.value,
      notification_url: notification_url.value,
      notification_target: notification_target.value,
      notification_position: notification_position.value,
      notification_status: notification_status.value,
    };
    if (notif_id.value > 0) {
      //update form data
      axios({
        method: "PUT",
        url: "/api/getupdatenotification/${notif_id}",
        data: payload,
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
              window.location.replace("../../notifications");
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
        url: "/api/addnotification",
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
              window.location.replace("../notifications");
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

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">
            {/* {notif_id > 0 ? "Edit" : "Add New"} Notification */}
          </h1>
          <div className="actions">
            <Link
              href={"../notifications"}
              alt="Back To Notification Listing"
              title="Back To Notification Listing"
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
          id="notificationForm"
          onSubmit={addnotification}
        >
          <div className="mt-2">
            <label
              htmlFor="notification_title"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Title *
            </label>
            <input
              type="hidden"
              name="notif_id"
              value={editdata.notif_id && editdata.notif_id}
            />
            <input
              type="text"
              name="notification_title"
              value={
                editdata.notification_title ? editdata.notification_title : ""
              }
              required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>{" "}
          <div className="mt-2">
            <label
              htmlFor="notification_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Url *
            </label>

            <input
              type="url"
              name="notification_url"
              value={editdata.notification_url ? editdata.notification_url : ""}
              required="required"
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="notification_target"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Target
            </label>
            <select name="notification_target" id="notification_target">
              <option value="Pairent">Pairent</option>
              <option value="Blank">Blank</option>
            </select>
          </div>
          <div className="mt-2">
            <label
              htmlFor="notification_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Display Position
            </label>

            <input
              type="number"
              name="notification_position"
              value={
                editdata.notification_position
                  ? editdata.notification_position
                  : ""
              }
              required=""
              onChange={handleChangeFormdata}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="notification_url"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Status
            </label>
            <input
              type="radio"
              name="notification_status"
              value="A"
              className="sm:text-sm text-gray-900"
              checked={editdata.notification_status == "A" && true}
              required="required"
              onChange={handleChangeFormdata}
            />
            Active &nbsp;
            <input
              type="radio"
              value="D"
              name="notification_status"
              className="sm:text-sm text-gray-900"
              checked={editdata.notification_status == "D" && true}
              required="required"
              onChange={handleChangeFormdata}
            />
            Deactive
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
export default Notificationadd;
