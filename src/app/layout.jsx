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
  title: "Codex Jan2024 Cohort Movie Reviews",
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
                    <FilmIcon className="w-8 h-8 mr-2 text-yellow-400" />
                    <p className="text-purple-900">Codex Jan2024 Cohort Movie Reviewer</p>
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

                {/* Profile link with coming soon message */}
                <label htmlFor="profileModal" className="cursor-pointer">
                  <div className="flex items-center text-gray-600 hover:text-gray-900">
                    <UserCircleIcon className="w-6 h-6 mr-1" />
                    Profile
                  </div>
                </label>

                {/* Hidden checkbox that triggers modal */}
                <input
                  type="checkbox"
                  id="profileModal"
                  className="hidden peer"
                />

                {/* Modal triggered by checkbox */}
                <div className="fixed inset-0 z-50 items-center justify-center hidden w-screen bg-black bg-opacity-50 peer-checked:flex">
                  <div className="px-6 py-4 text-white bg-purple-900 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold">Coming Soon!</h2>
                    <p className="mt-2 text-sm">
                      The profile page is currently under development. Stay
                      tuned!
                    </p>
                    <label
                      htmlFor="profileModal"
                      className="block mt-4 text-yellow-400 cursor-pointer hover:underline"
                    >
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>

        <footer className="py-6 text-center bg-purple-900">
          <p className="text-sm text-gray-200">
            © Code Fellows January 2024 Cohort. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
