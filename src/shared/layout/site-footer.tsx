import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

const footerGroups = [
  {
    title: "Discover",
    links: [
      ["All categories", "/#categories"],
      ["New arrivals", "/#trending"],
      ["AI shopping", "/ai"],
    ],
  },
  {
    title: "Your account",
    links: [
      ["Sign in", "/login"],
      ["Create account", "/register"],
      ["Your recommendations", "/ai/recommendations"],
    ],
  },
  {
    title: "Need a hand?",
    links: [
      ["Help with an order", "/checkout"],
      ["Order help", "/checkout"],
      ["About Kade", "/#about"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer bg-[#242320] text-[#eeece7]" id="about">
      <div
        className="store-container w-[min(1320px,_calc(100%_-_64px))] mx-[auto] max-[1100px]:w-[min(100%_-_44px,_1080px)] 
      max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)]"
      >
        <div
          className="footer-main p-[34px_0_28px] grid grid-cols-[1.6fr_repeat(3,_1fr)] gap-[38px]
         max-[760px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[760px]:gap-[24px_18px]"
        >
          <div className="footer-brand-column max-[760px]:col-[1_/_-1]">
            <Link
              className="footer-brand inline-flex items-center gap-[9px] text-[#fff] text-[15px] font-[850] 
              tracking-[0.19em] whitespace-nowrap"
              href="/"
            >
              <span
                className="store-brand-mark [display:inline-grid] w-[31px] h-[31px] place-items-center rounded-[9px_9px_9px_2px] 
              bg-[#22211f] text-[#f8fafc] text-[17px] [font-family:Georgia,_serif] tracking-[0] [.footer-brand_&]:w-[26px] 
              [.footer-brand_&]:h-[26px] [.footer-brand_&]:text-[14px] max-[760px]:w-[25px] 
              max-[760px]:h-[25px] max-[760px]:text-[14px]"
              >
                K
              </span>{" "}
              KADE<span className="last:text-[#475569] last:ml-[-8px]">.</span>
            </Link>
            <p className="max-w-[245px] text-[#dbeafe] text-[10px] leading-[1.7]">
              Thoughtful finds for everyday living. Shop smart, live a little
              better.
            </p>
            <Link
              className="footer-social inline-flex items-center gap-[8px] mt-[8px] text-[#dbeafe] text-[9px]"
              href="/ai"
            >
              <Sparkles size={15} /> Find your next favourite{" "}
              <ArrowRight size={14} />
            </Link>
          </div>
          {footerGroups.map((group) => (
            <div
              className="footer-link-group grid content-start [justify-items:start] gap-[10px]"
              key={group.title}
            >
              <h2 className="m-[3px_0_4px] text-[#fff] text-[10px] font-bold">
                {group.title}
              </h2>
              {group.links.map(([label, href]) => (
                <Link
                  href={href}
                  key={label}
                  className="text-[#dbeafe] text-[9px] hover:text-[#dbeafe]"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div
          className="footer-bottom min-h-[43px] flex items-center justify-between gap-[15px] 
        [border-top:1px_solid_#ffffff1a] text-[#dbeafe] text-[9px] max-[760px]:p-[12px_0] max-[760px]:items-start
         max-[760px]:flex-col"
        >
          <span>© 2026 Kade. Made with care in Sri Lanka.</span>
          <span className="footer-values inline-flex items-center gap-[6px]">
            <Leaf size={14} /> Thoughtful picks · Friendly service · Everyday
            value
          </span>
        </div>
      </div>
    </footer>
  );
}
