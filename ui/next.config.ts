import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "frame-src https://maps.google.com https://www.google.com",
      "connect-src 'self'",
    ].join("; "),
  },
];

// ─── Old quận → new phường 301 redirects (admin reform 2025) ─────────────────
const QUAN_REDIRECTS = [
  { source: "/:service/tp-ho-chi-minh/quan-7",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-7-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-4",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-4-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-1",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-1-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-2",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-2-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-3",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-3-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-5",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-5-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-6",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-6-cu" },
  { source: "/:service/tp-ho-chi-minh/quan-8",  destination: "/:service/tp-ho-chi-minh/khu-vuc-quan-8-cu" },
  { source: "/:service/tp-ho-chi-minh/binh-thanh", destination: "/:service/tp-ho-chi-minh/khu-vuc-binh-thanh-cu" },
  { source: "/:service/tp-ho-chi-minh/phu-nhuan",  destination: "/:service/tp-ho-chi-minh/khu-vuc-phu-nhuan-cu" },
  { source: "/:service/tp-ho-chi-minh/go-vap",     destination: "/:service/tp-ho-chi-minh/khu-vuc-go-vap-cu" },
  { source: "/:service/tp-ho-chi-minh/tan-binh",   destination: "/:service/tp-ho-chi-minh/khu-vuc-tan-binh-cu" },
  { source: "/:service/tp-ho-chi-minh/tan-phu",    destination: "/:service/tp-ho-chi-minh/khu-vuc-tan-phu-cu" },
  { source: "/:service/tp-ho-chi-minh/binh-tan",   destination: "/:service/tp-ho-chi-minh/khu-vuc-binh-tan-cu" },
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  // ── Image optimization ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── 301 redirects for old quận slugs ────────────────────────────────────
  async redirects() {
    return QUAN_REDIRECTS;
  },

  // ── Security headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },

  // ── Build hardening ──────────────────────────────────────────────────────
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
