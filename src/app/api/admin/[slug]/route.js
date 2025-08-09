import { NextRequest, NextResponse } from 'next/server';

import { getMenurolewise, getColleges } from '@/models/collegesModel';


export async function GET(request, {params}) {
    const { slug } = params;
    
    if(slug === 'getmenulisting'){
        const menuList = await getMenurolewise(1);
        return NextResponse.json(menuList)
    }

    if(slug === 'getcollegeslisting'){
        const menuList = await getColleges(1);
        return NextResponse.json(menuList)
    }

}
