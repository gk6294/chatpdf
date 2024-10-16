import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./contexts/Providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`antialiased `}>{children}</body>
        <Toaster />
      </Providers>
    </html>
  );
}
