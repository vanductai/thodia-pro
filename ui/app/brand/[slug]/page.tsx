import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeBrandTier } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, ExternalLink, Users, Building2, Globe } from "lucide-react";
import { BrandProvinceCTA } from "@/components/brand/brand-province-cta";
import { getProvinceLabel } from "@/lib/mock-data";

const BRAND = {
  name: "VinFast",
  slug: "vinfast",
  tagline: "Xe điện Việt Nam — Tiên phong & Đổi mới",
  logo: "/brands/vinfast-logo.png",
  website: "https://vinfastauto.com",
  description: "VinFast là thương hiệu xe ô tô điện của Việt Nam, thuộc Tập đoàn Vingroup. Thành lập năm 2017, VinFast đã xuất khẩu xe đến Mỹ, Canada, châu Âu và đang mở rộng toàn cầu. Tại Việt Nam, mạng lưới đại lý VinFast phủ khắp 63 tỉnh thành.",
  stats: { dealers_total: 187, provinces: 34, agents_freelance: 412 },
  categories: ["xe-co"],
  provinces: [
    { name: "TP. Hồ Chí Minh", slug: "tp-ho-chi-minh", dealer_count: 48 },
    { name: "Hà Nội", slug: "ha-noi", dealer_count: 35 },
    { name: "Đà Nẵng", slug: "da-nang", dealer_count: 12 },
    { name: "Bình Dương", slug: "binh-duong", dealer_count: 9 },
    { name: "Đồng Nai", slug: "dong-nai", dealer_count: 8 },
  ],
  featured_dealers: [
    { name: "VinFast Nguyễn Văn Linh", slug: "showroom-vinfast-nguyen-van-linh", tinh: "tp-ho-chi-minh", phuong: "phuong-tan-thuan-tay", rating: 4.7, reviews: 134, badge: "gold" as const },
    { name: "VinFast Điện Biên Phủ", slug: "vinfast-dien-bien-phu", tinh: "tp-ho-chi-minh", phuong: "phuong-25", rating: 4.6, reviews: 89, badge: "silver" as const },
    { name: "VinFast Lê Văn Lương", slug: "vinfast-le-van-luong", tinh: "ha-noi", phuong: "phuong-nhan-chinh", rating: 4.8, reviews: 156, badge: "gold" as const },
  ],
};

function buildBrandSchema(brand: typeof BRAND) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://pro.thodia.so/brand/${brand.slug}#organization`,
        name: brand.name,
        description: brand.description,
        url: brand.website,
        logo: { "@type": "ImageObject", url: `https://pro.thodia.so${brand.logo}` },
        sameAs: [brand.website],
      },
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/brand/${brand.slug}#page`,
        name: `Đại lý ${brand.name} tại Việt Nam`,
        description: `Danh sách ${brand.stats.dealers_total} đại lý ${brand.name} chính hãng trên toàn Việt Nam`,
        url: `https://pro.thodia.so/brand/${brand.slug}`,
        about: { "@id": `https://pro.thodia.so/brand/${brand.slug}#organization` },
        numberOfItems: brand.stats.dealers_total,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: "Thương hiệu", item: "https://pro.thodia.so/brand" },
          { "@type": "ListItem", position: 3, name: brand.name, item: `https://pro.thodia.so/brand/${brand.slug}` },
        ],
      },
    ],
  };
}

export const metadata: Metadata = {
  title: "Đại lý VinFast Chính hãng tại Việt Nam — 187 điểm bán",
  description: "Tìm đại lý VinFast chính hãng gần bạn. 187 showroom tại 34 tỉnh thành. Đảm bảo giá niêm yết, dịch vụ chuẩn hãng. Lái thử miễn phí.",
  alternates: { canonical: "https://pro.thodia.so/brand/vinfast" },
};

export default function BrandPage() {
  const brand = BRAND;
  const schema = buildBrandSchema(brand);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/brand">Thương hiệu</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{brand.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-xl bg-background border flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-black text-primary">VF</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{brand.name}</h1>
              <p className="text-muted-foreground mb-4">{brand.tagline}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-primary" />
                  <strong>{brand.stats.dealers_total}</strong> đại lý chính thức</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />
                  <strong>{brand.stats.provinces}</strong> tỉnh/thành phố</div>
                <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />
                  <strong>{brand.stats.agents_freelance}</strong> đại lý độc lập</div>
              </div>
              <BrandProvinceCTA brandSlug={brand.slug} provinces={brand.provinces} />
              <div className="mt-2">
                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4" />Website chính thức <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8 space-y-10">
        {/* About */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Về {brand.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{brand.description}</p>
        </section>

        <Separator />

        {/* Province coverage */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tìm đại lý theo tỉnh/thành phố</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {brand.provinces.map((p) => (
              <Link key={p.slug} href={`/brand/${brand.slug}/dai-ly/${p.slug}`}>
                <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.dealer_count} đại lý</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* Featured dealers */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Đại lý {brand.name} nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brand.featured_dealers.map((d) => (
              <Link key={d.slug} href={`/locations/${d.tinh}/${d.phuong}/${d.slug}`}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm leading-snug">{d.name}</CardTitle>
                      <BadgeBrandTier tier={d.badge} />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <RatingStars rating={d.rating} count={d.reviews} size="sm" />
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />{getProvinceLabel(d.tinh)}
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
