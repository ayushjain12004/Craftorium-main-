// src/app/layout.tsx
import "./globals.css";

import Header from "./Header/page";
import Footer from "./Footer/page";
import { AppContextProvider } from "@/context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

export const metadata = {
  title: "Craftorium",
  description: "Connecting Craftsmanship with the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <GlobalErrorBoundary>
            <Header />
            <AppContextProvider>{children}</AppContextProvider>
            <Footer />
          </GlobalErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}