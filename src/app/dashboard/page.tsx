import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Dashboard } from '@/components/newgas/dashboard';
import { getAuth } from '@/lib/auth/server';
import { DEMO_ROLE_COOKIE } from '@/lib/demo-auth';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const role = (await cookies()).get(DEMO_ROLE_COOKIE)?.value;
  const hasDemoSession = role === 'owner' || role === 'worker' || role === 'client';

  if (!hasDemoSession) {
    const auth = getAuth();
    if (!auth) redirect('/');

    const { data: session } = await auth.getSession();
    if (!session?.user) redirect('/');
  }

  return <Dashboard />;
}
