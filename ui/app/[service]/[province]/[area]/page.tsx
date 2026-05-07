import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Info, ArrowRight, Users, Building2 } from "lucide-react";
import {
  AGENTS, LOCATIONS, GEO_CLUSTERS, SERVICES, PROVINCES,
  getServiceLabel, getProvinceLabel, PROVINCE_GEO,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ service: string; province: string; area: string }>;
}

export function generateStaticParams() {
  const serviceKeys = Object.keys(SERVICES);
  const provinceKeys = Object.keys(PROVINCES);
  const params: { service: string; province: string; area: string }[] = [];
  for (const s of serviceKeys) {
    for (const p of provinceKeys) {
      // Add geo-cluster slugs
      const clusters = GEO_CLUSTERS.filter((c) => c.province === p);
      for (const c of clusters) {
        params.push({ service: s, province: p, area: c.slug });
        // Add individual ward slugs
        for (const w of c.wards) {
          params.push({ service: s, province: p, area: w.slug });
        }
      }
    }
  }
  return params;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isGeoCluster(area: string) {
  return area.startsWith("khu-vuc-");
}

function getGeoCluster(province: string, area: string) {
  return GEO_CLUSTERS.find((c) => c.province === province && c.slug === area) ?? null;
}

function getWardLabel(area: string): string {
  // phuong-tan-thuan-tay → "P. Tân Thuận Tây" (simple title-case fallback)
  return area
    .replace(/^phuong-/, "P. ")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, province, area } = await params;
  const serviceLabel = getServiceLabel(service);
  const provinceLabel = getProvinceLabel(province);

  if (isGeoCluster(area)) {
    const cluster = getGeoCluster(province, area);
    const clusterLabel = cluster?.label ?? area;
    const legacy = cluster?.legacy_name ?? area;
    const total = cluster?.wards.reduce((s, w) => s + w.count, 0) ?? 0;
    return {
      title: `Đại lý ${serviceLabel} ${clusterLabel} (${legacy} cũ) — ${total} đại lý xác minh`,
      description: `Danh sách ${total} đại lý ${serviceLabel} tại khu vực ${clusterLabel} (${legacy}), ${provinceLabel}. Nay gồm các phường theo địa chỉ hành chính mới 2025.`,
      alternates: { canonical: `https://pro.thodia.so/${service}/${province}/${area}` },
    };
  }

  // Ward page
  const wardLabel = getWardLabel(area);
  const agents = AGENTS.filter((a) => a.category === service && a.province === province && a.ward === area);
  const locs = LOCATIONS.filter((l) => l.category === service && l.province === province && l.phuong === area);
  const total = agents.length + locs.length;
  return {
    title: `Đại lý ${serviceLabel} tại ${wardLabel}, ${provinceLabel} — ${total} đại lý`,
    description: `Tìm đại lý ${serviceLabel} tại ${wardLabel} (${provinceLabel}). ${total} đại lý đã xác minh, liên hệ trực tiếp.`,
    alternates: { canonical: `https://pro.thodia.so/${service}/${province}/${area}` },
  };
}

// ─── Schema builders ──────────────────────────────────────────────────────────

function buildItemList(
  service: string, province: string, area: string,
  agents: typeof AGENTS, locs: typeof LOCATIONS,
) {
  const items = [
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
    "@type": "ItemList",
    "@id": `https://pro.thodia.so/${service}/${province}/${area}#list`,
    numberOfItems: agents.length + locs.length,
    itemListElement: items,
  };
}

function buildGeoClusterSchema(
  service: string, province: string, area: string,
  serviceLabel: string, provinceLabel: string,
  clusterLabel: string, legacy: string, total: number,
  agents: typeof AGENTS, locs: typeof LOCATIONS,
) {
  const geo = PROVINCE_GEO[province];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${service}/${province}/${area}#page`,
        name: `Đại lý ${serviceLabel} tại ${clusterLabel} (${legacy} cũ)`,
        description: `Danh sách ${total} đại lý ${serviceLabel} tại ${clusterLabel}, ${provinceLabel}`,
        url: `https://pro.thodia.so/${service}/${province}/${area}`,
        numberOfItems: total,
        ...(geo && {
          spatialCoverage: {
            "@type": "AdministrativeArea",
            name: `${clusterLabel}, ${provinceLabel}`,
            geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
          },
        }),
        mainEntity: buildItemList(service, province, area, agents, locs),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: serviceLabel, item: `https://pro.thodia.so/${service}` },
          { "@type": "ListItem", position: 3, name: provinceLabel, item: `https://pro.thodia.so/${service}/${province}` },
          { "@type": "ListItem", position: 4, name: clusterLabel, item: `https://pro.thodia.so/${service}/${province}/${area}` },
        ],
      },
    ],
  };
}

function buildWardSchema(
  service: string, province: string, area: string,
  serviceLabel: string, provinceLabel: string,
  wardLabel: string, total: number,
  agents: typeof AGENTS, locs: typeof LOCATIONS,
) {
  const geo = PROVINCE_GEO[province];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${service}/${province}/${area}#page`,
        name: `Đại lý ${serviceLabel} tại ${wardLabel}, ${provinceLabel}`,
        url: `https://pro.thodia.so/${service}/${province}/${area}`,
        numberOfItems: total,
        ...(geo && {
          spatialCoverage: {
            "@type": "AdministrativeArea",
            name: `${wardLabel}, ${provinceLabel}`,
            geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
          },
        }),
        mainEntity: buildItemList(service, province, area, agents, locs),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: serviceLabel, item: `https://pro.thodia.so/${service}` },
          { "@type": "ListItem", position: 3, name: provinceLabel, item: `https://pro.thodia.so/${service}/${province}` },
          { "@type": "ListItem", position: 4, name: wardLabel, item: `https://pro.thodia.so/${service}/${province}/${area}` },
        ],
      },
    ],
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceAreaPage({ params }: PageProps) {
  const { service, province, area } = await params;
  const serviceLabel = getServiceLabel(service);
  const provinceLabel = getProvinceLabel(province);

  // ── Geo Cluster ──────────────────────────────────────────────────────────────
  if (isGeoCluster(area)) {
    const cluster = getGeoCluster(province, area);
    // 404 nếu không có cluster data (URL sai)
    if (!cluster) notFound();

    const clusterLabel = cluster.label;
    const legacy = cluster.legacy_name;
    const total = cluster.wards.reduce((s, w) => s + w.count, 0);

    // Agents trong cluster (khớp theo ward nằm trong cluster)
    const clusterWardSlugs = cluster.wards.map((w) => w.slug);
    const clusterAgents = AGENTS.filter(
      (a) => a.category === service && a.province === province && a.ward && clusterWardSlugs.includes(a.ward),
    );
    const clusterLocs = LOCATIONS.filter(
      (l) => l.category === service && l.province === province && clusterWardSlugs.includes(l.phuong),
    );

    const schema = buildGeoClusterSchema(service, province, area, serviceLabel, provinceLabel, clusterLabel, legacy, total, clusterAgents, clusterLocs);

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
              <BreadcrumbItem><BreadcrumbLink href={`/${service}/${province}`}>{provinceLabel}</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{clusterLabel}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-xl font-semibold mb-1">
            Đại lý {serviceLabel} tại {clusterLabel}
            <span className="ml-2 text-base font-normal text-muted-foreground">({legacy} cũ)</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-5">{total} đại lý trong khu vực</p>

          {/* Admin change notice */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-700 dark:text-amber-300">Thay đổi hành chính 2025</p>
              <p className="text-amber-600 dark:text-amber-400 mt-0.5">
                <strong>{legacy}</strong> đã được tái cơ cấu thành các phường riêng lẻ theo địa chỉ hành chính mới.
                Nội dung &amp; đại lý vẫn chính xác — tên địa danh này được giữ để bạn tìm kiếm thuận tiện hơn.
              </p>
            </div>
          </div>

          {/* Ward links */}
          <section className="mb-8">
            <h2 className="text-base font-semibold mb-3">Xem theo phường (địa chỉ chính thức mới)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cluster.wards.map((w) => (
                <Link key={w.slug} href={`/${service}/${province}/${w.slug}`}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{w.label}</p>
                          <p className="text-xs text-muted-foreground">{w.count} đại lý</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary">
                        Xem <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator className="mb-6" />

          {/* Locations */}
          {clusterLocs.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <h2 className="text-sm font-semibold">Văn phòng / Showroom</h2>
              </div>
              <div className="space-y-2">
                {clusterLocs.map((loc) => (
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
                            {loc.primary_brand && <Badge variant="secondary" className="text-xs">{loc.primary_brand}</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            {loc.ward_label} <span className="opacity-60">({loc.legacy_district})</span>
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

          {/* Agents */}
          {clusterAgents.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-3.5 w-3.5 text-primary" />
                <h2 className="text-sm font-semibold">Đại lý cá nhân</h2>
              </div>
              <div className="space-y-2">
                {clusterAgents.map((agent) => (
                  <div key={agent.slug} className="relative">
                    <Link href={`/agent/${agent.slug}`} className="block">
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
                            </div>
                            <p className="text-xs text-muted-foreground">{agent.title}</p>
                            {agent.ward_label && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <MapPin className="h-2.5 w-2.5" />
                                {agent.ward_label} <span className="opacity-60">({agent.legacy_district})</span>
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="text-right hidden sm:block">
                              <p className="text-xs text-muted-foreground">{agent.years_experience} năm KN</p>
                              <RatingStars rating={agent.rating} count={agent.review_count} size="sm" showCount={false} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <a
                      href={`tel:${agent.phone}`}
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md border hover:bg-muted transition-colors bg-background"
                    >
                      <Phone className="h-3 w-3" />Gọi
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {clusterAgents.length === 0 && clusterLocs.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Chưa có đại lý nào trong khu vực này. Hãy thử xem từng phường bên trên.
            </p>
          )}
        </div>
      </>
    );
  }

  // ── Ward Page ────────────────────────────────────────────────────────────────
  const wardLabel = getWardLabel(area);
  const wardAgents = AGENTS.filter(
    (a) => a.category === service && a.province === province && a.ward === area,
  );
  const wardLocs = LOCATIONS.filter(
    (l) => l.category === service && l.province === province && l.phuong === area,
  );
  const total = wardAgents.length + wardLocs.length;

  // Tìm cluster chứa ward này (để hiển thị breadcrumb back-link)
  const parentCluster = GEO_CLUSTERS.find(
    (c) => c.province === province && c.wards.some((w) => w.slug === area),
  );

  const schema = buildWardSchema(service, province, area, serviceLabel, provinceLabel, wardLabel, total, wardAgents, wardLocs);

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
            <BreadcrumbItem><BreadcrumbLink href={`/${service}/${province}`}>{provinceLabel}</BreadcrumbLink></BreadcrumbItem>
            {parentCluster && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${service}/${province}/${parentCluster.slug}`}>
                    {parentCluster.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{wardLabel}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-xl font-semibold mb-1">
          Đại lý {serviceLabel} tại {wardLabel}
        </h1>
        <p className="text-sm text-muted-foreground mb-5">
          {total} đại lý · {provinceLabel}
          {parentCluster && <span className="ml-1 opacity-70">· thuộc {parentCluster.legacy_name} (cũ)</span>}
        </p>

        {/* Locations */}
        {wardLocs.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Văn phòng / Showroom</h2>
            </div>
            <div className="space-y-2">
              {wardLocs.map((loc) => (
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
                          {loc.primary_brand && <Badge variant="secondary" className="text-xs">{loc.primary_brand}</Badge>}
                          {loc.is_authorized && (
                            <Badge variant="outline" className="text-xs hidden sm:inline-flex">Chính thức</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          {loc.ward_label} <span className="opacity-60">({loc.legacy_district})</span>
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

        {wardLocs.length > 0 && wardAgents.length > 0 && <Separator className="mb-5" />}

        {/* Agents */}
        {wardAgents.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Đại lý cá nhân</h2>
            </div>
            <div className="space-y-2">
              {wardAgents.map((agent) => (
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
                        </div>
                        <p className="text-xs text-muted-foreground">{agent.title}</p>
                        {agent.ward_label && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-2.5 w-2.5" />
                            {agent.ward_label} <span className="opacity-60">({agent.legacy_district})</span>
                          </p>
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

        {total === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground mb-4">Chưa có đại lý nào tại {wardLabel}.</p>
            <Link
              href={`/${service}/${province}`}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Xem tất cả đại lý tại {provinceLabel}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
