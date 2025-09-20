"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { hasNotEmptyValue } from "@/utils";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocTextarea from "@/components/ui/atoms/tocTextarea";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TocButton from "@/components/ui/atoms/tocButtom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Exam() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [datas, setDatas] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [examstatus, setExamstatus] = useState("A");
  const [editdata, setEditdata] = useState({
    exam_id: "",
    emeta_description: "",
    emeta_keyword: "",
    emeta_title: "",
    exam_name: "",
    exam_url: "",
    exam_status: examstatus,
  });
  useEffect(() => {
    axios
      .get("/api/admin/getexamlisting")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  //const data = JSON.parse(datas);
  //const keys = Object.keys(data.length ? data[0] : {});
  const data = datas;

  const columns = [
    {
      accessorKey: "exam_name", //simple recommended way to define a column
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "exam_url", //simple recommended way to define a column
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },

    {
      accessorKey: "exam_brief", //simple recommended way to define a column
      header: "Brief",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "status", //simple recommended way to define a column
      header: "Status",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => (
        <span>
          {cell.getValue() !== "Inactive" ? (
            <span className="text-green-700">{cell.getValue()}</span>
          ) : (
            <span className="text-red-700">{cell.getValue()}</span>
          )}
        </span>
      ), //optional custom cell render
    },
  ];
  const [rowSelection, setRowSelection] = useState({});
  const addnewexam = () => {
    setIsEditOpen(true);
    setEditdata("");
    setErrForm({});
    setExamstatus("A");
  };
  const editDetails = (editval) => {
    console.log("Edit exam id:", editval);
    axios
      .get("/api/admin/editexam/?exam_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: false,
    enablePagination: true, //disable a default feature
    enableRowActions: true,
    onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
    state: { rowSelection }, //manage your own state, pass it back to the table (optional)
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => setIsEditOpen(true)}>
            <EditIcon
              onClick={() => {
                // table.setEditingRow(row);
                editDetails(row.original.exam_id);

                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.exam_status === "A" && (
          <Tooltip title="Inactive">
            <IconButton color="error">
              <VisibilityOffIcon
                onClick={() => openInactiveConfirmModal(row)}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  });
  // add new exam
  const openInactiveConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      inactiveRecord(row.original.exam_id);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (exam_id) => {
    if (exam_id > 0) {
      axios
        .get("/api/admin/inactiveexam/?exam_id=" + exam_id)
        .then((response) => {
          //setEditdata(response.data[0]);
          //console.log('response-->',response);
          if (response.statusText === "OK") {
            toast.success("Inactive successfully!", {
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
            // load approved by listing
            axios
              .get("/api/admin/getexamlisting")
              .then((response) => {
                setDatas(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error, {
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
        });
    }
  };
  const submitaddExam = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      exam_id,
      exam_name,
      exam_url,
      exam_brief,
      exam_description,
      emeta_title,
      emeta_description,
      emeta_keyword,
      exam_status = examstatus,
    } = e.target.elements;

    if (!exam_name.value.trim()) {
      newErrors.exam_name = "Exam Name cann't be blank!";
    }
    if (!exam_url.value.trim()) {
      newErrors.exam_url = "Exam URL cann't be blank!";
    }
    if (!exam_brief.value.trim()) {
      newErrors.exam_brief = "Exam brief cann't be blank!";
    }
    if (!exam_description.value.trim()) {
      newErrors.exam_description = "Exam description cann't be blank!";
    }
    if (!emeta_title.value.trim()) {
      newErrors.emeta_title = "Meta title cann't be blank!";
    }
    if (!emeta_description.value.trim()) {
      newErrors.emeta_description = "Meta description cann't be blank!";
    }
    if (!emeta_keyword.value.trim()) {
      newErrors.emeta_keyword = "Meta keyword cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        exam_id: exam_id.value,
        exam_name: exam_name.value,
        exam_url: exam_url.value,
        exam_brief: exam_brief.value,
        exam_description: exam_description.value,
        emeta_title: emeta_title.value,
        emeta_description: emeta_description.value,
        emeta_keyword: emeta_keyword.value,
        exam_status: examstatus,
      };
      if (exam_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updateexam",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            exam_id.value = "";
            exam_name.value = "";
            exam_url.value = "";
            exam_brief.value = "";
            exam_description.value = "";
            emeta_title.value = "";
            emeta_description.value = "";
            emeta_keyword.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Exam details updated!", {
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
            }
            //get results
            axios
              .get("/api/admin/getexamlisting")
              .then((response) => {
                setDatas(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
            //end get results
          })
          .catch(function (error) {
            toast.error(error, {
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
          });
      } else {
        axios({
          method: "post",
          url: "/api/admin/addexam",
          data: payload,
        })
          .then(function (response) {
            if (response.statusText == "OK") {
              console.log(response);
              exam_id.value = "";
              exam_name.value = "";
              exam_url.value = "";
              exam_brief.value = "";
              exam_description.value = "";
              emeta_title.value = "";
              emeta_description.value = "";
              emeta_keyword.value = "";
              setIsEditOpen(false);
              toast.success("Exam details added!", {
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
            }

            axios
              .get("/api/admin/getexamlisting")
              .then((response) => {
                setDatas(response.data);
              })
              .catch((error) => {
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
                  //transition: Bounce,
                });
              });
            //end get results
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
              //transition: Bounce,
            });
          });
      }
    }
  };
  // end add new exam
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Exam Listing</h1>
          <div className="actions">
            <span
              // onClick={() => document.getElementById("users_modal").showModal()}
              onClick={() => addnewexam()}
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
                <circle cx="12" cy="12" r="9" />{" "}
                <line x1="9" y1="12" x2="15" y2="12" />{" "}
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </span>
            {/* <span
              //onClick={() =>document.getElementById("filter_modal").showModal()}
              onClick={() => setIsFilter(true)}
            >
              <svg
                className="h-6 w-6 text-stone-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </span> */}
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="mx-auto max-w-7xl py-6 sm:px-2 lg:px-2">
          <MaterialReactTable table={table} />
        </div>
      </div>

      {isEditOpen && (
        <DialogContent>
          <div className="modal-box">
            <IconButton className="bsolute right-2 top-2 toc-popupclosebtnpossition">
              <HighlightOffIcon
                className="bsolute right-2 top-2"
                onClick={() => setIsEditOpen(false)}
              />
            </IconButton>
            <h3 className="font-bold text-lg">
              {editdata.exam_id > 0 ? "Edit" : "Add"} Exam
            </h3>

            <form
              action=""
              method="post"
              id="examForm"
              onSubmit={submitaddExam}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.exam_id}
                    name="exam_id"
                  />
                  <TocInputWithLabel
                    id="exam_name"
                    label="Exam Name"
                    placeholder="Please enter exam name."
                    value={editdata.exam_name ? editdata.exam_name : ""}
                    required={true}
                    errmsg={errForm.exam_name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="exam_url"
                    label="Exam URL"
                    placeholder="Please enter exam url."
                    value={
                      editdata.exam_url
                        ? editdata.exam_url.trim().toLowerCase()
                        : ""
                    }
                    required={true}
                    errmsg={errForm.exam_url}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="exam_brief"
                    label="Exam Brief"
                    placeholder="Please enter exam brief."
                    value={editdata.exam_brief ? editdata.exam_brief : ""}
                    required={true}
                    errmsg={errForm.exam_brief}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="exam_description"
                    label="Exam description"
                    placeholder="Please enter exam description."
                    value={
                      editdata.exam_description ? editdata.exam_description : ""
                    }
                    required={true}
                    errmsg={errForm.exam_description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="emeta_title"
                    label="Meta Title"
                    placeholder="Please enter meta title."
                    value={editdata.emeta_title ? editdata.emeta_title : ""}
                    required={true}
                    errmsg={errForm.emeta_title}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="emeta_description"
                    label="Meta description"
                    placeholder="Please enter meta description."
                    value={
                      editdata.emeta_description
                        ? editdata.emeta_description
                        : ""
                    }
                    required={true}
                    errmsg={errForm.emeta_description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="emeta_keyword"
                    label="Meta Keyword"
                    placeholder="Please enter meta keyword."
                    value={editdata.emeta_keyword ? editdata.emeta_keyword : ""}
                    required={true}
                    errmsg={errForm.emeta_keyword}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <label>Status</label>
                  <div className="flex gap-4">
                    <TocRadioInput
                      id="examstatusa"
                      name="examstatus"
                      value="A"
                      label="Active"
                      checked={examstatus === "A"}
                      onChange={(e) => setExamstatus(e.target.value)}
                    />

                    <TocRadioInput
                      id="examstatusd"
                      name="examstatus"
                      value="D"
                      label="Inactive"
                      checked={examstatus === "D"}
                      onChange={(e) => setExamstatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.exam_id > 0 ? "Update" : "Submit"}
                </TocButton>
              </div>
            </form>
          </div>
        </DialogContent>
      )}

      {isFilter && (
        <DialogContent>
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsFilter(false)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Filter</h3>
            <form>
              <input
                type="text"
                placeholder="Search by college name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="btn-section">
                <button type="button" onClick={() => setIsFilter(false)}>
                  Cancle
                </button>
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      )}
      <ToastContainer />
    </>
  );
}
export default Exam;
