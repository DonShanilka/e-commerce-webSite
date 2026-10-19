import { Check, PackageCheck, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Islandwide delivery",
    detail: "Carefully packed to your door",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    detail: "Your account stays protected",
  },
  {
    icon: PackageCheck,
    title: "Here when you need us",
    detail: "Friendly support, every day",
  },
];

export function StoreBenefits() {
  return (
    <section
      aria-label="Store benefits"
      className="market-benefits mt-[34px] p-[18px_25px] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[20px] 
      rounded-[5px] bg-[#f5f3ef] max-[760px]:grid-cols-[1fr] max-[760px]:gap-[13px] max-[760px]:p-[17px]"
    >
      {benefits.map(({ icon: Icon, title, detail }) => (
        <div
          className="market-benefit flex items-center gap-[12px] min-w-[0]"
          key={title}
        >
          <span className="market-benefit-icon w-[38px] h-[38px] [flex:0_0_38px] grid place-items-center 
          [border:1px_solid_#eff6ff] rounded-[50%] bg-[#fff] text-[#334155] gap-[4px]">
            <Icon size={21} strokeWidth={1.55} />
          </span>

          <span className="grid gap-[4px]">
            <strong className="text-[10px] font-bold">{title}</strong>
            <small className="text-[#334155] text-[9px]">{detail}</small>
          </span>

          <Check
            className="market-benefit-check ml-[auto] text-[#475569] max-[760px]:ml-[auto]"
            size={15}
          />
        </div>
      ))}
    </section>
  );
}
