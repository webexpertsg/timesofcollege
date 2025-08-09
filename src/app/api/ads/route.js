import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';
import { getadslisting } from '@/models/Frontend/ads';


export async function GET(request) {
    const adsData = await getadslisting();    
    return NextResponse.json(adsData)
}

// app.get("/api/ads/", (req, res) => {
//   ads_model
//     .getadslisting()
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });