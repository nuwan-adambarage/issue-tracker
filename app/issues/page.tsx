import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";

import { CustomLink, IssueStatusBadge } from "@/app/components";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "../generated/prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const { status, orderBy } = await searchParams;
  // const params = {...searchParams};

  const statuses = Object.values(Status);

  const validStatuses = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: validStatuses },
  });
  await delay(500);

  return (
    <div className="max-w-4xl">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(async (column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink href={{
                  query: {...await searchParams, orderBy: column.value}
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
    </div>
  );
};

export default IssuesPage;
