// components/NavLink.jsx
'use client'; // This component needs to be a Client Component to use hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ to, children, activeClassName, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link href={to} {...props} className={isActive ? activeClassName : ''}>
      {children}
    </Link>
  );
};

export default NavLink;