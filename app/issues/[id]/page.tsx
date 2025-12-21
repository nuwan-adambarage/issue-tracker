import {IssueStatusBadge} from '@/app/components'
import { prisma } from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes'
import delay from 'delay'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id }   = await params;
     if (!id) notFound();
    await delay(500);
    const issueId = Number(id);
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if(!issue)
        notFound();

  return (
    <Grid className='max-w-4xl' columns={{ initial: "1", md: "2" }} gap="4">
        <Box >
            <Text>{issue.title}</Text>
            <Flex gap="2" align="center">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose mt-4 bg-zinc-400'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </Box>
        <Box>
            <Button>
                <Pencil2Icon />
                <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
            </Button>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage