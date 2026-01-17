import { use } from "react";
import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}
export default function Home({ searchParams }: Props) {
  const params = use(searchParams);
  const page = params.page ?? '1'; 
  console.log('searchParams', page);
  return (    
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
  );
}
