import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";

import { CustomLink, IssueStatusBadge } from "@/app/components";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "../generated/prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import IssueTable, { columnNames } from "./IssueTable";

interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }>;
}

// const columns: { label: string; value: keyof Issue; className?: string }[] = [
//   { label: "Title", value: "title" },
//   { label: "Status", value: "status", className: "hidden md:table-cell" },
//   { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
// ];

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const { status, orderBy, page } = params;


  const statuses = Object.values(Status);

  const validStatuses = statuses.includes(status) ? status : undefined;
  const validOrderBy = columnNames.includes(orderBy) ? { [orderBy]: "asc" } : undefined;
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
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={pageNumber} />
    </Flex>
  );
};

export default IssuesPage;
