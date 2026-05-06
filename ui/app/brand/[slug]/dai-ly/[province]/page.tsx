import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Phone, Building2, Users } from "lucide-react";
import { BRANDS, AGENTS, LOCATIONS, getProvinceLabel } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string; province: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, province } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return { title: "Không tìm thấy" };
  const provinceLabel = getProvinceLabel(province);
  return {
    title: `Đại lý ${brand.name} chính hãng tại ${provinceLabel}`,
    description: `Danh sách đại lý ${brand.name} ủy quyền tại ${provinceLabel}. Thông tin đã xác minh, liên hệ trực tiếp.`,
    alternates: { canonical: `https://pro.thodia.so/brand/${slug}/dai-ly/${province}` },
  };
}

export default async function BrandDealerProvincePage({ params }: PageProps) {
  const { slug, province } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();
  const provinceLabel = getProvinceLabel(province);

  // Lọc agents và locations theo brand + province
  const brandAgents = AGENTS.filter(
    (a) => a.primary_brand === brand.name && a.province === province
  );
  const brandLocations = LOCATIONS.filter(
    (l) => l.primary_brand === brand.name && l.province === province
  );

  // Fallback: nếu không có data cho province này, hiển thị tất cả theo brand
  const allBrandAgents = brandAgents.length ? brandAgents : AGENTS.filter((a) => a.primary_brand === brand.name);
  const allBrandLocations = brandLocations.length ? brandLocations : LOCATIONS.filter((l) => l.primary_brand === brand.name);
  const isFiltered = brandAgents.length > 0 || brandLocations.length > 0;

  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href={`/brand/${slug}`}>{brand.name}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{provinceLabel}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-5">
          <h1 className="text-xl font-semibold">
            Đại lý {brand.name} tại {provinceLabel}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {allBrandLocations.length} showroom · {allBrandAgents.length} tư vấn viên
            {!isFiltered && " (hiển thị tất cả tỉnh thành)"}
          </p>
        </div>

        {/* Locations / Showrooms */}
        {allBrandLocations.length > 0 && (
          <section className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Showroom / Đại lý</h2>
            </div>
            <div className="space-y-2">
              {allBrandLocations.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-sm">{loc.name}</p>
                          {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          {loc.address}
                        </p>
                        <p className="text-xs text-muted-foreground opacity-70">
                          (Trước 2025: {loc.legacy_district})
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <RatingStars rating={loc.rating} count={loc.review_count} size="sm" showCount={false} />
                        <p className="text-xs text-muted-foreground">{loc.rating} ({loc.review_count})</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {allBrandLocations.length > 0 && allBrandAgents.length > 0 && <Separator className="mb-7" />}

        {/* Agents / Tư vấn viên */}
        {allBrandAgents.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Tư vấn viên {brand.name}</h2>
            </div>
            <div className="space-y-2">
              {allBrandAgents.map((agent) => (
                <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm shrink-0">
                        {agent.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-sm">{agent.name}</p>
                          <BadgeVerified label="✓" />
                          {agent.brand_tier && <BadgeBrandTier tier={agent.brand_tier} />}
                          {agent.agent_type === "freelance" && (
                            <Badge variant="secondary" className="text-xs">Độc lập</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{agent.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {agent.years_experience} năm KN · {agent.achievements[0]}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <RatingStars rating={agent.rating} count={agent.review_count} size="sm" showCount={false} />
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
        )}

        {allBrandAgents.length === 0 && allBrandLocations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Chưa có dữ liệu đại lý {brand.name} tại {provinceLabel}.
            <br />
            <Link href={`/brand/${slug}`} className="text-primary hover:underline mt-2 inline-block">
              ← Xem tất cả tỉnh thành
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
