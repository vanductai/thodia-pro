# Local SEO Health — Checklist & Quality Standards
> Pro.Thodia.so | Comprehensive Local SEO Implementation Guide

---

## 1. Tổng quan chiến lược Local SEO

Pro.Thodia.so là platform **danh bạ đại lý cấp cao** với 2 loại page:
- **Agent Page**: Hồ sơ cá nhân đại lý
- **Location Page**: Địa điểm kinh doanh của đại lý

### 3 trụ cột ranking GBP (Google):

```
RELEVANCE          PROXIMITY           PROMINENCE
─────────────      ──────────────      ─────────────────
Category match     Distance to user    Review count/quality
Keyword in name    Service area        Citation consistency
Content alignment  Location accuracy   Website authority
Schema accuracy    GPS coordinates     Backlink signals
```

---

## 2. On-page SEO Checklist — Agent Page

### ✅ Technical
- [ ] URL: `/agent/{ten-day-du-slug}` — không dấu, hyphen, lowercase
- [ ] Canonical tag chính xác
- [ ] Schema `Person` + `LocalBusiness` validate (Rich Results Test)
- [ ] Title ≤60 chars chứa: Tên + Chức danh + Khu vực
- [ ] Meta description 140–155 chars có CTA
- [ ] H1: unique, chứa tên đầy đủ + chuyên ngành + khu vực
- [ ] H2–H6: hierarchy đúng, không skip level
- [ ] Mobile-friendly (Google Mobile-Friendly Test)
- [ ] LCP ≤ 2.5s (Core Web Vitals)
- [ ] CLS ≤ 0.1
- [ ] FID/INP ≤ 200ms

### ✅ Content
- [ ] Bio ≥ 150 từ, tự nhiên, không keyword stuffing
- [ ] Đề cập khu vực phục vụ cụ thể (quận/huyện/phường)
- [ ] Liệt kê ≥ 3 dịch vụ với mô tả riêng
- [ ] Có chứng chỉ hành nghề/credentials
- [ ] Ảnh đại diện rõ mặt, tên file + alt text chuẩn
- [ ] FAQ section ≥ 3 câu (bản địa hóa theo khu vực)
- [ ] Nội dung unique — không copy từ agent khác

### ✅ Local Signals
- [ ] NAP khớp 100% với GBP
- [ ] Phone click-to-call enabled
- [ ] Link GBP trong `sameAs` schema
- [ ] Khu vực phục vụ (`areaServed`) định nghĩa đầy đủ
- [ ] Giờ làm việc (openingHoursSpecification) đúng

---

## 3. On-page SEO Checklist — Location Page

### ✅ Technical
- [ ] URL: `/{tinh}/{quan}/{location-slug}` — keyword + geo trong URL
- [ ] Canonical tag chính xác
- [ ] BreadcrumbList schema: Root → Tỉnh → Quận → Location
- [ ] LocalBusiness schema (đúng subtype: RealEstateAgent / AutoDealer / InsuranceAgency)
- [ ] FAQPage schema (nếu có FAQ section)
- [ ] Title ≤60 chars: Dịch vụ + Khu vực + Brand
- [ ] Meta description 140–155 chars
- [ ] Geo meta tags: `geo.region`, `geo.placename`, `geo.position`
- [ ] H1: Loại dịch vụ + Tên location + Khu vực
- [ ] Google Maps embed với đúng lat/lng

### ✅ Content
- [ ] Business description ≥ 200 từ unique
- [ ] Đề cập address dạng câu văn tự nhiên (AIO-friendly)
- [ ] Khu vực phục vụ liệt kê cụ thể (phường/quận)
- [ ] ≥ 3 dịch vụ với mô tả riêng từng dịch vụ
- [ ] Directions từ ≥ 1 landmark nổi tiếng gần đó
- [ ] FAQ section (bản địa hóa)
- [ ] ≥ 3 reviews hiển thị có tên + ngày + nội dung
- [ ] ≥ 5 ảnh thực tế (exterior, interior, team)

### ✅ Local Signals
- [ ] NAP: Tên, Địa chỉ, SĐT nhất quán với GBP
- [ ] Giờ hoạt động đầy đủ từng ngày
- [ ] GPS coordinates chính xác (không round số)
- [ ] `sameAs` trỏ đúng GBP URL
- [ ] Payment methods (nếu applicable)
- [ ] Parking info (tăng convenience signals)

---

## 4. Technical SEO — Site-wide Checklist

### ✅ Crawlability
- [ ] Sitemap index submit lên Google Search Console
- [ ] Tất cả trang quan trọng trong sitemap
- [ ] Robots.txt không block trang quan trọng
- [ ] Internal linking: mỗi location page có ≥ 2 inbound internal links
- [ ] Không có orphan pages (trang không được link đến)
- [ ] Pagination dùng `rel="next"` / `rel="prev"`

### ✅ Indexability
- [ ] Không có `noindex` nhầm trên trang quan trọng
- [ ] Search/filter pages: `noindex` hoặc có canonical
- [ ] Near-me pages: `noindex` hoặc canonical về main URL
- [ ] Duplicate pages: canonical đúng

### ✅ Performance
- [ ] Core Web Vitals: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms
- [ ] Images: WebP format, lazy loading, responsive srcset
- [ ] Google Maps embed: deferred loading
- [ ] Critical CSS inline, non-critical deferred

### ✅ Mobile-first
- [ ] Responsive design (không có fixed width)
- [ ] Font size ≥ 16px trên mobile
- [ ] Touch targets ≥ 44×44px
- [ ] Click-to-call phone numbers
- [ ] Zalo/Messenger chat widgets mobile-friendly

---

## 5. Schema Markup — Validation Checklist

### Bắt buộc validate trước khi publish:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/

### Các type cần implement:

| Schema Type | Trang áp dụng | Required Fields |
|-------------|--------------|------------------|
| `Person` | Agent Page | name, jobTitle, telephone, url |
| `LocalBusiness` | Location Page | name, address, geo, telephone |
| `RealEstateAgent` | Location (BĐS) | + areaServed |
| `AutoDealer` | Location (Xe) | + brand |
| `InsuranceAgency` | Location (Bảo hiểm) | + serviceArea |
| `Brand` | Agent/Location có brand | name, url |
| `Organization` | Brand Overview Page | name, logo, sameAs |
| `BreadcrumbList` | Tất cả trang | position, name, item |
| `AggregateRating` | Trang có review | ratingValue, reviewCount |
| `Review` | Trang có review | reviewRating, author, datePublished |
| `FAQPage` | Trang có FAQ | mainEntity với Q&A |
| `Organization` | Homepage | name, url, logo, sameAs |
| `WebSite` | Homepage | SearchAction (Sitelinks search box) |
| `CollectionPage` + `ItemList` | Brand Dealer listing | numberOfItems, itemListElement |

### Homepage Schema (`WebSite` + `Organization`):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pro.thodia.so/#website",
      "url": "https://pro.thodia.so",
      "name": "Pro.Thodia.so – Danh bạ Đại lý kinh doanh cấp cao",
      "description": "Tìm đại lý BĐS, xe cộ và bảo hiểm uy tín tại Việt Nam",
      "inLanguage": "vi-VN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://pro.thodia.so/tim-kiem?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://pro.thodia.so/#organization",
      "name": "Pro.Thodia.so",
      "url": "https://pro.thodia.so",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pro.thodia.so/images/logo.png",
        "width": 200,
        "height": 60
      },
      "sameAs": [
        "https://www.facebook.com/prothodia",
        "https://zalo.me/prothodia"
      ]
    }
  ]
}
```

---

## 6. Citation Building Strategy

### Tier 1 — Ưu tiên cao nhất (phải có)
| Platform | URL | Ghi chú |
|----------|-----|---------|
| Google Business Profile | business.google.com | Quan trọng nhất |
| Facebook Business | facebook.com | 2nd most important |
| Zalo Official Account | oa.zalo.me | Critical for VN market |
| **Brand Portal** | brand dealer portals | [Mới] Nếu là đại lý brand, phải đăng ký portal chính hãng |

### Tier 2 — Ưu tiên cao (nên có trong 3 tháng đầu)
| Platform | URL | Ghi chú |
|----------|-----|---------|
| Foody.vn | foody.vn | Tốt cho F&B, phổ biến |
| Cungcap.vn | cungcap.vn | B2B directory VN |
| YellowPages.vn | yellowpages.vn | Local directory VN |
| TripAdvisor | tripadvisor.com | Nếu có du lịch/khách sạn |
| Yelp | yelp.com | Nếu target international |

### Tier 3 — Ưu tiên trung bình (3–6 tháng)
| Platform | URL |
|----------|-----|
| Bing Places | bingplaces.com |
| Apple Business Connect | register.apple.com |
| HERE WeGo | wego.here.com |
| OpenStreetMap | openstreetmap.org |
| Waze | waze.com |

### NAP Consistency Rules:
```
✅ ĐÚNG — Nhất quán:
  Name:    "Văn phòng BĐS Nguyễn Văn Minh"  (giống nhau mọi nơi)
  Address: "123 Nguyễn Văn Linh, P. Tân Thuận Tây, Q.7, TP.HCM"
  Phone:   "+84 901 234 567"

❌ SAI — Không nhất quán:
  GBP:      "Văn phòng BĐS Nguyễn Văn Minh"
  Facebook: "NV Minh BĐS"
  Foody:    "Nguyễn Minh Real Estate"
```

---

## 7. Review Management Protocol

### Thu thập Review
- Gửi link GBP đến khách sau khi hoàn thành giao dịch
- Đặt QR code dẫn đến link review tại văn phòng
- Follow up email/Zalo sau 7 ngày
- **Không**: mua review giả, ép buộc review, review chéo

### Phản hồi Review
- **Thời gian**: Phản hồi trong 24–48h
- **Positive reviews**: Cảm ơn + nhắc lại tên location + khu vực (SEO signal)
- **Negative reviews**: Thừa nhận + xin lỗi + offer resolution + offline contact

```
Template phản hồi review tốt:
"Cảm ơn [Tên khách] đã tin tưởng Văn phòng [Tên] tại [Khu vực]! 
Chúng tôi rất vui khi hỗ trợ được anh/chị. Nếu cần thêm thông tin 
về [dịch vụ] tại [khu vực], đừng ngần ngại liên hệ lại nhé."
```

### Review Velocity Targets
| Giai đoạn | Mục tiêu | Ghi chú |
|-----------|---------|---------|
| Tháng 1–3 | ≥ 5 reviews / location | Seed ban đầu |
| Tháng 4–6 | ≥ 10 reviews / location | Tăng tốc |
| Tháng 7–12 | ≥ 2 reviews/tháng | Duy trì đều đặn |
| Rating target | ≥ 4.2/5 | Minimum cho local pack |

---

## 8. Internal Linking Architecture

```
Trang chủ
├── /bds/ ──────────────────────────────→ /bds/tp-ho-chi-minh/
│   └── /bds/tp-ho-chi-minh/ ──────────→ /bds/tp-ho-chi-minh/quan-7/
│       └── /bds/tp-ho-chi-minh/quan-7/ → /tp-hcm/q7/van-phong-bds-abc
│
└── /agent/ ────────────────────────────→ /agent/nguyen-van-minh
    └── Agent page → link về Location pages họ phụ trách

RULES:
1. Mỗi Location page PHẢI được link từ parent District page
2. Mỗi District page PHẢI được link từ parent Province page
3. Mỗi Agent page PHẢI link sang Location pages họ phụ trách
4. Mỗi Location page PHẢI link sang Agent profiles tại đó
5. Related locations: mỗi Location page link ≥ 3 locations gần đó
```

---

## 9. Measurement KPIs

### Location SEO KPIs (per location/agent page)

| KPI | Tracking tool | Target 6 tháng |
|-----|--------------|----------------|
| Organic impressions | Google Search Console | +50% |
| Organic clicks | Google Search Console | +40% |
| Average position | Google Search Console | Top 10 cho brand+location |
| Local pack appearances | BrightLocal / manual check | Xuất hiện cho 5+ từ khóa |
| GBP calls | GBP Insights | ≥20 calls/tháng |
| GBP direction requests | GBP Insights | ≥10/tháng |
| GBP website clicks | GBP Insights | ≥30/tháng |
| Review rating | GBP / aggregated | ≥4.2 |
| Review count | GBP | ≥10 |
| Page load (LCP) | PageSpeed Insights | ≤2.5s |
| Schema errors | Rich Results Test | 0 errors |

### Site-wide SEO KPIs

| KPI | Target |
|-----|--------|
| Indexed pages | ≥90% of published pages |
| Core Web Vitals pass | ≥80% of pages |
| Sitemap coverage | 100% of location pages |
| Citation consistency | 100% NAP match |
| Response rate to reviews | ≥80% |

---

## 10. Review & Update Schedule

| Task | Tần suất |
|------|----------|
| NAP audit (toàn bộ citations) | Quý (3 tháng/lần) |
| Schema validation | Hàng tháng |
| Core Web Vitals check | Hàng tháng |
| Sitemap re-submit | Khi có thêm pages mới |
| Review response | Hàng ngày (24h SLA) |
| GBP posts/updates | Hàng tuần |
| Content freshness audit | 6 tháng/lần |
| Competitor analysis | 6 tháng/lần |
| **VN admin mapping update** | Khi có thông tin chính thức mới về phường mới |
| **Brand authorization verify** | Quý (kiểm tra hợp đồng đại lý còn hiệu lực) |

---

## Version Tracking
| Version | Ngày | Thay đổi |
|---------|------|---------|
| 1.1.0 | 2026-05-06 | Bổ sung Brand schema types, Brand Portal vào citation tiers, VN admin tasks vào review schedule |
| 1.0.0 | 2026-05-06 | Khởi tạo Local SEO Health Checklist |
