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
import TocRadioInput from "@/components/ui/atoms/tocRadio";
import TocSelectList from "@/components/ui/atoms/tocSelectlist";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TocButton from "@/components/ui/atoms/tocButtom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Adminusers() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  //}
  const [datas, setDatas] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [rolesarr, setRolesarr] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [adminstatus, setAdminstatus] = useState("A");
  const [roleid, setRoleid] = useState("");
  const [editdata, setEditdata] = useState({
    au_id: "",
    admin_id: "",
    admin_email: "",
    admin_password: "",
    admin_contact: "",
    admin_status: "A",
    rol_id: "",
  });

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
                editDetails(row.original.au_id);

                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.admin_status === "A" && (
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
      inactiveRecord(row.original.au_id);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (au_id) => {
    if (au_id > 0) {
      axios
        .get("/api/admin/inactiveuser/?au_id=" + au_id)
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
              .get("/api/admin/getadminuserslist")
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
  const editDetails = (editval) => {
    console.log("Edit admin user id:", editval);
    axios
      .get("/api/admin/edituser/?au_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        setRoleid(response.data[0].rol_id);
        setAdminstatus(response.data[0].admin_status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openpopup = () => {
    setIsEditOpen(true);
    setEditdata("");
    setRoleid("");
    setErrForm({});
  };
  const handleChangeFormdata = (e) => {
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const submitaddUsers = (e) => {
    const newErrors = {};
    e.preventDefault();
    const {
      au_id,
      admin_id,
      admin_email,
      admin_password,
      admin_contact,
      role_id,
    } = e.target.elements;

    if (!role_id.value.trim()) {
      newErrors.role_id = "Please select role!";
    }
    if (!admin_id.value.trim()) {
      newErrors.admin_id = "User Id cann't be blank!";
    }
    if (!admin_email.value.trim()) {
      newErrors.admin_email = "Email cann't be blank!";
    }
    if (!admin_password.value.trim()) {
      newErrors.admin_password = "Password cann't be blank!";
    }
    if (!admin_contact.value.trim()) {
      newErrors.admin_contact = "Contac no. cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        au_id: au_id.value,
        admin_id: admin_id.value,
        admin_password: admin_password.value,
        admin_contact: admin_contact.value,
        admin_email: admin_email.value,
        admin_status: adminstatus,
        rol_id: role_id.value,
      };
      if (au_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updateuser",
          data: payload,
        })
          .then(function (response) {
            //console.log(response);
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              setRoleid("");
              setAdminstatus("A");
              admin_id.value = "";
              admin_email.value = "";
              admin_password.value = "";
              admin_contact.value = "";
              toast.success("Admin user details updated!", {
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
              axios
                .get("/api/admin/getadminuserslist")
                .then((response) => {
                  setDatas(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url: "/api/admin/addusers",
          data: payload,
        })
          .then(function (response) {
            //console.log(response);
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              setRoleid("");
              setAdminstatus("A");
              admin_id.value = "";
              admin_email.value = "";
              admin_password.value = "";
              admin_contact.value = "";

              toast.success("Admin user details added!", {
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
              .get("/api/admin/getadminuserslist")
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
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Admin Users</h1>
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
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="9" />{" "}
                <line x1="9" y1="12" x2="15" y2="12" />{" "}
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </span>
            {/* <span
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
            <h3 className="font-bold text-lg">User Details</h3>
            <form
              action=""
              method="post"
              id="adminuserForm"
              onSubmit={submitaddUsers}
            >
              <div className="popupform">
                <div className="mt-2">
                  <TocSelectList
                    id="role_id"
                    label="Role"
                    options={rolesarr}
                    value={roleid}
                    required={true}
                    errmsg={errForm.role_id}
                    onChange={(e) => setRoleid(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input type="hidden" value={editdata.au_id} name="au_id" />
                  <TocInputWithLabel
                    id="admin_id"
                    label="Admin User"
                    placeholder="Please enter username."
                    value={editdata.admin_id ? editdata.admin_id : ""}
                    required={true}
                    errmsg={errForm.admin_id}
                    onChange={handleChangeFormdata}
                  />
                </div>

                <div className="mt-2">
                  <TocInputWithLabel
                    type="email"
                    id="admin_email"
                    label="Email Address"
                    placeholder="Please enter email address."
                    value={editdata.admin_email ? editdata.admin_email : ""}
                    required={true}
                    errmsg={errForm.admin_email}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    type="password"
                    id="admin_password"
                    label="Password"
                    placeholder="Please enter password."
                    value={
                      editdata.admin_password ? editdata.admin_password : ""
                    }
                    required={true}
                    errmsg={errForm.admin_password}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <TocInputWithLabel
                    id="admin_contact"
                    label="Contact No."
                    placeholder="Please enter contact no."
                    value={editdata.admin_contact ? editdata.admin_contact : ""}
                    required={true}
                    errmsg={errForm.admin_contact}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <label>Status</label>
                  <div className="flex gap-4">
                    <TocRadioInput
                      id="adminstatusa"
                      name="admin_status"
                      value="A"
                      label="Active"
                      checked={adminstatus === "A"}
                      onChange={(e) => setAdminstatus(e.target.value)}
                    />

                    <TocRadioInput
                      id="adminstatusd"
                      name="admin_status"
                      value="D"
                      label="Inactive"
                      checked={adminstatus === "D"}
                      onChange={(e) => setAdminstatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-section">
                <button onClick={() => setIsEditOpen(false)}>Cancle</button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.au_id > 0 ? "Update" : "Submit"}
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
                <button onClick={() => setIsFilter(false)}>Cancle</button>
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

export default Adminusers;
