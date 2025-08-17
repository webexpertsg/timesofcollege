"use client"

import { useParams } from "next/navigation";

import Listing from "@/components/features/listing";

function Course() {
  const params = useParams();
  return <Listing course_url={params.slug} />;
}
export default Course;