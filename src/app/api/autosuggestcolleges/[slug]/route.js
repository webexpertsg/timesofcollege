import { NextRequest, NextResponse } from 'next/server';

import { autosuggest } from '@/models/Frontend/authosuggestModel';

export async function GET(request, {params}) {
    const { slug } = params;
    
    const suggestion = await autosuggest(slug)
    return NextResponse.json(suggestion)


}
