import { prisma } from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from '../IssueChart';
import IssueSummary from '../IssueSummary';
import LatestIssues from '../LatestIssues';
import { Metadata } from 'next';

type Props = {}

const Dashboard = async (props: Props) => {
  const open = await prisma.issue.count({where: { status: 'OPEN'}});
  const inProgress = await prisma.issue.count({where: { status: 'IN_PROGRESS'}});
  const closed = await prisma.issue.count({where: { status: 'CLOSED'}});

  return (     

    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",

  openGraph: {
    title: "Issue Tracker - Dashboard",
    description: "View a summary of project issues",
    url: "https://your-site.com",
    siteName: "Issue Tracker",
    images: [
      {
        url: "/public/summary_large_image.png",
        width: 1200,
        height: 630,
        alt: "Issue Tracker Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Issue Tracker - Dashboard",
    description: "View a summary of project issues",
    images: ["/public/summary_large_image.png"],
    creator: "@yourhandle",
  },
};

export default Dashboard