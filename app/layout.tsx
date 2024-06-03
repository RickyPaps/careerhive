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
        <body className="flex min-h-screen flex-col">
          {/* Toaster */}

          <header className="sticky top-0 z-50 border-b bg-black">
            <Header />
          </header>

          <div className="w-full flex-1 bg-[#F5F5F5]">
            <main> {children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
