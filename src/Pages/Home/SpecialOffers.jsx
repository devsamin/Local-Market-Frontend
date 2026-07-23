import { ArrowRight, Clock3, Sparkles, Tag } from "lucide-react";

import { imageUrl } from "../../services/api";

const fallbackOffers = [
  {
    id: "weekly-fresh",
    title: "Fresh picks for less",
    subtitle: "Seasonal produce and everyday essentials selected from nearby sellers.",
    badge: "Weekly picks",
    badgeColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "maker-edit",
    title: "The local maker edit",
    subtitle: "Thoughtful, small-batch finds with a story behind every piece.",
    badge: "Handpicked",
    badgeColor: "bg-violet-600",
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "market-weekend",
    title: "Weekend market specials",
    subtitle: "A fresh rotation of community favourites, available for a little while.",
    badge: "Limited time",
    badgeColor: "bg-rose-600",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=900&q=85",
  },
];

const SpecialOffers = ({ offers = [] }) => {
  const displayOffers = offers.length ? offers : fallbackOffers;

  return (
    <section id="special-offers" className="page-shell scroll-mt-24 py-11 sm:py-14" aria-labelledby="offers-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#087c35] to-[#55aa24] text-white shadow-[0_10px_28px_rgba(8,124,53,.22)]"><Sparkles size={21} /></span>
          <div>
            <p className="eyebrow">Curated savings</p>
            <h2 id="offers-heading" className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Special offers</h2>
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm font-medium text-slate-500"><Clock3 size={16} className="text-[#087c35]" /> Fresh offers from local sellers</p>
      </div>

      <div className="mt-7 grid auto-cols-[88%] grid-flow-col gap-5 overflow-x-auto pb-5 [scrollbar-color:#a7cf91_transparent] [scrollbar-width:thin] sm:auto-cols-[56%] lg:auto-cols-[calc((100%-2.5rem)/3)]">
        {displayOffers.map((offer) => (
          <article key={offer.id} className="group overflow-hidden rounded-[24px] border border-[#dcebd4] bg-white shadow-[0_14px_45px_rgba(23,74,38,.08)] transition duration-300 hover:-translate-y-1 hover:border-[#a8d38f] hover:shadow-[0_22px_58px_rgba(23,74,38,.14)]">
            <div className="relative aspect-[1.45/1] overflow-hidden bg-[#eef5ea]">
              {offer.image && <img src={imageUrl(offer.image)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#062c16]/45 via-transparent to-transparent" />
              <span className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[.1em] text-white shadow-lg ${offer.badgeColor || "bg-emerald-600"}`}>
                <Tag size={12} />{offer.badge || "Special offer"}
              </span>
            </div>
            <div className="flex min-h-36 flex-col p-5">
              <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950">{offer.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{offer.subtitle}</p>
              <a href="#products" className="mt-auto flex items-center gap-2 pt-4 text-sm font-black text-[#087c35]">
                Shop this offer <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
