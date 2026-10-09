import Link from 'next/link';
import { ArrowRight, CheckCircle2, Flame, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';

const productHighlights = [
  { name: '12.5 kg Cylinder', description: 'High-capacity option for homes, shops, and small businesses.', price: '₦48,000', badge: 'Best seller' },
  { name: '6 kg Cylinder', description: 'Compact and convenient for everyday household cooking.', price: '₦25,000', badge: 'Popular' },
  { name: '25 kg Cylinder', description: 'Reliable supply for restaurants, events, and commercial kitchens.', price: '₦92,000', badge: 'Commercial' },
  { name: 'Bulk LPG', description: 'Cost-effective energy for larger operations and industrial use.', price: '₦3,500 / kg', badge: 'Bulk order' },
];

const serviceHighlights = [
  { title: 'Fast cylinder delivery', description: 'Same-day and scheduled gas delivery across major service areas.', icon: Truck },
  { title: 'Safety-first handling', description: 'Professional checks, secure storage guidance, and safe refill procedures.', icon: ShieldCheck },
  { title: 'Business supply support', description: 'Flexible procurement for restaurants, clinics, and retail operations.', icon: Flame },
  { title: 'On-site support', description: 'Installation guidance, product advice, and technical assistance when needed.', icon: CheckCircle2 },
];

const stats = [
  { value: '5,000+', label: 'Households served' },
  { value: '24/7', label: 'Delivery support' },
  { value: '99.6%', label: 'Customer satisfaction' },
  { value: '12 hubs', label: 'Service locations' },
];

export function MarketingHome() {
  return (
    <main className="bg-[#f7f9fa] text-slate-700">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-sm font-black tracking-[-1px] text-white shadow-sm">
              NG
            </span>
            <div>
              <div className="text-[26px] font-black tracking-[-1px] text-slate-800">New<span className="text-primary">Gas</span><span className="text-primary">.</span></div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/products" className="transition hover:text-primary">Products</Link>
            <Link href="/services" className="transition hover:text-primary">Services</Link>
            <Link href="/contact" className="transition hover:text-primary">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary">Sign in</Link>
            <Link href="/dashboard" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0d7b66]">Open dashboard</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-primary">ENERGY FOR EVERYDAY LIFE</span>
            <h1 className="mt-6 max-w-xl text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-6xl">
              Clean, dependable LPG for homes, businesses, and growing operations.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              NewGas delivers safe, efficient, and affordable energy solutions with reliable cylinder supply, fleet delivery, and expert support.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d7b66]">Explore products <ArrowRight size={16} /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">Talk to us</Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                  <div className="text-2xl font-black tracking-tight text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
              <div className="rounded-[28px] bg-[#eaf6f3] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Trusted supply</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">NewGas Station</h2>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-primary shadow-sm">24/7 ready</span>
                </div>

                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>Live demand</span>
                    <span>Today</span>
                  </div>
                  <div className="mt-6 space-y-5">
                    {[
                      { label: 'Residential cylinders', value: '148 units', color: 'bg-primary' },
                      { label: 'Bulk LPG orders', value: '26 pending', color: 'bg-amber-400' },
                      { label: 'Scheduled deliveries', value: '43 routes', color: 'bg-sky-400' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                          <span>{item.label}</span>
                          <span className="font-semibold text-slate-800">{item.value}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-200">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: item.label === 'Residential cylinders' ? '78%' : item.label === 'Bulk LPG orders' ? '62%' : '70%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Fast access</div>
                    <div className="mt-2 text-2xl font-black text-slate-900">2-4 hrs</div>
                    <div className="text-xs text-slate-500">average delivery window</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Live support</div>
                    <div className="mt-2 text-2xl font-black text-slate-900">0800</div>
                    <div className="text-xs text-slate-500">customer care line</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">What we offer</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900 sm:text-4xl">Technology-forward energy solutions built for growth.</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productHighlights.map((product) => (
            <div key={product.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-primary">{product.badge}</span>
                <Flame size={18} className="text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
              <div className="mt-6 text-xl font-black tracking-tight text-slate-900">{product.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300">Our services</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">Built around safety, speed, and a smoother customer experience.</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceHighlights.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-3xl border border-slate-700 bg-slate-800 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Why NewGas</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900">A partner built for reliable energy supply.</h2>
            <ul className="mt-8 space-y-4 text-sm text-slate-600">
              {[
                'Consistent LPG supply with transparent pricing and dependable dispatch.',
                'Safety-first refills, handling, and support for residential and commercial customers.',
                'Responsive team that helps you plan, restock, and scale without disruption.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-primary" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: 'Home delivery', value: 'Available across major districts and industrial zones.' },
              { title: 'Commercial support', value: 'Custom plans for bulk LPG, scheduled replenishment, and shops.' },
              { title: 'Safety compliance', value: 'Regular checks and handling guidance to meet operational standards.' },
              { title: 'Customer care', value: 'Quick responses, clear communication, and dependable after-sales support.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-bold text-slate-900">{feature.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Flame size={20} strokeWidth={2.3} />
              </span>
              <div className="text-[24px] font-black tracking-[-1px] text-white">New<span className="text-primary">Gas</span><span className="text-primary">.</span></div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Delivering dependable energy solutions for homes and businesses; safe, efficient, and always ready when you need it.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MapPin size={14} /> 24 Market Street, Riverside</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +234 (0) 800 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-800 px-6 py-4 text-xs text-slate-500 lg:px-8">
          Website by Kentrix
        </div>
      </footer>
    </main>
  );
}
