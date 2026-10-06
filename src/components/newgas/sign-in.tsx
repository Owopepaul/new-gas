'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Brand, inputClass } from './shared';

const schema = z.object({ email:z.string().email('Enter a valid email address.'), password:z.string().min(1,'Enter your password.') });
export function SignIn() {
  const router=useRouter();
  const [error,setError]=useState('');
  const [visible,setVisible]=useState(false);
  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<z.infer<typeof schema>>({resolver:zodResolver(schema)});
  const submit=async(values:z.infer<typeof schema>)=>{
    setError('');
    try { const {error}=await authClient.signIn.email(values); if(error){setError(error.message??'Unable to sign in. Please try again.');return;} router.push('/portal');router.refresh(); } catch { setError('Unable to connect to Neon Auth. Please check that auth environment configuration is complete.'); }
  };
  return <main className="grid min-h-screen bg-[#f7f9fa] font-[family-name:var(--font-geist-sans)] lg:grid-cols-2"><section className="relative hidden flex-col justify-between overflow-hidden bg-[#123e3b] p-12 lg:flex"><Brand/><div className="relative z-10"><span className="rounded-full border border-teal-400/30 px-3 py-1 text-[10px] tracking-widest text-teal-100">YOUR STATION. CONNECTED.</span><h1 className="mt-6 max-w-md text-5xl font-semibold leading-[1.15] tracking-tight text-white">Powering a better way to work.</h1><p className="mt-6 max-w-sm text-sm leading-7 text-teal-100/80">One place for your people, your products, and every possibility ahead.</p><img src="/gas-cylinders.svg" alt="NewGas gas cylinders" className="mt-8 max-h-72 w-full object-contain"/></div><p className="text-xs text-teal-200/60">Built for the energy behind your everyday.</p></section><section className="flex flex-col p-6 sm:p-12"><Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-primary"><ArrowLeft size={14}/>Back to demo workspace</Link><div className="mx-auto my-auto w-full max-w-sm py-12"><div className="mb-10 lg:hidden"><Brand/></div><span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-primary"><ShieldCheck size={25}/></span><h2 className="text-3xl font-semibold tracking-tight text-slate-800">Welcome back.</h2><p className="mt-3 text-sm leading-6 text-slate-500">Sign in to your NewGas account with Neon Auth.</p><form onSubmit={handleSubmit(submit)} className="mt-8 space-y-5"><div><label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-600">Email address</label><input id="email" type="email" autoComplete="email" placeholder="you@company.com" className={`${inputClass} h-12`} {...register('email')}/>{errors.email&&<p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}</div><div><label htmlFor="password" className="mb-2 block text-xs font-medium text-slate-600">Password</label><div className="relative"><input id="password" type={visible?'text':'password'} autoComplete="current-password" placeholder="Enter your password" className={`${inputClass} h-12 pr-10`} {...register('password')}/><button type="button" aria-label={visible?'Hide password':'Show password'} onClick={()=>setVisible(!visible)} className="absolute right-3 top-4 text-slate-400">{visible?<EyeOff size={16}/>:<Eye size={16}/>}</button></div>{errors.password&&<p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}</div>{error&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-xs leading-5 text-red-700">{error}</p>}<Button type="submit" disabled={isSubmitting} className="h-12 w-full gap-2 rounded-lg text-sm">{isSubmitting?'Signing in…':'Sign in'}<ArrowRight size={16}/></Button></form><div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[11px] leading-5 text-amber-800"><strong>Live workspace setup is pending.</strong> New account registration and business access remain locked until an isolated development branch and role provisioning are configured. Existing Neon identities can sign in, but receive no business access.</div></div><p className="text-center text-[10px] text-slate-400">Secure authentication powered by Neon Auth</p></section></main>;
}
