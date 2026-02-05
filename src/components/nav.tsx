'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';
import { CalendarIcon } from '@/components/ui';

export function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const mainNavItems = [
    { href: '/today', label: t.nav.today, icon: '📚' },
    { href: '/backlog', label: t.nav.backlog, icon: '📝' },
    { href: '/cards', label: t.nav.cards, icon: '🗂️' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/today"
            className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <CalendarIcon size={28} className="text-gray-900 dark:text-white" />
            <span className="hidden sm:inline font-semibold">40Tagen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Settings Icon (separate) */}
            <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <Link
                href="/settings"
                className={cn(
                  'p-2 rounded-lg transition-all duration-200 flex items-center justify-center',
                  isActive('/settings')
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
                aria-label={t.nav.settings}
              >
                <span className="text-lg">⚙️</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                isActive(item.href)
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Settings Icon (separate) */}
          <div className="ml-auto pl-2 border-l border-gray-200 dark:border-gray-700">
            <Link
              href="/settings"
              className={cn(
                'flex items-center justify-center p-2 rounded-lg transition-all',
                isActive('/settings')
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              )}
              aria-label={t.nav.settings}
            >
              <span className="text-lg">⚙️</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
