"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const links = [
    { href: "/", label: "Home" },
    {
      label: "About",
      children: [
        { href: "/about/team", label: "Team" },
        { href: "/about/careers", label: "Careers" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Check if any child link is active
  const isChildActive = (children: { href: string }[]) => {
    return children.some(child => pathname === child.href);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <ul className="flex gap-6">
        {links.map((link) =>
          link.children ? (
            <li key={link.label} className="relative">
              <div 
                className={clsx(
                  "flex items-center gap-1 cursor-pointer",
                  isChildActive(link.children) && "font-bold underline"
                )}
                onClick={() => toggleDropdown(link.label)}
              >
                <span>{link.label}</span>
                {openDropdown === link.label ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              {openDropdown === link.label && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-10">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={clsx(
                          "block px-4 py-2 hover:bg-gray-100",
                          pathname === child.href && "font-bold bg-gray-200"
                        )}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "hover:underline",
                  pathname === link.href && "font-bold underline"
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}