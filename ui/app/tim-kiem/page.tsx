import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search, MapPin, Building2, Users, SlidersHorizontal } from "lucide-react";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import { AGENTS, LOCATIONS, PROVINCES } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Tìm kiếm đại lý — Pro.Thodia.so",
  description: "Tìm kiếm đại lý BĐS, xe cộ, bảo hiểm theo tên, khu vực, thương hiệu.",
  robots: { index: false, follow: true }, // noindex per spec
};

const CAT_LABELS: Record<string, string> = {
  bds: "BĐS",
  "xe-co": "Xe cộ",
  "bao-hiem": "Bảo hiểm",
};

export default function SearchPage() {
  // Static demo: show all results (dynamic filtering sẽ dùng client-side hoặc server params)
  const allAgents = AGENTS;
  const allLocations = LOCATIONS;

  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Tìm kiếm</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Tìm kiếm đại lý</h1>
          <p className="text-sm text-muted-foreground">
            Tìm đại lý BĐS, xe cộ, bảo hiểm theo tên, khu vực hoặc thương hiệu.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6" role="search">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input"
              placeholder="Tên đại lý, địa chỉ, thương hiệu..."
              className="pl-10 h-10"
              aria-label="Từ khóa tìm kiếm"
            />
          </div>
          <Select>
            <SelectTrigger className="sm:w-40 h-10" aria-label="Danh mục">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="bds">Bất động sản</SelectItem>
              <SelectItem value="xe-co">Xe cộ</SelectItem>
              <SelectItem value="bao-hiem">Bảo hiểm</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="sm:w-44 h-10" aria-label="Tỉnh thành">
              <SelectValue placeholder="Tỉnh / TP" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {Object.entries(PROVINCES).map(([slug, label]) => (
                <SelectItem key={slug} value={slug}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button id="search-btn" className="h-10 px-6 shrink-0">
            <Search className="h-4 w-4 mr-2" />Tìm
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Bộ lọc nâng cao">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-1.5 mb-8 text-xs">
          <span className="text-muted-foreground py-1">Gợi ý:</span>
          {[
            { label: "BĐS TP.HCM", href: "/bds/tp-ho-chi-minh" },
            { label: "Xe cộ Hà Nội", href: "/xe-co/ha-noi" },
            { label: "VinFast", href: "/brand/vinfast" },
            { label: "Bảo hiểm Đà Nẵng", href: "/bao-hiem/da-nang" },
          ].map((s) => (
            <Link key={s.href} href={s.href}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                {s.label}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Results: Agents */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Đại lý cá nhân ({allAgents.length})</h2>
          </div>
          <div className="space-y-2">
            {allAgents.map((agent) => (
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
                        <Badge variant="outline" className="text-xs">{CAT_LABELS[agent.category]}</Badge>
                        {agent.agent_type === "freelance" && (
                          <Badge variant="secondary" className="text-xs">Độc lập</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{agent.title}</p>
                      {agent.province && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          {agent.ward_label
                            ? `${agent.ward_label}${agent.legacy_district ? ` (${agent.legacy_district})` : ""}`
                            : PROVINCES[agent.province as keyof typeof PROVINCES] ?? agent.province}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <RatingStars rating={agent.rating} count={agent.review_count} size="sm" showCount={false} />
                      <p className="text-xs text-muted-foreground">{agent.rating} · {agent.review_count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Results: Locations */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Văn phòng / Showroom ({allLocations.length})</h2>
          </div>
          <div className="space-y-2">
            {allLocations.map((loc) => (
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
                        <Badge variant="outline" className="text-xs">{CAT_LABELS[loc.category]}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-2.5 w-2.5 shrink-0" />
                        {loc.ward_label}
                        {loc.legacy_district && <span className="opacity-60">({loc.legacy_district})</span>}
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
      </div>
    </>
  );
}
