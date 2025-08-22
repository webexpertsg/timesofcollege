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

import axios from "axios";

function Adminusers() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [modulearr, setModulearr] = useState([]);
  const [rolesarr, setRolesarr] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    
    axios
      .get("/api/admin/getadminuserslist")
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

    axios
      .get("/api/admin/getrolesarr")
      .then((response) => {
        setRolesarr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
      accessorKey: "admin_id", //simple recommended way to define a column
      header: "User Id",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "admin_email", //simple recommended way to define a column
      header: "Email",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "admin_contact", //simple recommended way to define a column
      header: "Contact No.",
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
    enableRowSelection: true,
    enablePagination: false, //disable a default feature
    onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
    state: { rowSelection }, //manage your own state, pass it back to the table (optional)
  });
  // add new course branches
  const [errorMsg, setErrorMsg] = useState([]);
  const addusers = (e) => {
    e.preventDefault();
    const { admin_id, admin_email, admin_password, admin_contact, role_id } =
      e.target.elements;

    let errorsForm = [];
    if (admin_id.value === "") {
      errorsForm.push(<div key="branameErr">User Id cann't be blank!</div>);
    } else {
      errorsForm.push();
    }
    if (admin_email.value === "") {
      errorsForm.push(<div key="branameErr">Email cann't be blank!</div>);
    } else {
      errorsForm.push();
    }

    console.log("errorsForm", errorsForm);
    if (errorsForm.length === 0) {
      const payload = {
        admin_id: admin_id.value,
        admin_password: admin_password.value,
        admin_contact: admin_contact.value,
        admin_email: admin_email.value,
        modules_access_ids: permissions,
        admin_status: "A",
        rol_id: role_id.value,
      };
      axios({
        method: "post",
        url: "/api/addusers",
        data: payload,
      })
        .then(function (response) {
          console.log(response);
          admin_id.value = "";
          admin_email.value = "";
          admin_password.value = "";
          admin_contact.value = "";
          setReturndspmsg(
            '<div className"sussmsg">Record successfully added</div>'
          );
          //get results
          axios
            .get("/api/getadminuserslist")
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

  const handleCheck = (event) => {
    var permissions_array = [...permissions];
    if (event.target.checked) {
      permissions_array = [...permissions, event.target.value];
    } else {
      permissions_array.splice(permissions.indexOf(event.target.value), 1);
    }
    setPermissions(permissions_array);
  };

  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Admin Users</h1>
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
              //onClick={() => document.getElementById("filter_modal").showModal() }
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
            <h3 className="font-bold text-lg">User Details</h3>
            <form
              action=""
              method="post"
              id="coursebranchForm"
              onSubmit={addusers}
            >
              {returndspmsg && returndspmsg}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="User Id"
                  name="admin_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="errmsg">{errorMsg[0]}</div>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="admin_email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[1]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder="password"
                  name="admin_password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[2]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Contact no*"
                  name="admin_contact"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="errmsg">{errorMsg[3]}</div>
              </div>
              <div className="mt-2">
                <select
                  name="role_id"
                  id="role_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Roles</option>
                  {rolesarr.map((rol) => (
                    <option value={rol.rol_id}>{rol.role_name}</option>
                  ))}
                  ;
                </select>
                <div className="errmsg">{errorMsg[0]}</div>
              </div>
              <div className="btn-section">
                <button onClick={() => setIsEditOpen(false)}>Cancle</button>
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
                placeholder="Search by college name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="btn-section">
                <button onClick={() => setIsFilter(false)}>Cancle</button>
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      )}
    </>
  );
}

export default Adminusers;
