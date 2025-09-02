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

function Courses() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [catarr, setCatarr] = useState([]);
  const [status, setStatus] = useState("A");
  const [categoryid, setCategoryid] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [editdata, setEditdata] = useState({
    cour_id: "",
    cmeta_description: "",
    cmeta_keyword: "",
    cmeta_title: "",
    cour_top: "",
    course_name: "",
    course_url: "",
    cstatus: "",
    cat_id: "",
  });
  useEffect(() => {
    axios
      .get("/api/admin/getcourses")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getcategoriesarr")
      .then((response) => {
        setCatarr(response.data);
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
      accessorKey: "course_name", //simple recommended way to define a column
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "course_url", //simple recommended way to define a column
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "category_name", //simple recommended way to define a column
      header: "Category Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "cmeta_title", //simple recommended way to define a column
      header: "Meta Title",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "cmeta_keyword", //simple recommended way to define a column
      header: "Meta Keyword",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "cmeta_description", //simple recommended way to define a column
      header: "Meta Description",
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
  const editDetails = (editval) => {
    console.log("Edit course id:", editval);
    axios
      .get("/api/admin/editcourse/?cour_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        setCategoryid(response.data[0].cat_id);
        setStatus(response.data[0].cstatus);
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
                editDetails(row.original.cour_id);

                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.cstatus === "A" && (
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
  // add new course
  const openInactiveConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      inactiveRecord(row.original.cour_id);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (cour_id) => {
    if (cour_id > 0) {
      axios
        .get("/api/admin/inactivecourse/?cour_id=" + cour_id)
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
              .get("/api/admin/getcourses")
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
  const addcouse = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      cour_id,
      course_name,
      course_url,
      cmeta_title,
      cmeta_description,
      cmeta_keyword,
    } = e.target.elements;

    if (!categoryid) {
      newErrors.cat_id = "Please select category name!";
    }
    if (!course_name.value.trim()) {
      newErrors.course_name = "Course Name cann't be blank!";
    }
    if (!course_url.value.trim()) {
      newErrors.course_url = "Course url cann't be blank!";
    }
    if (!cmeta_title.value.trim()) {
      newErrors.cmeta_title = "Meta title cann't be blank!";
    }
    if (!cmeta_description.value.trim()) {
      newErrors.cmeta_description = "Meta description cann't be blank!";
    }
    if (!cmeta_keyword.value.trim()) {
      newErrors.cmeta_keyword = "Meta keyword cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        cour_id: cour_id.value,
        course_name: course_name.value,
        course_url: course_url.value,
        cmeta_title: cmeta_title.value,
        cmeta_description: cmeta_description.value,
        cmeta_keyword: cmeta_keyword.value,
        cat_id: categoryid,
        cstatus: status,
      };
      if (cour_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updatecourse",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            setCategoryid("");
            course_name.value = "";
            course_url.value = "";
            cmeta_title.value = "";
            cmeta_description.value = "";
            cmeta_keyword.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Course details updated!", {
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
              .get("/api/admin/getcourses")
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
          url: "/api/admin/addcourse",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            if (response.statusText == "OK") {
              setCategoryid("");
              course_name.value = "";
              course_url.value = "";
              cmeta_title.value = "";
              cmeta_description.value = "";
              cmeta_keyword.value = "";
              setIsEditOpen(false);
              toast.success("Course details added!", {
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
              .get("/api/admin/getcourses")
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
      }
    }
  };
  const openpopup = () => {
    setIsEditOpen(true);
    setEditdata("");
  };
  const options = { value: "", label: "--Select--" };
  // end add new course
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Courses Listing</h1>
          <div className="actions">
            <span onClick={() => openpopup()}>
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
            <IconButton className="bsolute right-2 top-2 toc-popupclosebtnpossition">
              <HighlightOffIcon
                className="bsolute right-2 top-2"
                onClick={() => setIsEditOpen(false)}
              />
            </IconButton>
            <h3 className="font-bold text-lg">
              {editdata.cour_id > 0 ? "Edit" : "Add"} Course
            </h3>

            <form
              action=""
              method="post"
              id="coursebranchForm"
              onSubmit={addcouse}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.cour_id}
                    name="cour_id"
                  />
                  <TocSelectList
                    id="cat_id"
                    label="Category Name"
                    options={catarr}
                    //options={options.catarr}
                    value={categoryid}
                    required={true}
                    errmsg={errForm.cat_id}
                    onChange={(e) => setCategoryid(e.target.value)}
                  />
                  {/* <select
                    name="cat_id"
                    id="cat_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option
                      value=""
                      defaultValue={editdata.cat_id == "" ? "selected" : ""}
                    >
                      Select Category
                    </option>
                    {catarr.map((cour) => (
                      <option
                        value={cour.cat_id}
                        selected={
                          editdata.cat_id == cour.cat_id ? "selected" : ""
                        }
                      >
                        {cour.category_name}
                      </option>
                    ))}
                    ;
                  </select> */}
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="course_name"
                    label="Course Name"
                    placeholder="Please enter course name."
                    value={editdata.course_name ? editdata.course_name : ""}
                    required={true}
                    errmsg={errForm.course_name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="course_url"
                    label="Course URL"
                    placeholder="Please enter course url."
                    value={editdata.course_url ? editdata.course_url : ""}
                    required={true}
                    errmsg={errForm.course_url}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="cmeta_title"
                    label="Meta Title"
                    placeholder="Please enter meta title."
                    value={editdata.cmeta_title ? editdata.cmeta_title : ""}
                    required={true}
                    errmsg={errForm.cmeta_title}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="cmeta_description"
                    label="Meta Description"
                    placeholder="Please enter meta description."
                    value={
                      editdata.cmeta_description
                        ? editdata.cmeta_description
                        : ""
                    }
                    required={true}
                    errmsg={errForm.cmeta_description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="cmeta_keyword"
                    label="Meta Keyword"
                    placeholder="Please enter meta keyword."
                    value={editdata.cmeta_keyword ? editdata.cmeta_keyword : ""}
                    required={true}
                    errmsg={errForm.cmeta_keyword}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <label>Status {status}</label>
                  <div className="flex gap-4">
                    <TocRadioInput
                      id="cstatusa"
                      name="cstatus"
                      value="A"
                      label="Active"
                      checked={status === "A"}
                      //onChange={handleChangeFormdata}
                      onChange={(e) => setStatus(e.target.value)}
                    />

                    <TocRadioInput
                      id="cstatusd"
                      name="cstatus"
                      value="D"
                      label="Inactive"
                      checked={status === "D"}
                      // onChange={handleChangeFormdata}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.cour_id > 0 ? "Update" : "Submit"}
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
export default Courses;
