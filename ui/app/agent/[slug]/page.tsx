import type { Metadata } from "next";
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
import { MapPin, Clock, Award, Building2, Globe, Share2, Phone, Mail, CheckCircle2, Car } from "lucide-react";

// ─── Mock data (sẽ thay bằng fetch từ DB) ───────────────────────────────────

const AGENT_LOCATION_BASED = {
  agent_type: "location-based" as const,
  name: "Nguyễn Văn Minh",
  slug: "nguyen-van-minh-bds-phuong-tan-thuan-tay",
  title: "Môi giới Bất động sản Chuyên nghiệp",
  category: "bds",
  photo: "/agents/nguyen-van-minh.jpg",
  rating: 4.8,
  review_count: 47,
  years_experience: 8,
  phone: "+84 901 234 567",
  email: "minh.bds@example.com",
  license_number: "CC-BĐS-HCM-2021-012345",
  license_issuer: "Sở Xây dựng TP.HCM",
  office_address: "123 Nguyễn Văn Linh, Phường Tân Thuận Tây, TP. Hồ Chí Minh",
  ward: "Phường Tân Thuận Tây",
  legacy_district: "Quận 7",
  city: "TP. Hồ Chí Minh",
  working_hours: "Thứ 2 – Thứ 7: 08:00 – 18:00",
  gbp_url: "https://g.co/kgs/abc123",
  facebook_url: "https://facebook.com/nguyen.van.minh.bds",
  authorized_brands: ["Vinhomes", "Novaland"],
  brand_tier: "gold" as const,
  bio: "Nguyễn Văn Minh là môi giới bất động sản chuyên nghiệp với hơn 8 năm kinh nghiệm trong lĩnh vực mua bán và cho thuê căn hộ, đất nền tại khu vực Phường Tân Thuận Tây (khu vực Quận 7 cũ) và các phường lân cận thuộc TP. Hồ Chí Minh. Anh Minh chuyên tư vấn phân khúc căn hộ trung-cao cấp dọc trục Nguyễn Văn Linh, có kinh nghiệm đàm phán và hỗ trợ pháp lý toàn trình. Phong cách làm việc chuyên nghiệp, minh bạch, đặt lợi ích khách hàng lên hàng đầu. Khu vực phục vụ chính: Phường Tân Thuận Tây, Phường Tân Thuận Đông, Phường Phú Thuận (khu vực Quận 7 cũ), TP. Hồ Chí Minh.",
  services: [
    { icon: "🏠", name: "Mua bán căn hộ", desc: "Tư vấn & môi giới mua bán căn hộ chung cư" },
    { icon: "🏘", name: "Cho thuê BĐS", desc: "Tìm kiếm và cho thuê nhà, văn phòng" },
    { icon: "📋", name: "Tư vấn pháp lý", desc: "Hỗ trợ thủ tục pháp lý, sang tên" },
    { icon: "💰", name: "Định giá BĐS", desc: "Thẩm định giá trị bất động sản" },
  ],
  portfolio: [
    { type: "Căn hộ", area: "P. Tân Thuận Tây", result: "Bán thành công, 3.2 tỷ", year: 2024 },
    { type: "Đất nền", area: "P. Phú Thuận", result: "Bán thành công, 5.8 tỷ", year: 2024 },
    { type: "Căn hộ cho thuê", area: "P. Tân Thuận Đông", result: "Cho thuê 18tr/tháng", year: 2023 },
  ],
  reviews: [
    { author: "Trần Thị Hoa", rating: 5, date: "2024-03-15", text: "Anh Minh tư vấn rất nhiệt tình, hỗ trợ pháp lý toàn trình. Mình mua được căn hộ ưng ý, giá tốt." },
    { author: "Lê Văn Đức", rating: 5, date: "2024-01-20", text: "Chuyên nghiệp, phản hồi nhanh, am hiểu thị trường Quận 7 rất sâu." },
    { author: "Nguyễn Phương Anh", rating: 4, date: "2023-11-08", text: "Tư vấn tốt, thủ tục nhanh. Sẽ giới thiệu cho bạn bè." },
  ],
  area_served: ["Phường Tân Thuận Tây", "Phường Tân Thuận Đông", "Phường Phú Thuận"],
  faq: [
    { question: "Anh Minh có kinh nghiệm ở khu vực nào?", answer: "Anh Minh chuyên về khu vực Phường Tân Thuận Tây, Phường Tân Thuận Đông và Phường Phú Thuận (khu vực Quận 7 cũ), TP.HCM với 8 năm kinh nghiệm." },
    { question: "Chi phí môi giới là bao nhiêu?", answer: "Chi phí môi giới thỏa thuận theo giao dịch, thông thường 1-2% giá trị hợp đồng. Tư vấn miễn phí lần đầu." },
    { question: "Có hỗ trợ vay ngân hàng không?", answer: "Có. Anh Minh hợp tác với các ngân hàng uy tín để hỗ trợ khách hàng vay mua BĐS với lãi suất tốt nhất." },
  ],
};

// ─── Schema Builder ──────────────────────────────────────────────────────────

function buildPersonSchema(agent: typeof AGENT_LOCATION_BASED) {
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
        // Address (location-based agent có văn phòng — F3)
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Nguyễn Hữu Thọ",
          addressLocality: agent.ward,
          addressRegion: agent.city,
          postalCode: "700000",
          addressCountry: "VN",
        },
        // F10: hasOccupation chuẩn hơn serviceType
        hasOccupation: {
          "@type": "Occupation",
          name: agent.title,
          occupationLocation: { "@type": "City", name: agent.city },
          skills: agent.services.map((s) => s.name).join(", "),
        },
        worksFor: agent.authorized_brands.length > 0 ? {
          "@type": "Organization",
          name: agent.authorized_brands[0],
        } : undefined,
        areaServed: [
          ...agent.area_served.map((w) => ({ "@type": "City", name: `${w}, ${agent.city}` })),
          { "@type": "City", name: `Khu vực ${agent.legacy_district}, ${agent.city}`, description: "Địa danh hành chính cũ trước 2025" },
        ],
        // F8: knowsAbout dùng Thing objects
        knowsAbout: [
          { "@type": "Thing", name: "Bất động sản" },
          { "@type": "Thing", name: "Căn hộ chung cư" },
          { "@type": "Thing", name: "Đất nền" },
          { "@type": "Thing", name: "Định giá BĐS" },
        ],
        // F7: hasCredential có đủ name field
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "Chứng chỉ hành nghề môi giới BĐS",
          credentialCategory: "Professional License",
          identifier: agent.license_number,
          recognizedBy: { "@type": "Organization", name: agent.license_issuer },
        },
        brand: agent.authorized_brands.map((b) => ({ "@type": "Brand", name: b })),
        sameAs: [agent.gbp_url, agent.facebook_url].filter(Boolean),
        // F5 + F6: AggregateRating + Review trong Person schema
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
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: "Đại lý BĐS", item: "https://pro.thodia.so/bds" },
          { "@type": "ListItem", position: 3, name: "TP. Hồ Chí Minh", item: "https://pro.thodia.so/bds/tp-ho-chi-minh" },
          { "@type": "ListItem", position: 4, name: agent.name, item: `https://pro.thodia.so/agent/${agent.slug}` },
        ],
      },
    ],
  };
}


// ─── Page ────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Nguyễn Văn Minh - Môi giới BĐS Phường Tân Thuận Tây TP.HCM",
  description: "Nguyễn Văn Minh — 8 năm môi giới BĐS căn hộ & đất nền tại Phường Tân Thuận Tây (Quận 7), TP.HCM. Đã xác minh. ☎ 0901 234 567 — Zalo sẵn sàng.",
  openGraph: { type: "profile" },
  alternates: { canonical: "https://pro.thodia.so/agent/nguyen-van-minh-bds-phuong-tan-thuan-tay" },
  other: {
    "geo.region": "VN-SG",
    "geo.placename": "Phường Tân Thuận Tây, TP. Hồ Chí Minh",
    "geo.position": "10.7285416;106.7178903",
    ICBM: "10.7285416, 106.7178903",
  },
};

export default function AgentLocationBasedPage() {
  const agent = AGENT_LOCATION_BASED;
  const schema = buildPersonSchema(agent);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/bds">Đại lý BĐS</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/bds/tp-ho-chi-minh">Đại lý BĐS TP.HCM</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{agent.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero */}
            <section className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-primary/20 flex-shrink-0">
                <AvatarImage src={agent.photo} alt={`Ảnh đại diện ${agent.name}`} />
                <AvatarFallback className="text-2xl font-bold">NM</AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <BadgeVerified />
                  <BadgeBrandTier tier={agent.brand_tier} />
                  <Badge variant="secondary">BĐS</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{agent.name}</h1>
                <p className="text-muted-foreground">{agent.title}</p>
                <RatingStars rating={agent.rating} count={agent.review_count} size="md" />
                <CTAButtons phone={agent.phone} zalo={agent.phone} size="default" />
              </div>
            </section>

            {/* Quick info bar */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Điện thoại</span>
                      <p className="text-muted-foreground"><a href={`tel:${agent.phone}`}>{agent.phone}</a></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Giờ làm việc</span>
                      <p className="text-muted-foreground">{agent.working_hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Văn phòng</span>
                      <p className="text-muted-foreground">{agent.office_address}</p>
                    </div>
                  </div>
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
              <h2 className="text-xl font-semibold mb-3">Giới thiệu</h2>
              <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Chứng chỉ: {agent.license_number}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  Cấp bởi: {agent.license_issuer}
                </div>
              </div>
              {/* Brand badges */}
              {agent.authorized_brands.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Thương hiệu ủy quyền:</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.authorized_brands.map((b) => (
                      <Badge key={b} variant="outline" className="gap-1">
                        <Car className="h-3 w-3" />{b}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <Separator />

            {/* Services */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Dịch vụ cung cấp</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {agent.services.map((s) => (
                  <Card key={s.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-start gap-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Portfolio */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Giao dịch tiêu biểu</h2>
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

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Đánh giá ({agent.review_count})
              </h2>
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
                        <time className="text-xs text-muted-foreground">{r.date}</time>
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
              <h2 className="text-xl font-semibold mb-3">Khu vực phục vụ</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {agent.area_served.map((a) => (
                  <Badge key={a} variant="secondary" className="text-sm">
                    <MapPin className="h-3 w-3 mr-1" />{a}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Khu vực {agent.legacy_district} cũ — tên địa danh quen thuộc trước thay đổi hành chính 2025
              </p>
            </section>

            <Separator />

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
              <FAQAccordion items={agent.faq} schemaId="agent-faq" />
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4">
            {/* Contact card */}
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">Liên hệ {agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CTAButtons phone={agent.phone} zalo={agent.phone} size="sm" />
                <Separator />
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />{agent.email}
                  </a>
                  {agent.facebook_url && (
                    <a href={agent.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Share2 className="h-4 w-4" />Facebook
                    </a>
                  )}
                  {agent.gbp_url && (
                    <a href={agent.gbp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Globe className="h-4 w-4" />Google Maps
                    </a>
                  )}
                </div>
                {/* Map embed placeholder */}
                <div className="rounded-lg bg-muted aspect-video flex items-center justify-center text-muted-foreground text-sm">
                  <MapPin className="h-5 w-5 mr-2" />
                  Google Maps
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
