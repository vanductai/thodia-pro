import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import { CTAButtons } from "@/components/shared/cta-buttons";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { PhotoGallery } from "@/components/shared/photo-gallery";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  MapPin, Clock, Phone, Mail, Globe, Share2,
  CheckCircle2, Users, MessageCircle, ImageIcon,
} from "lucide-react";
import { LOCATIONS, AGENTS, getProvinceLabel, PROVINCE_GEO } from "@/lib/mock-data";

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    tinh: loc.province,
    phuong: loc.phuong,
    slug: loc.slug,
  }));
}

interface PageProps {
  params: Promise<{ tinh: string; phuong: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tinh, phuong, slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug && l.province === tinh);
  if (!loc) return { title: "Không tìm thấy" };
  const provinceLabel = getProvinceLabel(tinh);
  return {
    title: `${loc.name} — Đại lý ${loc.primary_brand ?? ""} tại ${loc.ward_label}, ${provinceLabel}`,
    description: `${loc.name} tại ${loc.address}. ⭐ ${loc.rating}/5 (${loc.review_count} đánh giá). ${loc.services.slice(0, 2).join(", ")}.`,
    alternates: { canonical: `https://pro.thodia.so/locations/${tinh}/${phuong}/${slug}` },
    other: {
      "geo.region": PROVINCE_GEO[tinh]?.iso ?? "VN",
      "geo.placename": `${loc.ward_label}, ${provinceLabel}`,
      ...(loc.lat != null && loc.lng != null ? {
        "geo.position": `${loc.lat};${loc.lng}`,
        ICBM: `${loc.lat}, ${loc.lng}`,
      } : {}),
    },
  };
}

function buildSchema(loc: (typeof LOCATIONS)[number], tinh: string, phuong: string) {
  const provinceLabel = getProvinceLabel(tinh);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", loc.schema_type],
        "@id": `https://pro.thodia.so/locations/${tinh}/${phuong}/${loc.slug}#location`,
        name: loc.name,
        image: loc.image,
        telephone: loc.phone,
        email: loc.email,
        url: `https://pro.thodia.so/locations/${tinh}/${phuong}/${loc.slug}`,
        // F3: PostalAddress chuẩn — tách street riêng
        address: {
          "@type": "PostalAddress",
          streetAddress: loc.street_address,
          addressLocality: loc.ward_label,
          addressRegion: provinceLabel,
          postalCode: loc.postal_code,
          addressCountry: "VN",
        },
        ...(loc.lat && loc.lng ? {
          geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
        } : {}),
        // F2: worstRating bắt buộc
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(loc.rating),
          reviewCount: String(loc.review_count),
          bestRating: "5",
          worstRating: "1",
        },
        // F5: Review array trong JSON-LD
        review: loc.reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", "name": r.author },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          datePublished: r.date,
          reviewBody: r.text,
        })),
        // F1: OpeningHoursSpecification chuẩn dayOfWeek/opens/closes
        openingHoursSpecification: loc.opening_hours_spec.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.dayOfWeek.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: h.closes,
        })),
        ...(loc.primary_brand ? {
          brand: { "@type": "Brand", name: loc.primary_brand },
          ...(loc.is_authorized ? {
            parentOrganization: { "@type": "Organization", name: loc.primary_brand },
          } : {}),
        } : {}),
        areaServed: loc.area_served.map((a) => ({
          "@type": "AdministrativeArea",
          name: a.ward,
          description: `Trước 2025 thuộc ${a.legacy}`,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Dịch vụ ${loc.name}`,
          itemListElement: loc.services.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name: s },
          })),
        },
        sameAs: [loc.gbp_url, loc.facebook_page_url].filter(Boolean),
        additionalProperty: [
          { "@type": "PropertyValue", name: "Năm thành lập (estimate)", value: "2018" },
          ...(loc.is_authorized ? [{ "@type": "PropertyValue", name: "Loại đại lý", value: "Chính thức / Ủy quyền" }] : []),
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: loc.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: provinceLabel, item: `https://pro.thodia.so/${loc.category}/${tinh}` },
          { "@type": "ListItem", position: 3, name: loc.ward_label, item: `https://pro.thodia.so/${loc.category}/${tinh}/${phuong}` },
          { "@type": "ListItem", position: 4, name: loc.name, item: `https://pro.thodia.so/locations/${tinh}/${phuong}/${loc.slug}` },
        ],
      },
    ],
  };
}



export default async function LocationPage({ params }: PageProps) {
  const { tinh, phuong, slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug && l.province === tinh);
  if (!loc) notFound();

  const schema = buildSchema(loc, tinh, phuong);
  const provinceLabel = getProvinceLabel(tinh);
  // Agents thuộc location này (same province + ward)
  const relatedAgents = AGENTS.filter(
    (a) => a.province === tinh && a.ward === phuong && a.agent_type === "location-based"
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-5xl px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href={`/${loc.category}/${tinh}`}>{provinceLabel}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href={`/${loc.category}/${tinh}/${phuong}`}>{loc.ward_label}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{loc.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image — loading="eager" vì đây là LCP candidate */}
            {loc.image && (
              <div className="rounded-xl overflow-hidden aspect-video bg-muted shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={loc.image}
                  alt={`Ảnh đại diện ${loc.name}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            )}

            {/* Header — Direction C: stat strip */}
            <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  {loc.ward_label} · {provinceLabel}
                </p>
                <h1 className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight mb-1">{loc.name}</h1>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {loc.verified && <BadgeVerified />}
                  {loc.brand_tier && <BadgeBrandTier tier={loc.brand_tier} />}
                  {loc.primary_brand && (
                    <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5">
                      {loc.primary_brand}
                    </Badge>
                  )}
                  {loc.is_authorized && (
                    <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5">
                      Chính thức
                    </Badge>
                  )}
                </div>
                <CTAButtons phone={loc.phone} zalo={loc.zalo_oa_url ?? loc.phone} size="sm" />
              </div>
              {/* Stat strip */}
              <div className="grid grid-cols-3 border-t divide-x">
                <div className="px-4 py-3">
                  <p className="text-xl font-bold tracking-tight leading-none mb-0.5">{loc.rating.toFixed(1)}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Rating</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xl font-bold tracking-tight leading-none mb-0.5">{loc.review_count}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Đánh giá</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xl font-bold tracking-tight leading-none mb-0.5">{loc.services.length}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Dịch vụ</p>
                </div>
              </div>
            </div>

            {/* NAP Block */}
            <Card>
              <CardContent className="p-4 space-y-2.5 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Địa chỉ</p>
                    <address className="text-muted-foreground not-italic">{loc.address}</address>
                    <p className="text-xs text-muted-foreground mt-0.5 opacity-70">
                      (Trước 2025: {loc.legacy_district}, {provinceLabel})
                    </p>
                  </div>
                </div>
                {loc.opening_hours.map((h) => (
                  <div key={h.day} className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium">{h.day}</span>
                    <span className="text-muted-foreground">{h.hours}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <a href={`tel:${loc.phone}`} className="text-primary hover:underline">{loc.phone}</a>
                    {loc.phone_secondary && (
                      <span className="text-muted-foreground"> · <a href={`tel:${loc.phone_secondary}`} className="hover:underline">{loc.phone_secondary}</a></span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={`mailto:${loc.email}`} className="text-muted-foreground hover:text-foreground">{loc.email}</a>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <section>
              <h2 className="text-base font-bold mb-2">Dịch vụ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {loc.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />{s}
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Area served */}
            <section>
              <h2 className="text-base font-bold mb-2">Khu vực phục vụ</h2>
              <div className="flex flex-wrap gap-1.5">
                {loc.area_served.map((a) => (
                  <Badge key={a.ward} variant="secondary" className="text-xs">
                    <MapPin className="h-2.5 w-2.5 mr-1" />{a.ward}
                    <span className="ml-1 opacity-60">({a.legacy})</span>
                  </Badge>
                ))}
              </div>
            </section>

            {/* Photo gallery — "use client" island để dùng onError handler */}
            {(loc.photo_exterior.length > 0 || loc.photo_interior.length > 0 || loc.photo_team.length > 0) && (
              <>
                <Separator />
                <section>
                  <h2 className="text-base font-bold mb-3 flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-primary" />Hình ảnh thực tế
                  </h2>
                  <PhotoGallery
                    photos={[...loc.photo_exterior, ...loc.photo_interior, ...loc.photo_team]}
                    altPrefix={loc.name}
                  />
                </section>
              </>
            )}

            {/* Reviews */}
            {loc.reviews.length > 0 && (
              <>
                <Separator />
                <section>
                  <h2 className="text-base font-bold mb-3">Đánh giá ({loc.review_count})</h2>
                  <div className="mb-3 flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold">{loc.rating}</div>
                    <div>
                      <RatingStars rating={loc.rating} count={loc.review_count} />
                      <p className="text-xs text-muted-foreground mt-1">Dựa trên {loc.review_count} đánh giá xác thực</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {loc.reviews.map((r, i) => (
                      <Card key={`review-${i}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-1.5">
                            <div>
                              <p className="font-medium text-sm">{r.author}</p>
                              <RatingStars rating={r.rating} showCount={false} size="sm" />
                            </div>
                            <time dateTime={r.date} className="text-xs text-muted-foreground">
                              {new Date(r.date).toLocaleDateString("vi-VN")}
                            </time>
                          </div>
                          <p className="text-sm text-muted-foreground">{r.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Related agents */}
            {relatedAgents.length > 0 && (
              <>
                <Separator />
                <section>
                  <h2 className="text-base font-bold mb-2 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" />Đội ngũ tư vấn
                  </h2>
                  <div className="space-y-2">
                    {relatedAgents.map((a) => (
                      <Link key={a.slug} href={`/agent/${a.slug}`}>
                        <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm shrink-0">
                              {a.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{a.name}</p>
                              <p className="text-xs text-muted-foreground">{a.title}</p>
                            </div>
                            <RatingStars rating={a.rating} count={a.review_count} size="sm" showCount={false} />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              </>
            )}

            <Separator />

            {/* FAQ */}
            <section>
              <h2 className="text-base font-bold mb-3">Câu hỏi thường gặp</h2>
              <FAQAccordion items={loc.faq} schemaId="location-faq" schemaEmit={false} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="sticky top-20">
              <CardContent className="p-4 space-y-3">
                <p className="font-medium text-sm">Liên hệ & Chỉ đường</p>
                <CTAButtons phone={loc.phone} zalo={loc.zalo_oa_url ?? loc.phone} size="sm" />
                <Separator />
                <div className="space-y-2 text-xs text-muted-foreground">
                  <a href={`mailto:${loc.email}`} className="flex items-center gap-1.5 hover:text-foreground">
                    <Mail className="h-3.5 w-3.5" />{loc.email}
                  </a>
                  {loc.zalo_oa_url && (
                    <a href={loc.zalo_oa_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                      <MessageCircle className="h-3.5 w-3.5" />Zalo OA
                    </a>
                  )}
                  {loc.facebook_page_url && (
                    <a href={loc.facebook_page_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                      <Share2 className="h-3.5 w-3.5" />Facebook
                    </a>
                  )}
                  {loc.gbp_url && (
                    <a href={loc.gbp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                      <Globe className="h-3.5 w-3.5" />Hồ sơ Google Business
                    </a>
                  )}
                </div>
                {/* Google Maps embed */}
                {loc.lat && loc.lng ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md overflow-hidden border hover:opacity-90 transition-opacity"
                    aria-label={`Xem ${loc.name} trên Google Maps`}
                  >
                    <iframe
                      title={`Bản đồ ${loc.name}`}
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${loc.lat},${loc.lng}&z=16&output=embed`}
                    />
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-md bg-muted aspect-video text-xs text-muted-foreground hover:bg-muted/70 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />Xem trên Google Maps
                  </a>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
