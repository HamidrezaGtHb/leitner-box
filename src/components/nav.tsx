'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

export function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/today', label: t.nav.today, icon: '📚' },
    { href: '/backlog', label: t.nav.backlog, icon: '📝' },
    { href: '/cards', label: t.nav.cards, icon: '🗂️' },
    { href: '/settings', label: t.nav.settings, icon: '⚙️' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Persian text */}
          <Link
            href="/today"
            className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-gray-700 transition-colors"
          >
            <span className="text-2xl">📦</span>
            <span className="hidden sm:inline font-semibold">40Tagen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                isActive(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
