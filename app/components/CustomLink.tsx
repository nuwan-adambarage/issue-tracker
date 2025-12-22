'use client';
import NextLink from "next/link";
import { Link as RedixLink} from "@radix-ui/themes";

interface Props {
    href: string;
    label: string;
}

const CustomLink = ({ href, label }: Props) => {
  return (
    <RedixLink asChild>
      <NextLink href={href}>{label}</NextLink>
    </RedixLink>
  )
}

export default CustomLink