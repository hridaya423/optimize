'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'HOME', path: '/'},
    { name: 'SHOWCASE', path: '/gallery' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-text-primary">OPTIMIZE</span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-text-primary text-background'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://forms.hackclub.com/t/fmL5xGZng2us"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-text-primary hover:bg-text-secondary text-background border border-text-primary hover:border-text-secondary px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <span>Submit</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}