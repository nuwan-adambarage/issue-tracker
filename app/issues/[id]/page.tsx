import { prisma } from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
            <IssueDetails issue={issue} />     
        </Box>
        <Box>
            <EditIssueButton issueId={issue.id} />
        </Box>
    </Grid>
  )
}

export default IssueDetailPage