import { prisma } from '@/prisma/client'
import { Box, Card, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { CardStackIcon } from '@radix-ui/react-icons'

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
    <Grid className='max-w-4xl' columns={{ initial: "1", md: "5" }} gap="4">
        <Box style={{ gridColumn: 'span 4' }}>
            <IssueDetails issue={issue} />     
        </Box>
        <Flex gap="3" justify="start" style={{ gridColumn: 'span 1' }}>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
        </Flex>
    </Grid>
  )
}

export default IssueDetailPage