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
    { href: '/study', label: t.nav.study, icon: '📖' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b bg-surface/80 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/today"
            className="flex items-center gap-2 font-bold text-xl text-text hover:opacity-80 transition-opacity"
          >
            <CalendarIcon size={28} className="text-text" />
            <span className="hidden sm:inline font-semibold">40Tagen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-accent text-accent-fg shadow-sm'
                    : 'text-text-muted hover:bg-muted hover:text-text'
                )}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Settings Icon (separate) */}
            <div className="ml-2 pl-2 border-l">
              <Link
                href="/settings"
                className={cn(
                  'p-2 rounded-xl transition-all duration-200 flex items-center justify-center',
                  isActive('/settings')
                    ? 'bg-accent text-accent-fg'
                    : 'text-text-muted hover:bg-muted hover:text-text'
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
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                isActive(item.href)
                  ? 'bg-accent text-accent-fg shadow-sm'
                  : 'bg-surface-2 text-text-muted'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Settings Icon (separate) */}
          <div className="ml-auto pl-2 border-l">
            <Link
              href="/settings"
              className={cn(
                'flex items-center justify-center p-2 rounded-xl transition-all',
                isActive('/settings')
                  ? 'bg-accent text-accent-fg'
                  : 'bg-surface-2 text-text-muted'
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
