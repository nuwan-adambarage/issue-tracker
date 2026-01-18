import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';
import IssueForm from '../../_components/IssueForm';
import { use } from 'react';

interface Props {
    params: Promise<{
        id: string;
    }>
}
const EditIssuePage = async ({ params }: Props) => {
    const { id } = await params;
    console.log('Editing issue id:', id);
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