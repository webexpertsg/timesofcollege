"use client";
import React, { useState, useEffect } from "react";
import { hasNotEmptyValue } from "@/utils";
//import Link from "next/link";
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

function Megamenu() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [datas, setDatas] = useState([]);
  const [menuarrlist, setMenuarrlist] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [menustatus, setMenustatus] = useState("A");
  const [editdata, setEditdata] = useState({
    menu_id: "",
    menu_name: "",
    menu_url: "",
    meta_description: "",
    meta_keyword: "",
    meta_title: "",
    menu_disp_position: "",
    menu_status: "",
  });
  useEffect(() => {
    axios
      .get("/api/admin/getmegamenulisting")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/megamenuarrlist")
      .then((response) => {
        setMenuarrlist(response.data);
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
      accessorKey: "menu_name", //simple recommended way to define a column
      header: "Menu Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "parent_menu", //simple recommended way to define a column
      header: "Parent Menu Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "menu_disp_position", //simple recommended way to define a column
      header: "Disp Position",
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
            <span className="text-green-700">{cell.getValue()}</span>
          ) : (
            <span className="text-red-700">{cell.getValue()}</span>
          )}
        </span>
      ), //optional custom cell render
    },
  ];
  const [rowSelection, setRowSelection] = useState({});
  const addnewmenu = () => {
    setIsEditOpen(true);
    setEditdata("");
  };
  const editDetails = (editval) => {
    console.log("Edit menu id:", editval);
    axios
      .get("/api/admin/editmenu/?menu_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        setMenustatus(response.data[0].menu_status);
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
                editDetails(row.original.menu_id);

                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.menu_status === "A" && (
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
  // add new menu
  const openInactiveConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      inactiveRecord(row.original.menu_id);
      //console.log("Delete======------>", row.original.menu_id);
    }
  };
  const inactiveRecord = (menu_id) => {
    if (menu_id > 0) {
      axios
        .get("/api/admin/inactivemegamenu/?menu_id=" + menu_id)
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
              .get("/api/admin/getmegamenulisting")
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
  const submitAddmenu = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      menu_id,
      menu_name,
      menu_url,
      menu_parent_id,
      menu_description,
      meta_title,
      meta_description,
      meta_keyword,
      menu_disp_position,
    } = e.target.elements;

    if (!menu_name.value.trim()) {
      newErrors.menu_name = "Memu Name cann't be blank!";
    }
    if (!menu_url.value.trim()) {
      newErrors.menu_url = "Memu URL cann't be blank!";
    }
    if (!menu_description.value.trim()) {
      newErrors.menu_description = "Memu Description cann't be blank!";
    }
    if (!meta_title.value.trim()) {
      newErrors.meta_title = "Meta Title cann't be blank!";
    }
    if (!meta_description.value.trim()) {
      newErrors.meta_description = "Meta Description cann't be blank!";
    }
    if (!meta_keyword.value.trim()) {
      newErrors.meta_keyword = "Meta Keyword cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        menu_id: menu_id.value,
        menu_name: menu_name.value.trim(),
        menu_url: menu_url.value.trim(),
        menu_parent_id: menu_parent_id.value.trim(),
        menu_description: menu_description.value.trim(),
        meta_title: meta_title.value.trim(),
        meta_description: meta_description.value.trim(),
        meta_keyword: meta_keyword.value.trim(),
        menu_status: menustatus,
        menu_disp_position: menu_disp_position.value.trim(),
      };
      if (menu_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updatemenu",
          data: payload,
        })
          .then(function (response) {
            //console.log(response);
            setMenustatus("A");
            menu_id.value = "";
            menu_name.value = "";
            menu_url.value = "";
            menu_parent_id.value = "";
            menu_description.value = "";
            meta_title.value = "";
            meta_description.value = "";
            meta_keyword.value = "";
            menu_disp_position.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Menu details updated!", {
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
              .get("/api/admin/getmegamenulisting")
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
          url: "/api/admin/addmenu",
          data: payload,
        })
          .then(function (response) {
            setMenustatus("A");
            console.log(response);
            menu_id.value = "";
            menu_name.value = "";
            menu_url.value = "";
            menu_parent_id.value = "";
            menu_description.value = "";
            meta_title.value = "";
            meta_description.value = "";
            meta_keyword.value = "";
            menu_disp_position.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Record successfully added!", {
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
              .get("/api/admin/getmegamenulisting")
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
  // end add new menu
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Mega Menu Listing</h1>
          <div className="actions">
            <span
              // onClick={() => document.getElementById("users_modal").showModal()}
              onClick={() => addnewmenu()}
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
              {editdata.menu_id > 0 ? "Edit" : "Add"} Menu
            </h3>

            <form
              action=""
              method="post"
              id="menuForm"
              onSubmit={submitAddmenu}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.menu_id}
                    name="menu_id"
                  />
                  <label
                    htmlFor={`pm`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Parent Menu<span className="text-red-700"> *</span>
                  </label>
                  <select
                    id="menu_parent_id"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option
                      key="0"
                      value="0"
                      defaultValue={editdata.cat_id == "" ? "selected" : ""}
                    >
                      Parent Menu
                    </option>
                    {menuarrlist.map(
                      (cour) =>
                        cour.menu_parent_id == 0 && (
                          <>
                            <option
                              key={cour.menu_id}
                              value={cour.menu_id}
                              selected={
                                editdata.menu_parent_id == cour.menu_id
                                  ? "selected"
                                  : ""
                              }
                            >
                              {cour.menu_name}
                            </option>
                            {menuarrlist.map(
                              (scour) =>
                                cour.menu_id == scour.menu_parent_id && (
                                  <option
                                    value={scour.menu_id}
                                    selected={
                                      editdata.menu_parent_id == scour.menu_id
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;{scour.menu_name}
                                  </option>
                                )
                            )}
                          </>
                        )
                    )}
                    ;
                  </select>
                </div>

                <div className="mt-2">
                  <TocInputWithLabel
                    id="menu_name"
                    label="Menu Name"
                    placeholder="Please enter menu name."
                    value={editdata.menu_name ? editdata.menu_name : ""}
                    required={true}
                    errmsg={errForm.menu_name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="menu_url"
                    label="Menu Url"
                    placeholder="Please enter menu url."
                    value={editdata.menu_url ? editdata.menu_url : ""}
                    required={true}
                    errmsg={errForm.menu_url}
                    onChange={handleChangeFormdata}
                  />
                </div>

                <div className="mt-2">
                  <TocTextarea
                    id="menu_description"
                    label="Menu Description"
                    placeholder="Please enter description."
                    value={
                      editdata.menu_description ? editdata.menu_description : ""
                    }
                    required={true}
                    errmsg={errForm.menu_description}
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
                  <TocInputWithLabel
                    type="number"
                    id="menu_disp_position"
                    label="Display Position"
                    placeholder="Display Position"
                    value={
                      editdata.menu_disp_position
                        ? editdata.menu_disp_position
                        : ""
                    }
                    //required={true}
                    //errmsg={errForm.menu_disp_position}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <label>Status</label>
                  <div className="flex gap-4">
                    <TocRadioInput
                      id="menu_statusa"
                      name="menu_status"
                      value="A"
                      label="Active"
                      checked={menustatus === "A"}
                      //onChange={handleChangeFormdata}
                      onChange={(e) => setMenustatus(e.target.value)}
                    />

                    <TocRadioInput
                      id="menu_statusd"
                      name="menu_status"
                      value="D"
                      label="Inactive"
                      checked={menustatus === "D"}
                      // onChange={handleChangeFormdata}
                      onChange={(e) => setMenustatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.menu_id > 0 ? "Update" : "Submit"}
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
export default Megamenu;
