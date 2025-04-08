"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const links = [
    { href: "/", label: "Home" },
    {
      href: "/about", // Direct link to about page
      label: "About",
      children: [
        { href: "/about/team", label: "Team" },
        { href: "/about/careers", label: "Careers" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ];

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Check if current path matches or is a child of this link
  const isActive = (href: string, children: { href: string }[] = []) => {
    return pathname === href || children.some(child => pathname === child.href);
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r hidden md:block">
      <h2 className="font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        {links.map((link) =>
          link.children ? (
            <li key={link.label}>
              <div 
                className={clsx(
                  "flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 py-1 rounded",
                  isActive(link.href, link.children) ? "font-semibold bg-gray-300" : "font-normal"
                )}
                onClick={() => toggleSection(link.label)}
              >
                <span>{link.label}</span>
                {expandedSections[link.label] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              {expandedSections[link.label] && (
                <ul className="ml-4 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={clsx(
                          "block px-2 py-1 rounded hover:bg-gray-200",
                          pathname === child.href && "font-semibold bg-gray-300"
                        )}
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
                  "block px-2 py-1 rounded hover:bg-gray-200",
                  pathname === link.href ? "font-semibold bg-gray-300" : "font-normal"
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </aside>
  );
}