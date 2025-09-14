import { NextRequest, NextResponse } from "next/server";

import {
  getMenurolewise,
  getColleges,
  getCategories,
  getCourses,
  editcourse,
  addNewcourses,
  updatecourse,
  getCategoriesarr,
  editCategory,
  addNewcategories,
  updateCategory,
  getCoursesarr,
  getCoursebranchs,
  inactiveCoursebranch,
  getCoursetype,
  editCoursetype,
  updateCoursetype,
  addCoursetype,
  editRoles,
  getCollegetype,
  insertCollegetype,
  updateCollegetype,
  inactiveCollegetype,
  inactiveCoursetype,
  getRolelist,
  updateRoles,
  addRoles,
  inactiveRole,
  getModulearr,
  getRolesarr,
  getAdminusers,
  editUser,
  addnewUser,
  updateUser,
  inactiveUser,
  collegeenquirylisting,
  getQuestionlisting,
  getExamlist,
  edittrending,
  getTrendinglist,
  addNewTrending,
  updateTrending,
  inactiveTrending,
  addNewexam,
  updateExam,
  inactiveExam,
  getCMSListing,
  editCms,
  addCoursebrach,
  updateCoursebrach,
  editCoursebranch,
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
  inactiveCms,
  insertCollegeBasicInfoNew,
  updateCollegeBasicInfoNew,
  updateContactus,
  updateHighlight,
  updateAdmission,
  updateRating,
  updatePlacement,
  updateCourses,
  deleteFacility,
  editfacility,
  editCollege,
  updatefacility,
  editapproved,
  updateapprovedby,
  addnewapprovedby,
  inactiveApprovedby,
  inactiveFacility,
  inactiveCourse,
  editExam,
  editcollege,
  getCountryarr,
  getStatearr,
  getCityarr,
  inactiveCategory,
} from "@/models/collegesModel";

import {
  getMegamenulist,
  megaMenuarrlist,
  menudetail,
  addNewmenudetails,
  updateMenudetails,
  editmenu,
  inactiveMegamenu,
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

import {
  getNotificationlisting,
  inactiveNotification,
  geteditNotification,
  addNotification,
  updateNotification,
} from "@/models/notificationModel";

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
    const returnresponse = await getRolesarr();
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
  if (slug === "editnotification") {
    const notif_id = searchParams.get("notif_id"); //
    console.log("notif_id-->", notif_id);
    const returnresponse = await geteditNotification(notif_id);
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
  if (slug === "inactivecms") {
    const cms_id = searchParams.get("cmsid"); //
    const returnresponse = await inactiveCms(cms_id);
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
  if (slug === "editcourse") {
    const cour_id = searchParams.get("cour_id"); //
    const returnresponse = await editcourse(cour_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editcoursetype") {
    const coursetype_id = searchParams.get("coursetype_id"); //
    const returnresponse = await editCoursetype(coursetype_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editroles") {
    const rol_id = searchParams.get("rol_id"); //
    const returnresponse = await editRoles(rol_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactiverole") {
    const rol_id = searchParams.get("rol_id"); //
    const returnresponse = await inactiveRole(rol_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivefacility") {
    const facility_id = searchParams.get("facility_id"); //
    const returnresponse = await inactiveFacility(facility_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivecourse") {
    const cour_id = searchParams.get("cour_id"); //
    const returnresponse = await inactiveCourse(cour_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivecoursebrach") {
    const courb_id = searchParams.get("courb_id"); //
    const returnresponse = await inactiveCoursebranch(courb_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivemegamenu") {
    const menu_id = searchParams.get("menu_id"); //
    const returnresponse = await inactiveMegamenu(menu_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivecollegetype") {
    const col_type = searchParams.get("col_type"); //
    const returnresponse = await inactiveCollegetype(col_type);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivecoursetype") {
    const coursetype_id = searchParams.get("coursetype_id"); //
    const returnresponse = await inactiveCoursetype(coursetype_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactiveuser") {
    const au_id = searchParams.get("au_id"); //
    const returnresponse = await inactiveUser(au_id);
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
  if (slug === "inactivecategory") {
    const cat_id = searchParams.get("cat_id"); //
    const returnresponse = await inactiveCategory(cat_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivetrending") {
    const tid = searchParams.get("tid"); //
    const returnresponse = await inactiveTrending(tid);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactiveexam") {
    const exam_id = searchParams.get("exam_id"); //
    const returnresponse = await inactiveExam(exam_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "inactivenotification") {
    const notif_id = searchParams.get("notif_id"); //
    const returnresponse = await inactiveNotification(notif_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editcategory") {
    const cat_id = searchParams.get("cat_id"); //
    const returnresponse = await editCategory(cat_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editmenu") {
    const menu_id = searchParams.get("menu_id"); //
    const returnresponse = await editmenu(menu_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editcoursebranch") {
    const courb_id = searchParams.get("courb_id"); //
    const returnresponse = await editCoursebranch(courb_id);
    return NextResponse.json(returnresponse);
  }

  if (slug === "editcolleges") {
    const searchParams = request.nextUrl.searchParams;
    const cid = searchParams.get("cid");
    const returnresponse = await editcollege(cid);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editcollegetype") {
    const searchParams = request.nextUrl.searchParams;
    const col_type = searchParams.get("col_type");
    const returnresponse = await editCollege(col_type);
    return NextResponse.json(returnresponse);
  }
  if (slug === "edituser") {
    const au_id = searchParams.get("au_id"); //
    const returnresponse = await editUser(au_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "edittrending") {
    const tid = searchParams.get("tid"); //
    const returnresponse = await edittrending(tid);
    return NextResponse.json(returnresponse);
  }
  if (slug === "editexam") {
    const exam_id = searchParams.get("exam_id"); //
    const returnresponse = await editExam(exam_id);
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcountrylists") {
    const returnresponse = await getCountryarr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getstatelists") {
    const returnresponse = await getStatearr();
    return NextResponse.json(returnresponse);
  }
  if (slug === "getcitylists") {
    const returnresponse = await getCityarr();
    return NextResponse.json(returnresponse);
  }
}

//export async function PUT(request,{}) {
export async function POST(request, { params }) {
  const { slug } = params;
  if (slug === "updatecms") {
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
  if (slug === "addcategories") {
    const body = await request.json();
    try {
      const returnresponse = await addNewcategories(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add category" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatecategory") {
    const body = await request.json();
    try {
      const returnresponse = await updateCategory(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
    }
  }
  if (slug === "addcourse") {
    const body = await request.json();
    try {
      const returnresponse = await addNewcourses(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add course" },
        { status: 500 }
      );
    }
  }

  if (slug === "updatecourse") {
    const body = await request.json();
    try {
      const returnresponse = await updatecourse(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 }
      );
    }
  }
  if (slug === "addmenu") {
    const body = await request.json();
    try {
      const returnresponse = await addNewmenudetails(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add menu" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatemenu") {
    const body = await request.json();
    try {
      const returnresponse = await updateMenudetails(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update menu" },
        { status: 500 }
      );
    }
  }
  if (slug === "addcoursebranches") {
    const body = await request.json();
    try {
      const returnresponse = await addCoursebrach(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add menu" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatecoursebranches") {
    const body = await request.json();
    try {
      const returnresponse = await updateCoursebrach(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update course branch" },
        { status: 500 }
      );
    }
  }

  if (slug === "addcoursetype") {
    const body = await request.json();
    try {
      const returnresponse = await addCoursetype(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add couse type" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatecoursetype") {
    const body = await request.json();
    try {
      const returnresponse = await updateCoursetype(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update course type" },
        { status: 500 }
      );
    }
  }
  if (slug === "addroles") {
    const body = await request.json();
    try {
      const returnresponse = await addRoles(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add couse type" },
        { status: 500 }
      );
    }
  }
  if (slug === "updateroles") {
    const body = await request.json();
    try {
      const returnresponse = await updateRoles(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update course type" },
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
  if (slug === "addcollegetype") {
    const body = await request.json();
    try {
      const returnresponse = await insertCollegetype(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to Insert Colleges" },
        { status: 500 }
      );
    }
  }

  if (slug === "updatecollegetype") {
    const body = await request.json();
    try {
      const returnresponse = await updateCollegetype(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Contacts" },
        { status: 500 }
      );
    }
  }
  if (slug === "addusers") {
    const body = await request.json();
    try {
      const returnresponse = await addnewUser(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to Insert admin user" },
        { status: 500 }
      );
    }
  }
  if (slug === "updateuser") {
    const body = await request.json();
    try {
      const returnresponse = await updateUser(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update admin user" },
        { status: 500 }
      );
    }
  }
  if (slug === "addtrending") {
    const body = await request.json();
    try {
      const returnresponse = await addNewTrending(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to Insert trending" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatetrending") {
    const body = await request.json();
    try {
      const returnresponse = await updateTrending(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update tending" },
        { status: 500 }
      );
    }
  }
  if (slug === "addexam") {
    const body = await request.json();
    try {
      const returnresponse = await addNewexam(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to Insert exam" },
        { status: 500 }
      );
    }
  }

  if (slug === "updateexam") {
    const body = await request.json();
    try {
      const returnresponse = await updateExam(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update exam" },
        { status: 500 }
      );
    }
  }

  if (slug === "addnotification") {
    const body = await request.json();
    try {
      const returnresponse = await addNotification(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to Insert notification" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatenotification") {
    const body = await request.json();
    try {
      const returnresponse = await updateNotification(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update notification" },
        { status: 500 }
      );
    }
  }

  if (slug === "updatebasicinformation") {
    const body = await request.json();
    try {
      const returnresponse = await updateCollegeBasicInfoNew(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update basic info" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatecontacts") {
    const body = await request.json();
    try {
      const returnresponse = await updateContactus(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Contacts" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatehighlight") {
    const body = await request.json();
    try {
      const returnresponse = await updateHighlight(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Highlights" },
        { status: 500 }
      );
    }
  }
  if (slug === "updateadmission") {
    const body = await request.json();
    try {
      const returnresponse = await updateAdmission(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Admission" },
        { status: 500 }
      );
    }
  }
  if (slug === "updaterating") {
    const body = await request.json();
    try {
      const returnresponse = await updateRating(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Rating" },
        { status: 500 }
      );
    }
  }
  if (slug === "updateplacement") {
    const body = await request.json();
    try {
      const returnresponse = await updatePlacement(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Placement" },
        { status: 500 }
      );
    }
  }
  if (slug === "updatecourses") {
    const body = await request.json();
    try {
      const returnresponse = await updateCourses(body);
      return NextResponse.json(returnresponse);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update Placement" },
        { status: 500 }
      );
    }
  }
}
