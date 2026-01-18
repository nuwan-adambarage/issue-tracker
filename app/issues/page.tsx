import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";

import { CustomLink, IssueStatusBadge } from "@/app/components";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "../generated/prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }>;
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const { status, orderBy, page } = params;


  const statuses = Object.values(Status);

  const validStatuses = statuses.includes(status) ? status : undefined;
  const validOrderBy = columns.map(column => column.value).includes(orderBy) ? { [orderBy]: "asc" } : undefined;
  const pageSize = 10;
  const pageNumber = parseInt(page) || 1;
  const issues = await prisma.issue.findMany({
    where: { status: validStatuses },
    orderBy: validOrderBy,
    skip: (pageNumber - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where: { status: validStatuses }});
  await delay(500);

  return (
    <div className="max-w-4xl">
      <IssueActions />
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
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={pageNumber} />
    </div>
  );
};

export default IssuesPage;
