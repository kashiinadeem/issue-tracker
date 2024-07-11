import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/validationSchema"
import prisma from '@/prisma/client'


export async function POST( request: NextRequest) {
    const body = await request.json();
    const validated = createIssueSchema.safeParse(body);

    if(!validated.success)
        return NextResponse.json(validated.error.errors, {status: 404});

    const create = await prisma.issue.create({
        data:{
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(create, { status: 201 });
}