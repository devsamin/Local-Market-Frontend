import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  MapPin,
  PackageCheck,
  Pause,
  Play,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
} from "lucide-react";

import localMartLogo from "../../assets/local-mart-logo-web.png";
import Category from "../Home/Category";
import CategoryProductSection from "../Home/CategoryProductSection";
import HowBuyingWorks from "../Home/HowBuyingWorks";
import SpecialOffers from "../Home/SpecialOffers";
import { api, getErrorMessage, imageUrl, listData } from "../../services/api";

const money = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const HomePage = () => {
  const { searchTerm, refreshOffers } = useOutletContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-created_at");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [carouselFocused, setCarouselFocused] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory, ordering]);

  useEffect(() => {
    let active = true;
    Promise.all([api.get("/category/"), api.get("/offers/")])
      .then(([categoryResponse, offerResponse]) => {
        if (!active) return;
        setCategories(listData(categoryResponse.data));
        setOffers(listData(offerResponse.data));
      })
      .catch((requestError) => {
        if (active) setError(getErrorMessage(requestError, "Marketplace data could not be loaded."));
      });
    return () => { active = false; };
  }, [refreshOffers]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/products/", {
        params: {
          page,
          search: debouncedSearch || undefined,
          categories: selectedCategory || undefined,
          ordering,
        },
      });
      setProducts(listData(data));
      setPagination({ count: data.count ?? data.length, next: data.next, previous: data.previous });
    } catch (requestError) {
      setProducts([]);
      setError(getErrorMessage(requestError, "Products could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory, ordering]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const spotlightProducts = [...products]
    .sort((left, right) => {
      const discountDifference = Number(right.discount || 0) - Number(left.discount || 0);
      if (discountDifference) return discountDifference;
      return Number(right.average_rating || 0) - Number(left.average_rating || 0);
    })
    .slice(0, 5);

  const marketplaceSlides = [
    ...spotlightProducts.map((product, index) => ({
      id: `product-${product.id}`,
      image: product.image ? imageUrl(product.image) : "",
      imageAlt: product.name,
      eyebrow: index === 0 ? "Featured local find" : index === 1 ? "Top discount" : "Customer favourite",
      title: product.name,
      description: product.description || `Available now from ${product.seller_location || "a trusted local seller"}.`,
      location: product.seller_location || "Local seller",
      price: money.format(product.discounted_price ?? product.price),
      originalPrice: Number(product.discount || 0) > 0 ? money.format(product.price) : "",
      discount: Number(product.discount || 0),
      rating: Number(product.average_rating || 0).toFixed(1),
      cta: "Shop this product",
      href: "#products",
    })),
    ...offers.slice(0, 2).map((offer) => ({
      id: `offer-${offer.id}`,
      image: offer.image ? imageUrl(offer.image) : "",
      imageAlt: "",
      eyebrow: offer.badge || "Limited-time offer",
      title: offer.title,
      description: offer.subtitle || "A special offer curated by a local seller.",
      discount: 0,
      cta: "View special offers",
      href: "#special-offers",
    })),
  ].slice(0, 6);

  const fallbackSlides = [
    {
      id: "fresh-nearby",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=88",
      imageAlt: "Fresh produce arranged at a local market",
      eyebrow: "Fresh from your neighbourhood",
      title: "Good things, grown close to home.",
      description: "Meet local sellers and discover produce, essentials and handmade finds selected for your everyday.",
      location: "Your local community",
      cta: "Explore the market",
      href: "#products",
    },
    {
      id: "independent-makers",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=88",
      imageAlt: "Warm and welcoming independent local shop",
      eyebrow: "Independent & original",
      title: "Shop small. Find something special.",
      description: "Every order supports an independent seller and keeps more value in the community.",
      cta: "Meet local products",
      href: "#products",
    },
  ];

  const showcaseSlides = marketplaceSlides.length ? marketplaceSlides : fallbackSlides;

  const slideCount = showcaseSlides.length;
  const activeSlideIndex = slideCount ? activeSlide % slideCount : 0;
  const currentSlide = showcaseSlides[activeSlideIndex];
  const rotationPaused = carouselPaused || carouselFocused;

  useEffect(() => {
    if (rotationPaused || slideCount < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [rotationPaused, slideCount]);

  const changeSlide = (direction) => {
    if (slideCount < 2) return;
    setActiveSlide((current) => (current + direction + slideCount) % slideCount);
  };

  return (
    <main>
      <Helmet>
        <title>Local Mart | Shop local, live better</title>
        <meta name="description" content="Discover quality products from trusted local sellers across Bangladesh." />
      </Helmet>

      <section className="market-showcase overflow-hidden">
        <div className="page-shell grid items-stretch gap-5 py-5 sm:py-8 lg:grid-cols-[.9fr_1.35fr] lg:gap-7 lg:py-10">
          <article className="relative isolate flex min-h-[500px] min-w-0 flex-col overflow-hidden rounded-[30px] border border-emerald-100 bg-[#f2f8ed] p-7 shadow-[0_24px_70px_rgba(20,83,45,.10)] sm:p-10 lg:min-h-[530px] lg:p-12">
            <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-lime-200/45 blur-3xl" />
            <img src={localMartLogo} alt="" className="absolute -right-8 top-10 -z-10 h-56 w-56 rounded-full object-cover opacity-[.075] mix-blend-multiply sm:h-72 sm:w-72" />

            <div className="flex items-center gap-3">
              <img src={localMartLogo} alt="Local Mart" className="h-14 w-14 rounded-2xl border border-emerald-100 bg-white object-cover shadow-sm" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.23em] text-emerald-700">Fresh. Local. Trusted.</p>
                <p className="mt-1 text-sm font-bold text-slate-700">Your neighbourhood marketplace</p>
              </div>
            </div>

            <div className="my-auto py-10">
              <p className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-emerald-700 sm:tracking-[.22em]">
                <span className="h-px w-8 bg-emerald-600" /> Better shopping starts local
              </p>
              <h1 className="max-w-xl text-4xl font-black leading-[.98] tracking-[-.055em] text-[#10261b] sm:text-5xl lg:text-[3.55rem]">
                Everything you love, <span className="text-emerald-700">closer to home.</span>
              </h1>
              <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-600">
                Local Mart brings trusted sellers, thoughtful products and community favourites together in one beautifully simple marketplace.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#products" className="btn-hero-primary"><ShoppingBag size={18} /> Shop local <ArrowRight size={17} /></a>
                <a href="#special-offers" className="btn-hero-secondary">View offers</a>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-emerald-900/10 border-t border-emerald-900/10 pt-5">
              <div className="pr-3"><Store size={18} className="mb-2 text-emerald-700" /><strong className="block text-sm text-slate-900">Local sellers</strong><span className="text-[11px] text-slate-500">Real people nearby</span></div>
              <div className="px-3"><ShieldCheck size={18} className="mb-2 text-emerald-700" /><strong className="block text-sm text-slate-900">Trusted shop</strong><span className="text-[11px] text-slate-500">Shop with confidence</span></div>
              <div className="pl-3"><PackageCheck size={18} className="mb-2 text-emerald-700" /><strong className="block text-sm text-slate-900">Fresh finds</strong><span className="text-[11px] text-slate-500">Curated every day</span></div>
            </div>
          </article>

          {currentSlide ? (
            <div
              className="premium-slider group/carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured marketplace deals"
              tabIndex={0}
              onFocusCapture={() => setCarouselFocused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setCarouselFocused(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") changeSlide(-1);
                if (event.key === "ArrowRight") changeSlide(1);
              }}
            >
              <article
                key={currentSlide.id}
                className="slider-panel"
                role="group"
                aria-roledescription="slide"
                aria-label={`${activeSlideIndex + 1} of ${slideCount}: ${currentSlide.title}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(125deg,#06281f_0%,#0f3f33_42%,#11233b_100%)]" />
                {currentSlide.image && (
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.imageAlt}
                    className="slider-image"
                    fetchPriority={activeSlideIndex === 0 ? "high" : "auto"}
                  />
                )}
                <div className="slider-overlay" />
                <div className="slider-orb slider-orb-one" />
                <div className="slider-orb slider-orb-two" />

                <div className="slider-content">
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
                    <Sparkles size={15} /> {currentSlide.eyebrow}
                  </p>
                  <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                    {currentSlide.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                    {currentSlide.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {currentSlide.discount > 0 && <span className="deal-badge"><BadgePercent size={15} /> {currentSlide.discount}% off</span>}
                    {currentSlide.rating && <span className="deal-badge bg-white/15"><Star size={14} className="fill-amber-300 text-amber-300" /> {currentSlide.rating} rated</span>}
                    {currentSlide.location && <span className="deal-badge bg-white/15"><MapPin size={14} /> {currentSlide.location}</span>}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a href={currentSlide.href} className="slider-cta">
                      {currentSlide.cta} <ArrowRight size={18} />
                    </a>
                    {currentSlide.price && (
                      <div className="flex items-end gap-2 text-white">
                        <strong className="text-2xl sm:text-3xl">{currentSlide.price}</strong>
                        {currentSlide.originalPrice && <span className="pb-1 text-sm text-white/45 line-through">{currentSlide.originalPrice}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </article>

              {slideCount > 1 && (
                <>
                  <button type="button" className="slider-arrow left-3 sm:left-5" onClick={() => changeSlide(-1)} aria-label="Previous featured deal"><ChevronLeft size={23} /></button>
                  <button type="button" className="slider-arrow right-3 sm:right-5" onClick={() => changeSlide(1)} aria-label="Next featured deal"><ChevronRight size={23} /></button>
                  <div className="slider-navigation">
                    <div className="flex items-center gap-2" role="tablist" aria-label="Choose a featured deal">
                      {showcaseSlides.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          role="tab"
                          aria-selected={index === activeSlideIndex}
                          aria-label={`Show slide ${index + 1}: ${slide.title}`}
                          className={`slider-dot ${index === activeSlideIndex ? "slider-dot-active" : ""}`}
                          onClick={() => setActiveSlide(index)}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="slider-pause"
                      onClick={() => setCarouselPaused((paused) => !paused)}
                      aria-label={carouselPaused ? "Resume automatic slides" : "Pause automatic slides"}
                      aria-pressed={carouselPaused}
                    >
                      {carouselPaused ? <Play size={13} className="fill-current" /> : <Pause size={13} className="fill-current" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <Category categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SpecialOffers offers={offers} />
      <CategoryProductSection
        products={products}
        count={pagination.count}
        page={page}
        hasNext={Boolean(pagination.next)}
        hasPrevious={Boolean(pagination.previous)}
        onPageChange={setPage}
        ordering={ordering}
        onOrderingChange={setOrdering}
        loading={loading}
        error={error}
        retry={loadProducts}
        searchTerm={debouncedSearch}
      />
      <HowBuyingWorks />
    </main>
  );
};

export default HomePage;
