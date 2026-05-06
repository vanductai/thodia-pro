# Location Page — Đặc tả thông tin & SEO Standards
> Pro.Thodia.so | Danh bạ Đại lý kinh doanh cấp cao

---

## 1. Mục tiêu của Location Page

Location Page là trang hồ sơ cho từng **địa điểm kinh doanh** (văn phòng, chi nhánh của đại lý). Mục tiêu:
- Là landing page gắn với GBP cho địa điểm cụ thể
- Rank cho từ khóa "[dịch vụ] + [khu vực]" (local pack)
- Phân biệt rõ với Agent Page: location là "nơi", agent là "người"
- Hỗ trợ tìm kiếm "near me" và geo-targeted search

> **Lưu ý quan trọng**: Một đại lý có thể có nhiều Location Page nếu hoạt động ở nhiều địa điểm.

---

## 2. Thông tin bắt buộc (Required Fields)

### 2.1 Thông tin địa điểm
| Field | Mô tả | Format | Ví dụ |
|-------|--------|--------|-------|
| `location_name` | Tên văn phòng/chi nhánh | Text | Văn phòng Môi giới BĐS Khu vực Quận 7 |
| `street_address` | Số nhà + tên đường | Text | 123 Nguyễn Văn Linh |
| `ward` | Phường/Xã *(cấu trúc mới 2025 — bắt buộc)* | Text | Phường Tân Thuận Tây |
| `legacy_district` | Quận cũ *(giữ để SEO — bắt buộc)* | Text | Quận 7 |
| `city` | Tỉnh/Thành phố | Text | TP. Hồ Chí Minh |
| `postal_code` | Mã bưu điện | Text | 700000 |
| `latitude` | Vĩ độ | Decimal (7 chữ số) | 10.7285416 |
| `longitude` | Kinh độ | Decimal (7 chữ số) | 106.7178903 |
| `phone_primary` | Số điện thoại chính | +84XXXXXXXXX | +84901234567 |
| `phone_secondary` | Số phụ (nếu có) | +84XXXXXXXXX | +84281234567 |
| `email` | Email văn phòng | Email | office@example.com |
| `category` | Loại dịch vụ chính | Enum | bds / xe-co / bao-hiem |
| `primary_brand` | Brand chính được ủy quyền *(bắt buộc nếu là đại lý)* | Text | VinFast |
| `is_authorized_dealer` | Là đại lý chính thức? | Boolean | true |

> ⚠️ **VN Admin Dual-Field**: `ward` + `legacy_district` cần được lưu riêng biệt trong DB. URL canonical dùng `ward`, redirect từ `legacy_district`. Xem `07-vn-admin-seo-strategy.md`.

### 2.2 Giờ hoạt động
```
opening_hours: {
  mon: { open: "08:00", close: "18:00" },
  tue: { open: "08:00", close: "18:00" },
  wed: { open: "08:00", close: "18:00" },
  thu: { open: "08:00", close: "18:00" },
  fri: { open: "08:00", close: "18:00" },
  sat: { open: "08:30", close: "17:00" },
  sun: { open: null, close: null }  // null = đóng cửa
}
```

### 2.3 Thông tin dịch vụ
| Field | Mô tả | Ghi chú |
|-------|--------|---------|
| `services` | Danh sách dịch vụ | Tối thiểu 3 dịch vụ, có mô tả |
| `service_area` | Khu vực phục vụ | Liệt kê quận/huyện cụ thể |
| `business_description` | Mô tả địa điểm | 200–400 từ unique |
| `unique_features` | Điểm nổi bật | Parking, thang máy, gần landmark… |

### 2.4 Media
| Field | Mô tả | Yêu cầu |
|-------|--------|---------|
| `photo_exterior` | Ảnh mặt tiền văn phòng | Bắt buộc, ≥1 ảnh |
| `photo_interior` | Ảnh bên trong | Bắt buộc, ≥2 ảnh |
| `photo_team` | Ảnh đội ngũ | Khuyến nghị, ≥1 ảnh |
| `photo_products` | Ảnh sản phẩm/dịch vụ | Tùy theo ngành |
| `video_tour` | Video tham quan văn phòng | Khuyến nghị |

### 2.5 Liên kết ngoài
| Field | Mô tả |
|-------|--------|
| `gbp_url` | Google Business Profile URL |
| `facebook_page_url` | Facebook Page URL |
| `zalo_oa_url` | Zalo Official Account |
| `website_url` | Website riêng (nếu có) |
| `map_embed_url` | Google Maps embed URL |

---

## 3. Thông tin khuyến nghị (Recommended Fields)

| Field | Mô tả | Lý do |
|-------|--------|-------|
| `parking_info` | Thông tin đỗ xe | Tăng convenience signal |
| `public_transport` | Xe buýt, metro gần đó | Mobile users |
| `nearby_landmarks` | Landmark nổi tiếng gần đó | Hyperlocal SEO |
| `accessibility` | Tiếp cận người khuyết tật | Inclusive + Trust |
| `payment_methods` | Phương thức thanh toán | Chuyển khoản, tiền mặt… |
| `faq` | 3–5 câu hỏi thường gặp | Topical authority |
| `reviews_featured` | 3–5 reviews được chọn lọc | Social proof |
| `team_members` | Danh sách nhân viên tại location | E-E-A-T |
| `additional_brands` | Brands phụ (nếu đa thương hiệu) | Array |
| `brand_showroom_id` | Mã showroom trong hệ thống brand | Text |

---

## 4. Cấu trúc URL Location Page

```
Pattern canonical (dùng tên phường mới — 2025+):
/{tinh-slug}/{phuong-slug}/{location-slug}

Pattern geo cluster (khu vực quận cũ — có thể index):
/{tinh-slug}/khu-vuc-{quan-slug}/{location-slug}  → redirect 301 → canonical

Rules:
- Không dấu tiếng Việt
- Hyphen (-) giữa các từ
- Lowercase
- Dùng tên phường làm canonical, giữ khu-vuc-{quan} cho Geo Cluster

Ví dụ thực tế cho Pro.Thodia.so:
/tp-ho-chi-minh/phuong-tan-thuan-tay/van-phong-bds-nguyen-van-minh  ← CANONICAL
/tp-ho-chi-minh/khu-vuc-quan-7/  ← Geo Cluster page (index, liên kết đến phường)

/ha-noi/phuong-dich-vong-hau/showroom-vinfast-tran-thi-lan
/da-nang/phuong-hai-chau-1/van-phong-bao-hiem-le-quoc-bao

Brand dealer pages:
/brand/vinfast/dai-ly/tp-ho-chi-minh/phuong-tan-thuan-tay/

Category landing pages (sử dụng cấu trúc mới):
/bds/tp-ho-chi-minh/khu-vuc-quan-7/        → Geo cluster (index)
/bds/tp-ho-chi-minh/phuong-tan-thuan-tay/  → Canonical
/xe-co/ha-noi/                             → Province level
/bao-hiem/da-nang/                         → Province level
```

> 📌 **Xem** `07-vn-admin-seo-strategy.md` để biết chi tiết redirect map và Geo Cluster page spec.

---

## 5. Schema Markup — Location Page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "RealEstateAgent"],
      "@id": "https://pro.thodia.so/tp-ho-chi-minh/van-phong-bds-quan-7#localbusiness",
      "name": "Văn phòng Môi giới BĐS Quận 7 – Nguyễn Văn Minh",
      "image": [
        "https://pro.thodia.so/images/locations/bds-quan7-exterior.jpg",
        "https://pro.thodia.so/images/locations/bds-quan7-interior.jpg"
      ],
      "url": "https://pro.thodia.so/tp-ho-chi-minh/van-phong-bds-quan-7-nguyen-van-minh",
      "telephone": "+84901234567",
      "email": "office.quan7@example.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Nguyễn Văn Linh",
        "addressLocality": "Phường Tân Thuận Tây",
        "addressRegion": "TP. Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      },
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "legacy_district",
        "value": "Quận 7 (cũ)"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.7285416,
        "longitude": 106.7178903
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:30",
          "closes": "17:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "47"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "name": "Mua nhà ở Quận 7 rất thuận tiện",
          "reviewBody": "Anh Minh tư vấn rất nhiệt tình, hỗ trợ hoàn tất thủ tục nhanh chóng...",
          "author": {"@type": "Person", "name": "Trần Thị B"},
          "datePublished": "2025-03-15"
        }
      ],
      "areaServed": [
        {"@type": "AdministrativeArea", "name": "Phường Tân Thuận Tây, TP.HCM"},
        {"@type": "AdministrativeArea", "name": "Phường Tân Thuận Đông, TP.HCM"},
        {"@type": "AdministrativeArea", "name": "Nhà Bè, TP.HCM"},
        {"@type": "AdministrativeArea", "name": "Khu vực Quận 7 cũ, TP.HCM"}
      ],
      "brand": {
        "@type": "Brand",
        "name": "Vinhomes",
        "url": "https://vinhomes.vn"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dịch vụ môi giới BĐS",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Môi giới mua bán căn hộ",
              "description": "Tư vấn và hỗ trợ mua bán căn hộ chung cư tại Quận 7"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Môi giới cho thuê văn phòng",
              "description": "Tìm kiếm và kết nối văn phòng cho thuê khu vực Quận 7, Phú Mỹ Hưng"
            }
          }
        ]
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Pro.Thodia.so",
        "url": "https://pro.thodia.so"
      },
      "sameAs": [
        "https://www.google.com/maps/place/...",
        "https://www.facebook.com/vanphongnguyen.quan7"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://pro.thodia.so"},
        {"@type": "ListItem", "position": 2, "name": "BĐS TP.HCM", "item": "https://pro.thodia.so/bds/tp-ho-chi-minh"},
        {"@type": "ListItem", "position": 3, "name": "BĐS Quận 7", "item": "https://pro.thodia.so/bds/tp-ho-chi-minh/quan-7"},
        {"@type": "ListItem", "position": 4, "name": "Văn phòng BĐS Quận 7 – Nguyễn Văn Minh", "item": "https://pro.thodia.so/tp-ho-chi-minh/van-phong-bds-quan-7-nguyen-van-minh"}
      ]
    }
  ]
}
```

---

## 6. Cấu trúc nội dung Location Page

```
[HERO SECTION]
- H1: [Loại dịch vụ] + [Tên location] + tại [Khu vực]
  VD: "Văn phòng Môi giới BĐS Quận 7 – Nguyễn Văn Minh"
- Ảnh header (exterior hoặc team photo)
- Quick action bar: Gọi ngay | Chỉ đường | Nhắn Zalo
- Badge: Đã xác minh | X năm kinh nghiệm | Rating X/5 (Y đánh giá)

[NAP BLOCK — Structured, Crawlable]
- Địa chỉ đầy đủ (dạng câu văn tự nhiên + structured)
  VD: "Văn phòng tọa lạc tại 123 Nguyễn Văn Linh, Phường Tân Thuận Tây, 
       Quận 7, TP. Hồ Chí Minh (gần Phú Mỹ Hưng)"
- Số điện thoại (click-to-call)
- Giờ hoạt động (theo từng ngày)
- Google Maps embed

[BUSINESS DESCRIPTION] (H2)
- 200–400 từ unique về địa điểm + dịch vụ + khu vực phục vụ
- Đề cập landmarks, đặc điểm địa phương cụ thể
- Tự nhiên, không keyword stuffing

[SERVICES] (H2)
- Grid 3-6 dịch vụ với icon, tên, mô tả 50-100 từ/dịch vụ

[AREA SERVED] (H2)
- Bản đồ khu vực phục vụ
- Danh sách quận/phường cụ thể

[PHOTOS GALLERY] (H2)
- Exterior: ≥2 ảnh
- Interior: ≥3 ảnh
- Team: ≥1 ảnh

[REVIEWS SECTION] (H2)
- Aggregate rating (stars + count)
- 3–5 reviews có tên + ngày + nội dung cụ thể

[TEAM AT THIS LOCATION] (H2)
- Danh sách đại lý tại location này (link sang Agent Page)

[LOCAL CONTEXT] (H2)
- Hướng dẫn đường đi từ landmark nổi tiếng
- Thông tin đỗ xe
- Phương tiện công cộng gần đó

[FAQ] (H2)
- 3–5 câu hỏi bản địa hóa theo khu vực
- Format Q&A với FAQPage schema

[RELATED LOCATIONS] (H2)
- 3–5 location tương tự gần đó (internal linking)
```

---

## 7. Meta Tags Standards

```html
<!-- Title: 50-60 chars -->
<title>[Dịch vụ] [Tên location] [Khu vực] | Pro.Thodia.so</title>
<!-- Ví dụ: -->
<title>Môi giới BĐS Quận 7 TP.HCM – Nguyễn Văn Minh | Pro.Thodia.so</title>

<!-- Meta Description: 140-155 chars -->
<meta name="description" content="Văn phòng môi giới BĐS uy tín tại Quận 7 TP.HCM. [X] năm kinh nghiệm, chuyên [dịch vụ]. ☎ [phone]. Giờ làm việc: T2–T7, 8h–18h.">

<!-- Geo meta tags (dùng tên phường mới là canonical) -->
<meta name="geo.region" content="VN-SG">
<meta name="geo.placename" content="Phường Tân Thuận Tây, TP. Hồ Chí Minh">
<meta name="geo.position" content="10.7285416;106.7178903">
<meta name="ICBM" content="10.7285416, 106.7178903">
<!-- Dual-mention cho search: tham chiếu cả tên cũ lẫn mới trong meta description -->
<!-- VD: "...tại Phường Tân Thuận Tây (khu vực Quận 7 cũ), TP.HCM..." -->
```

---

## 8. Nội dung Business Description — Template chuẩn

```
[Tên location/văn phòng] là địa điểm cung cấp dịch vụ [loại dịch vụ] 
tại [khu vực], do [đại lý phụ trách] với hơn [X] năm kinh nghiệm điều hành.

Tọa lạc tại [số nhà + đường], Phường [X] (khu vực [Tên quận cũ] trước đây), TP. [Tỉnh/TP], gần [landmark 1] và [landmark 2], văn phòng 
phục vụ khách hàng tại các phường: [Phường 1], [Phường 2] và [Phường 3].

Các dịch vụ chính tại đây bao gồm: [dịch vụ 1], [dịch vụ 2], [dịch vụ 3].

[Nếu là đại lý brand]: Địa điểm này là showroom/đại lý ủy quyền chính thức của [Brand] tại TP. [Tỉnh/TP].

[1–2 câu về điểm khác biệt: uy tín, kinh nghiệm, cam kết dịch vụ.]

Liên hệ trực tiếp qua số [phone] hoặc ghé văn phòng trong giờ làm việc 
[giờ] để được tư vấn miễn phí.

Các dịch vụ chính tại đây bao gồm: [dịch vụ 1], [dịch vụ 2], [dịch vụ 3].

[1–2 câu về điểm khác biệt: uy tín, kinh nghiệm, cam kết dịch vụ.]

Liên hệ trực tiếp qua số [phone] hoặc ghé văn phòng trong giờ làm việc 
[giờ] để được tư vấn miễn phí.
```

---

## 9. Quality Score Targets

| Tiêu chí | Min Pass | Target |
|----------|----------|--------|
| Score tổng (100đ) | 70 | 85+ |
| NAP accuracy | Bắt buộc | 100% |
| Unique content | ≥200 từ | 400+ từ |
| Schema: pass Rich Results Test | Bắt buộc | No warnings |
| Photos | ≥3 | ≥8 |
| Reviews | 0 | ≥5 |
| Internal links inbound | ≥1 | ≥3 |
| Mobile LCP | ≤4s | ≤2.5s |

---

## Version Tracking
| Version | Ngày | Thay đổi |
|---------|------|---------|
| 1.1.0 | 2026-05-06 | Bổ sung `primary_brand`, `is_authorized_dealer`, `legacy_district` fields; cập nhật URL pattern và schema theo dual-structure VN admin 2025; thêm `brand` property vào schema |
| 1.0.0 | 2026-05-06 | Khởi tạo đặc tả Location Page |
