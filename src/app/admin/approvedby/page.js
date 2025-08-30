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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocButton from "@/components/ui/atoms/tocButtom";

function Approvedby() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [errForm, setErrForm] = useState({});
  const [editdata, setEditdata] = useState({
    approv_id: "",
    approved_name: "",
    approved_description: "",
    app_meta_title: "",
    app_meta_description: "",
    app_meta_keyword: "",
    app_status: "",
    approved_url: "",
    user_id: "",
  });

  useEffect(() => {
    axios
      .get("/api/admin/getapprovedby")
      .then((response) => {
        setDatas(response.data);
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
      accessorKey: "approved_name", //simple recommended way to define a column
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "approved_url", //simple recommended way to define a column
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },

    {
      accessorKey: "status", //simple recommended way to define a column
      header: "Status",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => (
        <span>
          {cell.getValue() !== "Inactive" ? (
            cell.getValue()
          ) : (
            <span className="text-red-700">{cell.getValue()}</span>
          )}
        </span>
      ), //optional custom cell render
    },
  ];
  const [rowSelection, setRowSelection] = useState({});
  const editDetails = (editval) => {
    console.log("Edit approved by id:", editval);
    axios
      .get("/api/admin/editapprovedby/?appbyid=" + editval)
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
                editDetails(row.original.approv_id);

                //console.log("Edit======------>", row.original.approv_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.app_status === "A" && (
          <Tooltip title="Inactive">
            <IconButton color="error">
              <VisibilityOffIcon onClick={() => openDeleteConfirmModal(row)} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  });
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      deleteRecord(row.original.approv_id);
      //console.log("Delete======------>", row.original.cmsid);
    }
  };
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const openpopup = () => {
    setIsEditOpen(true);
    setEditdata("");
  };
  // add edit approval by
  const submitApprovedby = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      approv_id,
      approved_name,
      approved_url,
      app_meta_title,
      app_meta_description,
      app_meta_keyword,
      approved_description,
    } = e.target.elements;

    if (!approved_name.value.trim()) {
      newErrors.name = "Approved by cann't be blank!";
    }
    if (!approved_url.value.trim()) {
      newErrors.url = "Approved by url cann't be blank!";
    }
    if (!approved_description.value.trim()) {
      newErrors.description = "Approved by description cann't be blank!";
    }
    if (!app_meta_title.value.trim()) {
      newErrors.metatitle = "Meta Title cann't be blank!";
    }
    if (!app_meta_keyword.value.trim()) {
      newErrors.metakeyword = "Meta Keyword cann't be blank!";
    }
    if (!app_meta_description.value.trim()) {
      newErrors.metadescription = "Meta Description cann't be blank!";
    }
    setErrForm(newErrors);
    //console.log('errForm-->',errForm);
    //if(errForm.length === 0){
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        approv_id: approv_id.value,
        approved_name: approved_name.value,
        approved_url: approved_url.value,
        app_meta_title: app_meta_title.value,
        app_meta_description: app_meta_description.value,
        app_meta_keyword: app_meta_keyword.value,
        approved_description: approved_description.value,
        app_status: "A",
      };
      if (approv_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updateapprovedby",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            approv_id.value = "";
            approved_name.value = "";
            approved_url.value = "";
            app_meta_title.value = "";
            app_meta_description.value = "";
            app_meta_keyword.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Approved by details updated!", {
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
              .get("/api/admin/getapprovedby")
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
          url: "/api/admin/addnewapprovedby",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            if (response.statusText == "OK") {
              approv_id.value = "";
              approved_name.value = "";
              approved_url.value = "";
              app_meta_title.value = "";
              app_meta_description.value = "";
              app_meta_keyword.value = "";
              setIsEditOpen(false);
              toast.success("Approved by details added!", {
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
              .get("/api/admin/getapprovedby")
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
  // end add edit approval by
  const deleteRecord = (approv_id) => {
    if (approv_id > 0) {
      axios
        .get("/api/admin/deleteapprovedby/?approv_id=" + approv_id)
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
              .get("/api/admin/getapprovedby")
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

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Approved by Listing</h1>
          <div className="actions">
            <span //onClick={() => setIsEditOpen(true)}
              onClick={() => openpopup()}
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
            {/* <span onClick={() => setIsFilter(true)}>
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
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              {/* <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsEditOpen(false)}
              >
                ✕
                </button> */}
              <IconButton className="bsolute right-2 top-2 toc-popupclosebtnpossition">
                <HighlightOffIcon
                  className="bsolute right-2 top-2"
                  onClick={() => setIsEditOpen(false)}
                />
              </IconButton>
            </form>
            <h3 className="font-bold text-lg">
              {editdata.approv_id > 0 ? "Edit" : "Add"} Approved By
            </h3>

            <form
              action=""
              method="post"
              id="coursebranchForm"
              onSubmit={submitApprovedby}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.approv_id}
                    name="approv_id"
                  />

                  <TocInputWithLabel
                    id="approved_name"
                    label="Approved By Name"
                    placeholder="Please Enter Approved By Name."
                    value={editdata.approved_name ? editdata.approved_name : ""}
                    required={true}
                    errmsg={errForm.name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="approved_url"
                    label="Approved By URL"
                    placeholder="Please Enter Approved By URL."
                    value={
                      editdata.approved_url && editdata.approved_url.trim()
                    }
                    required={true}
                    errmsg={errForm.url}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="approved_description"
                    label="Approved By Details"
                    placeholder="Please Enter Approved By Details."
                    value={
                      editdata.approved_description &&
                      editdata.approved_description.trim()
                    }
                    required={true}
                    errmsg={errForm.description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="app_meta_title"
                    label="Meta Title"
                    placeholder="Please Enter Meta Title."
                    value={
                      editdata.app_meta_title ? editdata.app_meta_title : ""
                    }
                    required={true}
                    errmsg={errForm.metatitle}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="app_meta_description"
                    label="Meta Description"
                    placeholder="Please Enter Meta Description."
                    value={
                      editdata.app_meta_description &&
                      editdata.app_meta_description.trim()
                    }
                    required={true}
                    errmsg={errForm.metadescription}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="app_meta_keyword"
                    label="Meta Keyword"
                    placeholder="Please Enter Meta Keyword."
                    value={
                      editdata.app_meta_keyword ? editdata.app_meta_keyword : ""
                    }
                    required={true}
                    errmsg={errForm.metakeyword}
                    onChange={handleChangeFormdata}
                  />
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {" "}
                  {editdata.approv_id > 0 ? "Update" : "Submit"}
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
                placeholder="Search by name"
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
export default Approvedby;
