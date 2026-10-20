import Link from "next/link";
import { ArrowRight, BadgeCheck, LogOut, UserRound } from "lucide-react";
import type { Profile } from "../types";

type Props = {
  profile: Profile;
  fullName: string;
  initials: string;
  role: string;
  signingOut: boolean;
  signOutError: string;
  onSignOut: () => void;
};

export function ProfileIdentityCard({
  profile,
  fullName,
  initials,
  role,
  signingOut,
  signOutError,
  onSignOut,
}: Props) {
  return (
    <div className="profile-identity-column min-h-full flex flex-col gap-[10px] max-[720px]:min-h-0">
      <section
        aria-label="Profile summary"
        className="profile-summary-card min-h-[220px] flex flex-col items-center border border-[#e9e7e3] bg-white p-6 text-center"
      >
        <div
          aria-hidden="true"
          className="profile-avatar grid h-[66px] w-[66px] place-items-center rounded-full border border-[#dbe4f0] 
          bg-[#f1f5f9] text-[23px] font-semibold text-[#334155]"
        >
          {initials || <UserRound size={34} strokeWidth={1.5} />}
        </div>
        <h2 className="mb-1 mt-3 text-[17px] font-semibold text-[#292724]">
          {fullName || "Kade customer"}
        </h2>
        <p className="m-0 max-w-full wrap-anywhere text-[11px] text-[#77736d]">
          {profile.email || "Email not provided"}
        </p>
        <span className="profile-role-badge mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] 
        bg-[#f8fafc] px-2.5 py-1.5 text-[9px] font-semibold text-[#475569]">
          <BadgeCheck size={14} />{" "}
          {role === "ADMIN" ? "Administrator" : "Buyer account"}
        </span>
        {role === "ADMIN" && (
          <Link
            className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#334155] hover:text-[#1d4ed8]"
            href="/admin"
          >
            Open admin panel <ArrowRight size={14} />
          </Link>
        )}
      </section>
      <button
        className="profile-signout-button inline-flex min-h-[42px] flex-none items-center justify-center gap-2 
        rounded border border-[#edc9c7] bg-[#fdf5f4] px-3.5 text-[10px] font-bold text-[#a33c32] transition-colors 
        hover:border-[#dfaaa7] hover:bg-[#f9e9e8] hover:text-[#8f2f2a] disabled:cursor-wait disabled:opacity-65"
        disabled={signingOut}
        onClick={onSignOut}
        type="button"
      >
        <LogOut size={15} /> {signingOut ? "Signing out…" : "Log out"}
      </button>
      {signOutError && (
        <p className="m-0 text-center text-[11px] text-[#a33c32]" role="alert">
          {signOutError}
        </p>
      )}
    </div>
  );
}
