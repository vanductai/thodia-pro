import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Building2, Users, MapPin, ArrowRight } from "lucide-react";
import { BRANDS, SERVICES, getServiceLabel } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Thương hiệu đại lý tại Việt Nam — Pro.Thodia.so",
  description: "Khám phá các thương hiệu BĐS, xe cộ và bảo hiểm hàng đầu Việt Nam. Tìm đại lý chính hãng uy tín gần bạn.",
  alternates: { canonical: "https://pro.thodia.so/brand" },
};

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://pro.thodia.so/brand#page",
        name: "Thương hiệu đại lý tại Việt Nam",
        description: "Danh sách thương hiệu BĐS, xe cộ và bảo hiểm uy tín tại Việt Nam",
        url: "https://pro.thodia.so/brand",
        numberOfItems: BRANDS.length,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: "Thương hiệu", item: "https://pro.thodia.so/brand" },
        ],
      },
    ],
  };
}

// Group brands by category
const CATEGORY_ORDER = ["xe-co", "bds", "bao-hiem"] as const;

export default function BrandListPage() {
  const schema = buildSchema();

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: getServiceLabel(cat),
    brands: BRANDS.filter((b) => b.category === cat),
  })).filter((g) => g.brands.length > 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Thương hiệu</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Thương hiệu đại lý tại Việt Nam</h1>
          <p className="text-sm text-muted-foreground">
            {BRANDS.length} thương hiệu · Tìm đại lý chính hãng uy tín theo thương hiệu
          </p>
        </div>

        {grouped.map((group) => (
          <section key={group.category} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs">{group.label}</Badge>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Thương hiệu {group.label}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.brands.map((brand) => (
                <Link key={brand.slug} href={`/brand/${brand.slug}`}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full group">
                    <CardContent className="p-5">
                      {/* Logo placeholder */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="text-xl font-black text-primary">{brand.logo_initial}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-base group-hover:text-primary transition-colors">
                            {brand.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{brand.tagline}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          <strong className="text-foreground">{brand.stats.dealers}</strong> đại lý
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <strong className="text-foreground">{brand.stats.provinces}</strong> tỉnh
                        </span>
                        {brand.stats.agents > 100 && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <strong className="text-foreground">
                              {brand.stats.agents >= 1000
                                ? `${(brand.stats.agents / 1000).toFixed(0)}k+`
                                : brand.stats.agents}
                            </strong> agents
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground line-clamp-1 flex-1 mr-2">
                          {brand.description.slice(0, 60)}…
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
