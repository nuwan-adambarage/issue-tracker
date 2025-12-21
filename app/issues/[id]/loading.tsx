import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-4xl'>
        <Skeleton/>
        <Flex gap="2" align="center">
            <Skeleton width="5rem" />
            <Skeleton width="8rem" />
        </Flex>
        <Card className='prose mt-4 bg-zinc-400'>
            <Skeleton count={5} width='3rem'/>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage