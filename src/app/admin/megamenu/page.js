"use client"
import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Megamenu() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  const [menuarrlist, setMenuarrlist] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [errorMsg, setErrorMsg] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [editdata, setEditdata] = useState({
    menu_id: "",
    menu_name: "",
    menu_url: "",
    meta_description: "",
    meta_keyword: "",
    meta_title: "",
    menu_disp_position: "",
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
    const { name, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [name]: value,
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
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
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
      .get("/api/editmenu/" + editval)
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
                editDetails(row.original.menu_id);

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
  // add new menu

  const addmenu = (e) => {
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

    let errorsForm = [];

    if (menu_name.value === "") {
      errorsForm.push(<div key="branameErr">Memu Name cann't be blank!</div>);
    } else {
      errorsForm.push();
    }
    if (menu_url.value === "") {
      errorsForm.push(<div key="branurlErr">Memu URL cann't be blank!</div>);
    } else {
      errorsForm.push();
    }

    if (menu_description.value === "") {
      errorsForm.push(
        <div key="branurlErr">Menu Description cann't be blank!</div>
      );
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
        menu_id: menu_id.value,
        menu_name: menu_name.value,
        menu_url: menu_url.value,
        menu_parent_id: menu_parent_id.value,
        menu_description: menu_description.value,
        meta_title: meta_title.value,
        meta_description: meta_description.value,
        meta_keyword: meta_keyword.value,
        menu_status: "A",
        menu_disp_position: menu_disp_position.value,
      };
      if (menu_id.value > 0) {
        axios({
          method: "post",
          url: "/api/updatemenu",
          data: payload,
        })
          .then(function (response) {
            //console.log(response);
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
              .get("/api/getmegamenulist")
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
          url: "/api/addmenu",
          data: payload,
        })
          .then(function (response) {
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
              .get("/api/getmegamenulist")
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
            setReturndspmsg(
              "<div className={errmsg}>Error in add menu record</div>"
            );
          });
      }
    } else {
      setErrorMsg(errorsForm);
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
            <h3 className="font-bold text-lg">
              {editdata.menu_id > 0 ? "Edit" : "Add"} Menu
            </h3>

            <form action="" method="post" id="menuForm" onSubmit={addmenu}>
              {returndspmsg && returndspmsg}
              <div className="mt-2">
                <input type="hidden" value={editdata.menu_id} name="menu_id" />
                <select
                  name="menu_parent_id"
                  id="menu_parent_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option
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
                <input
                  type="text"
                  name="menu_name"
                  placeholder="Menu Name*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.menu_name && editdata.menu_name}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[0]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="menu_url"
                  placeholder="Menu URL*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.menu_url && editdata.menu_url}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[1]}</div>
              </div>

              <div className="mt-2">
                <textarea
                  name="menu_description"
                  placeholder="Menu Description*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  onChange={handleChangeFormdata}
                  value={editdata.menu_description && editdata.menu_description}
                ></textarea>
                <div className="errmsg">{errorMsg[1]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="meta_title"
                  placeholder="Meta Title*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.meta_title && editdata.meta_title}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[2]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="meta_description"
                  placeholder="Meta Description*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.meta_description && editdata.meta_description}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[3]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="meta_keyword"
                  placeholder="Meta Keyword*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.meta_keyword && editdata.meta_keyword}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[4]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="menu_disp_position"
                  placeholder="Display Position"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={
                    editdata.menu_disp_position && editdata.menu_disp_position
                  }
                  onChange={handleChangeFormdata}
                />
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {editdata.menu_id > 0 ? "Update" : "Submit"}
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
