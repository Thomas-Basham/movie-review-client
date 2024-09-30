import localFont from "next/font/local";
import "./globals.css";

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
        <header className="my-10 text-center">Movie Reviews</header>

        <main className="min-h-screen">{children}</main>
        <footer className="my-10 text-center">
          &copy; Codex January 2024 Cohort
        </footer>
      </body>
    </html>
  );
}
