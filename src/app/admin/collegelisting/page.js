"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';

import placeHolderImg from "@/public/images/ads.svg";

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

function Collegelisting() {

    //   if (localStorage.getItem("login_id") <= 0) {
    //     window.location = "/login";
    //   }

  const [datas, setDatas] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    localStorage.setItem('login_id', 1)
    localStorage.setItem('role_id', 1)

    axios
      .get(
        "/api/admin/getcollegeslisting?loginid=" +
          localStorage.getItem("login_id") +
          "&loginrole_id=" +
          localStorage.getItem("role_id")
      )
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const data = datas;

  const columns = [
    {
      accessorKey: "college_name", 
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
    },
    {
      accessorKey: "college_url",
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
    },
    {
      accessorKey: "tag_line", 
      header: "Tag Line",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, 
    },
    {
      accessorKey: "usp_remark", 
      header: "Remark",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, 
    },
    {
      accessorKey: "found_year", 
      header: "Found Year",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, 
    },
    {
      accessorKey: "logo",
      header: "Logo",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
      Cell: ({ cell }) => (
        <span>
          {/* <img src={getImageURL(cell.getValue())} /> */}
            <Image 
                src={(location.hostname !== 'localhost' && cell.getValue()) ? cell.getValue() : placeHolderImg}
                alt=''
                width={80}
                height={40}
            />
        </span>
      ), 
    },
    {
      accessorKey: "banner", 
      header: "Banner",
      muiTableHeadCellProps: { sx: { color: "black" } }, 
      Cell: ({ cell }) => (
        <span>
          {/* <img src={getImageURL(cell.getValue())} /> */}
            <Image 
                src={(location.hostname !== 'localhost' && cell.getValue()) ? cell.getValue() : placeHolderImg}
                alt=''
                width={80}
                height={40}
            />
        </span>
      ), 
    },

  ];
  const [rowSelection, setRowSelection] = useState({});

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: false,
    enablePagination: true, 
    enableRowActions: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon
              onClick={() => {
                // table.setEditingRow(row);
                editDetails(row.original.cid);
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

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  const editDetails = (editval) => {
    console.log("Edit college id:", editval);
    if (editval > 0) {
      window.location.href = "/admin/collegelisting/college/" + editval;
    }
  };

  return (
    <>
      <div className="bg-white shadow">
        <div className="pageHeader p-3">
          <h1 className="text-2xl font-semibold" style={{marginTop: '0px'}}>College Listing</h1>
          <div className="actions">
            <span>
              <Link
                href={"/admin/collegelisting/addeditcollege"}
                alt="Add New College Details"
                title="Add New College Details"
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
              </Link>
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

      {/* {isFilter && (
        <DialogContent>
          <div className="modal-box">
            <form method="dialog">
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
              <br></br>
              <button>Cancle</button>
              <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Submit
              </button>
            </form>
          </div>
        </DialogContent>
      )} */}
      
    </>
  );
}

export default Collegelisting;
