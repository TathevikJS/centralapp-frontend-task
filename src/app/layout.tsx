import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from '../providers/providers';

export const metadata: Metadata = {
  title: "Categories App",
  description: "Categories App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}