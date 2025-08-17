import { NextRequest, NextResponse } from 'next/server';

import { examlisting, examdetail } from '@/models/Frontend/examModel';

export async function GET(request, {params}) {
    const { slug } = params;
    
    if(slug === 'examlist'){
        const examLists = await examlisting()
        return NextResponse.json(examLists)
    } else {
        const examDetails = await examdetail(slug)
        return NextResponse.json(examDetails)
    }

}
