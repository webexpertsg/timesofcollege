"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Coursebranchs() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  const [courarr, setCourarr] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    axios
      .get("/api/admin/getcoursebranchs")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/admin/getcoursesarr")
      .then((response) => {
        setCourarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //const data = JSON.parse(datas);
  //const keys = Object.keys(data.length ? data[0] : {});
  const data = datas;

  const columns = [
    {
      accessorKey: "branch_name", //simple recommended way to define a column
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "branch_url", //simple recommended way to define a column
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "course_name", //simple recommended way to define a column
      header: "Course",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "meta_title", //simple recommended way to define a column
      header: "Meta Title",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "meta_keyword", //simple recommended way to define a column
      header: "Meta Keyword",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "meta_description", //simple recommended way to define a column
      header: "Meta Description",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "status", //simple recommended way to define a column
      header: "Status",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
  ];
  const [rowSelection, setRowSelection] = useState({});

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
                editDetails(row.original.courb_id);

                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon
              onClick={() => {
                // data.splice(row.index, 1); //assuming simple data table
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  // add new course branches
  const [errorMsg, setErrorMsg] = useState([]);
  const addcousebranches = (e) => {
    e.preventDefault();
    const {
      course_id,
      branch_name,
      branch_url,
      meta_title,
      meta_keyword,
      meta_description,
    } = e.target.elements;

    let errorsForm = [];
    if (course_id.value === "") {
      errorsForm.push(<div key="branameErr">Please select course !</div>);
    } else {
      errorsForm.push();
    }
    if (branch_name.value === "") {
      errorsForm.push(<div key="branameErr">Branch Name cann't be blank!</div>);
    } else {
      errorsForm.push();
    }
    if (branch_url.value === "") {
      errorsForm.push(<div key="branurlErr">Branch URL cann't be blank!</div>);
    } else {
      errorsForm.push();
    }
    if (meta_title.value === "") {
      errorsForm.push(<div key="metatitErr">Meta Title cann't be blank!</div>);
    } else {
      errorsForm.push();
    }
    if (meta_keyword.value === "") {
      errorsForm.push(
        <div key="metakeyErr">Meta Keyword cann't be blank!</div>
      );
    } else {
      errorsForm.push();
    }
    if (meta_description.value === "") {
      errorsForm.push(
        <div key="metadescErr">Meta Description cann't be blank!</div>
      );
    } else {
      errorsForm.push();
    }
    console.log("errorsForm", errorsForm);
    if (errorsForm.length === 0) {
      const payload = {
        course_id: course_id.value,
        branch_name: branch_name.value,
        branch_url: branch_url.value,
        meta_title: meta_title.value,
        meta_description: meta_description.value,
        meta_keyword: meta_keyword.value,
        branch_status: "A",
      };
      axios({
        method: "post",
        url: "/api/addcoursebranches",
        data: payload,
      })
        .then(function (response) {
          console.log(response);
          course_id.value = "";
          branch_name.value = "";
          branch_url.value = "";
          meta_title.value = "";
          meta_description.value = "";
          meta_keyword.value = "";
          setReturndspmsg(
            '<div className"sussmsg">Record successfully added</div>'
          );
          //get results
          axios
            .get("/api/getcoursebranchs")
            .then((response) => {
              setDatas(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          //end get results
        })
        .catch(function (error) {
          console.log(error);
          setReturndspmsg('<div className"errmsg">Error in add record</div>');
        });
    } else {
      setErrorMsg(errorsForm);
    }
  };
  // end add new course branches

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Course Branch Listing</h1>
          <div className="actions">
            <span
              // onClick={() => document.getElementById("users_modal").showModal()}
              onClick={() => setIsEditOpen(true)}
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
                <circle cx="12" cy="12" r="9" />{" "}
                <line x1="9" y1="12" x2="15" y2="12" />{" "}
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </span>
            <span
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
            </span>
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
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsEditOpen(false)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add Course Branch</h3>

            <form
              action=""
              method="post"
              id="coursebranchForm"
              onSubmit={addcousebranches}
            >
              {returndspmsg && returndspmsg}
              <div className="mt-2">
                <select
                  name="course_id"
                  id="course_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Course</option>
                  {courarr.map((cour) => (
                    <option value={cour.cour_id}>{cour.course_name}</option>
                  ))}
                  ;
                </select>
                <div className="errmsg">{errorMsg[0]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="branch_name"
                  placeholder="Branch Name*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[1]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="branch_url"
                  placeholder="Branch URL*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[2]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="meta_title"
                  placeholder="Meta Title*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[3]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="meta_description"
                  placeholder="Meta Description*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[4]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="meta_keyword"
                  placeholder="Meta Keyword*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[5]}</div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
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
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Search by college name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
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
export default Coursebranchs;
