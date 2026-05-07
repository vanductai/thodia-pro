import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import {
  BRANDS, AGENTS, LOCATIONS, PROVINCES, getProvinceLabel,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return { title: "Không tìm thấy" };
  return {
    title: `Đại lý ${brand.name} Chính hãng tại Việt Nam — ${brand.stats.dealers} điểm bán`,
    description: `Tìm đại lý ${brand.name} chính hãng gần bạn. ${brand.stats.dealers} showroom tại ${brand.stats.provinces} tỉnh thành. Đảm bảo giá niêm yết, dịch vụ chuẩn hãng.`,
    alternates: { canonical: `https://pro.thodia.so/brand/${slug}` },
    openGraph: {
      title: `Đại lý ${brand.name} chính hãng — Pro.Thodia.so`,
      description: brand.description,
      url: `https://pro.thodia.so/brand/${slug}`,
    },
  };
}

function buildBrandSchema(brand: (typeof BRANDS)[number], provinces: { name: string; slug: string; dealer_count: number }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://pro.thodia.so/brand/${brand.slug}#organization`,
        name: brand.name,
        description: brand.description,
        url: brand.website,
        sameAs: [brand.website],
        foundingDate: String(brand.founding_year),
        foundingLocation: {
          "@type": "Place",
          name: brand.headquarters,
          address: {
            "@type": "PostalAddress",
            addressCountry: brand.country_origin,
          },
        },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: brand.stats.agents },
        areaServed: provinces.map((p) => ({ "@type": "AdministrativeArea", name: p.name })),
      },
      {
        "@type": "CollectionPage",
        "@id": `https://pro.thodia.so/brand/${brand.slug}#page`,
        name: `Đại lý ${brand.name} tại Việt Nam`,
        description: `Danh sách ${brand.stats.dealers} đại lý ${brand.name} chính hãng trên toàn Việt Nam`,
        url: `https://pro.thodia.so/brand/${brand.slug}`,
        about: { "@id": `https://pro.thodia.so/brand/${brand.slug}#organization` },
        numberOfItems: brand.stats.dealers,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: provinces.slice(0, 8).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Đại lý ${brand.name} tại ${p.name}`,
            url: `https://pro.thodia.so/brand/${brand.slug}/dai-ly/${p.slug}`,
          })),
        },
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

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();

  // Build province list from real data
  const provinceSlugs = new Set<string>([
    ...AGENTS.filter((a) => a.primary_brand === brand.name).map((a) => a.province),
    ...LOCATIONS.filter((l) => l.primary_brand === brand.name).map((l) => l.province),
  ]);

  const provinces: { name: string; slug: string; dealer_count: number }[] = [...provinceSlugs].map((pSlug) => {
    const agentCount = AGENTS.filter((a) => a.primary_brand === brand.name && a.province === pSlug).length;
    const locCount = LOCATIONS.filter((l) => l.primary_brand === brand.name && l.province === pSlug).length;
    return {
      name: getProvinceLabel(pSlug),
      slug: pSlug,
      dealer_count: agentCount + locCount,
    };
  });

  // Fall back to all PROVINCES if no data yet
  const displayProvinces = provinces.length > 0
    ? provinces
    : Object.entries(PROVINCES).slice(0, 5).map(([pSlug, name]) => ({
        name: name as string, slug: pSlug, dealer_count: 0,
      }));

  // Featured locations for this brand
  const featuredLocations = LOCATIONS.filter((l) => l.primary_brand === brand.name && l.featured);
  const featuredAgents = AGENTS.filter((a) => a.primary_brand === brand.name && a.featured);

  const schema = buildBrandSchema(brand, displayProvinces);

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
              <span className="text-3xl font-black text-primary">{brand.logo_initial}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{brand.name}</h1>
              <p className="text-muted-foreground mb-4">{brand.tagline}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-primary" />
                  <strong>{brand.stats.dealers}</strong> đại lý chính thức
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  <strong>{brand.stats.provinces}</strong> tỉnh/thành phố
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  <strong>{brand.stats.agents.toLocaleString("vi-VN")}</strong> đại lý tư vấn
                </div>
              </div>
              <BrandProvinceCTA brandSlug={brand.slug} provinces={displayProvinces} />
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
          <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <div><dt className="font-medium text-foreground">Thành lập</dt><dd>{brand.founding_year}</dd></div>
            <div><dt className="font-medium text-foreground">Trụ sở</dt><dd>{brand.headquarters}</dd></div>
            <div><dt className="font-medium text-foreground">Xuất xứ</dt><dd>{brand.country_origin}</dd></div>
          </dl>
        </section>

        <Separator />

        {/* Province coverage */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tìm đại lý theo tỉnh/thành phố</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {displayProvinces.map((p) => (
              <Link key={p.slug} href={`/brand/${brand.slug}/dai-ly/${p.slug}`}>
                <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">{p.name}</p>
                    {p.dealer_count > 0 && (
                      <p className="text-xs text-muted-foreground">{p.dealer_count} đại lý</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {(featuredLocations.length > 0 || featuredAgents.length > 0) && (
          <>
            <Separator />

            {/* Featured dealers */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Đại lý {brand.name} nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredLocations.map((loc) => (
                  <Link key={loc.slug} href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm leading-snug">{loc.name}</CardTitle>
                          {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <RatingStars rating={loc.rating} count={loc.review_count} size="sm" />
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />{getProvinceLabel(loc.province)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {featuredAgents.map((agent) => (
                  <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm leading-snug">{agent.name}</CardTitle>
                          {agent.brand_tier && <BadgeBrandTier tier={agent.brand_tier} />}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <RatingStars rating={agent.rating} count={agent.review_count} size="sm" />
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />{getProvinceLabel(agent.province)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
