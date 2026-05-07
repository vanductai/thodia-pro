import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Geo Cluster Page — "Khu vực Quận 7 cũ"
const GEO_CLUSTER = {
  service: "bds",
  service_label: "Bất động sản",
  province: "tp-ho-chi-minh",
  province_label: "TP. Hồ Chí Minh",
  cluster_slug: "khu-vuc-quan-7",
  cluster_label: "Khu vực Quận 7",
  legacy_name: "Quận 7",
  total: 34,
  // Canonical wards in this cluster
  wards: [
    { name: "Phường Tân Thuận Tây", slug: "phuong-tan-thuan-tay", count: 18, canonical_url: "/bds/tp-ho-chi-minh/phuong-tan-thuan-tay" },
    { name: "Phường Tân Thuận Đông", slug: "phuong-tan-thuan-dong", count: 8, canonical_url: "/bds/tp-ho-chi-minh/phuong-tan-thuan-dong" },
    { name: "Phường Phú Thuận", slug: "phuong-phu-thuan", count: 5, canonical_url: "/bds/tp-ho-chi-minh/phuong-phu-thuan" },
    { name: "Phường Bình Thuận", slug: "phuong-binh-thuan", count: 3, canonical_url: "/bds/tp-ho-chi-minh/phuong-binh-thuan" },
  ],
  agents: [
    { name: "Nguyễn Văn Minh", slug: "nguyen-van-minh-bds-phuong-tan-thuan-tay", ward: "P. Tân Thuận Tây", rating: 4.8, reviews: 47, canonical_url: "/agent/nguyen-van-minh-bds-phuong-tan-thuan-tay" },
    { name: "Lê Hồng Phúc", slug: "le-hong-phuc-bds", ward: "P. Tân Thuận Đông", rating: 4.7, reviews: 23, canonical_url: "/agent/le-hong-phuc-bds" },
  ],
};

function buildGeoClusterSchema(data: typeof GEO_CLUSTER) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${data.service}/${data.province}/${data.cluster_slug}#page`,
        name: `Đại lý ${data.service_label} tại ${data.cluster_label} (${data.legacy_name} cũ)`,
        description: `Danh sách ${data.total} đại lý ${data.service_label} tại khu vực ${data.cluster_label} (${data.legacy_name}), ${data.province_label}`,
        url: `https://pro.thodia.so/${data.service}/${data.province}/${data.cluster_slug}`,
        numberOfItems: data.total,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: data.service_label, item: `https://pro.thodia.so/${data.service}` },
          { "@type": "ListItem", position: 3, name: data.province_label, item: `https://pro.thodia.so/${data.service}/${data.province}` },
          { "@type": "ListItem", position: 4, name: data.cluster_label, item: `https://pro.thodia.so/${data.service}/${data.province}/${data.cluster_slug}` },
        ],
      },
    ],
  };
}

export const metadata: Metadata = {
  title: "Đại lý BĐS Quận 7 TP.HCM (Khu vực cũ) — 34 đại lý xác minh",
  description: "Đại lý BĐS khu vực Quận 7 TP.HCM (tên địa danh cũ). Nay gồm các phường: Tân Thuận Tây, Tân Thuận Đông, Phú Thuận, Bình Thuận. 34 đại lý đã xác minh.",
  // Geo Cluster dùng canonical về chính nó (KHÔNG redirect)
  alternates: { canonical: "https://pro.thodia.so/bds/tp-ho-chi-minh/khu-vuc-quan-7" },
};

export default function GeoClusterPage() {
  const data = GEO_CLUSTER;
  const schema = buildGeoClusterSchema(data);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} suppressHydrationWarning />

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/bds/tp-ho-chi-minh">BĐS TP.HCM</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{data.cluster_label}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Đại lý {data.service_label} tại {data.cluster_label}
          <span className="ml-2 text-base font-normal text-muted-foreground">({data.legacy_name} cũ)</span>
        </h1>

        {/* Admin change notice */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
          <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-amber-700 dark:text-amber-300">Thay đổi hành chính 2025</p>
            <p className="text-amber-600 dark:text-amber-400 mt-0.5">
              <strong>{data.legacy_name}</strong> đã được tái cơ cấu thành các phường riêng lẻ theo địa chỉ hành chính mới.
              Nội dung & đại lý vẫn chính xác — tên địa danh này được giữ để bạn tìm kiếm thuận tiện hơn.
            </p>
          </div>
        </div>

        {/* Ward links */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Xem theo phường (địa chỉ chính thức mới)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.wards.map((w) => (
              <Link key={w.slug} href={w.canonical_url}>
                <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{w.name}</p>
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

        {/* Agent listing */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Đại lý {data.service_label} tại {data.cluster_label} ({data.total})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.agents.map((a) => (
              <Link key={a.slug} href={a.canonical_url}>
                <Card className="hover:shadow-md transition-shadow h-full cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <BadgeVerified />
                        <p className="font-semibold text-sm mt-1">{a.name}</p>
                      </div>
                    </div>
                    <RatingStars rating={a.rating} count={a.reviews} size="sm" />
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />{a.ward}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">Xem thêm {data.total - data.agents.length} đại lý</Button>
          </div>
        </section>
      </div>
    </>
  );
}
