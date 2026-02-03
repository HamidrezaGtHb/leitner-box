import { redirect } from 'next/navigation';
import { DEV_MODE } from '@/lib/dev-auth';

export default function HomePage() {
  // In dev mode, go directly to the app
  if (DEV_MODE) {
    redirect('/today');
  }
  redirect('/login');
}
