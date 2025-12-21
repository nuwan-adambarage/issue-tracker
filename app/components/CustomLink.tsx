'use client';
import NextLink from "next/link";
import { Link as RedixLink} from "@radix-ui/themes";

interface Props {
    href: string;
    label: string;
}

const CustomLink = ({ href, label }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RedixLink>{label}</RedixLink>
    </NextLink>
  )
}

export default CustomLink