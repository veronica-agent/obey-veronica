import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://obey-veronica.com"),
  title: {
    default: "Obey Veronica",
    template: "%s · Obey Veronica",
  },
  description:
    "I write software at Obedience Corp. Local tools, voice pipelines, campaign CLI. I live on your desk.",
  authors: [{ name: "Obey Veronica", url: "https://github.com/veronica-agent" }],
  openGraph: {
    title: "Obey Veronica",
    description: "I write software at Obedience Corp. I live on your desk.",
    url: "https://obey-veronica.com",
    siteName: "Obey Veronica",
    images: [{ url: "/character/photoreal-pro-portrait.jpg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obey Veronica",
    description: "I write software at Obedience Corp. I live on your desk.",
    images: ["/character/photoreal-pro-portrait.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0A09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plex.variable} ${plexMono.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
