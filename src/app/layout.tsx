// src/app/layout.tsx
import "./globals.css";
import Header from "./Header/page";
import Footer from "./Footer/page";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";


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

      <html lang="en">
        <body>
       
            <Header />
            <Toaster />
            <AppContextProvider>{children}</AppContextProvider>
            <Footer />
          
        </body>
      </html>
   
  );
}
