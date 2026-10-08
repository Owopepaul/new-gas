import Link from 'next/link';
import { Flame, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
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
            <Link href="/services" className="hover:text-primary">Services</Link>
            <Link href="/contact" className="text-primary">Contact</Link>
          </nav>
          <Link href="/auth/sign-in" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">Sign in</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Contact us</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900">Let’s help power your next delivery, refill, or business plan.</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-primary"><MapPin size={18} /></div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Visit us</h2>
                <p className="mt-1 text-sm text-slate-600">24 Market Street, Riverside, Lagos</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-primary"><Phone size={18} /></div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Call us</h2>
                <p className="mt-1 text-sm text-slate-600">+234 (0) 800 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-primary"><Mail size={18} /></div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Email us</h2>
                <p className="mt-1 text-sm text-slate-600">hello@newgas.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 outline-none focus:border-primary" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 outline-none focus:border-primary" placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 outline-none focus:border-primary" placeholder="How can we help?" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea className="min-h-[140px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary" placeholder="Tell us about your needs" />
              </div>
            </div>
            <button className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white">Send message</button>
          </div>
        </div>
      </section>
    </main>
  );
}
