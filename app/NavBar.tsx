import Link from 'next/link'
import { FaBug } from "react-icons/fa";

const NavBar = () => {
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
            <Link href={link.href} className="mr-4 hover:text-gray-400 transition-colors">{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar