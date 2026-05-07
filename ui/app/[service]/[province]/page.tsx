import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import { FilterBar } from "@/components/shared/filter-bar";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Users, Building2 } from "lucide-react";
import {
  AGENTS, LOCATIONS, GEO_CLUSTERS, SERVICES, PROVINCES,
  getAgentsByService, getLocationsByProvince,
  getServiceLabel, getProvinceLabel, PROVINCE_GEO,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ service: string; province: string }>;
}

export function generateStaticParams() {
  const serviceKeys = Object.keys(SERVICES);
  const provinceKeys = Object.keys(PROVINCES);
  return serviceKeys.flatMap((s) => provinceKeys.map((p) => ({ service: s, province: p })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, province } = await params;
  const serviceLabel = getServiceLabel(service);
  const provinceLabel = getProvinceLabel(province);
  const geo = PROVINCE_GEO[province];
  const serviceAgents = getAgentsByService(service).filter((a) => a.province === province);
  const provinceLocs = getLocationsByProvince(province).filter((l) => l.category === service);
  const total = serviceAgents.length + provinceLocs.length;
  return {
    title: `Đại lý ${serviceLabel} uy tín tại ${provinceLabel}`,
    description: `Tìm ${total > 0 ? total : "hàng trăm"} đại lý ${serviceLabel} đã xác minh tại ${provinceLabel}. Thông tin chuẩn xác, liên hệ trực tiếp.`,
    alternates: {
      canonical: `https://pro.thodia.so/${service}/${province}`,
    },
    ...(geo && {
      other: {
        "geo.region": geo.iso,
        "geo.placename": provinceLabel,
        "geo.position": `${geo.lat};${geo.lng}`,
        "ICBM": `${geo.lat}, ${geo.lng}`,
      },
    }),
  };
}

function buildSchema(
  service: string, province: string,
  serviceLabel: string, provinceLabel: string,
  agents: typeof AGENTS, locs: typeof LOCATIONS,
) {
  const geo = PROVINCE_GEO[province];
  const total = agents.length + locs.length;
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
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${service}/${province}#page`,
        name: `Đại lý ${serviceLabel} uy tín tại ${provinceLabel}`,
        url: `https://pro.thodia.so/${service}/${province}`,
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
          "@id": `https://pro.thodia.so/${service}/${province}#list`,
          numberOfItems: total,
          itemListElement: allItems,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: serviceLabel, item: `https://pro.thodia.so/${service}` },
          { "@type": "ListItem", position: 3, name: provinceLabel, item: `https://pro.thodia.so/${service}/${province}` },
        ],
      },
    ],
  };
}

export default async function ServiceProvincePage({ params }: PageProps) {
  const { service, province } = await params;
  const serviceLabel = getServiceLabel(service);
  const provinceLabel = getProvinceLabel(province);

  // Lấy data thực từ mock module
  const serviceAgents = getAgentsByService(service).filter((a) => a.province === province);
  const allServiceAgents = serviceAgents.length ? serviceAgents : getAgentsByService(service);

  const provinceLocs = getLocationsByProvince(province).filter((l) => l.category === service);
  const allLocs = provinceLocs.length ? provinceLocs : LOCATIONS.filter((l) => l.category === service);

  const schema = buildSchema(service, province, serviceLabel, provinceLabel, allServiceAgents, allLocs);

  // Geo clusters cho province này
  const clusters = GEO_CLUSTERS.filter((c) => c.province === province);
  const subAreas = [
    ...clusters.map((c) => ({ name: c.label, slug: c.slug, count: c.wards.reduce((s, w) => s + w.count, 0), type: "geo-cluster" })),
    ...clusters.flatMap((c) => c.wards.map((w) => ({ name: w.label, slug: w.slug, count: w.count, type: "ward" }))),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href={`/${service}`}>{serviceLabel}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{provinceLabel}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold mb-1">
            Đại lý {serviceLabel} tại {provinceLabel}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <strong className="text-foreground">{allServiceAgents.length}</strong> đại lý cá nhân
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <strong className="text-foreground">{allLocs.length}</strong> địa điểm
            </span>
          </div>
        </div>

        {/* Sub-area navigation */}
        {subAreas.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tìm theo khu vực</p>
            <div className="flex flex-wrap gap-1.5">
              {subAreas.map((a) => (
                <Link key={a.slug} href={`/${service}/${province}/${a.slug}`}>
                  <Badge
                    variant={a.type === "geo-cluster" ? "outline" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {a.name} <span className="ml-1 opacity-50">({a.count})</span>
                  </Badge>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              📍 Khu vực = tên địa danh cũ quen thuộc · Phường = tên hành chính mới 2025
            </p>
          </div>
        )}

        <Separator className="mb-5" />

        {/* Intro paragraph — local context for SEO */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Danh sách <strong className="text-foreground">{allServiceAgents.length + allLocs.length}</strong> đại lý {serviceLabel.toLowerCase()} uy tín tại{" "}
          <strong className="text-foreground">{provinceLabel}</strong>, đã xác minh và cập nhật theo địa danh hành chính 2025.
          Thông tin đầy đủ gồm địa chỉ phường mới, điện thoại, đánh giá, giờ làm việc và chứng chỉ hành nghề.
        </p>

        {/* Filters — isolated "use client" island, không ảnh hưởng Server Component tree */}
        <div className="mb-5">
          <FilterBar />
        </div>

        {/* ── Locations / Showrooms ─────────────────────────────────────── */}
        {allLocs.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-bold tracking-tight">Văn phòng / Showroom</h2>
            </div>
            <div className="space-y-2">
              {allLocs.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                  <Card className="hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="flex items-stretch gap-0">
                        {/* Square icon block */}
                        <div className="w-16 shrink-0 bg-primary/8 flex items-center justify-center rounded-l-xl border-r">
                          <Building2 className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                        </div>
                        {/* Main content */}
                        <div className="flex-1 min-w-0 px-3.5 py-3">
                          <p className="font-bold text-sm leading-tight mb-1 truncate">{loc.name}</p>
                          <div className="flex flex-wrap gap-1 mb-1.5">
                            {loc.verified && <span className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">✓ XÁC MINH</span>}
                            {loc.brand_tier === "gold" && <span className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-700 border border-yellow-200">GOLD</span>}
                            {loc.is_authorized && <span className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">CHÍNH THỨC</span>}
                          </div>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                            <MapPin className="h-2.5 w-2.5 shrink-0" />{loc.ward_label}
                            <span className="opacity-50">· {loc.legacy_district}</span>
                          </p>
                        </div>
                        {/* Stat column */}
                        <div className="shrink-0 flex flex-col items-center justify-center px-3.5 border-l min-w-[56px]">
                          <p className="text-base font-bold leading-none">{loc.rating.toFixed(1)}</p>
                          <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">{loc.review_count} đg</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {allLocs.length > 0 && allServiceAgents.length > 0 && (
          <Separator className="mb-5" />
        )}

        {/* ── Agents ───────────────────────────────────────────────────── */}
        {allServiceAgents.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-bold tracking-tight">Đại lý cá nhân</h2>
            </div>
            <div className="space-y-2">
              {allServiceAgents.map((agent) => (
                <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                  <Card className="hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        {/* Square avatar block */}
                        <div className="w-16 shrink-0 bg-primary/8 flex items-center justify-center rounded-l-xl border-r">
                          <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                            {agent.name.charAt(0)}
                          </div>
                        </div>
                        {/* Main info */}
                        <div className="flex-1 min-w-0 px-3.5 py-3">
                          <p className="font-bold text-sm leading-tight mb-0.5">{agent.name}</p>
                          <p className="text-[11px] text-muted-foreground mb-1.5 truncate">{agent.title}</p>
                          <div className="flex flex-wrap gap-1">
                            {agent.verified && <span className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700">✓ XÁC MINH</span>}
                            {agent.brand_tier === "gold" && <span className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700">GOLD</span>}
                            {agent.agent_type === "freelance" && <span className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">ĐỘC LẬP</span>}
                          </div>
                        </div>
                        {/* Stat + call */}
                        <div className="shrink-0 flex flex-col items-center justify-center px-3.5 border-l gap-1.5 min-w-[60px]">
                          <div className="text-center">
                            <p className="text-base font-bold leading-none">{agent.rating.toFixed(1)}</p>
                            <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{agent.years_experience}yr</p>
                          </div>
                          <a
                            href={`tel:${agent.phone}`}
                            className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
                          >
                            <Phone className="h-2.5 w-2.5" />Gọi
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-1.5" aria-label="Phân trang">
          <button disabled className="h-7 px-2.5 text-xs inline-flex items-center rounded-md border border-border bg-background opacity-50 cursor-not-allowed">← Trước</button>
          <button aria-current="page" className="h-7 px-2.5 text-xs inline-flex items-center rounded-md bg-primary text-primary-foreground font-medium">1</button>
          <button className="h-7 px-2.5 text-xs inline-flex items-center rounded-md border border-border bg-background hover:bg-muted transition-colors">2</button>
          <button className="h-7 px-2.5 text-xs inline-flex items-center rounded-md border border-border bg-background hover:bg-muted transition-colors">Sau →</button>
        </div>
      </div>
    </>
  );
}
