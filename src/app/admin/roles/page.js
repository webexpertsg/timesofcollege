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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Roles() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  //const [editdata, setEditdata] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [modulearr, setModulearr] = useState([]);
  const [rolesarr, setRolesarr] = useState([]);
  const [edmodulsarr, setEdmodulsarr] = useState([]);
  const [assignmodul, setAssignmodul] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [editdata, setEditdata] = useState({
    rol_id: "",
    role_name: "",
    modules_access_ids: [],
  });

  useEffect(() => {
    axios
      .get("/api/admin/getroleslist")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/admin/getmodulesarr")
      .then((response) => {
        setModulearr(response.data);
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
    // {
    //   accessorKey: "veh_id", //simple recommended way to define a column
    //   header: "veh_id",
    //   muiTableHeadCellProps: { sx: { color: "green" } }, //optional custom props
    //   Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    // },
    /*{
      accessorKey: "veh_id",
      header: "Id",
      enableEditing: false,
      size: 80,
    }, */
    {
      accessorKey: "role_name", //simple recommended way to define a column
      header: "Role Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "module_name", //simple recommended way to define a column
      header: "Access Modules",
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

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  // add new roles
  const [errorMsg, setErrorMsg] = useState([]);
  const addroles = (e) => {
    e.preventDefault();
    const { role_name } = e.target.elements;
    const { rol_id } = e.target.elements;
    if (role_name.value === "") {
      toast.error("Role cann't be blank!", {
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
      return;
    }
    console.log("role id ", rol_id.value);
    // console.log("errorsForm", errorsForm);
    if (rol_id.value > 0) {
      // console.log("--------------------->", assignmodul.join(","));
      const payload = {
        rol_id: rol_id.value,
        role_name: role_name.value,
        modules_access_ids: assignmodul.join(","),
        role_status: "A",
      };
      axios({
        method: "post",
        url: "/api/updateroles",
        data: payload,
      })
        .then(function (response) {
          console.log(response);
          console.log("respose text", response.statusText);
          if (response.statusText == "OK") {
            toast.success("Role details updated!", {
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
            //get results
            axios
              .get("/api/getroleslist")
              .then((response) => {
                setDatas(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
            //end get results
          } else {
            toast.error("Role details not updated!", {
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
        })
        .catch(function (error) {
          //console.log(error);
          setReturndspmsg('<div className"errmsg"></div>');
          toast.error("Error in update record!", {
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
    if (role_name.value != "" && rol_id.value == "") {
      // console.log("--------------------->", assignmodul.join(","));
      const payload = {
        role_name: role_name.value,
        modules_access_ids: assignmodul.join(","),
        role_status: "A",
      };
      axios({
        method: "post",
        url: "/api/addroles",
        data: payload,
      })
        .then(function (response) {
          console.log(response);
          role_name.value = "";
          setReturndspmsg(
            '<div className"sussmsg">Record successfully added</div>'
          );
          //get results
          axios
            .get("/api/getroleslist")
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
  // end add new roles

  //edit role details

  const editDetails = (editval) => {
    console.log("Edit role id:", editval);
    axios
      .get("/api/editroles/" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        let editmodulesArr = response.data[0].modules_access_ids;
        setAssignmodul(
          editmodulesArr.length > 0 ? editmodulesArr.split(",") : []
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //end edit role details

  const assingeModulvalue = (event) => {
    let index = assignmodul.indexOf(event.target.value);
    if (event.target.checked) {
      setAssignmodul((assignmodul) => [...assignmodul, event.target.value]);
    } else {
      assignmodul.splice(index, 1);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: false,
    enablePagination: false, //disable a default feature
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
                editDetails(row.original.rol_id);

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

  console.log("modul -->", assignmodul);

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Roles</h1>
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
            <h3 className="font-bold text-lg">Role Details</h3>
            <form method="roleForm" id="roleForm" onSubmit={addroles}>
              {returndspmsg && returndspmsg}
              <div className="mt-2">
                <input type="hidden" value={editdata.rol_id} name="rol_id" />
                <input
                  type="text"
                  placeholder="Role Name"
                  name="role_name"
                  onChange={handleChangeFormdata}
                  value={editdata.role_name && editdata.role_name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="errmsg">{errorMsg[0]}</div>

              <div htmlFor="module" className="mt-2">
                <label
                  htmlFor="model"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Module
                </label>
                {modulearr.map((item, i) => (
                  <div key={i} className="mt-2 text-sm">
                    <input
                      type="checkbox"
                      name="modules[]"
                      value={item.mod_id}
                      //onChange={(e) => handleCheckBox(e, i)}
                      onChange={handleChangeFormdata}
                      onClick={assingeModulvalue}
                      defaultChecked={
                        editdata.modules_access_ids?.length
                          ? editdata.modules_access_ids.includes(
                              JSON.stringify(item.mod_id)
                            )
                          : false
                      }
                      className="py-2  text-sm font-semibold"
                    />
                    <span className="py-2 px-2 text-sm font-normal text-justify">
                      {item.module_title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
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
                placeholder="Search by role name"
                onChange={handleChangeFormdata}
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

export default Roles;
