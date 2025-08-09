"use client"

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from 'next/image';


function Admin(props) {
  const { courfilter } = useParams();
  return (
    <>
        <h1>Dashboard</h1>
    </>
  );
}

export default Admin;
