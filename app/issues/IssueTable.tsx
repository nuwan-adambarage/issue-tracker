import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import React from 'react'
import { CustomLink, IssueStatusBadge } from '../components'
import NextLink from "next/link";
import { Issue, Status } from '../generated/prisma/client';


interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }>,
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const params = await searchParams;
  const { orderBy } = params;
  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: {...params, orderBy: column.value}
                }}>
                  {column.label}
                </NextLink>
                {column.value === orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink href={`/issues/${issue.id}`} label={issue.title} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map(column => column.value);

export default IssueTable