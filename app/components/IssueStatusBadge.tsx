import React from 'react'
import { Status } from '../generated/prisma/enums'
import { Badge } from '@radix-ui/themes'

interface Props {
    status: Status
}

const statusMap: Record<Status, {'lable': string, 'color': 'green' | 'red' | 'violet' }> = {
    'OPEN': {'lable': 'Open', 'color': 'green'},
    'IN_PROGRESS': {'lable': 'In Progress', 'color': 'violet'},
    'CLOSED': {'lable': 'Closed', 'color': 'red'},
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>
        {statusMap[status].lable}
    </Badge>
  )
}

export default IssueStatusBadge