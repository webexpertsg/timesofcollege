"use client";
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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import TocInputWithLabel from "@/components/ui/atoms/tocInputWithLabel";
import TocButton from "@/components/ui/atoms/tocButtom";

function Facilites() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [datas, setDatas] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [facilityName, setFacilityName] = useState();
  const [errorMsg, setErrorMsg] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [editdata, setEditdata] = useState({
    facility_id: "",
    facility_name: "",
    facility_status: "",
  });
  useEffect(() => {
    axios
      .get("/api/admin/getfacilitys")
      .then((response) => {
        setDatas(response.data);
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
      accessorKey: "facility_name", //simple recommended way to define a column
      header: "Name",
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
  const addnewmenu = () => {
    setIsEditOpen(true);
    setEditdata("");
  };
  const editDetails = (editval) => {
    console.log("Edit facility id:", editval);
    axios
      //.get("/api/admin/editfacility/" + editval)
      .get("/api/admin/editfacility/?fid=" + editval)
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
                editDetails(row.original.facility_id);

                //console.log("Edit======------>", row.original.facility_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.facility_status === "A" && (
          <Tooltip title="Inactive">
            <IconButton color="error">
              <VisibilityOffIcon onClick={() => openDeleteConfirmModal(row)} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  });
  // add new facility
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure want to inactive this record?")) {
      deleteFacilty(row.original.facility_id);
      //console.log("Delete======------>", row.original.cmsid);
    }
  };
  const addfacitly = (e) => {
    e.preventDefault();
    const { facility_id, facility_name, facility_status } = e.target.elements;

    let errorsForm = [];

    if (facility_name.value === "") {
      errorsForm.push(
        <div key="branameErr">Facility Name cann't be blank!</div>
      );
    } else {
      errorsForm.push();
    }

    console.log("errorsForm", errorsForm);
    if (errorsForm.length === 0) {
      const payload = {
        facility_id: facility_id.value,
        facility_name: facility_name.value,
        facility_status: "A",
      };
      if (facility_id.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updatefacility",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            facility_id.value = "";
            facility_name.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("Facility details updated!", {
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
              .get("/api/admin/getfacilitys")
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
          url: "/api/admin/addfacitly",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            facility_id.value = "";
            facility_name.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("facility details updated!", {
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
              .get("/api/admin/getfacilitys")
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
              "<div className={errmsg}>Error in add facility record</div>"
            );
          });
      }
    } else {
      setErrorMsg(errorsForm);
    }
  };
  // end add new facility

  const deleteFacilty = (facility_id) => {
    if (facility_id > 0) {
      axios
        .get("/api/admin/inactivefacility/?facility_id=" + facility_id)
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
            // load facility listing
            axios
              .get("/api/admin/getfacilitys")
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
          <h1 className="text-2xl font-semibold">Facilites Listing</h1>
          <div className="actions">
            <span
              //</div>onClick={() => setIsEditOpen(true)}
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
            <span onClick={() => setIsFilter(true)}>
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
              {editdata.facility_id > 0 ? "Edit" : "Add"} Facility
            </h3>

            <form
              action=""
              method="post"
              id="facilitesForm"
              onSubmit={addfacitly}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    name="facility_id"
                    value={editdata.facility_id}
                  />

                  <TocInputWithLabel
                    id="facility_name"
                    label="Facility Name"
                    placeholder="Please Enter Facility Name."
                    value={editdata.facility_name ? editdata.facility_name : ""}
                    onChange={handleChangeFormdata}
                  />
                  <div className="errmsg">{errorMsg[0]}</div>
                </div>
              </div>
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {" "}
                  {editdata.facility_id > 0 ? "Update" : "Submit"}
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
export default Facilites;
