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
import TocSelectList from "@/components/ui/atoms/tocSelectlist";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TocButton from "@/components/ui/atoms/tocButtom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Coursebranchs() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [datas, setDatas] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [courarr, setCourarr] = useState([]);
  const [branchstatus, setBranchstatus] = useState("A");
  const [courseid, setCourseid] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [editdata, setEditdata] = useState({
    courb_id: "",
    course_id: "",
    branch_name: "",
    branch_url: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    branch_status: "",
  });
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
    // {
    //   accessorKey: "meta_description", //simple recommended way to define a column
    //   header: "Meta Description",
    //   muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
    //   Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    // },
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
        {row.original.branch_status === "A" && (
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
  const openInactiveConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      inactiveRecord(row.original.courb_id);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (courb_id) => {
    if (courb_id > 0) {
      axios
        .get("/api/admin/inactivecoursebrach/?courb_id=" + courb_id)
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
              .get("/api/admin/getcoursebranchs")
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
        });
    }
  };
  // add new course branches
  const editDetails = (editval) => {
    console.log("Edit course branch id:", editval);
    axios
      .get("/api/admin/editcoursebranch/?courb_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        setCourseid(response.data[0].course_id);
        setBranchstatus(response.data[0].branch_status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitCousebranches = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      courb_id,
      branch_name,
      branch_url,
      meta_title,
      meta_keyword,
      meta_description,
    } = e.target.elements;

    let errorsForm = [];
    if (!courseid) {
      newErrors.course_id = "Please select course name!";
    }
    if (!branch_name.value.trim()) {
      newErrors.branch_name = "Branch name cann't be blank!";
    }
    if (!branch_url.value.trim()) {
      newErrors.branch_url = "Branch URL cann't be blank!";
    }
    if (!meta_title.value.trim()) {
      newErrors.meta_title = "Meta title cann't be blank!";
    }
    if (!meta_description.value.trim()) {
      newErrors.meta_description = "Meta description cann't be blank!";
    }
    if (!meta_keyword.value.trim()) {
      newErrors.meta_keyword = "Meta keyword cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        courb_id: courb_id.value,
        course_id: courseid,
        branch_name: branch_name.value,
        branch_url: branch_url.value,
        meta_title: meta_title.value,
        meta_description: meta_description.value,
        meta_keyword: meta_keyword.value,
        branch_status: branchstatus,
      };
      if (courb_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updatecoursebranches",
          data: payload,
        })
          .then(function (response) {
            //console.log(response);
            if (response.statusText == "OK") {
              setCourseid("");
              setBranchstatus("A");
              setIsEditOpen(false);
              branch_name.value = "";
              branch_url.value = "";
              meta_title.value = "";
              meta_description.value = "";
              meta_keyword.value = "";
              toast.success("Course branch details updated!", {
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
              .get("/api/admin/getcoursebranchs")
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
          });
      } else {
        axios({
          method: "post",
          url: "/api/admin/addcoursebranches",
          data: payload,
        })
          .then(function (response) {
            if (response.statusText === "OK") {
              setCourseid("");
              setBranchstatus("A");
              setIsEditOpen(false);
              toast.success("Course branch details added!", {
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

              branch_name.value = "";
              branch_url.value = "";
              meta_title.value = "";
              meta_description.value = "";
              meta_keyword.value = "";
              //get results
              axios
                .get("/api/admin/getcoursebranchs")
                .then((response) => {
                  setDatas(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            //end get results
          })
          .catch(function (error) {
            console.log(error);
            // setReturndspmsg('<div className"errmsg">Error in add record</div>');
          });
      }
    }
  };
  // end add new course branches
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
              {/* <svg
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
              </svg> */}
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
            <IconButton className="bsolute right-2 top-2 toc-popupclosebtnpossition">
              <HighlightOffIcon
                className="bsolute right-2 top-2"
                onClick={() => setIsEditOpen(false)}
              />
            </IconButton>
            <h3 className="font-bold text-lg">
              {editdata.courb_id > 0 ? "Edit" : "Add"} Course Branch
            </h3>

            <form
              action=""
              method="post"
              id="coursebranchForm"
              onSubmit={submitCousebranches}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.courb_id}
                    name="courb_id"
                  />
                  <TocSelectList
                    id="course_id"
                    label="Course Name"
                    options={courarr}
                    value={courseid}
                    required={true}
                    errmsg={errForm.course_id}
                    onChange={(e) => setCourseid(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="branch_name"
                    label="Branch Name"
                    placeholder="Please enter branch name."
                    value={editdata.branch_name ? editdata.branch_name : ""}
                    required={true}
                    errmsg={errForm.branch_name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="branch_url"
                    label="Branch URL"
                    placeholder="Please enter branch url."
                    value={editdata.branch_url ? editdata.branch_url : ""}
                    required={true}
                    errmsg={errForm.branch_url}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="meta_title"
                    label="Meta Title"
                    placeholder="Please enter meta title."
                    value={editdata.meta_title ? editdata.meta_title : ""}
                    required={true}
                    errmsg={errForm.meta_title}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="meta_description"
                    label="Meta Description"
                    placeholder="Please enter meta description."
                    value={
                      editdata.meta_description ? editdata.meta_description : ""
                    }
                    required={true}
                    errmsg={errForm.meta_description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="meta_keyword"
                    label="Meta Keyword"
                    placeholder="Please enter meta keyword."
                    value={editdata.meta_keyword ? editdata.meta_keyword : ""}
                    required={true}
                    errmsg={errForm.meta_keyword}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <label>Status</label>
                  <div className="flex gap-4">
                    <TocRadioInput
                      id="cbstatusa"
                      name="cbstatus"
                      value="A"
                      label="Active"
                      checked={branchstatus === "A"}
                      onChange={(e) => setBranchstatus(e.target.value)}
                    />

                    <TocRadioInput
                      id="cbstatusd"
                      name="cbstatus"
                      value="D"
                      label="Inactive"
                      checked={branchstatus === "D"}
                      onChange={(e) => setBranchstatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.courb_id > 0 ? "Update" : "Submit"}
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
