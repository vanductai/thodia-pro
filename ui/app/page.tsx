import type { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import {
  MapPin, Search, Building2, Car, Shield,
  ArrowRight, TrendingUp, Users, Star,
} from "lucide-react";
import {
  BRANDS, SITE_STATS, GEO_CLUSTERS,
  getFeaturedAgents, getFeaturedLocations,
} from "@/lib/mock-data";

const CATEGORIES = [
  { label: "Bất động sản", slug: "bds", icon: Building2, desc: "Môi giới mua bán & cho thuê BĐS", count: 892 },
  { label: "Xe cộ", slug: "xe-co", icon: Car, desc: "Đại lý xe hơi, xe điện chính hãng", count: 634 },
  { label: "Bảo hiểm", slug: "bao-hiem", icon: Shield, desc: "Tư vấn bảo hiểm nhân thọ & xe", count: 321 },
];

const TOP_PROVINCES = [
  { name: "TP. HCM", slug: "tp-ho-chi-minh", count: 634 },
  { name: "Hà Nội", slug: "ha-noi", count: 412 },
  { name: "Đà Nẵng", slug: "da-nang", count: 187 },
  { name: "Bình Dương", slug: "binh-duong", count: 134 },
  { name: "Đồng Nai", slug: "dong-nai", count: 98 },
  { name: "Cần Thơ", slug: "can-tho", count: 76 },
];

export const metadata: Metadata = {
  title: "Pro.Thodia.so - Danh bạ Đại lý BĐS, Xe cộ, Bảo hiểm Việt Nam",
  description: `Tìm đại lý BĐS, xe cộ, bảo hiểm uy tín tại Việt Nam. ${SITE_STATS.agents.toLocaleString()}+ đại lý đã xác minh tại ${SITE_STATS.provinces} tỉnh thành.`,
  alternates: { canonical: "https://pro.thodia.so" },
};

export default function HomePage() {
  const featuredAgents = getFeaturedAgents();
  const featuredLocations = getFeaturedLocations();

  return (
    <>
      {/* ── Hero — compact ──────────────────────────────────────────────── */}
      <section className="border-b bg-muted/20 px-4 py-6">
        <div className="max-w-2xl">
          <p className="text-xs text-muted-foreground mb-1">🇻🇳 Danh bạ đại lý kinh doanh Việt Nam</p>
          <h1 className="text-xl font-semibold mb-3">
            Tìm <span className="text-primary">đại lý uy tín</span> — BĐS · Xe cộ · Bảo hiểm
          </h1>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Tên đại lý, khu vực, thương hiệu..."
                className="pl-8 h-9 text-sm"
                id="homepage-search"
              />
            </div>
            <Button size="sm" className="h-9 px-4">Tìm</Button>
          </div>
          {/* Quick stats inline */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span><strong className="text-foreground">{SITE_STATS.agents.toLocaleString()}</strong> đại lý</span>
            <span><strong className="text-foreground">{SITE_STATS.locations}</strong> địa điểm</span>
            <span><strong className="text-foreground">{SITE_STATS.brands}</strong> thương hiệu</span>
            <span><strong className="text-foreground">{SITE_STATS.provinces}</strong> tỉnh/TP</span>
            <span><strong className="text-foreground">{SITE_STATS.verified_pct}%</strong> đã xác minh</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">

        {/* ── Danh mục ──────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Danh mục</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.slug} href={`/${cat.slug}`}>
                  <Card className="hover:border-primary/40 hover:bg-muted/30 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{cat.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{cat.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-medium text-primary">{cat.count.toLocaleString()}</p>
                        <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto mt-0.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* ── Đại lý nổi bật ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />Đại lý nổi bật
            </h2>
            <Link href="/agent" className="text-xs text-primary hover:underline">Xem tất cả →</Link>
          </div>
          <div className="space-y-2">
            {featuredAgents.map((a) => (
              <Link key={a.slug} href={`/agent/${a.slug}`}>
                <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm shrink-0">
                      {a.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-medium text-sm">{a.name}</p>
                        <BadgeVerified label="✓" />
                        {a.brand_tier && <BadgeBrandTier tier={a.brand_tier} />}
                        <Badge variant="outline" className="text-xs">
                          {a.category === "bds" ? "BĐS" : a.category === "xe-co" ? "Xe cộ" : "Bảo hiểm"}
                        </Badge>
                        {a.agent_type === "freelance" && (
                          <Badge variant="secondary" className="text-xs">Độc lập</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{a.title}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <RatingStars rating={a.rating} count={a.review_count} size="sm" showCount={false} />
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <Star className="h-2.5 w-2.5 inline mr-0.5 fill-amber-400 text-amber-400" />
                        {a.rating} · {a.review_count} đánh giá
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Địa điểm nổi bật ──────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Địa điểm kinh doanh</h2>
            <Link href="/location-demo" className="text-xs text-primary hover:underline">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {featuredLocations.map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                <Card className="hover:border-primary/40 transition-colors cursor-pointer h-full">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm leading-snug">{loc.name}</p>
                      {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                    </div>
                    <RatingStars rating={loc.rating} count={loc.review_count} size="sm" />
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{loc.ward_label} ({loc.legacy_district}), {loc.province === "tp-ho-chi-minh" ? "TP.HCM" : "Hà Nội"}</span>
                    </div>
                    {loc.primary_brand && (
                      <Badge variant="secondary" className="text-xs mt-1.5">{loc.primary_brand}</Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Thương hiệu ────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thương hiệu</h2>
            <Link href="/brand" className="text-xs text-primary hover:underline">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {BRANDS.map((b) => (
              <Link key={b.slug} href={`/brand/${b.slug}`}>
                <Card className="hover:border-primary/40 transition-colors cursor-pointer text-center">
                  <CardContent className="p-3">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center font-bold text-primary text-xs mx-auto mb-1.5">
                      {b.logo_initial}
                    </div>
                    <p className="font-medium text-xs truncate">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.stats.dealers} ĐL</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Tỉnh/Thành phố ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tìm theo tỉnh/thành phố
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {TOP_PROVINCES.map((p) => (
              <Link key={p.slug} href={`/bds/${p.slug}`}>
                <Card className="hover:border-primary/40 transition-colors cursor-pointer text-center">
                  <CardContent className="p-3">
                    <MapPin className="h-3.5 w-3.5 text-primary mx-auto mb-1" />
                    <p className="font-medium text-xs">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Khu vực (Geo clusters) ─────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Theo khu vực (tên địa danh quen thuộc)
          </h2>
          <div className="space-y-3">
            {GEO_CLUSTERS.map((cluster) => (
              <div key={cluster.slug}>
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={`/bds/tp-ho-chi-minh/${cluster.slug}`}
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {cluster.label}
                    <span className="text-xs text-muted-foreground font-normal ml-1">
                      (trước 2025: {cluster.legacy_name})
                    </span>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.wards.map((w) => (
                    <Link key={w.slug} href={`/bds/${cluster.province}/${w.slug}`}>
                      <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        {w.label} <span className="ml-1 opacity-60">({w.count})</span>
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            📌 Tên khu vực (Quận X) là địa danh cũ quen thuộc trước 01/2025. Địa chỉ hành chính mới đã chuyển thành tên Phường.
          </p>
        </section>

        {/* ── Trust signal ───────────────────────────────────────────────── */}
        <section className="bg-muted/30 rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <Users className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="font-semibold">{SITE_STATS.agents.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Đại lý đăng ký</p>
            </div>
            <div>
              <BadgeVerified label={`${SITE_STATS.verified_pct}%`} />
              <p className="font-semibold mt-1">{SITE_STATS.verified_pct}%</p>
              <p className="text-xs text-muted-foreground">Đã xác minh</p>
            </div>
            <div>
              <MapPin className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="font-semibold">{SITE_STATS.provinces}</p>
              <p className="text-xs text-muted-foreground">Tỉnh/Thành phố</p>
            </div>
            <div>
              <Star className="h-4 w-4 text-amber-400 mx-auto mb-1 fill-amber-400" />
              <p className="font-semibold">4.8 / 5</p>
              <p className="text-xs text-muted-foreground">Đánh giá trung bình</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
