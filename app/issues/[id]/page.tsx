import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

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
    <div className='max-w-4xl'>
        <Text>{issue.title}</Text>
        <Flex gap="2" align="center">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose mt-4 bg-zinc-400'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetailPage