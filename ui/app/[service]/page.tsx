import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Users, Building2, ArrowRight } from "lucide-react";
import {
  AGENTS, LOCATIONS, PROVINCES, SERVICES,
  getServiceLabel, getAgentsByService,
  getProvinceLabel, getAgentsByProvince, getLocationsByProvince,
  PROVINCE_GEO,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ service: string }>;
}

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  const serviceParams = Object.keys(SERVICES).map((s) => ({ service: s }));
  const provinceParams = Object.keys(PROVINCES).map((p) => ({ service: p }));
  return [...serviceParams, ...provinceParams];
}

// ─── Helpers: Province detection ──────────────────────────────────────────────
function isProvince(slug: string): boolean {
  return slug in PROVINCES;
}

function isService(slug: string): boolean {
  return slug in SERVICES;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;

  // Province metadata
  if (isProvince(slug)) {
    const label = getProvinceLabel(slug);
    return {
      title: `Đại lý uy tín tại ${label} — Pro.Thodia.so`,
      description: `Tìm đại lý BĐS, xe cộ, bảo hiểm đã xác minh tại ${label}. Thông tin chuẩn xác, liên hệ trực tiếp, đánh giá thực từ khách hàng.`,
      alternates: { canonical: `https://pro.thodia.so/${slug}` },
    };
  }

  // Service metadata
  if (isService(slug)) {
    const serviceLabel = getServiceLabel(slug);
    return {
      title: `Đại lý ${serviceLabel} uy tín toàn quốc — Pro.Thodia.so`,
      description: `Tìm đại lý ${serviceLabel} đã xác minh trên toàn quốc. Thông tin chuẩn xác, liên hệ trực tiếp, đánh giá thực từ khách hàng.`,
      alternates: { canonical: `https://pro.thodia.so/${slug}` },
    };
  }

  return { title: "Không tìm thấy" };
}

// ─── Schema builders ──────────────────────────────────────────────────────────
function buildServiceSchema(
  service: string, serviceLabel: string,
  agents: typeof AGENTS, locs: typeof LOCATIONS,
) {
  const allItems = [
    ...agents.slice(0, 8).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://pro.thodia.so/agent/${a.slug}`,
      name: a.name,
    })),
    ...locs.slice(0, 4).map((l, i) => ({
      "@type": "ListItem",
      position: agents.slice(0, 8).length + i + 1,
      url: `https://pro.thodia.so/locations/${l.province}/${l.phuong}/${l.slug}`,
      name: l.name,
    })),
  ];
  const total = agents.length + locs.length;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${service}#page`,
        name: `Đại lý ${serviceLabel} uy tín toàn quốc`,
        description: `Danh sách ${total} đại lý ${serviceLabel} đã xác minh trên toàn quốc`,
        url: `https://pro.thodia.so/${service}`,
        numberOfItems: total,
        mainEntity: {
          "@type": "ItemList",
          "@id": `https://pro.thodia.so/${service}#list`,
          numberOfItems: total,
          itemListElement: allItems,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: serviceLabel, item: `https://pro.thodia.so/${service}` },
        ],
      },
    ],
  };
}

function buildProvinceSchema(
  provinceSlug: string, provinceLabel: string,
  agents: typeof AGENTS, locs: typeof LOCATIONS,
) {
  const geo = PROVINCE_GEO[provinceSlug];
  const allItems = [
    ...agents.slice(0, 8).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://pro.thodia.so/agent/${a.slug}`,
      name: a.name,
    })),
    ...locs.slice(0, 4).map((l, i) => ({
      "@type": "ListItem",
      position: agents.slice(0, 8).length + i + 1,
      url: `https://pro.thodia.so/locations/${l.province}/${l.phuong}/${l.slug}`,
      name: l.name,
    })),
  ];
  const total = agents.length + locs.length;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${provinceSlug}#page`,
        name: `Đại lý uy tín tại ${provinceLabel}`,
        description: `Danh sách ${total} đại lý đã xác minh tại ${provinceLabel}`,
        url: `https://pro.thodia.so/${provinceSlug}`,
        numberOfItems: total,
        ...(geo && {
          spatialCoverage: {
            "@type": "AdministrativeArea",
            name: provinceLabel,
            geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
          },
        }),
        mainEntity: {
          "@type": "ItemList",
          "@id": `https://pro.thodia.so/${provinceSlug}#list`,
          numberOfItems: total,
          itemListElement: allItems,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: provinceLabel, item: `https://pro.thodia.so/${provinceSlug}` },
        ],
      },
    ],
  };
}

// ─── Service helpers ──────────────────────────────────────────────────────────
function getProvincesForService(service: string) {
  const agentProvinces = new Set(
    AGENTS.filter((a) => a.category === service && a.province).map((a) => a.province as string),
  );
  const locProvinces = new Set(
    LOCATIONS.filter((l) => l.category === service).map((l) => l.province),
  );
  const allSlugs = Array.from(new Set([...agentProvinces, ...locProvinces]));
  return allSlugs
    .map((slug) => ({
      slug,
      label: PROVINCES[slug as keyof typeof PROVINCES] ?? slug,
      agentCount: AGENTS.filter((a) => a.category === service && a.province === slug).length,
      locCount: LOCATIONS.filter((l) => l.category === service && l.province === slug).length,
    }))
    .sort((a, b) => b.agentCount + b.locCount - (a.agentCount + a.locCount));
}

// ─── Province helpers ─────────────────────────────────────────────────────────
function getServicesForProvince(province: string) {
  const serviceKeys = Object.keys(SERVICES) as Array<keyof typeof SERVICES>;
  return serviceKeys
    .map((key) => {
      const agentCount = AGENTS.filter((a) => a.category === key && a.province === province).length;
      const locCount = LOCATIONS.filter((l) => l.category === key && l.province === province).length;
      return {
        slug: key,
        label: SERVICES[key].label,
        icon: SERVICES[key].icon,
        agentCount,
        locCount,
        total: agentCount + locCount,
      };
    })
    .filter((s) => s.total > 0)
    .sort((a, b) => b.total - a.total);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Province Listing Component
// ═══════════════════════════════════════════════════════════════════════════════
function ProvinceListingPage({
  provinceSlug,
  provinceLabel,
  agents,
  locations,
  services,
  schema,
}: {
  provinceSlug: string;
  provinceLabel: string;
  agents: typeof AGENTS;
  locations: typeof LOCATIONS;
  services: ReturnType<typeof getServicesForProvince>;
  schema: ReturnType<typeof buildProvinceSchema>;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{provinceLabel}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Đại lý uy tín tại {provinceLabel}</h1>
          <p className="text-sm text-muted-foreground">
            Tìm đại lý BĐS, xe cộ, bảo hiểm đã xác minh tại {provinceLabel}. Liên hệ trực tiếp, đánh giá thực.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <strong className="text-foreground">{agents.length}</strong> đại lý
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <strong className="text-foreground">{locations.length}</strong> địa điểm
            </span>
          </div>
        </div>

        {/* Browse by service category */}
        {services.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tìm theo danh mục
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/${provinceSlug}`}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                          {s.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.agentCount > 0 && `${s.agentCount} đại lý`}
                          {s.agentCount > 0 && s.locCount > 0 && " · "}
                          {s.locCount > 0 && `${s.locCount} địa điểm`}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Separator className="mb-6" />

        {/* Featured locations */}
        {locations.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Văn phòng / Showroom tại {provinceLabel}</h2>
            </div>
            <div className="space-y-2">
              {locations.slice(0, 5).map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-medium text-sm">{loc.name}</p>
                          <BadgeVerified label="✓" />
                          {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                          {loc.primary_brand && (
                            <Badge variant="secondary" className="text-xs">{loc.primary_brand}</Badge>
                          )}
                          {loc.is_authorized && (
                            <Badge variant="outline" className="text-xs hidden sm:inline-flex">Chính thức</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          {loc.ward_label}
                          {loc.legacy_district && (
                            <span className="opacity-60">({loc.legacy_district})</span>
                          )}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <RatingStars rating={loc.rating} count={loc.review_count} size="sm" showCount={false} />
                        <p className="text-xs text-muted-foreground">{loc.rating} · {loc.review_count}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {locations.length > 0 && agents.length > 0 && <Separator className="mb-5" />}

        {/* Featured agents */}
        {agents.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Đại lý tại {provinceLabel}</h2>
            </div>
            <div className="space-y-2">
              {agents.slice(0, 6).map((agent) => (
                <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm shrink-0">
                        {agent.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-medium text-sm">{agent.name}</p>
                          <BadgeVerified label="✓" />
                          {agent.brand_tier && <BadgeBrandTier tier={agent.brand_tier} />}
                          {agent.agent_type === "freelance" && (
                            <Badge variant="secondary" className="text-xs">Độc lập</Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {agent.category === "bds" ? "BĐS" : agent.category === "xe-co" ? "Xe cộ" : "Bảo hiểm"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{agent.title}</p>
                        {agent.ward_label ? (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-2.5 w-2.5" />
                            {agent.ward_label}
                            {agent.legacy_district && (
                              <span className="opacity-60">({agent.legacy_district})</span>
                            )}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-0.5">Phủ sóng toàn tỉnh</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">{agent.years_experience} năm KN</p>
                          <RatingStars rating={agent.rating} count={agent.review_count} size="sm" showCount={false} />
                        </div>
                        <a
                          href={`tel:${agent.phone}`}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md border hover:bg-muted transition-colors"
                        >
                          <Phone className="h-3 w-3" />Gọi
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/agent"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Xem tất cả đại lý tại {provinceLabel}
          </Link>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Page — handles both /[service] and /[province] slugs
// ═══════════════════════════════════════════════════════════════════════════════
export default async function DynamicSlugPage({ params }: PageProps) {
  const { service: slug } = await params;

  // ── Case 1: Province slug (e.g. /ha-noi, /tp-ho-chi-minh) ──────────────
  if (isProvince(slug)) {
    const provinceLabel = getProvinceLabel(slug);
    const agents = getAgentsByProvince(slug);
    const locations = getLocationsByProvince(slug);
    const services = getServicesForProvince(slug);
    const schema = buildProvinceSchema(slug, provinceLabel, agents, locations);

    return (
      <ProvinceListingPage
        provinceSlug={slug}
        provinceLabel={provinceLabel}
        agents={agents}
        locations={locations}
        services={services}
        schema={schema}
      />
    );
  }

  // ── Case 2: Service slug (e.g. /bds, /xe-co, /bao-hiem) ───────────────
  if (!isService(slug)) notFound();

  const serviceLabel = getServiceLabel(slug);
  const allAgents = getAgentsByService(slug);
  const allServiceLocs = LOCATIONS.filter((l) => l.category === slug);
  const featuredAgents = allAgents.slice(0, 4);
  const featuredLocs = allServiceLocs.slice(0, 3);
  const provinces = getProvincesForService(slug);
  const schema = buildServiceSchema(slug, serviceLabel, allAgents, allServiceLocs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{serviceLabel}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Đại lý {serviceLabel} uy tín toàn quốc</h1>
          <p className="text-sm text-muted-foreground">
            Tìm đại lý {serviceLabel} đã xác minh theo tỉnh thành. Liên hệ trực tiếp, đánh giá thực.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <strong className="text-foreground">{featuredAgents.length}+</strong> đại lý niêm yết
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <strong className="text-foreground">{featuredLocs.length}+</strong> địa điểm
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <strong className="text-foreground">{provinces.length}</strong> tỉnh/TP có đại lý
            </span>
          </div>
        </div>

        {/* Province quick nav */}
        {provinces.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tìm theo tỉnh / thành phố
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {provinces.map((p) => (
                <Link key={p.slug} href={`/${slug}/${p.slug}`}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <div>
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {p.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.agentCount > 0 && `${p.agentCount} đại lý`}
                            {p.agentCount > 0 && p.locCount > 0 && " · "}
                            {p.locCount > 0 && `${p.locCount} địa điểm`}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Separator className="mb-6" />

        {/* Featured locations */}
        {featuredLocs.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Văn phòng / Showroom nổi bật</h2>
            </div>
            <div className="space-y-2">
              {featuredLocs.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-medium text-sm">{loc.name}</p>
                          <BadgeVerified label="✓" />
                          {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                          {loc.primary_brand && (
                            <Badge variant="secondary" className="text-xs">{loc.primary_brand}</Badge>
                          )}
                          {loc.is_authorized && (
                            <Badge variant="outline" className="text-xs hidden sm:inline-flex">Chính thức</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          {loc.ward_label}
                          {loc.legacy_district && (
                            <span className="opacity-60">({loc.legacy_district})</span>
                          )}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <RatingStars rating={loc.rating} count={loc.review_count} size="sm" showCount={false} />
                        <p className="text-xs text-muted-foreground">{loc.rating} · {loc.review_count}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {featuredLocs.length > 0 && featuredAgents.length > 0 && <Separator className="mb-5" />}

        {/* Featured agents */}
        {featuredAgents.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Đại lý cá nhân nổi bật</h2>
            </div>
            <div className="space-y-2">
              {featuredAgents.map((agent) => (
                <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm shrink-0">
                        {agent.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-medium text-sm">{agent.name}</p>
                          <BadgeVerified label="✓" />
                          {agent.brand_tier && <BadgeBrandTier tier={agent.brand_tier} />}
                          {agent.agent_type === "freelance" && (
                            <Badge variant="secondary" className="text-xs">Độc lập</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{agent.title}</p>
                        {agent.ward_label ? (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-2.5 w-2.5" />
                            {agent.ward_label}
                            {agent.legacy_district && (
                              <span className="opacity-60">({agent.legacy_district})</span>
                            )}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-0.5">Phủ sóng toàn quốc</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">{agent.years_experience} năm KN</p>
                          <RatingStars rating={agent.rating} count={agent.review_count} size="sm" showCount={false} />
                        </div>
                        <a
                          href={`tel:${agent.phone}`}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md border hover:bg-muted transition-colors"
                        >
                          <Phone className="h-3 w-3" />Gọi
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/agent"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Xem tất cả đại lý {serviceLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
