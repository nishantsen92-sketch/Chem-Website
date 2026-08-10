import type { Metadata } from "next";
import { Outfit, Oswald, Caveat } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Nishant Sen | Interactive 3D Chemistry Science & Tech Creator",
  description: "Master spatial chemistry visually. Explore real-time 3D molecular structures (VSEPR), reaction mechanisms, and expert exam notes for Class 11, 12, NEET, and JEE prep by Nishant Sen (M.Sc. Chemistry).",
  keywords: ["Chemistry Educator", "Nishant Sen", "3D VSEPR Explorer", "Molecular Geometry", "Class 11 Chemistry", "Class 12 Chemistry", "NEET Chemistry Prep", "JEE Chemistry Prep", "3D Molecules", "React Three Fiber"],
  authors: [{ name: "Nishant Sen" }],
  openGraph: {
    title: "Nishant Sen | Interactive 3D Molecular Science",
    description: "Master spatial chemistry visually with interactive 3D simulations and NCERT prep dashboards.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${oswald.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="font-sans min-h-full flex flex-col bg-[#fafafa] text-[#18181b]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
