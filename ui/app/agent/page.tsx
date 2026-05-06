import type { Metadata } from "next";
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
import { Phone, MapPin, TrendingUp, Building2 } from "lucide-react";
import { AGENTS, LOCATIONS, getProvinceLabel } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Tất cả Đại lý — Pro.Thodia.so",
  description: "Danh sách tất cả đại lý BĐS, xe cộ, bảo hiểm đã xác minh tại Việt Nam. Tìm nhanh theo khu vực, thương hiệu hoặc chuyên ngành.",
  alternates: { canonical: "https://pro.thodia.so/agent" },
};

const CAT_LABELS: Record<string, string> = {
  bds: "BĐS",
  "xe-co": "Xe cộ",
  "bao-hiem": "Bảo hiểm",
};

export default function AgentListingPage() {
  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Tất cả đại lý</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold">Tất cả đại lý</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{AGENTS.length} đại lý · {LOCATIONS.length} địa điểm kinh doanh</p>
          </div>
        </div>

        {/* ── Agents ──────────────────────────────────────────────────────── */}
        <section className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Đại lý cá nhân</h2>
          </div>
          <div className="space-y-2">
            {AGENTS.map((agent) => (
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
                      {agent.ward_label ? (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5" />
                          {agent.ward_label} ({agent.legacy_district}), {getProvinceLabel(agent.province ?? "")}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Phủ sóng: {agent.province ? getProvinceLabel(agent.province) : "Toàn quốc"}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <RatingStars rating={agent.rating} count={agent.review_count} size="sm" showCount={false} />
                      <p className="text-xs text-muted-foreground">{agent.rating} · {agent.review_count} đánh giá</p>
                      <a
                        href={`tel:${agent.phone}`}
                        className="inline-flex items-center gap-1 text-xs mt-1.5 px-2 py-0.5 rounded border hover:bg-muted transition-colors"
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

        <Separator className="mb-7" />

        {/* ── Locations ───────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Địa điểm kinh doanh</h2>
          </div>
          <div className="space-y-2">
            {LOCATIONS.map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-medium text-sm">{loc.name}</p>
                        {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                        {loc.primary_brand && <Badge variant="secondary" className="text-xs">{loc.primary_brand}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-2.5 w-2.5 shrink-0" />
                        {loc.ward_label} ({loc.legacy_district}), {getProvinceLabel(loc.province)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <RatingStars rating={loc.rating} count={loc.review_count} size="sm" showCount={false} />
                      <p className="text-xs text-muted-foreground">{loc.rating} · {loc.review_count} đánh giá</p>
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
