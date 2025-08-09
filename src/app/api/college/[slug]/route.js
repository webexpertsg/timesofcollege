import { NextRequest, NextResponse } from 'next/server';

import { listing } from '@/models/Frontend/collegelistingModel';

import { filtercollegetypes, filtercourses, filterstate, filtercity } from '@/models/Frontend/filterModel';

import { getSubcoursestypearr, getSubcoursearr } from '@/models/collegesModel';



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
    
    if(slug === 'collegelisting'){
        const collegeLists = await listing();
        return NextResponse.json(collegeLists)
    }

    //filters api

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


    //details api


}
