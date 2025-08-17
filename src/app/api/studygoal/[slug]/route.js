import { NextRequest, NextResponse } from 'next/server';

import { studygoallisting } from '@/models/Frontend/studygoalModel';

export async function GET(request, {params}) {
    const { slug } = params;

    if(slug === 'studygoals'){
        const studygoalLists = await studygoallisting()
        return NextResponse.json(studygoalLists)
    }

}
