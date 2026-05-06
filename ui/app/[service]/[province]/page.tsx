import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Search, SlidersHorizontal, Users, Building2 } from "lucide-react";
import {
  AGENTS, LOCATIONS, GEO_CLUSTERS,
  getAgentsByService, getLocationsByProvince,
  getServiceLabel, getProvinceLabel,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ service: string; province: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, province } = await params;
  const serviceLabel = getServiceLabel(service);
  const provinceLabel = getProvinceLabel(province);
  return {
    title: `Đại lý ${serviceLabel} uy tín tại ${provinceLabel}`,
    description: `Tìm đại lý ${serviceLabel} đã xác minh tại ${provinceLabel}. Thông tin chuẩn xác, liên hệ trực tiếp.`,
    alternates: { canonical: `https://pro.thodia.so/${service}/${province}` },
  };
}

function buildSchema(service: string, province: string, serviceLabel: string, provinceLabel: string, total: number) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${service}/${province}#page`,
        name: `Đại lý ${serviceLabel} uy tín tại ${provinceLabel}`,
        url: `https://pro.thodia.so/${service}/${province}`,
        numberOfItems: total,
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

  const totalItems = allServiceAgents.length + allLocs.length;
  const schema = buildSchema(service, province, serviceLabel, provinceLabel, totalItems);

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 mb-5" role="search" aria-label="Bộ lọc">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Tìm tên, địa chỉ..." className="pl-9 h-8 text-sm" id="listing-search" aria-label="Tìm kiếm" />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full sm:w-36 h-8 text-sm" aria-label="Lọc đánh giá">
                <SelectValue placeholder="Đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="4.5">4.5+ sao</SelectItem>
                <SelectItem value="4">4+ sao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full sm:w-36 h-8 text-sm" aria-label="Lọc loại">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="agent">Cá nhân</SelectItem>
                <SelectItem value="location">Văn phòng / Showroom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" aria-label="Bộ lọc nâng cao">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* ── Locations / Showrooms ─────────────────────────────────────── */}
        {allLocs.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Văn phòng / Showroom</h2>
            </div>
            <div className="space-y-2">
              {allLocs.map((loc) => (
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
                          <span className="opacity-60">({loc.legacy_district})</span>
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

        {allLocs.length > 0 && allServiceAgents.length > 0 && (
          <Separator className="mb-5" />
        )}

        {/* ── Agents ───────────────────────────────────────────────────── */}
        {allServiceAgents.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-3.5 w-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Đại lý cá nhân</h2>
            </div>
            <div className="space-y-2">
              {allServiceAgents.map((agent, idx) => (
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
                            {agent.ward_label} <span className="opacity-60">({agent.legacy_district})</span>
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

        {/* Pagination */}
        <div className="flex justify-center gap-1.5" aria-label="Phân trang">
          <Button variant="outline" size="sm" disabled className="h-7 px-2.5 text-xs">← Trước</Button>
          <Button variant="default" size="sm" aria-current="page" className="h-7 px-2.5 text-xs">1</Button>
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">2</Button>
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">Sau →</Button>
        </div>
      </div>
    </>
  );
}
