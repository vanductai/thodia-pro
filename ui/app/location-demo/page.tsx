import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CTAButtons } from "@/components/shared/cta-buttons";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeVerified, BadgeBrandTier } from "@/components/shared/badge-verified";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin, Clock, Car, Phone, Mail, Share2, Globe, ParkingCircle, Bus, CheckCircle2 } from "lucide-react";

const LOCATION = {
  name: "Showroom VinFast Nguyễn Văn Linh",
  slug: "showroom-vinfast-nguyen-van-linh",
  tinh: "tp-ho-chi-minh",
  phuong: "phuong-tan-thuan-tay",
  category: "xe-co",
  schema_type: "AutoDealer",
  primary_brand: "VinFast",
  is_authorized_dealer: true,
  brand_tier: "gold" as const,
  address: {
    street: "456 Nguyễn Văn Linh",
    ward: "Phường Tân Thuận Tây",
    legacy_district: "Quận 7",
    city: "TP. Hồ Chí Minh",
    postal_code: "700000",
  },
  lat: 10.728541,
  lng: 106.717890,
  phone: "+84 28 3456 7890",
  phone_mobile: "+84 903 456 789",
  email: "showroom.q7@vinfast.vn",
  facebook_url: "https://facebook.com/vinfastq7",
  gbp_url: "https://g.co/kgs/showroom123",
  zalo_oa_url: "https://zalo.me/vinfast-q7",
  rating: 4.7,
  review_count: 134,
  opening_hours: [
    { day: "Thứ 2 – Thứ 6", hours: "08:00 – 18:00" },
    { day: "Thứ 7 – Chủ nhật", hours: "08:00 – 17:00" },
  ],
  description: "Showroom VinFast Nguyễn Văn Linh tọa lạc tại 456 Nguyễn Văn Linh, Phường Tân Thuận Tây (khu vực Quận 7 cũ), TP. Hồ Chí Minh. Đây là đại lý VinFast chính thức được ủy quyền, chuyên trưng bày và bán toàn bộ dòng xe điện VinFast từ VF3, VF5, VF6, VF7, VF8 đến VF9. Showroom có diện tích 800m², đội ngũ tư vấn chuyên nghiệp, hỗ trợ vay ngân hàng, bảo hiểm và thủ tục đăng ký xe.",
  services: [
    "Tư vấn & mua bán xe VinFast",
    "Hỗ trợ vay ngân hàng",
    "Bảo hiểm xe",
    "Đăng ký xe",
    "Dịch vụ bảo dưỡng",
    "Xe trưng bày lái thử",
  ],
  area_served: [
    { ward: "Phường Tân Thuận Tây", legacy: "Quận 7" },
    { ward: "Phường Tân Thuận Đông", legacy: "Quận 7" },
    { ward: "Phường Phú Thuận", legacy: "Quận 7" },
    { ward: "Phường Bình Thuận", legacy: "Quận 7" },
  ],
  photos: {
    exterior: ["/locations/vinfast-q7-exterior.jpg"],
    interior: ["/locations/vinfast-q7-interior-1.jpg", "/locations/vinfast-q7-interior-2.jpg"],
  },
  parking: "Bãi đậu xe miễn phí 50 chỗ ngay trước showroom",
  public_transport: "Bus số 93, 17 — dừng Nguyễn Văn Linh",
  landmarks: ["Cách Lotte Mart Q.7 500m", "Gần cầu Tân Thuận"],
  agents: [
    { name: "Nguyễn Văn Minh", title: "Trưởng phòng kinh doanh", slug: "nguyen-van-minh-bds-phuong-tan-thuan-tay" },
    { name: "Phạm Thị Thu", title: "Tư vấn bán hàng", slug: "pham-thi-thu-vinfast" },
  ],
  reviews: [
    { author: "Lê Hoàng Nam", rating: 5, date: "2024-04-10", text: "Showroom rộng, xe trưng bày nhiều. Nhân viên tư vấn nhiệt tình, không bị ép mua." },
    { author: "Trần Minh Khoa", rating: 5, date: "2024-03-05", text: "Thủ tục vay nhanh, nhận xe đúng hẹn. Rất chuyên nghiệp." },
    { author: "Nguyễn Bích Phượng", rating: 4, date: "2024-01-20", text: "Sẽ giới thiệu bạn bè. Showroom sạch đẹp, dễ tìm." },
  ],
  faq: [
    { question: "Showroom có hỗ trợ lái thử không?", answer: "Có. Showroom có đội xe lái thử sẵn sàng. Đặt lịch qua Zalo hoặc gọi 0903 456 789 để sắp xếp thời gian phù hợp." },
    { question: "Địa chỉ showroom trước đây thuộc Quận 7 có còn đúng không?", answer: "Đúng. Địa chỉ 456 Nguyễn Văn Linh nay thuộc Phường Tân Thuận Tây theo địa chỉ hành chính mới (trước đây là Quận 7). GPS và Google Maps vẫn tìm được bình thường." },
    { question: "Có bãi đậu xe không?", answer: "Có. Bãi đậu xe miễn phí 50 chỗ ngay trước showroom." },
  ],
};

function buildLocationSchema(loc: typeof LOCATION) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", loc.schema_type],
        "@id": `https://pro.thodia.so/${loc.tinh}/${loc.phuong}/${loc.slug}#location`,
        name: loc.name,
        description: loc.description,
        image: loc.photos.exterior[0],
        telephone: loc.phone,
        email: loc.email,
        url: `https://pro.thodia.so/${loc.tinh}/${loc.phuong}/${loc.slug}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: loc.address.street,
          addressLocality: loc.address.ward,
          addressRegion: loc.address.city,
          postalCode: loc.address.postal_code,
          addressCountry: "VN",
          alternateName: `${loc.address.street}, ${loc.address.legacy_district}, ${loc.address.city}`,
        },
        geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
        openingHoursSpecification: loc.opening_hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          name: h.day,
          description: h.hours,
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: loc.rating,
          reviewCount: loc.review_count,
          bestRating: 5,
        },
        brand: { "@type": "Brand", name: loc.primary_brand },
        areaServed: loc.area_served.map((a) => ({
          "@type": "AdministrativeArea",
          name: `${a.ward}, ${loc.address.city}`,
          alternateName: `${a.legacy}, ${loc.address.city}`,
        })),
        sameAs: [loc.gbp_url, loc.facebook_url, loc.zalo_oa_url].filter(Boolean),
        hasMap: `https://www.google.com/maps?q=${loc.lat},${loc.lng}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://pro.thodia.so" },
          { "@type": "ListItem", position: 2, name: "Xe cộ TP.HCM", item: "https://pro.thodia.so/xe-co/tp-ho-chi-minh" },
          { "@type": "ListItem", position: 3, name: loc.address.ward, item: `https://pro.thodia.so/xe-co/tp-ho-chi-minh/${loc.phuong}` },
          { "@type": "ListItem", position: 4, name: loc.name, item: `https://pro.thodia.so/${loc.tinh}/${loc.phuong}/${loc.slug}` },
        ],
      },
    ],
  };
}

export const metadata: Metadata = {
  title: "Showroom VinFast Nguyễn Văn Linh - Đại lý Chính hãng P.Tân Thuận Tây TP.HCM",
  description: "Showroom VinFast chính hãng tại 456 Nguyễn Văn Linh, P.Tân Thuận Tây (Quận 7), TP.HCM. ⭐ 4.7/5 (134 đánh giá). Lái thử miễn phí. ☎ 028 3456 7890.",
  alternates: { canonical: "https://pro.thodia.so/tp-ho-chi-minh/phuong-tan-thuan-tay/showroom-vinfast-nguyen-van-linh" },
  other: {
    "geo.region": "VN-SG",
    "geo.placename": "Phường Tân Thuận Tây, TP. Hồ Chí Minh",
    "geo.position": `${LOCATION.lat};${LOCATION.lng}`,
    ICBM: `${LOCATION.lat}, ${LOCATION.lng}`,
  },
};

export default function LocationPage() {
  const loc = LOCATION;
  const schema = buildLocationSchema(loc);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/xe-co/tp-ho-chi-minh">Xe cộ TP.HCM</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/xe-co/tp-ho-chi-minh/phuong-tan-thuan-tay">P. Tân Thuận Tây</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{loc.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero image placeholder */}
        <div className="relative mb-6 rounded-xl bg-muted aspect-[21/6] flex items-center justify-center text-muted-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative z-10 text-white text-center p-4">
            <div className="text-sm mb-2 opacity-80">Ảnh Exterior Showroom</div>
            <p className="text-lg font-bold">{loc.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">

            {/* Name + badges */}
            <section>
              <div className="flex flex-wrap gap-2 mb-3">
                <BadgeVerified />
                <BadgeBrandTier tier={loc.brand_tier} />
                <Badge variant="secondary"><Car className="h-3 w-3 mr-1" />Đại lý VinFast</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{loc.name}</h1>
              <RatingStars rating={loc.rating} count={loc.review_count} />
              <div className="mt-4">
                <CTAButtons phone={loc.phone_mobile} zalo={loc.phone_mobile} />
              </div>
            </section>

            {/* NAP Block */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Địa chỉ</span>
                      <address className="text-muted-foreground not-italic">
                        {loc.address.street}, {loc.address.ward}, {loc.address.city}
                        <span className="block text-xs mt-0.5 opacity-70">(Trước đây: {loc.address.legacy_district}, {loc.address.city})</span>
                      </address>
                    </div>
                  </div>
                  {loc.opening_hours.map((h) => (
                    <div key={h.day} className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div><span className="font-medium">{h.day}</span>
                        <p className="text-muted-foreground">{h.hours}</p></div>
                    </div>
                  ))}
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div><span className="font-medium">Điện thoại</span>
                      <p className="text-muted-foreground"><a href={`tel:${loc.phone}`}>{loc.phone}</a></p></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold mb-3">Giới thiệu</h2>
              <p className="text-muted-foreground leading-relaxed">{loc.description}</p>
            </section>

            <Separator />

            {/* Services + Photos via Tabs */}
            <Tabs defaultValue="services">
              <TabsList>
                <TabsTrigger value="services">Dịch vụ</TabsTrigger>
                <TabsTrigger value="photos">Hình ảnh</TabsTrigger>
                <TabsTrigger value="team">Đội ngũ</TabsTrigger>
              </TabsList>
              <TabsContent value="services" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {loc.services.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/30">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />{s}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="photos" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {[...loc.photos.exterior, ...loc.photos.interior].map((p, i) => (
                    <div key={`photo-${i}`} className="aspect-video rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                      {i === 0 ? "Exterior" : `Interior ${i}`}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="team" className="mt-4">
                <div className="space-y-3">
                  {loc.agents.map((a) => (
                    <a key={a.slug} href={`/agent/${a.slug}`} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            {/* Area served */}
            <section>
              <h2 className="text-xl font-semibold mb-3">Khu vực phục vụ</h2>
              <div className="flex flex-wrap gap-2">
                {loc.area_served.map((a) => (
                  <Badge key={a.ward} variant="secondary">
                    <MapPin className="h-3 w-3 mr-1" />{a.ward}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Trước đây thuộc: {[...new Set(loc.area_served.map(a => a.legacy))].join(", ")} — tên địa danh quen thuộc trước 2025
              </p>
            </section>

            <Separator />

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Đánh giá ({loc.review_count})</h2>
              <div className="mb-4 flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <div className="text-4xl font-bold">{loc.rating}</div>
                <div><RatingStars rating={loc.rating} count={loc.review_count} />
                  <p className="text-xs text-muted-foreground mt-1">{loc.review_count} đánh giá xác thực</p></div>
              </div>
              <div className="space-y-4">
                {loc.reviews.map((r, i) => (
                  <Card key={`review-${i}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <div><p className="font-medium text-sm">{r.author}</p>
                          <RatingStars rating={r.rating} showCount={false} size="sm" /></div>
                        <time className="text-xs text-muted-foreground">{r.date}</time>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Local context */}
            <section>
              <h2 className="text-xl font-semibold mb-3">Thông tin thực tế</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><ParkingCircle className="h-4 w-4 text-muted-foreground" />{loc.parking}</div>
                <div className="flex items-center gap-2"><Bus className="h-4 w-4 text-muted-foreground" />{loc.public_transport}</div>
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>{loc.landmarks.join(" · ")}</div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
              <FAQAccordion items={loc.faq} schemaId="location-faq" />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="sticky top-20">
              <CardHeader><CardTitle className="text-base">Liên hệ & Chỉ đường</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <CTAButtons phone={loc.phone_mobile} zalo={loc.phone_mobile} size="sm" />
                <Separator />
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${loc.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />{loc.email}
                  </a>
                  <a href={loc.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Share2 className="h-4 w-4" />Facebook
                  </a>
                  <a href={loc.gbp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Globe className="h-4 w-4" />Google Maps
                  </a>
                </div>
                {/* Map embed */}
                <div className="rounded-lg bg-muted aspect-video flex items-center justify-center text-muted-foreground text-sm">
                  <MapPin className="h-5 w-5 mr-2" />Google Maps Embed
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  GPS: {loc.lat}, {loc.lng}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
