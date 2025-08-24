import { NextRequest, NextResponse } from 'next/server';
import { getMenurolewise, getColleges, getCategories, getCourses,getCategoriesarr,getCoursesarr, getCoursebranchs, getCoursetype,getCollegetype,getRolelist,getModulearr,getRolesrr,getAdminusers,collegeenquirylisting,getWebsiteconfig, getQuestionlisting,getExamlist,getTrendinglist,getNotificationlisting,getCMSListing, editCms, getApprovedbyarr, getNewsarticleslisting, getFacility,updateCMS } from '@/models/collegesModel';
import { getMegamenulist, megamenuarrlist, menudetail, addNewmenudetails,updateMenudetails, editmenu } from '@/models/megamenuModel';
import {getWebsiteconfigdetails,updateWebconfig,getAvertisementlisting } from '@/models/advertisementModel';
import { countrylisting, statelisting, citylisting} from '@/models/locationModel';


export async function GET(request, {params}) {
    const { slug } = params;
    const searchParams = request.nextUrl.searchParams;

    if(slug === 'getmenulisting'){
        const menuList = await getMenurolewise(1);
        return NextResponse.json(menuList)
    }

    if(slug === 'getcollegeslisting'){
        const menuList = await getColleges(1);
        return NextResponse.json(menuList)
    }
    if(slug === 'getcategories'){
        const menuList = await getCategories();
        return NextResponse.json(menuList)
    }
    if(slug === 'getcourses'){
        const menuList = await getCourses();
        return NextResponse.json(menuList)
    }
    if(slug === 'getcategoriesarr'){
        const menuList = await getCategoriesarr();
        return NextResponse.json(menuList)
    }
    if(slug === 'getmegamenulist'){
        const menuList = await getMegamenulist();
        return NextResponse.json(menuList)
    }
    if(slug === 'megamenuarrlist'){
        const menuList = await megamenuarrlist();
        return NextResponse.json(menuList)
    }
    if(slug === 'getcoursebranchs'){
        const menuList = await getCoursebranchs();
        return NextResponse.json(menuList)
    }
    if(slug === 'getcoursesarr'){
        const menuList = await getCoursesarr();
        return NextResponse.json(menuList)
    }
    if(slug === 'getcoursetype'){
        const menuList = await getCoursetype(); 
        return NextResponse.json(menuList)
    }
    if(slug === 'getcollegetype'){
        const menuList = await getCollegetype(); 
        return NextResponse.json(menuList)
    }
    if(slug === 'getroleslist'){
        const returnresponse = await getRolelist(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getmodulesarr'){
        const returnresponse = await getModulearr(); 
        return NextResponse.json(returnresponse)
    } 
    if(slug === 'getrolesarr'){
        const returnresponse = await getRolesrr(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getadminuserslist'){
        const returnresponse = await getAdminusers(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getcollegeenquirylisting'){
        const returnresponse = await collegeenquirylisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'websiteconfig'){
        const returnresponse = await getWebsiteconfigdetails(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getupdatewebconfing'){
        const returnresponse = await updateWebconfig(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getquestinlisting'){
        const returnresponse = await getQuestionlisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getexamlisting'){
        const returnresponse = await getExamlist(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'gettrending'){
        const returnresponse = await getTrendinglist(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getnotificationlisting'){
        const returnresponse = await getNotificationlisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getcmslisting'){
        const returnresponse = await getCMSListing(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'editcms'){
        const cms_id = searchParams.get('cmsid'); // 
        const returnresponse = await editCms(cms_id); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getadvertisementlisting'){
        const returnresponse = await getAvertisementlisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getcountrylisting'){
        const returnresponse = await countrylisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getstatelisting'){
        const returnresponse = await statelisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getcitylisting'){
        const returnresponse = await citylisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getapprovedby'){
        const returnresponse = await getApprovedbyarr(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getnewsarticleslisting'){
        const returnresponse = await getNewsarticleslisting(); 
        return NextResponse.json(returnresponse)
    }
    if(slug === 'getfacilitys'){
        const returnresponse = await getFacility(); 
        return NextResponse.json(returnresponse)
    }
    

}
export async function POSTS(request) {
    // Parse the request body
    const body = await request.JSON();
  //   console.log('body=-==-=--->', body);
   
    // e.g. Insert new user into your DB
  //   const newUser = { id: Date.now(), name };
   
  //   return new Response(JSON.stringify(newUser), {
  //     status: 201,
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  }
  //export async function PUT(request,{}) {
    export async function POST(request, { params }) {
        const { slug } = params;  
    if(slug === 'getupdatecms'){
        const body = await request.json();
        try {
           const returnresponse = await updateCMS(body); 
           return NextResponse.json(returnresponse)
          } catch (error) {
            return NextResponse.json({ error: 'Failed to update cms' }, { status: 500 });
          }
    }
    
   
    // e.g. Insert new user into your DB
  //   const newUser = { id: Date.now(), name };
   
  //   return new Response(JSON.stringify(newUser), {
  //     status: 201,
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  }
