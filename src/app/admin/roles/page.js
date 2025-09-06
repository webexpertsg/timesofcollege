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
import TocCheckbox from "@/components/ui/atoms/tocCheckbox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TocButton from "@/components/ui/atoms/tocButtom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Roles() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [datas, setDatas] = useState([]);
  //const [editdata, setEditdata] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [modulearr, setModulearr] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [selectModule, setSelectModule] = useState([]);
  const [rolestatus, setRolestatus] = useState("A");
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
    const { id, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxModule = (event) => {
    const checkedId = event.target.value;

    if (event.target.checked) {
      setSelectModule([...selectModule, checkedId]);
    } else {
      setSelectModule(selectModule.filter((id) => id !== checkedId));
    }
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

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  // add new roles
  const [errorMsg, setErrorMsg] = useState([]);
  const submitAddroles = (e) => {
    const newErrors = {};
    e.preventDefault();
    const { role_name } = e.target.elements;
    const { rol_id } = e.target.elements;
    if (!role_name.value.trim()) {
      newErrors.role_name = "Role name cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        rol_id: rol_id.value,
        role_name: role_name.value,
        //modules_access_ids: assignmodul.join(","),
        //modules_access_ids: selectModule.join(","),
        modules_access_ids: selectModule,
        role_status: rolestatus,
      };
      if (rol_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updateroles",
          data: payload,
        })
          .then(function (response) {
            if (response.statusText == "OK") {
              setIsEditOpen(false);
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
                .get("/api/admin/getroleslist")
                .then((response) => {
                  setDatas(response.data);
                })
                .catch((error) => {
                  //console.error(error);
                  toast.error(error, {
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
      } else {
        axios({
          method: "post",
          url: "/api/admin/addroles",
          data: payload,
        })
          .then(function (response) {
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              role_name.value = "";
              toast.success("Role details added!", {
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
            } else {
              toast.error("Role details not added!", {
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
              .get("/api/admin/getroleslist")
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
            // setReturndspmsg('<div className"errmsg">Error in add record</div>');
          });
      }
    }
  };
  // end add new roles

  //edit role details

  const editDetails = (editval) => {
    console.log("Edit role id:", editval);
    axios
      .get("/api/admin/editroles/?rol_id=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        setRolestatus(response.data[0].role_status);
        let editmodulesArr = response.data[0].modules_access_ids;
        setSelectModule(editmodulesArr);
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
        {row.original.role_status === "A" && (
          <Tooltip title="Inactive">
            <IconButton color="error">
              <VisibilityOffIcon
                onClick={() => openInactiveConfirmModal(row)}
              />
            </IconButton>
          </Tooltip>
        )}
        {/* <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon
              onClick={() => {
                // data.splice(row.index, 1); //assuming simple data table
              }}
            />
          </IconButton>
        </Tooltip> */}
      </Box>
    ),
  });
  const openInactiveConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      inactiveRecord(row.original.rol_id);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (rol_id) => {
    if (rol_id > 0) {
      axios
        .get("/api/admin/inactiverole/?rol_id=" + rol_id)
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
              .get("/api/admin/getroleslist")
              .then((response) => {
                setDatas(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          //console.error(error);
          toast.success(error, {
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
        });
    }
  };
  const openpopup = () => {
    setIsEditOpen(true);
    setEditdata("");
    setSelectModule([]);
  };
  console.log("selectModule-->", selectModule);
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">Roles</h1>
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
            <h3 className="font-bold text-lg">
              {editdata.rol_id > 0 ? "Update" : "Add"} Role Details
            </h3>
            <form method="roleForm" id="roleForm" onSubmit={submitAddroles}>
              <div className="popupform">
                <div className="mt-2">
                  <input type="hidden" value={editdata.rol_id} name="rol_id" />
                  <TocInputWithLabel
                    id="role_name"
                    label="Role Name"
                    placeholder="Please enter role name."
                    value={editdata.role_name ? editdata.role_name : ""}
                    required={true}
                    errmsg={errForm.role_name}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div htmlFor="module" className="mt-2">
                  <label
                    htmlFor="model"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Module <span className="text-red-700">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {modulearr.map((item, id) => (
                      <div
                        key={`collegeType-${id}`}
                        className="items-center p-2 border bg-white border-gray-200 rounded-sm dark:border-gray-700"
                      >
                        <TocCheckbox
                          id={`modules-${item.mod_id}`}
                          value={item.mod_id}
                          label={item.module_title}
                          checked={selectModule.includes(
                            JSON.stringify(item.mod_id)
                          )}
                          onChange={handleCheckboxModule}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label>Status</label>
                    <div className="flex gap-4">
                      <TocRadioInput
                        id="role_statusa"
                        name="role_status"
                        value="A"
                        label="Active"
                        checked={rolestatus === "A"}
                        onChange={(e) => setRolestatus(e.target.value)}
                      />

                      <TocRadioInput
                        id="role_statusd"
                        name="role_status"
                        value="D"
                        label="Inactive"
                        checked={rolestatus === "D"}
                        onChange={(e) => setRolestatus(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.rol_id > 0 ? "Update" : "Submit"}
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
