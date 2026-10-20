import { Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import type { Profile } from "../types";

const detailItems = [
  {
    label: "Full name",
    icon: UserRound,
    value: (name: string) => name || "Not provided",
  },
  {
    label: "Email address",
    icon: Mail,
    value: (_name: string, profile: Profile) => profile.email || "Not provided",
  },
  {
    label: "Phone number",
    icon: Phone,
    value: (_name: string, profile: Profile) => profile.phone || "Not provided",
  },
  {
    label: "Account type",
    icon: MapPin,
    value: (_name: string, _profile: Profile, role: string) =>
      role === "ADMIN" ? "Administrator" : "Buyer",
  },
];

export function ProfileDetailsCard({
  profile,
  fullName,
  role,
}: {
  profile: Profile;
  fullName: string;
  role: string;
}) {
  return (
    <section
      aria-labelledby="profile-details-title"
      className="profile-details-card border border-[#e9e7e3] bg-white p-[17px_22px_14px] max-[720px]:p-[21px_18px_17px]"
    >
      <div className="profile-card-heading flex items-center justify-between border-b border-[#efeeeb] pb-3.5">
        <div>
          <span className="profile-eyebrow text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
            Account information
          </span>
          <h2
            className="mb-0 mt-1.5 text-[19px] font-semibold text-[#292724]"
            id="profile-details-title"
          >
            Personal details
          </h2>
        </div>
        <ShieldCheck aria-hidden="true" className="text-[#475569]" size={20} />
      </div>
      <div className="profile-details-grid grid grid-cols-2 gap-x-6 max-[480px]:grid-cols-1">
        {detailItems.map(({ label, icon: Icon, value }) => (
          <div
            className="profile-detail-item flex min-w-0 items-center gap-3 border-b border-[#efeeeb] py-3"
            key={label}
          >
            <span className="profile-detail-icon grid h-[37px] w-[37px] flex-none place-items-center rounded-full border 
            border-[#e8edf4] bg-[#f8fafc] text-[#475569]">
              <Icon size={17} />
            </span>
            <div className="grid min-w-0 gap-1">
              <span className="text-[9px] uppercase tracking-[0.04em] text-[#85817b]">
                {label}
              </span>
              <strong className="wrap-anywhere text-[12px] font-semibold text-[#34332f]">
                {value(fullName, profile, role)}
              </strong>
            </div>
          </div>
        ))}
      </div>
      <p className="profile-security-note mt-[13px] flex items-center gap-[7px] text-[10px] text-[#77736d]">
        <ShieldCheck className="flex-none text-[#64748b]" size={15} /> Your
        profile details are securely loaded from your account.
      </p>
    </section>
  );
}
