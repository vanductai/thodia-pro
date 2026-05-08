import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar, MobileTopBar } from "@/components/layout/app-sidebar";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// JetBrains Mono chỉ load khi cần (code blocks) — xóa khỏi global load
// để giảm font request không cần thiết cho SEO performance

export const metadata: Metadata = {
  metadataBase: new URL("https://pro.thodia.so"),
  title: {
    default: "Pro.Thodia.so - Danh bạ Đại lý BĐS, Xe cộ, Bảo hiểm Việt Nam",
    template: "%s | Pro.Thodia.so",
  },
  description:
    "Tìm kiếm đại lý kinh doanh bất động sản, xe cộ và bảo hiểm uy tín tại Việt Nam. Thông tin chính xác, đã xác minh, chuẩn Local SEO.",
  // keywords: deprecated by Google since 2009, không thêm để tránh signal tiêu cực
  authors: [{ name: "Pro.Thodia.so" }],
  creator: "Thodia",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://pro.thodia.so",
    siteName: "Pro.Thodia.so",
    title: "Pro.Thodia.so — Danh bạ Đại lý Kinh doanh Việt Nam",
    description: "Tìm kiếm đại lý BĐS, xe cộ, bảo hiểm uy tín tại Việt Nam. 1,847+ đại lý đã xác minh, 63 tỉnh thành.",
    // SEO-01: dùng PNG thay SVG — Facebook/Zalo/Twitter không render SVG
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pro.Thodia.so — Danh bạ Đại lý Kinh doanh Việt Nam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro.Thodia.so — Danh bạ Đại lý Kinh doanh Việt Nam",
    description: "Tìm đại lý BĐS, xe cộ, bảo hiểm uy tín tại Việt Nam. 1,847+ đại lý đã xác minh.",
    images: ["/og-image.png"], // SEO-01: PNG thay SVG
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // SEO-02: file thực tế đã có trong /public
    shortcut: "/favicon.ico",
  },
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
      logo: { "@type": "ImageObject", url: "https://pro.thodia.so/logo.svg" },
    },
  };

  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} ${jakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {/* Mobile topbar — fixed, full viewport width, ngoài max-w shell */}
            <MobileTopBar />

            {/* App shell — max-w-7xl canh giữa, bao gồm sidebar + main */}
            <div className="flex min-h-screen max-w-7xl mx-auto w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 min-w-0">
                {/* pt-12 trên mobile để offset fixed topbar 48px */}
                <main className="flex-1 pt-12 md:pt-0">{children}</main>
                <SiteFooter />
              </div>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
