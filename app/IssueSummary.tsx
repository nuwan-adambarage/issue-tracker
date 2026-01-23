import { Card, Flex, Text } from '@radix-ui/themes'
import { Status } from './generated/prisma/enums';
import { CustomLink } from './components';

interface Props{
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({open, inProgress, closed}: Props) => {
  const containers: {
    label: string, value: number, status: Status
  }[]= [
    { label: 'Open', value: open, status: 'OPEN'},
    { label: 'In Progress', value: inProgress, status: 'IN_PROGRESS'},
    { label: 'Close', value: closed, status: 'CLOSED'},
  ]
  return (
    <Flex gap="4">
      {containers.map(container =>
        <Card key={container.label}>
          <Flex direction='column' gap="2">
            <CustomLink href={`/issues?status=${container.status}`} label={container.label} />
            <Text size="5" className='font-bold'>{container.value}</Text>
          </Flex>
        </Card>
      )}

    </Flex>
  )
}

export default IssueSummary