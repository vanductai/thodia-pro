import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pro.thodia.so"),
  title: {
    default: "Pro.Thodia.so - Danh bạ Đại lý BĐS, Xe cộ, Bảo hiểm Việt Nam",
    template: "%s | Pro.Thodia.so",
  },
  description:
    "Tìm kiếm đại lý kinh doanh bất động sản, xe cộ và bảo hiểm uy tín tại Việt Nam. Thông tin chính xác, đã xác minh, chuẩn Local SEO.",
  keywords: ["đại lý bđs", "môi giới bất động sản", "đại lý xe hơi", "bảo hiểm", "danh bạ đại lý"],
  authors: [{ name: "Pro.Thodia.so" }],
  creator: "Thodia",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://pro.thodia.so",
    siteName: "Pro.Thodia.so",
    title: "Pro.Thodia.so - Danh bạ Đại lý Kinh doanh Việt Nam",
    description: "Tìm kiếm đại lý BĐS, xe cộ, bảo hiểm uy tín tại Việt Nam",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro.Thodia.so",
    description: "Danh bạ đại lý kinh doanh Việt Nam",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://pro.thodia.so/#website",
    name: "Pro.Thodia.so",
    url: "https://pro.thodia.so",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://pro.thodia.so/tim-kiem?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Pro.Thodia.so",
      url: "https://pro.thodia.so",
      logo: { "@type": "ImageObject", url: "https://pro.thodia.so/logo.png" },
    },
  };

  return (
    <html lang="vi" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {/* Sidebar layout: sidebar | main */}
            <div className="flex min-h-screen">
              <AppSidebar />
              <div className="flex flex-col flex-1 min-w-0">
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
