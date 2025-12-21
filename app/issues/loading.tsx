import { Table } from '@radix-ui/themes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from './IssueActions'

const LoadingIssuePage = () => {
    const issues = [1,2,3,4,5];
  return (
    <div className='max-w-4xl'>
        <IssueActions />
        <SkeletonTheme baseColor="black" borderRadius="full" highlightColor="grey">
            <Table.Root variant='surface'>
            <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {issues.map((issue) => (

                <Table.Row key={issue}>
                <Table.Cell><Skeleton /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table.Root>
      </SkeletonTheme>
    </div>
  )
}

export default LoadingIssuePage