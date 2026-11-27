import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aigency — Loan Proposal",
  description: "A $50,000 interest-free loan proposal. You get all of it back.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}