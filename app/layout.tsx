import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerHive App",
  description: "Created by Ricky Papini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Toaster */}

        <header>
          <Header />
        </header>

        <div>
          <main> {children}</main>
        </div>
      </body>
    </html>
  );
}
