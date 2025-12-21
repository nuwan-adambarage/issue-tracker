import ErrorMessage from '@/app/components/ErrorMessage'
import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const loadingNewIssuePage = () => {
  return (
    <div className='max-w-2xl'>
      <h1 className='mb-5 text-2xl font-bold'>Create New Issue</h1>
      <form className='space-y-3'
      >        
        <Box>
            <Skeleton height={40} />
        </Box>                  
        <ErrorMessage>
            <Skeleton width="8rem" />
        </ErrorMessage>        
        <Box>
            <Skeleton height={200} />
        </Box>
        
      </form>
    </div>
  )
}

export default loadingNewIssuePage