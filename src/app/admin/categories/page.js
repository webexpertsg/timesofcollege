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
import TocCheckbox from "@/components/ui/atoms/tocCheckbox";
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TocButton from "@/components/ui/atoms/tocButtom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Categories() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [datas, setDatas] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [errForm, setErrForm] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [editdata, setEditdata] = useState({
    cat_id: "",
    category_description: "",
    category_featured: "",
    category_meta_description: "",
    category_meta_keyword: "",
    category_meta_title: "",
    category_status: "A",
    category_url: "",
  });
  useEffect(() => {
    axios
      .get("/api/admin/getcategories")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //const data = JSON.parse(datas);
  //const keys = Object.keys(data.length ? data[0] : {});
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const data = datas;

  const columns = [
    {
      accessorKey: "category_name", //simple recommended way to define a column
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "category_url", //simple recommended way to define a column
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "category_meta_title", //simple recommended way to define a column
      header: "Meta Title",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "category_meta_keyword", //simple recommended way to define a column
      header: "Meta Keyword",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "category_meta_description", //simple recommended way to define a column
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
            cell.getValue()
          ) : (
            <span className="text-red-700">{cell.getValue()}</span>
          )}
        </span>
      ), //optional custom cell render
    },
  ];
  //edit role details

  const editDetails = (editval) => {
    console.log("Edit role id:", editval);
    axios
      .get("/api/admin/editcategory/?cat_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //end edit role details

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
                editDetails(row.original.cat_id);

                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.category_status === "A" && (
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
      inactiveRecord(row.original.cat_id);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (cat_id) => {
    if (cat_id > 0) {
      axios
        .get("/api/admin/inactivecategory/?cat_id=" + cat_id)
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
              .get("/api/admin/getcategories")
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
  const addcategory = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      cat_id,
      category_name,
      category_url,
      category_description,
      category_meta_title,
      category_meta_keyword,
      category_meta_description,
      category_featured,
      category_status,
    } = e.target.elements;
    if (!category_name.value.trim()) {
      newErrors.category_name = "Category Name cann't be blank!";
    }
    if (!category_url.value.trim()) {
      newErrors.category_url = "Category url cann't be blank!";
    }
    if (!category_description.value.trim()) {
      newErrors.category_description = "Category description cann't be blank!";
    }
    if (!category_meta_title.value.trim()) {
      newErrors.category_meta_title = "Meta title cann't be blank!";
    }
    if (!category_meta_description.value.trim()) {
      newErrors.category_meta_description = "Meta description cann't be blank!";
    }
    if (!category_meta_keyword.value.trim()) {
      newErrors.category_meta_keyword = "Meta keyword cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        cat_id: cat_id.value,
        category_name: category_name.value,
        category_url: category_url.value,
        category_description: category_description.value,
        category_meta_title: category_meta_title.value,
        category_meta_keyword: category_meta_keyword.value,
        category_meta_description: category_meta_description.value,
        category_featured: category_featured.value,
        category_status: category_status.value,
      };
      if (cat_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updatecategory",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            category_name.value = "";
            category_url.value = "";
            category_description.value = "";
            category_meta_title.value = "";
            category_meta_keyword.value = "";
            category_meta_description.value = "";
            category_featured.value = "";
            category_status.value = "A";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Category details updated!", {
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
              .get("/api/admin/getcategories")
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
          url: "/api/admin/addcategories",
          data: payload,
        })
          .then(function (response) {
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              console.log(response);
              category_name.value = "";
              category_url.value = "";
              category_description.value = "";
              category_meta_title.value = "";
              category_meta_keyword.value = "";
              category_meta_description.value = "";
              category_featured.value = "";
              category_status.value = "A";
              toast.success("Category details added!", {
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
              .get("/api/admin/getcategories")
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
  // end add new Category
  const openpopup = () => {
    setIsEditOpen(true);
    setEditdata("");
  };
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Category Listing</h1>
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
            <h3 className="font-bold text-lg pl-2.5">
              {editdata.cat_id > 0 ? "Edit" : "Add"} Category
            </h3>

            <form
              action=""
              method="post"
              id="coursebranchForm"
              onSubmit={addcategory}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.cat_id}
                    name="cat_id"
                    id="cat_id"
                  />
                  <TocInputWithLabel
                    id="category_name"
                    label="Category Name"
                    placeholder="Please Enter Category Name."
                    value={editdata.category_name ? editdata.category_name : ""}
                    required={true}
                    errmsg={errForm.category_name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="category_url"
                    label="Category URL"
                    placeholder="Please Enter Category URL."
                    value={editdata.category_url ? editdata.category_url : ""}
                    required={true}
                    errmsg={errForm.category_url}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="category_description"
                    label="Description"
                    placeholder="Please Enter Category URL."
                    value={
                      editdata.category_description
                        ? editdata.category_description
                        : ""
                    }
                    required={true}
                    errmsg={errForm.category_description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="category_meta_title"
                    label="Meta Title"
                    placeholder="Please Enter Meta Title."
                    value={
                      editdata.category_meta_title
                        ? editdata.category_meta_title
                        : ""
                    }
                    required={true}
                    errmsg={errForm.category_meta_title}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocTextarea
                    id="category_meta_description"
                    label="Meta Description"
                    placeholder="Please Enter Meta Description."
                    value={
                      editdata.category_meta_description
                        ? editdata.category_meta_description
                        : ""
                    }
                    required={true}
                    errmsg={errForm.category_meta_description}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="category_meta_keyword"
                    label="Meta Keyword"
                    placeholder="Please Enter Meta Keyword."
                    value={
                      editdata.category_meta_keyword
                        ? editdata.category_meta_keyword
                        : ""
                    }
                    required={true}
                    errmsg={errForm.category_meta_keyword}
                    onChange={handleChangeFormdata}
                  />
                </div>

                <div className="mt-2">
                  <TocCheckbox
                    id="category_featured"
                    value={`Y`}
                    label={`Feature`}
                    //checked={selectTrending.includes(JSON.stringify(item.tid))}
                    checked={"Y" === editdata.category_status}
                    onChange={handleChangeFormdata}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label>Status</label>
                <div className="flex gap-4">
                  <TocRadioInput
                    id="category_statusa"
                    name="category_status"
                    value="A"
                    label="Active"
                    checked={
                      (editdata.category_status
                        ? editdata.category_status
                        : "A") === "A"
                    }
                    onChange={handleChangeFormdata}
                  />

                  <TocRadioInput
                    id="category_statusd"
                    name="category_status"
                    value="D"
                    label="Inactive"
                    checked={editdata.category_status === "D"}
                    onChange={handleChangeFormdata}
                  />
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.cat_id > 0 ? "Update" : "Submit"}
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
                placeholder="Search by category name"
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
export default Categories;
