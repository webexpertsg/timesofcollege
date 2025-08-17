import { NextRequest, NextResponse } from 'next/server';

import { relatedcollegecoursewise } from '@/models/Frontend/collegelistingModel';


export async function GET(request, {params}) {
    const { slug } = params;

    // console.log('related======>', slug);

    if(slug !== ''){
        const relatedClg = await relatedcollegecoursewise(slug);
        return NextResponse.json(relatedClg)
    }

}
