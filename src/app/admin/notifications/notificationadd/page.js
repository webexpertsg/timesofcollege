"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { hasNotEmptyValue } from "@/utils";
import { useSearchParams } from "next/navigation";
//import { Link, useParams } from "react-router-dom";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import TocButton from "@/components/ui/atoms/tocButtom";
import TocSelectList from "@/components/ui/atoms/tocSelectlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Notificationadd() {
  //   if (localStorage.getItem("login_id") <= 0) {
  //     window.location = "/login";
  //   }
  const [errForm, setErrForm] = useState({});
  const [notificationstatus, setNotificationstatus] = useState("A");
  const [notificationtarget, setNotificationtarget] = useState("");

  const [editdata, setEditdata] = useState({
    notif_id: "",
    notification_title: "",
    notification_url: "",
    notification_target: "Pairent",
    notification_position: "",
    notification_status: notificationstatus,
  });
  const searchParams = useSearchParams();
  const notif_id = searchParams.get("nid");
  useEffect(() => {
    if (notif_id) {
      axios
        .get("/api/admin/editnotification/?notif_id=" + notif_id)
        .then((response) => {
          setEditdata(response.data[0]);
          setNotificationstatus(response.data[0].notification_status);
          setNotificationtarget(response.data[0].notification_target);
        })
        .catch((error) => {
          //console.error(error);
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

  const submitNotification = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      notif_id,
      notification_title,
      notification_url,
      notification_target,
      notification_position,
      notification_status,
    } = e.target.elements;
    if (!notification_title.value.trim()) {
      newErrors.notification_title = "Title cann't be blank!";
    }
    if (!notification_url.value.trim()) {
      newErrors.notification_url = "Url cann't be blank!";
    }
    if (!notificationtarget) {
      newErrors.notification_target = "Target cann't be blank!";
    }
    if (!notification_position.value.trim()) {
      newErrors.notification_position = "Display position be blank!";
    }
    setErrForm(newErrors);
    console.log("formsubmit error ", newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        notif_id: notif_id.value,
        notification_title: notification_title.value,
        notification_url: notification_url.value,
        notification_target: notificationtarget,
        notification_position: notification_position.value,
        notification_status: notificationstatus,
      };
      if (notif_id.value > 0) {
        //update form data
        axios({
          method: "post",
          url: "/api/admin/updatenotification",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
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
                window.location.replace("/admin/notifications");
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
          url: "/api/admin/addnotification",
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
  const redircttargetarr = [
    { value: "Parent", label: "Parent" },
    { value: "Blank", label: "Blank" },
  ];

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">
            {notif_id > 0 ? "Edit" : "Add New"} Notification
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
          onSubmit={submitNotification}
        >
          <div className="mt-2">
            <input
              type="hidden"
              name="notif_id"
              value={editdata.notif_id && editdata.notif_id}
            />
            <TocInputWithLabel
              id="notification_title"
              label="Title"
              placeholder="Please enter notification."
              value={
                editdata.notification_title ? editdata.notification_title : ""
              }
              required={true}
              errmsg={errForm.notification_title}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              type="url"
              id="notification_url"
              label="Url"
              placeholder="Please enter notification url."
              value={editdata.notification_url ? editdata.notification_url : ""}
              required={true}
              errmsg={errForm.notification_url}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <TocSelectList
              id="notification_target"
              label="Redirection Target"
              options={redircttargetarr}
              value={notificationtarget}
              required={true}
              errmsg={errForm.notification_target}
              onChange={(e) => setNotificationtarget(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <TocInputWithLabel
              type="number"
              id="notification_position"
              label="Display Position"
              placeholder="Please enter display position."
              value={
                editdata.notification_position
                  ? editdata.notification_position
                  : ""
              }
              required={true}
              errmsg={errForm.notification_position}
              onChange={handleChangeFormdata}
            />
          </div>
          <div className="mt-2">
            <label>Status</label>
            <div className="flex gap-4">
              <TocRadioInput
                id="notification_statusa"
                name="notification_status"
                value="A"
                label="Active"
                checked={notificationstatus === "A"}
                //onChange={handleChangeFormdata}
                onChange={(e) => setNotificationstatus(e.target.value)}
              />

              <TocRadioInput
                id="notification_statusd"
                name="notification_status"
                value="D"
                label="Inactive"
                checked={notificationstatus === "D"}
                // onChange={handleChangeFormdata}
                onChange={(e) => setNotificationstatus(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-section">
            <button type="link">
              <Link href={"../notifications"}>Cancle</Link>
            </button>

            <TocButton type="submit" className="pl-10 pr-10 h-10">
              {editdata.notif_id > 0 ? "Update" : "Submit"}
            </TocButton>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Notificationadd;
