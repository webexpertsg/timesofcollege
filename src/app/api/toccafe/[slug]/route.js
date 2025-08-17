import { NextRequest, NextResponse } from 'next/server';

import { toccafelisting } from '@/models/Frontend/toccafeModel';

export async function GET(request, {params}) {
    const { slug } = params;
    console.log('slug----', slug);

    if(slug === 'toccafelisting'){
        const cafelist = await toccafelisting()
        return NextResponse.json(cafelist)
    }

}
