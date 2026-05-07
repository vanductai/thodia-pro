import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CTAButtons } from "@/components/shared/cta-buttons";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeFreelance, BadgeBrandTier } from "@/components/shared/badge-verified";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  MapPin, Clock, Award, Globe, Share2, Phone, Mail,
  CheckCircle2, Car, Building2, ExternalLink, Languages, MessageCircle,
} from "lucide-react";
import { AGENTS, SERVICES, getProvinceLabel, PROVINCE_GEO } from "@/lib/mock-data";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.slug }));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGeoRegion(province: string): string {
  return PROVINCE_GEO[province]?.iso ?? "VN";
}

function getCategoryLabel(category: string): string {
  return SERVICES[category as keyof typeof SERVICES]?.label ?? category;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = AGENTS.find((a) => a.slug === slug);
  if (!agent) return { title: "Không tìm thấy" };

  const provinceLabel = getProvinceLabel(agent.province);
  const locationStr = agent.ward_label
    ? `${agent.ward_label} (${agent.legacy_district}), ${provinceLabel}`
    : provinceLabel;

  return {
    title: `${agent.name} — ${agent.title} tại ${locationStr}`,
    description: `${agent.name} — ${agent.years_experience} năm kinh nghiệm ${getCategoryLabel(agent.category)}. ⭐ ${agent.rating}/5 (${agent.review_count} đánh giá). Đã xác minh. ☎ ${agent.phone.replace("+84", "0")}`,
    openGraph: {
      type: "profile",
      url: `https://pro.thodia.so/agent/${agent.slug}`,
      images: [{ url: `https://pro.thodia.so${agent.photo}`, width: 400, height: 400, alt: agent.name }],
    },
    alternates: { canonical: `https://pro.thodia.so/agent/${agent.slug}` },
    other: {
      "geo.region": getGeoRegion(agent.province),
      "geo.placename": agent.ward_label ? `${agent.ward_label}, ${provinceLabel}` : provinceLabel,
      ...(agent.lat != null && agent.lng != null ? {
        "geo.position": `${agent.lat};${agent.lng}`,
        ICBM: `${agent.lat}, ${agent.lng}`,
      } : {}),
    },
  };
}

// ─── Schema Builder ───────────────────────────────────────────────────────────

function buildPersonSchema(agent: (typeof AGENTS)[number]) {
  const provinceLabel = getProvinceLabel(agent.province);
  const categoryLabel = getCategoryLabel(agent.category);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `https://pro.thodia.so/agent/${agent.slug}#person`,
        name: agent.name,
        jobTitle: agent.title,
        description: agent.bio,
        image: `https://pro.thodia.so${agent.photo}`,
        telephone: agent.phone,
        email: agent.email,
        url: `https://pro.thodia.so/agent/${agent.slug}`,
        ...(agent.office_address ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: agent.office_address.split(",")[0].trim(),
            addressLocality: agent.ward_label ?? provinceLabel,
            addressRegion: provinceLabel,
            addressCountry: "VN",
          },
        } : {}),
        ...(agent.lat && agent.lng ? {
          geo: { "@type": "GeoCoordinates", latitude: agent.lat, longitude: agent.lng },
        } : {}),
        hasOccupation: {
          "@type": "Occupation",
          name: agent.title,
          occupationLocation: { "@type": "City", name: provinceLabel },
          skills: agent.services.join(", "),
        },
        ...(agent.authorized_brands.length > 0 ? {
          worksFor: {
            "@type": "Organization",
            name: agent.authorized_brands[0],
            url: agent.brand_certification_url ?? undefined,
          },
          brand: agent.authorized_brands.map((b) => ({ "@type": "Brand", name: b })),
        } : {}),
        areaServed: agent.ward_label
          ? [
              {
                "@type": "AdministrativeArea",
                name: agent.ward_label,
                description: `Phường hành chính thuộc ${agent.legacy_district} cũ, ${provinceLabel}`,
              },
              { "@type": "City", name: provinceLabel },
            ]
          : [{ "@type": "City", name: provinceLabel }],
        knowsAbout: [
          { "@type": "Thing", name: categoryLabel },
          ...agent.services.map((s) => ({ "@type": "Thing", name: s })),
        ],
        ...(agent.license ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: `Chứng chỉ hành nghề ${categoryLabel}`,
            credentialCategory: "Professional License",
            identifier: agent.license,
            ...(agent.license_issuer ? {
              recognizedBy: {
                "@type": "Organization",
                name: agent.license_issuer,
              },
            } : {}),
            ...(agent.brand_certification_url ? {
              url: agent.brand_certification_url,
            } : {}),
          },
        } : {}),
        knowsLanguage: agent.languages,
        sameAs: [agent.gbp_url, agent.facebook_url].filter(Boolean),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(agent.rating),
          reviewCount: String(agent.review_count),
          bestRating: "5",
          worstRating: "1",
        },
        review: agent.reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          datePublished: r.date,
          reviewBody: r.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: agent.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: categoryLabel, item: `https://pro.thodia.so/${agent.category}` },
          { "@type": "ListItem", position: 3, name: provinceLabel, item: `https://pro.thodia.so/${agent.category}/${agent.province}` },
          { "@type": "ListItem", position: 4, name: agent.name, item: `https://pro.thodia.so/agent/${agent.slug}` },
        ],
      },
    ],
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AgentSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = AGENTS.find((a) => a.slug === slug);
  if (!agent) notFound();

  const schema = buildPersonSchema(agent);
  const provinceLabel = getProvinceLabel(agent.province);
  const categoryLabel = getCategoryLabel(agent.category);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} suppressHydrationWarning />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href={`/${agent.category}`}>{categoryLabel}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${agent.category}/${agent.province}`}>
                {categoryLabel} {provinceLabel}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{agent.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero */}
            <section className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-primary/20 flex-shrink-0">
                <AvatarImage src={agent.photo} alt={`Ảnh đại diện ${agent.name}`} />
                <AvatarFallback className="text-2xl font-bold">{agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  {agent.verified && <BadgeVerified />}
                  {agent.brand_tier && <BadgeBrandTier tier={agent.brand_tier} />}
                  {agent.agent_type === "freelance" && <BadgeFreelance />}
                  <Badge variant="secondary">{categoryLabel}</Badge>
                  {agent.languages.length > 1 && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Languages className="h-3 w-3" />{agent.languages.join(", ")}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{agent.name}</h1>
                <p className="text-muted-foreground">{agent.title}</p>
                <RatingStars rating={agent.rating} count={agent.review_count} size="md" />
                <CTAButtons phone={agent.phone} zalo={agent.phone_zalo} size="default" />
              </div>
            </section>

            {/* Quick info */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Điện thoại</span>
                      <p><a href={`tel:${agent.phone}`} className="text-primary hover:underline">{agent.phone}</a></p>
                      {agent.phone_zalo && agent.phone_zalo !== agent.phone && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Zalo: <a href={`https://zalo.me/${agent.phone_zalo.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{agent.phone_zalo}</a>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Giờ làm việc</span>
                      <p className="text-muted-foreground">{agent.working_hours}</p>
                    </div>
                  </div>
                  {agent.office_address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Văn phòng</span>
                        <address className="not-italic text-muted-foreground">{agent.office_address}</address>
                        {agent.legacy_district && (
                          <p className="text-xs text-muted-foreground opacity-70">(Trước 2025: {agent.legacy_district})</p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Kinh nghiệm</span>
                      <p className="text-muted-foreground">{agent.years_experience} năm</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <section>
              <h2 className="text-lg font-bold mb-3">Giới thiệu</h2>
              <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
              {(agent.license || agent.authorized_brands.length > 0) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.license && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Chứng chỉ: {agent.license}
                    </div>
                  )}
                  {agent.license_issuer && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                      <Building2 className="h-4 w-4 text-blue-500" />
                      Cấp bởi: {agent.license_issuer}
                    </div>
                  )}
                  {agent.authorized_brands.length > 0 && (
                    <div className="flex flex-wrap gap-2 w-full mt-1">
                      {agent.authorized_brands.map((b) => (
                        <Badge key={b} variant="outline" className="gap-1">
                          <Car className="h-3 w-3" />{b}
                        </Badge>
                      ))}
                      {agent.brand_certification_url && (
                        <a
                          href={agent.brand_certification_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />Xem chứng nhận đại lý
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
              {agent.achievements.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agent.achievements.map((a) => (
                    <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                  ))}
                </div>
              )}
            </section>

            <Separator />

            {/* Services */}
            <section>
              <h2 className="text-lg font-bold mb-4">Dịch vụ cung cấp</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {agent.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm p-3 rounded-lg border bg-muted/20">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Portfolio */}
            {agent.portfolio.length > 0 && (
              <>
                <section>
                  <h2 className="text-lg font-bold mb-4">Giao dịch tiêu biểu</h2>
                  <div className="space-y-3">
                    {agent.portfolio.map((p, i) => (
                      <div key={`port-${i}`} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 text-sm">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{p.type}</Badge>
                          <span className="text-muted-foreground">{p.area}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{p.result}</p>
                          <p className="text-xs text-muted-foreground">{p.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <Separator />
              </>
            )}

            {/* Reviews */}
            <section>
              <h2 className="text-lg font-bold mb-4">Đánh giá ({agent.review_count})</h2>
              <div className="mb-4 flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <div className="text-4xl font-bold">{agent.rating}</div>
                <div>
                  <RatingStars rating={agent.rating} count={agent.review_count} />
                  <p className="text-xs text-muted-foreground mt-1">Dựa trên {agent.review_count} đánh giá xác thực</p>
                </div>
              </div>
              <div className="space-y-4">
                {agent.reviews.map((r, i) => (
                  <Card key={`review-${i}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
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

            <Separator />

            {/* Area served */}
            <section>
              <h2 className="text-lg font-bold mb-3">Khu vực phục vụ</h2>
              {agent.ward_label ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="text-sm">
                      <MapPin className="h-3 w-3 mr-1" />{agent.ward_label}
                    </Badge>
                    <Badge variant="outline" className="text-sm">{provinceLabel}</Badge>
                  </div>
                  {agent.area_served_ward.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {agent.area_served_ward.map((slug) => (
                        <Badge key={slug} variant="secondary" className="text-xs opacity-75">
                          {slug.replace(/^phuong-/, "P. ").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Khu vực {agent.legacy_district} cũ — tên địa danh quen thuộc trước thay đổi hành chính 2025
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Phủ sóng toàn tỉnh/thành phố: {provinceLabel}</p>
              )}
            </section>

            <Separator />

            {/* FAQ — schema đã gộp vào @graph ở trên, không emit riêng */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
              <FAQAccordion items={agent.faq} schemaEmit={false} />
            </section>
          </div>

          {/* ── Right sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-4">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">Liên hệ {agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CTAButtons phone={agent.phone} zalo={agent.phone_zalo} size="sm" />
                <Separator />
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />{agent.email}
                  </a>
                  {agent.phone_zalo && (
                    <a href={`https://zalo.me/${agent.phone_zalo.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <MessageCircle className="h-4 w-4" />Zalo
                    </a>
                  )}
                  {agent.facebook_url && (
                    <a href={agent.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Share2 className="h-4 w-4" />Facebook
                    </a>
                  )}
                  {agent.gbp_url && (
                    <a href={agent.gbp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Globe className="h-4 w-4" />Hồ sơ Google Business
                    </a>
                  )}
                </div>
                {/* Map embed */}
                {agent.lat && agent.lng ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${agent.lat},${agent.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg overflow-hidden border hover:opacity-90 transition-opacity"
                    aria-label={`Xem vị trí ${agent.name} trên Google Maps`}
                  >
                    <iframe
                      title={`Bản đồ ${agent.name}`}
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${agent.lat},${agent.lng}&z=16&output=embed`}
                    />
                  </a>
                ) : (
                  <div className="rounded-lg bg-muted aspect-video flex items-center justify-center text-muted-foreground text-sm">
                    <MapPin className="h-5 w-5 mr-2" />
                    {agent.agent_type === "freelance" ? "Phục vụ toàn tỉnh" : "Google Maps"}
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
