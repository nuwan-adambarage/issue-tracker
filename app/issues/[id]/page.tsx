import { prisma } from "@/prisma/client";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { title } from "process";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: Number) =>  prisma.issue.findUnique({ where: { id: Number(issueId) }}) );

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  if (!id) notFound();
  await delay(500);
  const issueId = Number(id);
  const issue = await fetchIssue(issueId);

  if (!issue) notFound();

  return (
    <Grid className="max-w-4xl" columns={{ initial: "1", md: "5" }} gap="4">
      <Box style={{ gridColumn: "span 4" }}>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex
          className="gap-3 mt-4 sm:flex-col sm:justify-center"
          style={{ gridColumn: "span 1" }}
        >
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({params}: Props) {
  const { id } = await params;
  const issue = await fetchIssue(Number(id));

  return {
    title: issue?.title,
    description: `Details of ${issue?.id}`
  }
}

export default IssueDetailPage;
