import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return NextResponse.json(
  //       { error: "Unauthenticated user" },
  //       { status: 401 }
  //     );
  //   }

  const { id } = await params;

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.message },
      { status: 400 }
    );
  }

  const { title, description, assignToUserId } = body;
  if (assignToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignToUserId },
    });
    if (!user)
      return NextResponse.json({ errors: "Invalid user" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  if (!issue) {
    return NextResponse.json(
      { errors: "Issue can not be found" },
      { status: 404 }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      assignToUserId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 }
    );
  }
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
}
