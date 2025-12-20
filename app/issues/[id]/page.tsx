import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id }   = await params;
     if (!id) notFound();

    const issueId = Number(id);
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if(!issue)
        notFound();

  return (
    <div className='max-w-4xl space-y-2'>
        <Text>{issue.title}</Text>
        <Flex gap="2" align="center">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>{issue.description}</Card>
    </div>
  )
}

export default IssueDetailPage