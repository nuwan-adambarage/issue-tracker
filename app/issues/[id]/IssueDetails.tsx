import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@/app/generated/prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue}: { issue: Issue}) => {
  return (
    <>
    <Text>{issue.title}</Text>
    <Flex gap="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className='prose mt-4 bg-zinc-400'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
    </>
  )
}

export default IssueDetails