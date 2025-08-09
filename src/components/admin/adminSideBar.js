"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";

import NavLink from "@/components/ui/navlink";

function AdminSideBar(props) {
  const [menulist, setMenulist] = useState([]);
  
  useEffect(() => {
    axios
      .get("/api/admin/getmenulisting/")
      .then((response) => {
        setMenulist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
        <div className="sidebar relative flex flex-col bg-white text-gray-700 h-100vh shadow-xl shadow-blue-gray-900/5">
          <aside id="sidebar">
            <ul>
              {menulist.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={`/admin/${item.module_link}`}
                    className={`text-sm ${({ isActive }) => (isActive ? "active" : "")}`}
                  >
                    {item.module_title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
    </>
  );
}

export default AdminSideBar;
