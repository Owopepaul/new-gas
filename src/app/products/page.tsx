import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';

const products = [
  { name: '12.5 kg LPG Cylinder', size: 'Ideal for homes and small businesses', price: '₦48,000', detail: 'Reliable for everyday cooking, water heating, and backup energy supply.' },
  { name: '6 kg Cylinder', size: 'Compact and practical', price: '₦25,000', detail: 'Perfect for single households and smaller cooking needs.' },
  { name: '25 kg Cylinder', size: 'For busy commercial kitchens', price: '₦92,000', detail: 'Designed for multiple burners, restaurants, and energy-heavy operations.' },
  { name: 'Bulk LPG', size: 'Custom commercial volumes', price: '₦3,500 / kg', detail: 'Built for institutions, industrial sites, and larger-scale energy planning.' },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fa] text-slate-700">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Flame size={20} /></span>
            <div className="text-[24px] font-black tracking-[-1px] text-slate-800">New<span className="text-primary">Gas</span><span className="text-primary">.</span></div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/products" className="text-primary">Products</Link>
            <Link href="/services" className="hover:text-primary">Services</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>
          <Link href="/auth/sign-in" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">Sign in</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Products</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900">Energy products designed for dependable performance.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">From everyday household cylinders to bulk supply for commercial operations, NewGas keeps your energy reliable, efficient, and ready.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-primary"><Flame size={22} /></div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">{product.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{product.size}</p>
              <div className="mt-5 text-2xl font-black text-slate-900">{product.price}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.detail}</p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Request a quote <ArrowRight size={16} /></Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
