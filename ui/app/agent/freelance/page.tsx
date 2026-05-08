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
import { MapPin, Clock, Award, Globe, Share2, Phone, Mail, Car, Info, CheckCircle2 } from "lucide-react";

const FREELANCE_AGENT = {
  agent_type: "freelance" as const,
  name: "Trần Thị Lan",
  slug: "tran-thi-lan-vinfast",
  title: "Đại lý VinFast Độc lập",
  category: "xe-co",
  photo: "/agents/tran-thi-lan.jpg",
  rating: 4.9,
  review_count: 62,
  years_experience: 5,
  phone: "+84 912 345 678",
  email: "lan.vinfast@example.com",
  authorized_brands: ["VinFast"],
  primary_brand: "VinFast",
  brand_dealer_code: "VF-HCM-2023-0042",
  brand_tier: "gold" as const,
  working_hours: "Thứ 2 – Chủ nhật: 08:00 – 20:00",
  area_served_province: ["TP. Hồ Chí Minh", "Bình Dương"],
  gbp_url: "https://g.co/kgs/xyz789",
  facebook_url: "https://facebook.com/tran.thi.lan.vinfast",
  bio: "Trần Thị Lan là đại lý VinFast ủy quyền chính thức với hơn 5 năm kinh nghiệm tư vấn xe điện VinFast tại TP. Hồ Chí Minh và Bình Dương. Với mã đại lý VF-HCM-2023-0042 được VinFast cấp, chị Lan chuyên tư vấn toàn bộ dòng xe VF3, VF5, VF6, VF7, VF8, VF9. Là đại lý độc lập, chị phục vụ khách hàng tại địa chỉ của khách hoặc qua tư vấn online — giúp khách hàng tiết kiệm thời gian di chuyển đến showroom.",
  services: [
    { icon: "🚗", name: "Tư vấn xe VinFast", desc: "Toàn dòng VF3 đến VF9" },
    { icon: "🏠", name: "Tư vấn tại nhà", desc: "Gặp mặt tại địa chỉ khách hàng" },
    { icon: "💻", name: "Tư vấn online", desc: "Zalo, Video call, Chat" },
    { icon: "📋", name: "Hỗ trợ thủ tục", desc: "Đăng ký, vay ngân hàng, bảo hiểm" },
  ],
  reviews: [
    { author: "Hoàng Minh Tú", rating: 5, date: "2024-04-01", text: "Chị Lan tư vấn tại nhà mình rất tiện. Không cần ra showroom vẫn được hỗ trợ đầy đủ hồ sơ vay." },
    { author: "Phan Thị Ngọc", rating: 5, date: "2024-02-14", text: "Đại lý VinFast chính thức, giá niêm yết, không bị hét giá. Rất hài lòng." },
  ],
  faq: [
    { question: "Chị Lan có văn phòng hay showroom không?", answer: "Chị Lan là đại lý VinFast độc lập, phục vụ khách hàng tại địa chỉ của quý khách hoặc qua tư vấn online. Điều này giúp tiết kiệm thời gian di chuyển." },
    { question: "Tôi có thể gặp chị Lan ở đâu?", answer: "Quý khách có thể đặt lịch gặp tại địa chỉ của mình, tại showroom VinFast gần nhất, hoặc tư vấn qua Zalo/video call. Liên hệ 0912 345 678 để sắp xếp." },
    { question: "Chị Lan có phải đại lý chính thức VinFast không?", answer: "Có. Chị Lan là đại lý ủy quyền chính thức của VinFast, mã đại lý VF-HCM-2023-0042, được VinFast cấp và xác nhận." },
    { question: "Giá xe VinFast mua qua đại lý độc lập có khác không?", answer: "Không. Giá xe VinFast theo niêm yết của hãng, đại lý độc lập hay showroom đều như nhau. Khách hàng nhận được hỗ trợ cá nhân hóa hơn." },
  ],
};

function buildFreelanceSchema(agent: typeof FREELANCE_AGENT) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoDealer", "Person"],
        "@id": `https://pro.thodia.so/agent/${agent.slug}#person`,
        name: agent.name,
        jobTitle: agent.title,
        description: agent.bio,
        image: `https://pro.thodia.so${agent.photo}`,
        telephone: agent.phone,
        email: agent.email,
        url: `https://pro.thodia.so/agent/${agent.slug}`,
        // Freelance: KHÔNG có address/geo (W3 — SAB không có địa chỉ cố định)
        worksFor: {
          "@type": "Organization",
          name: agent.primary_brand,
          url: "https://vinfastauto.com",
        },
        // F10: hasOccupation thay serviceType (W5)
        hasOccupation: {
          "@type": "Occupation",
          name: agent.title,
          occupationLocation: {
            "@type": "State",
            name: agent.area_served_province[0] ?? "TP. Hồ Chí Minh",
          },
        },
        areaServed: agent.area_served_province.map((p) => ({
          "@type": "State",
          name: p,
        })),
        // F8: knowsAbout Thing objects
        knowsAbout: [
          { "@type": "Thing", name: "Xe điện VinFast" },
          { "@type": "Thing", name: "Tư vấn mua xe" },
          { "@type": "Thing", name: "Hỗ trợ tài chính xe" },
        ],
        // F7: hasCredential có name field
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: `Chứng nhận đại lý ${agent.primary_brand}`,
          credentialCategory: "Professional Certification",
          identifier: agent.brand_dealer_code,
          recognizedBy: { "@type": "Organization", name: agent.primary_brand },
        },
        brand: [{ "@type": "Brand", name: agent.primary_brand }],
        sameAs: [agent.gbp_url, agent.facebook_url].filter(Boolean),
        // F5 + F6: AggregateRating + Review
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
          { "@type": "ListItem", position: 2, name: "Đại lý Xe cộ", item: "https://pro.thodia.so/xe-co" },
          { "@type": "ListItem", position: 3, name: "VinFast", item: "https://pro.thodia.so/brand/vinfast" },
          { "@type": "ListItem", position: 4, name: agent.name, item: `https://pro.thodia.so/agent/${agent.slug}` },
        ],
      },
    ],
  };
}


export const metadata: Metadata = {
  title: "Trần Thị Lan - Đại lý VinFast Độc lập tại TP.HCM",
  description: "Trần Thị Lan — đại lý VinFast ủy quyền, tư vấn tại nhà và online toàn TP.HCM & Bình Dương. 5 năm kinh nghiệm. ☎ 0912 345 678 — Zalo 8h–20h.",
  openGraph: { type: "profile" },
  alternates: { canonical: "https://pro.thodia.so/agent/tran-thi-lan-vinfast" },
  // Freelance: NO geo meta tags
};

export default function AgentFreelancePage() {
  const agent = FREELANCE_AGENT;
  const schema = buildFreelanceSchema(agent);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} suppressHydrationWarning />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/xe-co">Đại lý Xe cộ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/brand/vinfast">VinFast</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{agent.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Freelance notice banner */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-violet-200 bg-violet-50 dark:bg-violet-950/20 dark:border-violet-800 p-4">
          <Info className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-violet-700 dark:text-violet-300">Đại lý Độc lập — Phục vụ tại địa chỉ khách hàng</p>
            <p className="text-violet-600 dark:text-violet-400 mt-0.5">
              {agent.name} không có văn phòng cố định. Tư vấn tại nhà bạn hoặc online toàn {agent.area_served_province.join(", ")}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <section className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-violet-200 dark:ring-violet-800 flex-shrink-0">
                <AvatarImage src={agent.photo} alt={`Ảnh đại diện ${agent.name}`} />
                <AvatarFallback className="text-2xl font-bold">TL</AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <BadgeVerified />
                  <BadgeFreelance />
                  <BadgeBrandTier tier={agent.brand_tier} />
                  <Badge variant="secondary">Xe cộ</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{agent.name}</h1>
                <p className="text-muted-foreground">{agent.title}</p>
                <RatingStars rating={agent.rating} count={agent.review_count} />
                <CTAButtons phone={agent.phone} zalo={agent.phone} />
              </div>
            </section>

            {/* Quick info bar — no address */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div><span className="font-medium">Điện thoại</span>
                      <p className="text-muted-foreground"><a href={`tel:${agent.phone}`}>{agent.phone}</a></p></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div><span className="font-medium">Giờ phục vụ</span>
                      <p className="text-muted-foreground">{agent.working_hours}</p></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div><span className="font-medium">Khu vực phục vụ</span>
                      <p className="text-muted-foreground">{agent.area_served_province.join(", ")}</p></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div><span className="font-medium">Kinh nghiệm</span>
                      <p className="text-muted-foreground">{agent.years_experience} năm</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio + Brand cert */}
            <section>
              <h2 className="text-xl font-semibold mb-3">Giới thiệu</h2>
              <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
              <div className="mt-4 p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Chứng nhận đại lý {agent.primary_brand}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Mã đại lý: <strong>{agent.brand_dealer_code}</strong> — Cấp bởi {agent.primary_brand}
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">Dịch vụ</h2>
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

            <section>
              <h2 className="text-xl font-semibold mb-4">Đánh giá ({agent.review_count})</h2>
              <div className="mb-4 flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <div className="text-4xl font-bold">{agent.rating}</div>
                <div>
                  <RatingStars rating={agent.rating} count={agent.review_count} />
                  <p className="text-xs text-muted-foreground mt-1">Dựa trên {agent.review_count} đánh giá</p>
                </div>
              </div>
              <div className="space-y-4">
                {agent.reviews.map((r, i) => (
                  <Card key={`review-${i}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
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

            <section>
              <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
              <FAQAccordion items={agent.faq} schemaId="freelance-faq" />
            </section>
          </div>

          {/* Sidebar — NO map embed */}
          <aside className="space-y-4">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">Liên hệ {agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CTAButtons phone={agent.phone} zalo={agent.phone} size="sm" />
                <div className="rounded-lg bg-violet-50 dark:bg-violet-950/20 p-3 text-xs text-violet-700 dark:text-violet-300">
                  💡 Tư vấn tại nhà bạn hoặc online — không cần ra showroom
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />{agent.email}
                  </a>
                  <a href={agent.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Share2 className="h-4 w-4" />Facebook
                  </a>
                  <a href={agent.gbp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Globe className="h-4 w-4" />Google Business
                  </a>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
