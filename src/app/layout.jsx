import localFont from "next/font/local";
import "./globals.css";

import { Providers } from "@/providers";
import {
  HomeIcon,
  FilmIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Movie Reviews",
  description: "Reviews on all of Codex's Jan 2024 cohort's favorite movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-lg">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900">
                    <FilmIcon className="w-8 h-8 mr-2 text-blue-500" />
                    Movie Reviews
                  </div>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <HomeIcon className="w-6 h-6 mr-1" />
                    Home
                  </div>
                </Link>

                <Link href="/movies">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <FilmIcon className="w-6 h-6 mr-1" />
                    Movies
                  </div>
                </Link>

                <Link href="/">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <UserCircleIcon className="w-6 h-6 mr-1" />
                    Profile
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>

        <footer className="py-6 mt-12 text-center bg-purple-900">
          <p className="text-sm text-gray-200">
            © Code Fellows January 2024 Cohort. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
