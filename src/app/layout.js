

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer"
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/SessionWrapper";
import Porvider from "@/components/cartProvider/CartPorvider2";
const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", '700', "900"]
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession(); // Fetch the session server-side

  return (
    <html lang="en">

      <body className={bodyFont.className}>
        <SessionWrapper session={session}>
          <ThemeProvider>
            <Porvider>
              <div className="contaner">

                <Navbar />
                {children}

                <Footer />

              </div>
            </Porvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
