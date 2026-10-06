import { Flame, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-2.5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Flame size={26} strokeWidth={2.3} /></div>{!compact && <span className="text-[25px] font-bold tracking-[-1px] text-slate-800">New<span className="text-primary">Gas</span><span className="ml-0.5 text-primary">.</span></span>}</div>;
}
export function Status({ children }: { children: ReactNode }) {
  const text = String(children);
  const color = /Completed|Delivered|Confirmed|Active/.test(text) ? 'bg-emerald-50 text-emerald-700' : /Progress|Preparing|Delivery/.test(text) ? 'bg-blue-50 text-blue-700' : /Declined/.test(text) ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700';
  return <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium', color)}><span className="h-1.5 w-1.5 rounded-full bg-current" />{children}</span>;
}
export function Avatar({ name, className }: { name: string; className?: string }) {
  const colors = ['bg-[#eeeaf8] text-[#76619f]', 'bg-[#e5f0eb] text-[#497563]', 'bg-[#f8ece2] text-[#a47855]', 'bg-[#e6edf7] text-[#5476a3]'];
  return <span className={cn('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold', colors[name.charCodeAt(0) % 4], className)}>{name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>;
}
export function Panel({ title, subtitle, action, children, className }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={cn('rounded-xl border border-slate-200/80 bg-white', className)}><div className="flex items-center justify-between gap-3 px-5 pt-5"><div><h2 className="text-[14px] font-semibold tracking-tight text-slate-800">{title}</h2>{subtitle && <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>}</div>{action}</div>{children}</section>;
}
export function Empty({ children }: { children: ReactNode }) { return <div className="p-12 text-center text-sm text-slate-500">{children}</div>; }
export function Kebab() { return <MoreHorizontal className="h-4 w-4 text-slate-400" />; }
export const inputClass = 'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';
