import { NextRequest, NextResponse } from 'next/server';

import { courseslisting } from '@/models/Frontend/coursesModel';

export async function GET(request, {params}) {
    const { slug } = params;
    
    if(slug === 'courseslisting'){
        const courseLists = await courseslisting()
        return NextResponse.json(courseLists)
    }

}
