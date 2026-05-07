import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Cho phép tất cả bots hợp lệ
        userAgent: "*",
        allow: "/",
        disallow: [
          "/tim-kiem",       // search result pages — noindex, tránh duplicate
          "/api/",           // API endpoints
          "/admin/",         // admin area
          "/dashboard/",     // internal dashboard
          "/auth/",          // authentication flows
          "/print/",         // print-friendly views
          "/embed/",         // embed widgets
          "/*?*sort=",       // filter params → near-duplicate
          "/*?*filter=",
          "/*?*page=",       // pagination với query string (dùng rel=next thay)
          "/*?lat=",         // near-me geo URLs
          "/*?lng=",
          "/*?ref=",         // referral tracking params
        ],
      },
      {
        // Googlebot — cho phép crawl tất cả resource quan trọng
        userAgent: "Googlebot",
        allow: ["/", "/images/", "/css/", "/js/", "/*.jpg$", "/*.png$", "/*.webp$", "/*.svg$"],
        disallow: ["/tim-kiem", "/admin/", "/api/"],
      },
      {
        // Googlebot-Image — cho phép crawl ảnh
        userAgent: "Googlebot-Image",
        allow: ["/images/"],
      },
      {
        // Bingbot
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/tim-kiem", "/admin/", "/api/"],
      },
      {
        // Block các SEO crawler thương mại để tiết kiệm crawl budget
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
    ],
    sitemap: "https://pro.thodia.so/sitemap.xml",
    host: "https://pro.thodia.so",
  };
}
