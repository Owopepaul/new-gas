import Link from 'next/link';
import { ArrowRight, CheckCircle2, Flame, ShieldCheck, Truck } from 'lucide-react';

const services = [
  { title: 'Cylinder delivery', description: 'Fast, scheduled delivery for households and businesses across our service areas.', icon: Truck },
  { title: 'Safety checks', description: 'Professional inspection and guidance to reduce risks and support safe LPG usage.', icon: ShieldCheck },
  { title: 'Commercial supply planning', description: 'Flexible support for restaurants, clinics, retail stores, and growing operations.', icon: Flame },
  { title: 'Customer support', description: 'Responsive after-sales help, product guidance, and service coordination when needed.', icon: CheckCircle2 },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fa] text-slate-700">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Flame size={20} /></span>
            <div className="text-[24px] font-black tracking-[-1px] text-slate-800">New<span className="text-primary">Gas</span><span className="text-primary">.</span></div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/products" className="hover:text-primary">Products</Link>
            <Link href="/services" className="text-primary">Services</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>
          <Link href="/auth/sign-in" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">Sign in</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Services</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900">Support that keeps your energy flow uninterrupted.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">We focus on safe, dependable, and responsive support for homes, businesses, and commercial clients who rely on LPG every day.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-primary"><Icon size={22} /></div>
              <h2 className="mt-5 text-2xl font-bold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
