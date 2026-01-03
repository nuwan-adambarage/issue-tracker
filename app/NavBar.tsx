'use client';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  
    
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Container>
      <Flex justify="between">
        <Flex>
          <Link href="/" className="mr-4 flex items-center"><FaBug /></Link>
          <NavLinks />        
        </Flex>
        <AuthStatus />    
      </Flex>
      
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname();
    const links = [
    { href: '/issues', label: 'Issues' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return(
    <ul className="flex space-x-4">
      {links.map(link => (
        <li key={link.href}>
          <Link 
          href={link.href} 
          className={classNames({ 
            'nav-link': true,
            'text-gray-400': currentPath === link.href 
          })}>
            {link.label}
            </Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const {status, data: session} = useSession();

  if (status === 'loading') return null;
  if (status === 'unauthenticated') return <Link className='nav-link' href="/api/auth/signin">Sign In</Link>
  return (
  <Box>    
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar 
          src={session!.user!.image!} 
          fallback="?" 
          size="1" 
          radius='full' 
          className='cursor-pointer' 
          referrerPolicy='no-referrer'/>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label><Text size="2">{session!.user!.email}</Text></DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Sign Out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Box>
  )
}

export default NavBar