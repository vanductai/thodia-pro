import type { MetadataRoute } from "next";
import { AGENTS, LOCATIONS, BRANDS, PROVINCES, SERVICES, GEO_CLUSTERS } from "@/lib/mock-data";

const BASE_URL = "https://pro.thodia.so";
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Static / root pages ────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: NOW, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/agent`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/brand`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/gioi-thieu`, lastModified: NOW, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/chinh-sach-bao-mat`, lastModified: NOW, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/dieu-khoan-su-dung`, lastModified: NOW, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ── 2. Service root pages (bds, xe-co, bao-hiem) ─────────────────────────
  const servicePages: MetadataRoute.Sitemap = Object.keys(SERVICES).map((service) => ({
    url: `${BASE_URL}/${service}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // ── 3. Province root pages ────────────────────────────────────────────────
  const provincePages: MetadataRoute.Sitemap = Object.keys(PROVINCES).map((province) => ({
    url: `${BASE_URL}/${province}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── 4. Service × Province pages ───────────────────────────────────────────
  const serviceProvincePages: MetadataRoute.Sitemap = Object.keys(SERVICES).flatMap((service) =>
    Object.keys(PROVINCES).map((province) => ({
      url: `${BASE_URL}/${service}/${province}`,
      lastModified: NOW,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  // ── 5. Geo-cluster + ward pages ──────────────────────────────────────────
  const geoPages: MetadataRoute.Sitemap = GEO_CLUSTERS.flatMap((cluster) => [
    ...Object.keys(SERVICES).map((service) => ({
      url: `${BASE_URL}/${service}/${cluster.province}/${cluster.slug}`,
      lastModified: NOW,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...cluster.wards.flatMap((ward) =>
      Object.keys(SERVICES).map((service) => ({
        url: `${BASE_URL}/${service}/${cluster.province}/${ward.slug}`,
        lastModified: NOW,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    ),
  ]);

  // ── 6. Agent detail pages ─────────────────────────────────────────────────
  const agentPages: MetadataRoute.Sitemap = AGENTS.map((agent) => ({
    url: `${BASE_URL}/agent/${agent.slug}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: agent.agent_type === "location-based" ? 0.8 : 0.7,
  }));

  // ── 7. Location detail pages ──────────────────────────────────────────────
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.province}/${loc.phuong}/${loc.slug}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── 8. Brand pages — only brand×province combos that have real data ────────
  const brandPages: MetadataRoute.Sitemap = BRANDS.flatMap((brand) => {
    // Collect provinces where this brand has agents or locations
    const brandProvinces = new Set<string>([
      ...AGENTS.filter((a) => a.primary_brand === brand.name).map((a) => a.province),
      ...LOCATIONS.filter((l) => l.primary_brand === brand.name).map((l) => l.province),
    ]);
    return [
      {
        url: `${BASE_URL}/brand/${brand.slug}`,
        lastModified: NOW,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      ...[...brandProvinces].map((province) => ({
        url: `${BASE_URL}/brand/${brand.slug}/dai-ly/${province}`,
        lastModified: NOW,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  });

  return [
    ...staticPages,
    ...servicePages,
    ...provincePages,
    ...serviceProvincePages,
    ...geoPages,
    ...agentPages,
    ...locationPages,
    ...brandPages,
  ];
}
