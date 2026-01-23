import { use } from "react";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}
export default function Home() {
  return ( 
    <LatestIssues />
  );
}
