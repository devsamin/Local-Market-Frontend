import {
  ArrowRight,
  CheckCircle2,
  MessageCircleQuestion,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";


const steps = [
  {
    icon: Search,
    title: "Explore local finds",
    text: "Browse useful products from independent sellers near you.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask when needed",
    text: "Open a product to check details, photos and seller information.",
  },
  {
    icon: ShoppingBag,
    title: "Build your cart",
    text: "Choose your favourites and adjust quantities before checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Checkout securely",
    text: "Complete your purchase through our protected Stripe checkout.",
  },
  {
    icon: Truck,
    title: "Seller prepares it",
    text: "Your local seller confirms, prepares and hands off the order.",
  },
  {
    icon: Star,
    title: "Review & return",
    text: "Share your experience and discover your next local favourite.",
  },
];

const HowBuyingWorks = () => (
  <section className="overflow-hidden border-y border-[#dcebd4] bg-white py-14 sm:py-18" aria-labelledby="how-buying-works-title">
    <div className="page-shell">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Simple from start to finish</p>
        <h2 id="how-buying-works-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-slate-950 sm:text-4xl">
          How <span className="font-serif font-normal italic text-[#087c35]">shopping</span> works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Six clear steps from discovering a local product to receiving your order.
        </p>
      </div>

      <div className="relative mt-11">
        <div className="pointer-events-none absolute left-[8%] right-[8%] top-11 hidden border-t-2 border-dashed border-[#b8dca5] lg:block" />
        <div className="relative grid gap-x-5 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="group relative flex flex-col items-center text-center">
                <div className="relative z-10 grid h-[88px] w-[88px] place-items-center rounded-full border border-[#cfe4c4] bg-[#f3f9ee] text-[#087c35] shadow-[0_12px_30px_rgba(23,74,38,.08)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#9bd41e] group-hover:bg-[#eaf6df] group-hover:shadow-[0_16px_34px_rgba(23,74,38,.13)]">
                  <Icon size={27} strokeWidth={1.8} />
                  <span className="absolute -right-1 -top-1 grid h-8 min-w-8 place-items-center rounded-full border-[3px] border-white bg-[#087c35] px-1 text-xs font-black text-white shadow-md">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-black leading-5 text-slate-950">{step.title}</h3>
                <p className="mt-2 max-w-[190px] text-xs leading-5 text-slate-500">{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 rounded-[22px] border border-[#cfe4c4] bg-[#f7fbf4] p-5 sm:grid-cols-2 sm:px-7">
        <div className="flex items-center justify-center gap-3 text-sm font-bold text-slate-700">
          <CheckCircle2 size={19} className="shrink-0 text-[#087c35]" />
          Review every item before secure checkout
        </div>
        <div className="flex items-center justify-center gap-3 text-sm font-bold text-slate-700">
          <PackageCheck size={19} className="shrink-0 text-[#087c35]" />
          Clear order status from purchase to handoff
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#products" className="btn-primary rounded-full px-6">Browse products <ArrowRight size={17} /></a>
        <Link to="/register" className="btn-secondary rounded-full px-6"><Store size={17} /> Become a seller</Link>
      </div>
    </div>
  </section>
);

export default HowBuyingWorks;
