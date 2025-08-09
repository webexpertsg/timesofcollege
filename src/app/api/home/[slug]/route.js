import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';
import { 
    featuredColleges, 
    topCourses, 
    trendings,
    studybycities, 
    topNotification,
    topPopularcolleges,
    goal,
    exams,
    newsandupdates
} from '@/models/Frontend/landingModel';
import { autosuggest } from '@/models/Frontend/authosuggestModel';


export async function GET(request, {params}) {
    const { slug } = params;
    
    if(slug === 'featured'){
        const collegeList = await featuredColleges();
        return NextResponse.json(collegeList)
    }

    if(slug === 'topcourses'){
        const courses = await topCourses();
        return NextResponse.json(courses)
    }

    if(slug === 'trending'){
        const trending = await trendings();
        return NextResponse.json(trending)
    }

    if(slug === 'studybycities'){
        const citywise = await studybycities();
        return NextResponse.json(citywise)
    }

    if(slug === 'autocomplete'){
        const autosugg = await autosuggest();
        return NextResponse.json(autosugg)
    }

    if(slug === 'topnotifications'){
        const topnotification = await topNotification();
        return NextResponse.json(topnotification)
    }

    if(slug === 'toppopulercolleges'){
        const popularCollege = await topPopularcolleges();
        return NextResponse.json(popularCollege)
    }

    if(slug === 'futuregoal'){
        const futuregoal = await goal();
        return NextResponse.json(futuregoal)
    }

    if(slug === 'landingexams'){
        const exam = await exams();
        return NextResponse.json(exam)
    }

    if(slug === 'landingnewsandupdates'){
        const newsupdates = await newsandupdates();
        return NextResponse.json(newsupdates)
    }
}
