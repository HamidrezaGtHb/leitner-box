'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { DEV_MODE } from '@/lib/dev-auth';

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    if (DEV_MODE) {
      // In dev mode, just redirect to login (auth is bypassed anyway)
      router.push('/login');
      return;
    }
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/today" className="font-semibold text-lg">
              Leitner
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/today"
                className={`text-sm ${
                  isActive('/today')
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Today
              </Link>
              <Link
                href="/backlog"
                className={`text-sm ${
                  isActive('/backlog')
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Backlog
              </Link>
              <Link
                href="/cards"
                className={`text-sm ${
                  isActive('/cards')
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cards
              </Link>
              <Link
                href="/settings"
                className={`text-sm ${
                  isActive('/settings')
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Settings
              </Link>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sign out
          </button>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-4 pb-2 overflow-x-auto">
          <Link
            href="/today"
            className={`text-sm whitespace-nowrap ${
              isActive('/today')
                ? 'font-semibold text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Today
          </Link>
          <Link
            href="/backlog"
            className={`text-sm whitespace-nowrap ${
              isActive('/backlog')
                ? 'font-semibold text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Backlog
          </Link>
          <Link
            href="/cards"
            className={`text-sm whitespace-nowrap ${
              isActive('/cards')
                ? 'font-semibold text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Cards
          </Link>
          <Link
            href="/settings"
            className={`text-sm whitespace-nowrap ${
              isActive('/settings')
                ? 'font-semibold text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
