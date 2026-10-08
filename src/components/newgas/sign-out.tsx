'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { clearDemoRoleCookie, getDemoRoleCookie } from '@/lib/demo-auth';

export function SignOutButton() {
  const router=useRouter();
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  return <div><Button variant="outline" disabled={busy} className="rounded-lg text-xs" onClick={async()=>{setBusy(true);setError('');try { if (getDemoRoleCookie()) { clearDemoRoleCookie(); router.push('/'); router.refresh(); return; } const result=await authClient.signOut();if(result.error){setError(result.error.message??'Sign out failed.');return;}router.push('/');router.refresh();}catch{setError('Unable to sign out. Try again.');}finally{setBusy(false);}}}>{busy?'Signing out…':'Sign out'}</Button>{error&&<p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}</div>;
}
