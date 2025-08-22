"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CKEditor, wysiwyg } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  List,
  Table,
  Heading,
  BlockQuote,
  Alignment,
} from "ckeditor5";
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

function Location() {
  if (localStorage.getItem("login_id") <= 0) {
    window.location = "/login";
  }
  const [countrylist, setCountrylist] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [returndspmsg, setReturndspmsg] = useState();
  const [errorMsg, setErrorMsg] = useState([]);
  const [isEditOpencunt, setIsEditOpencunt] = useState(false);
  const [isEditOpensta, setIsEditOpensta] = useState(false);
  const [isEditOpencty, setIsEditOpencty] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [editdata, setEditdata] = useState({
    cout_id: "",
    meta_description: "",
    meta_keyword: "",
    meta_title: "",
    country_name: "",
    country_url: "",
  });
  const [countryActive, setCountryActive] = useState("active");
  const [stateActive, setStateActive] = useState("");
  const [cityActive, setCityActive] = useState("");

  const [isCountry, setIsCountry] = useState(true);
  const [isState, setIsState] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [countrybriefvalue, setCountrybriefvalue] = useState();
  const [statebriefvalue, setStatebriefvalue] = useState();
  const [citybriefvalue, setCitybriefvalue] = useState();
  useEffect(() => {

    axios
      .get("/api/admin/getcountrylisting")
      .then((response) => {
        setCountrylist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      //.get("https://jsonplaceholder.typicode.com/posts")
      .get("/api/admin/getstatelisting")
      .then((response) => {
        setStatelist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      //.get("https://jsonplaceholder.typicode.com/posts")
      .get("/api/admin/getcitylisting")
      .then((response) => {
        setCitylist(response.data);
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

  //start country listing
  //const data = JSON.parse(datas);
  //const keys = Object.keys(data.length ? data[0] : {});
  const data = countrylist;
  const columns = [
    {
      accessorKey: "country_name", //simple recommended way to define a column
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "country_url", //simple recommended way to define a column
      header: "URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
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
          <IconButton onClick={() => setIsEditOpencunt(true)}>
            <EditIcon
              onClick={() => {
                // table.setEditingRow(row);
                editCountryDetails(row.original.cout_id);

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
  //end country listing

  // state listing
  const dataste = statelist;
  const columnstate = [
    {
      accessorKey: "state_name", //simple recommended way to define a column
      header: "State Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "country_name", //simple recommended way to define a column
      header: "Country Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
  ];
  const [rowSelectionste, setRowSelectionste] = useState({});

  const tablestate = useMaterialReactTable({
    columns: columnstate,
    data: dataste,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: false,
    enablePagination: true, //disable a default feature
    enableRowActions: true,
    onRowSelectionChange: setRowSelectionste, //hoist internal state to your own state (optional)
    state: { rowSelection }, //manage your own state, pass it back to the table (optional)
    renderRowActions: ({ row, tablestate }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => setIsEditOpensta(true)}>
            <EditIcon
              onClick={() => {
                // table.setEditingRow(row);
                editCountryDetails(row.original.cout_id);

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
  //end state listing

  // city listing
  const datacity = citylist;
  const columncity = [
    {
      accessorKey: "city_name", //simple recommended way to define a column
      header: "City Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "city_url", //simple recommended way to define a column
      header: "City URL",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorKey: "state_name", //simple recommended way to define a column
      header: "State Name",
      muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
      //Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
  ];
  const [rowSelectioncity, setRowSelectioncity] = useState({});

  const tablecity = useMaterialReactTable({
    columns: columncity,
    data: datacity,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: false,
    enablePagination: true, //disable a default feature
    enableRowActions: true,
    onRowSelectionChange: setRowSelectioncity, //hoist internal state to your own state (optional)
    state: { rowSelectioncity }, //manage your own state, pass it back to the table (optional)
    renderRowActions: ({ row, tablecity }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => setIsEditOpencty(true)}>
            <EditIcon
              onClick={() => {
                // table.setEditingRow(row);
                editCountryDetails(row.original.cit_id);

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
  //end state listing

  // add new country
  const addnewcountry = () => {
    setIsEditOpencunt(true);
    setEditdata("");
  };
  const editCountryDetails = (editval) => {
    console.log("Edit country id:", editval);
    axios
      .get("/api/countrydetail/" + editval)
      .then((response) => {
        setEditdata(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addcountry = (e) => {
    e.preventDefault();
    const {
      cout_id,
      country_name,
      country_url,
      meta_title,
      meta_description,
      meta_keyword,
    } = e.target.elements;

    let errorsForm = [];

    if (country_name.value === "") {
      errorsForm.push(
        <div key="branameErr">Country Name cann't be blank!</div>
      );
    } else {
      errorsForm.push();
    }
    if (country_url.value === "") {
      errorsForm.push(<div key="branurlErr">Country URL cann't be blank!</div>);
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
        cout_id: cout_id.value,
        country_name: country_name.value,
        country_url: country_url.value,
        country_brief: countrybriefvalue,
        meta_title: meta_title.value,
        meta_description: meta_description.value,
        meta_keyword: meta_keyword.value,
      };
      if (cout_id.value > 0) {
        axios({
          method: "post",
          url: "/api/updatecountry",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            cout_id.value = "";
            country_name.value = "";
            country_url.value = "";
            meta_title.value = "";
            meta_description.value = "";
            meta_keyword.value = "";
            if (response.statusText == "OK") {
              setIsEditOpencunt(false);
              toast.success("Country details updated!", {
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
              .get("/api/getcountrylisting")
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
          url: "/api/addcountry",
          data: payload,
        })
          .then(function (response) {
            console.log(response);
            cout_id.value = "";
            country_name.value = "";
            country_url.value = "";
            meta_title.value = "";
            meta_description.value = "";
            meta_keyword.value = "";
            setReturndspmsg(
              "<div className={sussmsg}>Record successfully added</div>"
            );
            //get results
            axios
              .get("/api/getcountrylisting")
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
              "<div className={errmsg}>Error in add country record</div>"
            );
          });
      }
    } else {
      setErrorMsg(errorsForm);
    }
  };
  // end add new country
  const showCountry = () => {
    setIsCountry(true);
    setIsState(false);
    setIsCity(false);

    setCountryActive("active");
    setStateActive("");
    setCityActive("");
  };
  const showState = () => {
    setIsCountry(false);
    setIsState(true);
    setIsCity(false);

    setCountryActive("");
    setStateActive("active");
    setCityActive("");
  };
  const showCity = () => {
    setIsCountry(false);
    setIsState(false);
    setIsCity(true);

    setCountryActive("");
    setStateActive("");
    setCityActive("active");
  };
  const renderCountry = () => {
    return (
      <>
        <div className="flex bg-white shadow">
          <div className="pageHeader p-3">
            <h1 className="text-2xl font-semibold"></h1>
            <div className="actions">
              <span
                // onClick={() => document.getElementById("users_modal").showModal()}
                onClick={() => addnewcountry()}
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
      </>
    );
  };
  const renderState = () => {
    return (
      <>
        <div className="flex bg-white shadow">
          <div className="pageHeader p-3">
            <h1 className="text-2xl font-semibold"></h1>
            <div className="actions">
              <span
                // onClick={() => document.getElementById("users_modal").showModal()}
                onClick={() => addnewexam()}
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
            <MaterialReactTable table={tablestate} />
          </div>
        </div>
      </>
    );
  };
  const renderCity = () => {
    return (
      <>
        <div className="flex bg-white shadow">
          <div className="pageHeader p-3">
            <h1 className="text-2xl font-semibold"></h1>
            <div className="actions">
              <span
                // onClick={() => document.getElementById("users_modal").showModal()}
                onClick={() => addnewexam()}
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
            <MaterialReactTable table={tablecity} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {console.log("status --> ", isCountry, isState, isCity)}
      <div className="p-2 locationlist">
        <div className="mx-auto max-w-7xl py-6 sm:px-2 lg:px-2">
          <div className="flex-grow gap-10 step-tabs">
            <Link href="#" className={countryActive} onClick={showCountry}>
              <span>Country</span>
            </Link>
            <Link href="#" className={stateActive} onClick={showState}>
              <span>State</span>
            </Link>
            <Link href="#" className={cityActive} onClick={showCity}>
              <span>City</span>
            </Link>
          </div>
          {isCountry && renderCountry()}
          {isState && renderState()}
          {isCity && renderCity()}
        </div>
      </div>

      {isEditOpencunt && (
        <DialogContent>
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsEditOpencunt(false)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
              {editdata.cout_id > 0 ? "Edit" : "Add"} Country
            </h3>

            <form
              action=""
              method="post"
              id="countryForm"
              onSubmit={addcountry}
            >
              {returndspmsg && returndspmsg}
              <div className="mt-2">
                <input type="hidden" value={editdata.cout_id} name="cout_id" />
                <input
                  type="text"
                  name="country_name"
                  placeholder="Country Name*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.country_name && editdata.country_name}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[0]}</div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="country_url"
                  placeholder="Country URL*"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={editdata.country_url && editdata.country_url}
                  onChange={handleChangeFormdata}
                />
                <div className="errmsg">{errorMsg[1]}</div>
              </div>
              <div className="mt-2">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    plugins: [
                      Essentials,
                      Heading,
                      Paragraph,
                      Bold,
                      Italic,
                      BlockQuote,
                      Alignment,
                      List,
                      Mention,
                      Table,
                      Number,
                    ],
                    toolbar: [
                      "Heading",
                      "|",
                      "Essentials",
                      "Paragraph",

                      "Bold",
                      "Italic",
                      "Alignment",
                      "Link",
                      "ListUI",
                      "BlockQuote",
                      "Undo",
                      "Redo",
                      "Mention",
                      "Table",
                      "|",
                      "numberedList",
                      "bulletedList",
                      ,
                    ],
                    removePlugins: [
                      "Image",
                      "ImageCaption",
                      "ImageStyle",
                      "ImageToolbar",
                      "ImageUpload",
                    ],
                    menuBar: {
                      isVisible: true,
                    },
                  }}
                  data={editdata.country_brief ? editdata.country_brief : ""}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor 1 is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const cuntry_desc = editor.getData();
                    setCountrybriefvalue(cuntry_desc);
                    //console.log({ event, editor, cuntry_desc });
                  }}
                />

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
              <div className="btn-section">
                <button type="button" onClick={() => setIsEditOpencunt(false)}>
                  Cancle
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {editdata.cout_id > 0 ? "Update" : "Submit"}
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
export default Location;
