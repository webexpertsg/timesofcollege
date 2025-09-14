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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TocButton from "@/components/ui/atoms/tocButtom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Collegetype() {
  // if (localStorage.getItem("login_id") <= 0) {
  //   window.location = "/login";
  // }
  const [datas, setDatas] = useState([]);
  const [errForm, setErrForm] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [collegetstatus, setCollegetstatus] = useState("A");
  const [editdata, setEditdata] = useState({
    col_type: "",
    college_type: "",
    college_type_status: "A",
  });
  useEffect(() => {
    axios
      .get("/api/admin/getcollegetype")
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
      accessorKey: "college_type", //simple recommended way to define a column
      header: "Type Name",
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
                editDetails(row.original.col_type);
                //console.log("Edit======------>", row.original.rol_id);
              }}
            />
          </IconButton>
        </Tooltip>
        {row.original.college_type_status === "A" && (
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
      inactiveRecord(row.original.col_type);
      //console.log("Delete======------>", row.original.cat_id);
    }
  };
  const inactiveRecord = (col_type) => {
    if (col_type > 0) {
      axios
        .get("/api/admin/inactivecollegetype/?col_type=" + col_type)
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
              .get("/api/admin/getcollegetype")
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
  //edit college type details
  const editDetails = (editval) => {
    console.log("Edit college type id:", editval);
    axios
      .get("/api/admin/editcollegetype/?col_type=" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
        setCollegetstatus(response.data[0].college_type_status);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //end edit college type

  const submitAddcollegetype = (e) => {
    const newErrors = {};
    e.preventDefault();
    const { col_type, college_type, college_type_status } = e.target.elements;

    if (!college_type.value.trim()) {
      newErrors.college_type = "College type cann't be blank!";
    }
    setErrForm(newErrors);
    if (!hasNotEmptyValue(newErrors)) {
      const payload = {
        col_type: col_type.value,
        college_type: college_type.value,
        college_type_status: college_type_status.value,
      };
      if (col_type.value > 0) {
        axios({
          method: "post",
          url: "/api/admin/updatecollegetype",
          data: payload,
        })
          .then(function (response) {
            //console.log(response);
            setCollegetstatus("A");
            college_type.value = "";
            if (response.statusText == "OK") {
              setIsEditOpen(false);
              toast.success("College type updated!", {
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
              .get("/api/admin/getcollegetype")
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
          url: "/api/admin/addcollegetype",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            setCollegetstatus("A");
            college_type.value = "";
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
              .get("/api/admin/getcollegetype")
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
  // end add new course
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
  return (
    <>
      <div className="flex bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold">College Type Listing</h1>
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
              {editdata.col_type > 0 ? "Edit" : "Add"} College Type
            </h3>

            <form
              action=""
              method="post"
              id="collegetypeForm"
              onSubmit={submitAddcollegetype}
            >
              <div className="popupform">
                <div className="mt-2">
                  <input
                    type="hidden"
                    value={editdata.col_type}
                    name="col_type"
                  />
                  <TocInputWithLabel
                    id="college_type"
                    label="College Type"
                    placeholder="Please enter college type."
                    value={editdata.college_type ? editdata.college_type : ""}
                    required={true}
                    errmsg={errForm.college_type}
                    onChange={handleChangeFormdata}
                  />
                </div>
                <div className="mt-2">
                  <label>Status</label>
                  <div className="flex gap-4">
                    <TocRadioInput
                      id="college_type_statusa"
                      name="college_type_status"
                      value="A"
                      label="Active"
                      checked={collegetstatus === "A"}
                      //onChange={handleChangeFormdata}
                      onChange={(e) => setCollegetstatus(e.target.value)}
                    />

                    <TocRadioInput
                      id="college_type_statusd"
                      name="college_type_status"
                      value="D"
                      label="Inactive"
                      checked={collegetstatus === "D"}
                      // onChange={handleChangeFormdata}
                      onChange={(e) => setCollegetstatus(e.target.value)}
                    />
                  </div>
                </div>
                <div className="btn-section">
                  <button type="button" onClick={() => setIsEditOpen(false)}>
                    Cancle
                  </button>

                  <TocButton type="submit" className="pl-10 pr-10 h-10">
                    {editdata.col_type > 0 ? "Update" : "Submit"}
                  </TocButton>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      )}

      {isFilter && (
        <DialogContent>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Filter</h3>
            <form>
              <TocInputWithLabel
                id="college_type"
                label="Branch Name"
                placeholder="Please enter college type."
                value={editdata.college_type ? editdata.college_type : ""}
                required={true}
                errmsg={errForm.college_type}
                onChange={handleChangeFormdata}
              />
              <input
                type="text"
                placeholder="Search by college name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="btn-section">
                <button type="button" onClick={() => setIsFilter(false)}>
                  Cancle
                </button>
                <TocButton type="submit" className="pl-10 pr-10 h-10">
                  {editdata.col_type > 0 ? "Update" : "Submit"}
                </TocButton>
              </div>
            </form>
          </div>
        </DialogContent>
      )}
      <ToastContainer />
    </>
  );
}
export default Collegetype;
