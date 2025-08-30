"use client"

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from 'next/image';

import MultiStepForm from "@/components/admin/addCollegeForm";


function AddEditColleges(props) {
  const { courfilter } = useParams();
  return (
    <>
        <MultiStepForm />
    </>
  );
}

export default AddEditColleges;
