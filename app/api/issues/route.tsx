import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from '@/prisma/client'

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

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