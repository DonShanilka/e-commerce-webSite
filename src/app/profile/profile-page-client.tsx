"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, UserRound } from "lucide-react";
import { SiteFooter } from "@/src/shared/layout";
import { StoreHeader } from "@/src/shared/layout";
import { setUser, signOut } from "@/src/features/auth";
import { useAppDispatch } from "@/src/store/hooks";
import type { Profile } from "@/src/features/profile/types";
import { ProfileDetailsCard } from "@/src/features/profile/components/profile-details-card";
import { ProfileIdentityCard } from "@/src/features/profile/components/profile-identity-card";

export default function ProfilePageClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/profile", {
          cache: "no-store",
        });
        const result = await response.json().catch(() => ({}));

        if (response.status === 401) {
          router.replace("/login?next=%2Fprofile");
          return;
        }
        if (!response.ok) {
          throw new Error(result.message || "We could not load your profile.");
        }

        if (!active) return;
        const user = result as Profile;
        setProfile(user);
        dispatch(
          setUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: String(user.role || "CUSTOMER").toUpperCase(),
          }),
        );
      } catch (cause) {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "We could not load your profile.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      active = false;
    };
  }, [dispatch, router]);

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  const initials = [profile?.firstName?.[0], profile?.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  const role = String(profile?.role || "CUSTOMER").toUpperCase();

  async function handleSignOut() {
    setSigningOut(true);
    setSignOutError("");

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok)
        throw new Error("Could not sign out. Please try again.");
      dispatch(signOut());
      router.replace("/");
    } catch (cause) {
      setSignOutError(
        cause instanceof Error
          ? cause.message
          : "Could not sign out. Please try again.",
      );
      setSigningOut(false);
    }
  }

  return (
    <div className="storefront-page profile-storefront-page min-h-[100vh] bg-[#fff] text-[#22211f] flex min-h-[100dvh] flex-col">
      <StoreHeader />
      <main
        className="store-container profile-page-main w-[min(1320px,_calc(100%_-_64px))] mx-[auto] 
      max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] 
      min-h-[0] [flex:1_0_auto] pt-[44px] pb-[32px] max-[720px]:min-h-[0] max-[720px]:pt-[28px] max-[720px]:pb-[24px]"
      >
        <div className="profile-page-heading flex items-end justify-between gap-[24px] mb-[30px] max-[480px]:items-start">
          <div>
            <span className="profile-eyebrow text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
              Your Kade account
            </span>
            <h1 className="m-[9px_0_5px] text-[#292724] text-[clamp(30px,_4vw,_42px)] font-semibold tracking-[-0.04em]">
              My profile
            </h1>
            <p className="m-[0] text-[#77736d] text-[13px]">
              Your personal details and account information.
            </p>
          </div>
          <Link
            className="profile-back-link inline-flex items-center gap-[8px] text-[#334155] text-[11px] font-[650] 
            [&:hover]:text-[#1d4ed8] max-[480px]:pt-[5px] max-[480px]:whitespace-nowrap"
            href="/"
          >
            Back to shop <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div
            aria-live="polite"
            className="profile-state min-h-[280px] flex flex-col items-center justify-center gap-[10px] 
            text-[#77736d] text-[12px] text-center"
          >
            Loading your profile…
          </div>
        ) : error ? (
          <section
            className="profile-state profile-error min-h-[280px] flex flex-col items-center justify-center gap-[10px] 
            text-[#77736d] text-[12px] text-center"
            role="alert"
          >
            <UserRound size={26} />
            <h2 className="m-[0] text-[#292724] text-[20px]">
              Profile unavailable
            </h2>
            <p className="m-[0]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="mt-[8px] p-[10px_16px] [border:1px_solid_#d8d6d1] bg-[#fff] text-[#34332f] text-[11px]"
            >
              Try again
            </button>
          </section>
        ) : profile ? (
          <div
            className="profile-layout grid grid-cols-[minmax(230px,_0.72fr)_minmax(0,_1.8fr)] items-stretch 
          gap-5 max-[720px]:grid-cols-1"
          >
            <ProfileIdentityCard
              fullName={fullName}
              initials={initials}
              onSignOut={() => void handleSignOut()}
              profile={profile}
              role={role}
              signOutError={signOutError}
              signingOut={signingOut}
            />
            <ProfileDetailsCard
              fullName={fullName}
              profile={profile}
              role={role}
            />
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
