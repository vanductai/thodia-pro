import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Search, SlidersHorizontal, Users, Building2 } from "lucide-react";

// Mock data — Category + Province Listing
const LISTING = {
  service: "bds",
  service_label: "Bất động sản",
  province: "tp-ho-chi-minh",
  province_label: "TP. Hồ Chí Minh",
  total: 127,
  intro: "TP. Hồ Chí Minh là thị trường bất động sản sôi động nhất Việt Nam, với hàng nghìn giao dịch mỗi tháng. Khu vực tập trung đông đúc đại lý BĐS bao gồm các phường thuộc Quận 7 cũ (nay là các phường Tân Thuận Tây, Tân Thuận Đông, Phú Thuận), Quận 2 cũ (Thủ Thiêm, An Phú), và trung tâm các phường Bến Nghé, Bến Thành.",
  sub_areas: [
    { name: "Khu vực Quận 7 cũ", slug: "khu-vuc-quan-7", count: 34, type: "geo-cluster" },
    { name: "P. Tân Thuận Tây", slug: "phuong-tan-thuan-tay", count: 18, type: "ward" },
    { name: "P. Tân Thuận Đông", slug: "phuong-tan-thuan-dong", count: 12, type: "ward" },
    { name: "Khu vực Quận 2 cũ", slug: "khu-vuc-quan-2", count: 28, type: "geo-cluster" },
    { name: "P. Thủ Thiêm", slug: "phuong-thu-thiem", count: 15, type: "ward" },
  ],
  agents: [
    { type: "agent", name: "Nguyễn Văn Minh", title: "Môi giới BĐS", slug: "nguyen-van-minh-bds-phuong-tan-thuan-tay", ward: "P. Tân Thuận Tây", rating: 4.8, reviews: 47, verified: true, years: 8 },
    { type: "agent", name: "Lê Thị Thu Hà", title: "Môi giới BĐS Chuyên nghiệp", slug: "le-thi-thu-ha", ward: "P. Thủ Thiêm", rating: 4.9, reviews: 82, verified: true, years: 12 },
    { type: "agent", name: "Trần Quốc Bảo", title: "Môi giới BĐS", slug: "tran-quoc-bao-bds", ward: "P. Bến Nghé", rating: 4.7, reviews: 31, verified: true, years: 5 },
    { type: "location", name: "Văn phòng BĐS Tân Thuận", title: "Sàn BĐS", slug: "van-phong-bds-tan-thuan", ward: "P. Tân Thuận Tây", rating: 4.6, reviews: 58, verified: true, years: 6 },
  ],
};

function buildListingSchema(data: typeof LISTING) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/${data.service}/${data.province}#page`,
        name: `Đại lý ${data.service_label} uy tín tại ${data.province_label}`,
        description: data.intro,
        url: `https://pro.thodia.so/${data.service}/${data.province}`,
        numberOfItems: data.total,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: data.service_label, item: `https://pro.thodia.so/${data.service}` },
          { "@type": "ListItem", position: 3, name: data.province_label, item: `https://pro.thodia.so/${data.service}/${data.province}` },
        ],
      },
    ],
  };
}

export const metadata: Metadata = {
  title: "127 Đại lý Bất động sản uy tín tại TP. Hồ Chí Minh",
  description: "Tìm đại lý BĐS uy tín tại TP.HCM. 127 môi giới đã xác minh, đánh giá thực, liên hệ trực tiếp. Chuyên căn hộ, đất nền, nhà phố.",
  alternates: { canonical: "https://pro.thodia.so/bds/tp-ho-chi-minh" },
};

export default function CategoryProvincePage() {
  const data = LISTING;
  const schema = buildListingSchema(data);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/bds">{data.service_label}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{data.province_label}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Đại lý {data.service_label} uy tín tại {data.province_label}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /><strong className="text-foreground">{data.total}</strong> đại lý</span>
            <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /><strong className="text-foreground">{data.sub_areas.length}</strong> khu vực</span>
          </div>
        </div>

        {/* Intro */}
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{data.intro}</p>

        {/* Sub-area navigation */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Tìm theo khu vực</h2>
          <div className="flex flex-wrap gap-2">
            {data.sub_areas.map((a) => (
              <Link key={a.slug} href={`/${data.service}/${data.province}/${a.slug}`}>
                <Badge
                  variant={a.type === "geo-cluster" ? "outline" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1.5 px-3"
                >
                  {a.type === "geo-cluster" && "📍 "}
                  {a.name}
                  <span className="ml-1 opacity-60">({a.count})</span>
                </Badge>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">📍 Khu vực (tên địa danh cũ quen thuộc) · Tên phường theo hành chính mới 2025</p>
        </div>

        <Separator className="mb-6" />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6" role="search" aria-label="Bộ lọc danh sách">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm theo tên, địa chỉ..." className="pl-9" id="listing-search" aria-label="Tìm kiếm đại lý" />
          </div>
          <div>
            <Select>
              <SelectTrigger className="sm:w-44" aria-label="Lọc theo đánh giá">
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
              <SelectTrigger className="sm:w-44" aria-label="Lọc theo loại đại lý">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="agent">Đại lý cá nhân</SelectItem>
                <SelectItem value="location">Văn phòng / Sàn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon" aria-label="Bộ lọc nâng cao"><SlidersHorizontal className="h-4 w-4" /></Button>
        </div>

        {/* Listing grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {data.agents.map((item) => (
            <Link key={item.slug} href={item.type === "agent" ? `/agent/${item.slug}` : `/tp-ho-chi-minh/phuong-x/${item.slug}`}>
              <Card className="hover:shadow-md transition-shadow h-full cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {item.verified && <BadgeVerified label="✓" />}
                        <Badge variant="outline" className="text-xs">{item.type === "agent" ? "Cá nhân" : "Văn phòng"}</Badge>
                      </div>
                      <p className="font-semibold text-sm leading-tight truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                    </div>
                  </div>
                  <RatingStars rating={item.rating} count={item.reviews} size="sm" />
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 flex-shrink-0" />{item.ward}
                    <span className="mx-1">·</span>{item.years} năm KN
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="inline-flex flex-1 items-center justify-center h-8 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors px-2 cursor-pointer">
                      <Phone className="h-3 w-3 mr-1" />Gọi ngay
                    </span>
                    <Button size="sm" className="flex-1 h-8 text-xs">Xem hồ sơ</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2" aria-label="Phân trang">
          <Button variant="outline" size="sm" disabled aria-label="Trang trước">← Trước</Button>
          <Button variant="default" size="sm" aria-current="page" aria-label="Trang 1">1</Button>
          <Button variant="outline" size="sm" aria-label="Trang 2">2</Button>
          <Button variant="outline" size="sm" aria-label="Trang 3">3</Button>
          <Button variant="outline" size="sm" aria-label="Trang sau">Sau →</Button>
        </div>
      </div>
    </>
  );
}
