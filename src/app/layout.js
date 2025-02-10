import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import Providers from "./components/Providers.jsx";
import { auth } from "./auth";
import { AuthProvider } from "./context/AuthContext";
import { findUsernameFromEmail } from "./lib/data.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  let username = null;

  if (session?.user?.email) {
    username = await findUsernameFromEmail(session.user.email);
  }

  return (
    <html lang="en">
      <body className={`${inter.className} sm:px-5 sm:pt-8`}>
        <div className="max-w-[1536px] mx-auto bg-recipe-gray-50 border-recipe-gray-100 border-1 rounded-t-xl">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <Providers>
              <AuthProvider>
                <Navbar username={username} />
                {children}
              </AuthProvider>
            </Providers>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
