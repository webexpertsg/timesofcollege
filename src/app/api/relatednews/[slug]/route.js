import { NextRequest, NextResponse } from 'next/server';

import { relatedcollegenews } from '@/models/Frontend/collegelistingModel';


export async function GET(request, {params}) {
    const { slug } = params;

    // console.log('======>', slug);

    if(slug !== ''){
        const relatedNews = await relatedcollegenews(slug);
        return NextResponse.json(relatedNews)
    }

}
