'use client';
import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const {status, data: session} = useSession();
    const currentPath = usePathname();
    const links = [
    { href: '/issues', label: 'Issues' },
    { href: '/dashboard', label: 'Dashboard' },
  ];
  return (
    <nav className="flex bg-gray-800 p-4 text-white">
      <Link href="/" className="mr-4 flex items-center"><FaBug /></Link>
      <ul className="flex space-x-4">
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href} className={classNames(
                'mr-4 hover:text-gray-400 transition-colors',
                { 'text-gray-400': currentPath === link.href }
                )}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'unauthenticated' && <Link href="/api/auth/signin">Sign In</Link>}
        {status === 'authenticated' && <Link href="/api/auth/signout">Sign Out ({session.user?.name})</Link>}
      </Box>
    </nav>
  )
}

export default NavBar