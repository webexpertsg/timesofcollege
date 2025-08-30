import { NextRequest, NextResponse } from "next/server";

import {
  getMenurolewise,
  getColleges,
  getCategories,
  getCourses,
  getCategoriesarr,
  getCoursesarr,
  getCoursebranchs,
  getCoursetype,
  getCollegetype,
  getRolelist,
  getModulearr,
  getRolesrr,
  getAdminusers,
  collegeenquirylisting,
  getWebsiteconfig,
  getQuestionlisting,
  getExamlist,
  getTrendinglist,
  getNotificationlisting,
  getCMSListing,
  editCms,
  getApprovedbyarr,
  getApprovedby,
  getNewsarticleslisting,
  getFacility,
  getSubcoursestypearr,
  getSubcoursearr,
  getTradingarr,
  getFeetypearr,
  getFacilityarr,
  getCollegetypearr,
  updateCMS,
  addCms,
  deleteCMS,
  insertCollegeBasicInfoNew,
  updateCollegeBasicInfoNew,
  deleteFacility,
  editfacility,
  updatefacility,
  editapproved,
  updateapprovedby,
  addnewapprovedby,
  inactiveApprovedby,
  inactiveFacility,
} from "@/models/collegesModel";

import {
  getMegamenulist,
  megaMenuarrlist,
  menudetail,
  addNewmenudetails,
  updateMenudetails,
  editmenu,
} from "@/models/megamenuModel";
import {
  getWebsiteconfigdetails,
  updateWebconfig,
  getAvertisementlisting,
} from "@/models/advertisementModel";
import {
  countrylisting,
  statelisting,
  citylisting,
  countrydetail,
} from "@/models/locationModel";

export async function GET(request, { params }) {
  const { slug } = params;
  const searchParams = request.nextUrl.searchParams;

  if (slug === "getmenulisting") {
    const data = await getMenurolewise(1);
    return NextResponse.json(data);
  }

  if (slug === "getcollegeslisting") {
    const data = await getColleges(1);
    return NextResponse.json(data);
  }
  if (slug === "getcategories") {
    const data = await getCategories();
    return NextResponse.json(data);
  }
  if (slug === "getcourses") {
    const data = await getCourses();
    return NextResponse.json(data);
  }
  if (slug === "getcategoriesarr") {
    const data = await getCategoriesarr();
    return NextResponse.json(data);
  }
  if (slug === "getmegamenulisting") {
    const data = await getMegamenulist();
    return NextResponse.json(data);
  }
  if (slug === "megamenuarrlist") {
    const data = await megaMenuarrlist();
    return NextResponse.json(data);
  }
  if (slug === "getcoursebranchs") {
    const data = await getCoursebranchs();
    return NextResponse.json(data);
  }
  if (slug === "getcoursesarr") {
    const data = await getCoursesarr();
    return NextResponse.json(data);
  }
  if (slug === "getsubcoursestypearr") {
    const data = await getSubcoursestypearr();
    return NextResponse.json(data);
  }
  if (slug === "getsubcoursearr") {
    const data = await getSubcoursearr();
    return NextResponse.json(data);
  }
  if (slug === "gettradingarr") {
    const data = await getTradingarr();
    return NextResponse.json(data);
  }
  if (slug === "getcoursetype") {
    const data = await getCoursetype();
    return NextResponse.json(data);
  }
  if (slug === "getcollegetype") {
    const data = await getCollegetype();
    return NextResponse.json(data);
  }
  if (slug === "getroleslist") {
    const returnresponse = await getRolelist();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getmodulesarr") {
    const returnresponse = await getModulearr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getrolesarr") {
    const returnresponse = await getRolesrr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getadminuserslist") {
    const returnresponse = await getAdminusers();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcollegeenquirylisting") {
    const returnresponse = await collegeenquirylisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "websiteconfig") {
    const returnresponse = await getWebsiteconfigdetails();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getupdatewebconfing") {
    const returnresponse = await updateWebconfig();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getquestinlisting") {
    const returnresponse = await getQuestionlisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getexamlisting") {
    const returnresponse = await getExamlist();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getfeetypearr") {
    const returnresponse = await getFeetypearr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getfacilityarr") {
    const returnresponse = await getFacilityarr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcollegetypearr") {
    const returnresponse = await getCollegetypearr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "gettrending") {
    const returnresponse = await getTrendinglist();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getnotificationlisting") {
    const returnresponse = await getNotificationlisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcmslisting") {
    const returnresponse = await getCMSListing();
    return NextResponse.json(returnresponse);
  }
  if (slug === "editcms") {
    const cms_id = searchParams.get("cmsid"); //
    const returnresponse = await editCms(cms_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "deletecms") {
    const cms_id = searchParams.get("cmsid"); //
    const returnresponse = await deleteCMS(cms_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "getadvertisementlisting") {
    const returnresponse = await getAvertisementlisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcountrylisting") {
    const returnresponse = await countrylisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getstatelisting") {
    const returnresponse = await statelisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcitylisting") {
    const returnresponse = await citylisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "countrydetail") {
    const countid = searchParams.get("countid"); //
    const returnresponse = await countrydetail(countid);
    return NextResponse.json(returnresponse);
  }

  if (slug === "getapprovedby") {
    const returnresponse = await getApprovedby();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getnewsarticleslisting") {
    const returnresponse = await getNewsarticleslisting();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getfacilitys") {
    const returnresponse = await getFacility();
    return NextResponse.json(returnresponse);
  }
  if (slug === "editfacility") {
    const fid = searchParams.get("fid"); //
    const returnresponse = await editfacility(fid);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivefacility") {
    const facility_id = searchParams.get("facility_id"); //
    const returnresponse = await inactiveFacility(facility_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editapprovedby") {
    const appbyid = searchParams.get("appbyid"); //
    const returnresponse = await editapproved(appbyid);
    return NextResponse.json(returnresponse);
  }
  if (slug === "deleteapprovedby") {
    const approv_id = searchParams.get("approv_id"); //
    const returnresponse = await inactiveApprovedby(approv_id);
    return NextResponse.json(returnresponse);
  }
}
//export async function PUT(request,{}) {
export async function POST(request, { params }) {
  const { slug } = params;
  if (slug === "getupdatecms") {
    const body = await request.json();
    try {
      const returnresponse = await updateCMS(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update cms" },
        { status: 500 }
      );
    }
  }

  if (slug === "addnewcms") {
    const body = await request.json();
    try {
      const returnresponse = await addCms(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json({ error: "Failed to add cms" }, { status: 500 });
    }
  }
  if (slug === "updatefacility") {
    const body = await request.json();
    try {
      const returnresponse = await updatefacility(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update facility" },
        { status: 500 }
      );
    }
  }
  if (slug === "addnewapprovedby") {
    const body = await request.json();
    try {
      const returnresponse = await addnewapprovedby(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add approved by" },
        { status: 500 }
      );
    }
  }
  if (slug === "updateapprovedby") {
    const body = await request.json();
    try {
      const returnresponse = await updateapprovedby(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update approved by" },
        { status: 500 }
      );
    }
  }

  if (slug === "insertbasicinformation") {
    const body = await request.json();
    try {
      const returnresponse = await insertCollegeBasicInfoNew(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to Insert Colleges" },
        { status: 500 }
      );
    }
  }
}
