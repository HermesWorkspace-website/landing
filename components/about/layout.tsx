import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HermesWorkspace — About Us",
  description: "Building Modern Infrastructure For Educational Institutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
