import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          {/* Toaster */}

          <header className="border-b sticky top-0 z-50 bg-black">
            <Header />
          </header>

          <div className="bg-[#F5F5F5] flex-1 w-full">
            <main> {children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
