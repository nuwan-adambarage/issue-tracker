'use client';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
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
    <nav className="bg-gray-800 p-4 text-white">
      <Container>
      <Flex justify="between">
        <Flex>
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
        </Flex>
        <Box>
          {status === 'unauthenticated' && <Link href="/api/auth/signin">Sign In</Link>}
          {status === 'authenticated' && 
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar src={session.user?.image!} fallback="?" size="1" radius='full' className='cursor-pointer'/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label><Text size="2">{session.user?.email}</Text></DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Sign Out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          
          }
        </Box>    
      </Flex>
      
      </Container>
    </nav>
  )
}

export default NavBar