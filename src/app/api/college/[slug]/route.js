import { NextRequest, NextResponse } from 'next/server';

import { listing } from '@/models/Frontend/collegelistingModel';

import { filtercollegetypes, filtercourses, filterstate, filtercity } from '@/models/Frontend/filterModel';
import { getSubcoursestypearr, getSubcoursearr } from '@/models/collegesModel';
import { collegedetails, collegetitleappend } from '@/models/Frontend/collegelistingModel';



// export async function GET(request, {params}) {
//     const { slug } = params;
//     console.log('autosuggest----', NextRequest, slug);
    
//     if(slug === 'collegelisting'){
//         const collegeLists = await listing(parameters);
//         return NextResponse.json(collegeLists)
//     }

// }

export async function GET(request, {params}) {
    const { slug } = params;
    // const url = new URL(request.url);
    // const searchParams = request.nextUrl.searchParams;

    //     console.log('slug----->', slug, 'url---', searchParams);

    if(slug === 'getcollegetitleappend'){
        const append = await collegetitleappend();
        return NextResponse.json(append)
    }    

    if(slug === 'getsubcoursecollegearr'){
        const courses = await getSubcoursearr();
        return NextResponse.json(courses)
    }
    
    if(slug === 'collegelisting'){
        const collegeLists = await listing();
        return NextResponse.json(collegeLists)
    }

    if(slug === 'collegetypes'){
        const collegeTypesLists = await filtercollegetypes();
        return NextResponse.json(collegeTypesLists)
    }

    if(slug === 'collegecourses'){
        const courcesList = await filtercourses();
        return NextResponse.json(courcesList)
    }

    if(slug === 'states'){
        const stateList = await filterstate();
        return NextResponse.json(stateList)
    } 

    if(slug === 'cities'){
        const stateList = await filtercity();
        return NextResponse.json(stateList)
    }     

    if(slug === 'getsubcoursestypecollegelist') {
        const subcoursestypecollegelist = await getSubcoursestypearr();
        return NextResponse.json(subcoursestypecollegelist)
    }

    if(slug === 'getsubcoursecollegelist') {
        const subcoursecollegelist = await getSubcoursearr();
        return NextResponse.json(subcoursecollegelist)
    }

    const collegeUrl = url.pathname.split('/api/college/')[1]?.split('/'); 
    if(collegeUrl[0] !== ''){
        // const collegeDetails = {}
        // if(collegeUrl[0].includes('+')){
        //     collegeDetails = await collegedetails(collegeUrl[0].split('+')[0])
        // } else {
        // }
        const collegeDetails = await collegedetails(collegeUrl[0].split('+')[0])
        return NextResponse.json(collegeDetails)
    }
    //details api

}


export async function POST(request) {
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
