import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';

const EditIssuePage = async ({ params }: { params: { id: string }}) => {
    const { id } = await params;
    if (!id) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) }
    });
    if(!issue) notFound();
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage