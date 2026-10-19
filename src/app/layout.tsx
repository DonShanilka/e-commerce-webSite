import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/src/shared/providers/providers";

export const metadata: Metadata = {
  title: "Kade | Everyday essentials",
  description: "Thoughtful finds at great prices from your trusted Sri Lankan online store.",
  applicationName: "Kade",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="scroll-smooth selection:bg-[#dbeafe] selection:text-[#1e251f]"
    >
      <body className="m-0 bg-[var(--color-paper)] text-[var(--color-ink)] [font-family:Arial,_'Noto_Sans_Sinhala',_sans-serif]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
