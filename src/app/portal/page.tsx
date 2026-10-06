import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { getAuth } from '@/lib/auth/server';
import { Brand } from '@/components/newgas/shared';
import { SignOutButton } from '@/components/newgas/sign-out';

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const auth = getAuth();
  if (!auth) redirect('/auth/sign-in');
  const { data:session } = await auth.getSession();
  if (!session?.user) redirect('/auth/sign-in');
  // Fail closed: authentication alone never grants a business role.
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><section className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-sm"><Brand/><ShieldCheck className="mt-8 text-primary" size={32}/><h1 className="mt-4 text-2xl font-semibold text-slate-800">You’re signed in.</h1><p className="mt-3 text-sm leading-7 text-slate-500">Your identity has been authenticated. Business access has not been provisioned, so no owner, worker, or client data is available to this account.</p><p className="mt-4 rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-800">An isolated Neon development branch and server-managed role records are required before live portals can be enabled. Public users cannot select or elevate their role.</p><div className="mt-6 flex items-center justify-between"><Link href="/" className="flex items-center gap-2 text-xs text-primary"><ArrowLeft size={14}/>Return to sample workspace</Link><SignOutButton/></div></section></main>;
}
