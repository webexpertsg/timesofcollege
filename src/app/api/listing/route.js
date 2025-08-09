import { NextRequest, NextResponse } from 'next/server';

import { listing } from '@/models/Frontend/collegelistingModel';


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

    console.log('=============-----------------------------', slug);
    
    if(slug === 'collegelisting'){
        const collegeLists = await listing();
        return NextResponse.json(collegeLists)
    }

}
