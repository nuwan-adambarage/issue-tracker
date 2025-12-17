import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { prisma } from "@/prisma/client";

const issueSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long")
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    })
    return NextResponse.json(newIssue, { status: 201 });
    
}