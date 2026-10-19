"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setUser } from "@/src/features/auth";
import { useIsHydrated } from "@/src/shared/hooks/use-is-hydrated";

type StoreHeaderProps = {
  onSearch?: (query: string) => void;
  onBagClick?: () => void;
};

const categoryLinks = [
  ["New arrivals", "/#products"],
  ["Top picks", "/#trending"],
  ["Home & living", "/#categories"],
  ["Electronics", "/#categories"],
  ["Fashion", "/#categories"],
  ["AI shopping", "/ai"],
] as const;

export function StoreHeader({ onSearch, onBagClick }: StoreHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const bagCount = useAppSelector((state) =>
    state.cart.lines.reduce((total, line) => total + line.quantity, 0),
  );
  const cartHydrated = useIsHydrated();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active && result?.user) dispatch(setUser(result.user));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [dispatch]);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (onSearch) onSearch(value);
    else if (value)
      router.push(`/?query=${encodeURIComponent(value)}#products`);
  }

  function goToBag() {
    if (onBagClick) onBagClick();
    else router.push("/checkout");
  }

  const accountPath = user ? "/profile" : "/login";
  const visibleBagCount = cartHydrated ? bagCount : 0;

  return (
    <>
      <div className="store-announcement min-h-[30px] bg-[#f2f0ec] text-[#334155] text-[11px]">
        <div className="store-container store-announcement-inner w-[min(1320px,_calc(100%_-_64px))] mx-[auto] max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] min-h-[30px] flex justify-between items-center">
          <span>Thoughtful finds, delivered islandwide</span>
          <span className="store-announcement-right text-[#334155] max-[760px]:hidden">
            A little something for every day
          </span>
        </div>
      </div>
      <header className="store-header relative z-[10] bg-[#fff] [border-bottom:1px_solid_#eceae6]">
        <div className="store-container store-header-main w-[min(1320px,_calc(100%_-_64px))] mx-[auto] max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] min-h-[79px] grid grid-cols-[190px_minmax(220px,_1fr)_auto] items-center gap-[34px] max-[1100px]:grid-cols-[160px_minmax(180px,_1fr)_auto] max-[1100px]:gap-[20px] max-[760px]:min-h-[66px] max-[760px]:grid-cols-[31px_auto_minmax(0,_1fr)_auto] max-[760px]:gap-[10px] max-[760px]:pt-[8px] max-[430px]:grid-cols-[26px_auto_minmax(0,_1fr)_auto] max-[430px]:gap-[7px]">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="store-mobile-menu hidden max-[760px]:w-[29px] max-[760px]:h-[32px] max-[760px]:grid max-[760px]:place-items-center max-[760px]:border-0 max-[760px]:bg-transparent max-[760px]:text-[#334155]"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link
            className="store-brand inline-flex items-center gap-[9px] text-[#181817] text-[20px] font-[850] tracking-[0.19em] whitespace-nowrap max-[760px]:gap-[6px] max-[760px]:text-[14px] max-[760px]:tracking-[0.15em]"
            href="/"
            aria-label="Kade home"
          >
            <span className="store-brand-mark [display:inline-grid] w-[31px] h-[31px] place-items-center rounded-[9px_9px_9px_2px] bg-[#22211f] text-[#f8fafc] text-[17px] [font-family:Georgia,_serif] tracking-[0] [.footer-brand_&]:w-[26px] [.footer-brand_&]:h-[26px] [.footer-brand_&]:text-[14px] max-[760px]:w-[25px] max-[760px]:h-[25px] max-[760px]:text-[14px]">
              K
            </span>
            KADE
            <span className="store-brand-period text-[#475569] ml-[-8px] max-[760px]:ml-[-6px]">
              .
            </span>
          </Link>
          <form
            className="store-search h-[45px] max-w-[590px] flex items-center gap-[11px] p-[0_0_0_15px] [border:1px_solid_#e6e3df] rounded-[5px] bg-[#fff] text-[#475569] [&:focus-within]:border-[#dbeafe] [&:focus-within]:[box-shadow:0_0_0_3px_#93c5fd14] max-[760px]:h-[38px] max-[760px]:col-[1_/_4] max-[760px]:row-[2] max-[760px]:max-w-[none] max-[760px]:m-[0_0_10px]"
            onSubmit={search}
            role="search"
          >
            <Search aria-hidden="true" size={18} />
            <input
              aria-label="Search products"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, brands and more..."
              value={query}
              className="w-[100%] min-w-[0] h-[100%] border-0 outline-none text-[#24231f] text-[12px] bg-[transparent] placeholder:text-[#475569]"
            />
            <button
              aria-label="Submit search"
              type="submit"
              className="[align-self:stretch] w-[49px] border-0 bg-[#242320] text-[#fff] grid place-items-center [transition:background_0.18s_ease] hover:bg-[#2563eb]"
            >
              <ArrowRight size={17} />
            </button>
          </form>
          <div className="store-header-actions flex items-center gap-[23px] max-[1100px]:gap-[13px] max-[760px]:col-[4] max-[760px]:row-[1] max-[760px]:gap-[9px] max-[430px]:gap-[5px]">
            <Link
              aria-label="Your account"
              className="store-action min-w-[42px] grid justify-items-center gap-[5px] border-0 bg-transparent text-[#2c2a27] text-[10px] cursor-pointer [&:hover]:text-[#334155] max-[760px]:min-w-[31px] max-[760px]:text-[8px] max-[430px]:min-w-[27px]"
              href={accountPath}
            >
              <UserRound
                size={19}
                className="max-[760px]:w-[17px] max-[760px]:h-[17px]"
              />
              <span>{user ? "Account" : "Sign in"}</span>
            </Link>
            <Link
              aria-label="Explore AI shopping"
              className="store-action store-ai-action min-w-[42px] grid justify-items-center gap-[5px] border-0 bg-transparent text-[#2c2a27] text-[10px] cursor-pointer [&:hover]:text-[#334155] max-[760px]:min-w-[31px] max-[760px]:text-[8px] max-[430px]:min-w-[27px] max-[760px]:hidden"
              href="/ai"
            >
              <Sparkles
                size={19}
                className="max-[760px]:w-[17px] max-[760px]:h-[17px]"
              />
              <span>AI picks</span>
            </Link>
            <button
              aria-label={`Shopping bag, ${visibleBagCount} items`}
              className="store-action min-w-[42px] grid justify-items-center gap-[5px] border-0 bg-transparent text-[#2c2a27] text-[10px] cursor-pointer [&:hover]:text-[#334155] max-[760px]:min-w-[31px] max-[760px]:text-[8px] max-[430px]:min-w-[27px]"
              onClick={goToBag}
            >
              <span className="store-bag-icon relative inline-flex">
                <ShoppingBag
                  size={19}
                  className="max-[760px]:w-[17px] max-[760px]:h-[17px]"
                />
                {visibleBagCount > 0 && (
                  <span className="store-bag-count absolute [top:-8px] [right:-9px] min-w-[16px] h-[16px] p-[0_4px] grid place-items-center rounded-[99px] bg-[#93c5fd] text-[#fff] text-[9px] font-bold">
                    {visibleBagCount}
                  </span>
                )}
              </span>
              <span>Bag</span>
            </button>
          </div>
        </div>
        <nav
          aria-label="Main navigation"
          className={`store-nav [border-top:1px_solid_#f0eeeb] max-[760px]:hidden max-[760px]:[border-top:1px_solid_#eff6ff] ${menuOpen ? "is-open max-[760px]:block" : ""}`}
        >
          <div className="store-container store-nav-inner w-[min(1320px,_calc(100%_-_64px))] mx-[auto] max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] min-h-[42px] flex items-center justify-between gap-[18px] max-[760px]:p-[8px_0_12px] max-[760px]:grid max-[760px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[760px]:gap-[2px_12px]">
            {categoryLinks.map(([label, href]) => (
              <Link
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-[6px] text-[#46433e] text-[11px] [transition:color_0.16s_ease] hover:text-[#334155] aria-[current=page]:text-[#334155] max-[760px]:min-h-[35px]"
              >
                {label}
              </Link>
            ))}
            {!user && (
              <Link
                className="store-nav-account [.store-nav_&]:font-bold inline-flex items-center gap-[6px] text-[#46433e] text-[11px] [transition:color_0.16s_ease] hover:text-[#334155] max-[760px]:min-h-[35px]"
                href="/register"
                onClick={() => setMenuOpen(false)}
              >
                Create account <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
