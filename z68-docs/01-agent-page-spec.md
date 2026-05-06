# Agent Page — Đặc tả thông tin & SEO Standards
> Pro.Thodia.so | Danh bạ Đại lý kinh doanh cấp cao

---

## 1. Mục tiêu của Agent Page

Agent Page là trang hồ sơ cá nhân cho từng **đại lý kinh doanh** (BĐS, xe cộ, bảo hiểm). Mục tiêu:
- Là "mini landing page" chuẩn SEO gắn với GBP của đại lý
- Cung cấp đầy đủ thông tin để Google hiểu entity đại lý
- Tạo lead trực tiếp (gọi, nhắn Zalo, đặt lịch tư vấn)
- Đánh giá E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness

> 📌 **2 loại Agent** cần xử lý khác nhau:
> - **Location-based Agent**: gắn với Location Page cụ thể (showroom, văn phòng)
> - **Freelance Agent**: làm trực tiếp với Brand, không thuộc Location nào — xem Section 10

---

## 2. Thông tin bắt buộc (Required Fields)

### 2.1 Thông tin cá nhân
| Field | Mô tả | Format | Ví dụ |
|-------|--------|--------|-------|
| `agent_name` | Tên đầy đủ | Chuẩn hóa: Họ Tên | Nguyễn Văn Minh |
| `agent_photo` | Ảnh đại diện | Chân dung rõ mặt, nền trắng/sáng, ≥400×400px | — |
| `agent_title` | Chức danh | Cụ thể theo lĩnh vực | Môi giới BĐS Chuyên nghiệp |
| `license_number` | Số chứng chỉ hành nghề | Text | CC-BĐS-HCM-2021-0xxxxx |
| `license_issuer` | Cơ quan cấp | Text | Sở Xây dựng TP.HCM |
| `years_experience` | Số năm kinh nghiệm | Integer | 8 |
| `phone` | Điện thoại chính | +84XXXXXXXXX | +84901234567 |
| `phone_zalo` | Số Zalo (nếu khác) | +84XXXXXXXXX | +84901234567 |
| `email` | Email liên hệ | Email | agent@example.com |

### 2.2 Khu vực & Chuyên môn
| Field | Mô tả | Format | Freelance | Location-based |
|-------|--------|--------|-----------|----------------|
| `agent_type` | Loại đại lý | Enum: `freelance` / `location-based` | Bắt buộc | Bắt buộc |
| `category` | Loại đại lý | Enum: bds/xe-co/bao-hiem | ✅ | ✅ |
| `sub_category` | Chuyên ngành con | Text | ✅ | ✅ |
| `area_served_province` | Tỉnh/thành hoạt động | Array | ✅ (rộng hơn) | ✅ |
| `area_served_ward` | Phường/Xã chính | Array | ❌ Tùy chọn | ✅ Bắt buộc |
| `area_served_legacy_district` | Quận/huyện cũ | Array | ❌ Tùy chọn | ✅ Bắt buộc |
| `office_address` | Địa chỉ văn phòng | Full address | ❌ **Không có** | ✅ Bắt buộc |
| `office_lat` | Vĩ độ | Decimal (7 chữ số) | ❌ **Không có** | ✅ Bắt buộc |
| `office_lng` | Kinh độ | Decimal (7 chữ số) | ❌ **Không có** | ✅ Bắt buộc |

> ⚠️ **VN Admin Change 2025**: Việt Nam đã bỏ cấp Quận. Luôn lưu cả `area_served_ward` (mới) lẫn `area_served_legacy_district` (cũ) để SEO coverage đầy đủ. Xem `07-vn-admin-seo-strategy.md` để biết chi tiết.

### 2.3 Thông tin nghề nghiệp
| Field | Mô tả | Format | Ví dụ |
|-------|--------|--------|-------|
| `bio` | Giới thiệu bản thân | 150–300 từ, tự nhiên | — |
| `services` | Danh sách dịch vụ cung cấp | Array of objects | Xem chi tiết bên dưới |
| `achievements` | Thành tích nổi bật | Array | ["Top 10 môi giới Q.7 2024"] |
| `working_hours` | Giờ làm việc | OpeningHours format | Mon–Sat 08:00–18:00 |
| `languages` | Ngôn ngữ phục vụ | Array | ["Tiếng Việt", "Tiếng Anh"] |

### 2.4 Social & Digital Presence
| Field | Mô tả | Format |
|-------|--------|--------|
| `gbp_url` | Link Google Business Profile | URL |
| `facebook_url` | Facebook cá nhân/fanpage | URL |
| `zalo_oa_url` | Zalo Official Account | URL |
| `youtube_url` | Kênh YouTube (nếu có) | URL |
| `tiktok_url` | TikTok (nếu có) | URL |

### 2.5 Brand Authorization *(Mới — bắt buộc với đại lý xe & bảo hiểm)*
| Field | Mô tả | Format | Ví dụ |
|-------|--------|--------|-------|
| `authorized_brands` | Danh sách brand được ủy quyền | Array | ["VinFast", "Honda"] |
| `primary_brand` | Brand chính (nếu chuyên 1 brand) | Text | VinFast |
| `brand_dealer_code` | Mã đại lý do brand cấp | Text | VF-HCM-2023-0042 |
| `brand_certification_url` | Link chứng nhận đại lý chính thức | URL | — |
| `brand_tier` | Hạng đại lý | Enum: gold/silver/bronze | gold |

---

## 3. Thông tin khuyến nghị (Recommended Fields)

| Field | Mô tả |
|-------|--------|
| `portfolio` | Danh sách 5–10 giao dịch thành công tiêu biểu |
| `testimonials` | 3–5 lời chứng thực từ khách hàng thực |
| `certifications` | Chứng chỉ, bằng cấp liên quan |
| `video_intro` | Video giới thiệu ≤3 phút |
| `team_name` | Tên nhóm/team (nếu là team lead) |
| `company_name` | Tên công ty/sàn đang cộng tác |
| `brand_agreement_year` | Năm ký kết hợp đồng đại lý với brand | Integer |

---

## 4. Cấu trúc URL Agent Page

```
Pattern: /agent/{ten-dai-ly-slug}

Rules:
- Lowercase, loại bỏ dấu tiếng Việt
- Dùng hyphen (-), không underscore (_)
- Bao gồm tên đầy đủ (không viết tắt)
- Append ID ngắn nếu trùng tên

Ví dụ:
/agent/nguyen-van-minh
/agent/le-thi-thu-ha
/agent/tran-quoc-bao-bds
```

---

## 5. Schema Markup — Agent Page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pro.thodia.so/agent/nguyen-van-minh#person",
      "name": "Nguyễn Văn Minh",
      "jobTitle": "Môi giới Bất động sản Chuyên nghiệp",
      "description": "[Bio 150-300 từ]",
      "image": "https://pro.thodia.so/images/agents/nguyen-van-minh.jpg",
      "telephone": "+84901234567",
      "email": "minhbds@example.com",
      "url": "https://pro.thodia.so/agent/nguyen-van-minh",
      "worksFor": {
        "@type": "Organization",
        "name": "Sàn BĐS XYZ",
        "url": "https://sanxyz.vn"
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Phường Tân Thuận Tây, TP.HCM"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Phường Tân Thuận Đông, TP.HCM",
          "description": "Khu vực Quận 7 cũ"
        }
      ],
      "knowsAbout": ["Bất động sản", "Căn hộ chung cư", "Đất nền", "Định giá BĐS"],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Chứng chỉ hành nghề môi giới BĐS",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Sở Xây dựng TP.HCM"
        }
      },
      "brand": [
        {
          "@type": "Brand",
          "name": "Vinhomes",
          "url": "https://vinhomes.vn"
        }
      ],
      "sameAs": [
        "https://www.google.com/maps/place/...",
        "https://www.facebook.com/nguyen.van.minh.bds"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://pro.thodia.so"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Đại lý BĐS",
          "item": "https://pro.thodia.so/bds"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Nguyễn Văn Minh",
          "item": "https://pro.thodia.so/agent/nguyen-van-minh"
        }
      ]
    }
  ]
}
```

---

## 6. Cấu trúc trang (Page Layout)

```
[HERO SECTION]
- Ảnh đại diện chuyên nghiệp (nổi bật)
- Tên (H1): [Chức danh] [Tên]
- Badge: Loại đại lý | Số năm kinh nghiệp | Khu vực
- [Freelance]: Badge "Đại lý độc lập" + Brand logo được ủy quyền
- CTA chính: Gọi ngay | Nhắn Zalo | Đặt lịch tư vấn

[QUICK INFO BAR]
- Số điện thoại (click-to-call)
- Giờ làm việc
- Khu vực phục vụ
- Rating aggregate
- [Location-based]: Địa chỉ văn phòng + Google Maps
- [Freelance]: "Phục vụ tại nhà khách / Online / Toàn TP.HCM"

[BIO SECTION] (H2)
- Giới thiệu bản thân 150-300 từ tự nhiên
- Chứng chỉ hành nghề + cơ quan cấp
- Brand được ủy quyền (logo + mã đại lý)
- Thành tích nổi bật

[SERVICES SECTION] (H2)
- Grid dịch vụ cung cấp (icon + tên + mô tả ngắn)

[PORTFOLIO SECTION] (H2)
- 5-10 giao dịch tiêu biểu (loại, khu vực, kết quả)

[REVIEWS SECTION] (H2)
- Aggregate rating (sao + số lượng)
- 3-5 reviews nổi bật

[AREA SERVED] (H2)
- [Location-based]: Bản đồ phục vụ + danh sách phường cụ thể
- [Freelance]: Map khu vực rộng hơn (tỉnh/TP), có note "Phục vụ tại địa chỉ khách hàng"

[FAQ SECTION] (H2)
- 3-5 câu hỏi phổ biến địa phương hóa

[CONTACT SECTION]
- Form liên hệ
- [Location-based]: Địa chỉ văn phòng + Google Maps embed
- [Freelance]: Chỉ hiển thị phone + Zalo + email (không có Google Maps)
```

---

## 7. Meta Tags Standards

```html
<!-- Title: 50-60 chars -->
<title>[Tên đại lý] - [Chức danh] tại [Khu vực] | Pro.Thodia.so</title>
<!-- Ví dụ: -->
<title>Nguyễn Văn Minh - Môi giới BĐS Quận 7 TP.HCM | Pro.Thodia.so</title>

<!-- Meta Description: 140-155 chars -->
<meta name="description" content="[Tên] - [Số năm] năm kinh nghiệm môi giới [chuyên ngành] tại [khu vực]. [Dịch vụ chính]. Liên hệ [phone] để được tư vấn miễn phí.">

<!-- OG Tags -->
<meta property="og:title" content="[Title]">
<meta property="og:description" content="[Meta description]">
<meta property="og:image" content="[URL ảnh đại diện]">
<meta property="og:url" content="https://pro.thodia.so/agent/[slug]">
<meta property="og:type" content="profile">
```

---

## 8. Nội dung Bio — Template chuẩn

```
[Tên đầy đủ] là [chức danh] với hơn [X] năm kinh nghiệm trong lĩnh vực 
[chuyên ngành] tại khu vực [tỉnh/TP].

[1-2 câu về chuyên môn nổi bật và loại giao dịch thường xuyên thực hiện.]

[1 câu về cam kết/phong cách làm việc với khách hàng.]

[Location-based]: Khu vực phục vụ chính: [Danh sách phường cụ thể] (khu vực [tên quận cũ] trước đây), TP. [Tỉnh/Thành phố].
[Freelance]: Phục vụ khách hàng toàn [tỉnh/TP] — gặp mặt tại địa chỉ khách hàng hoặc tư vấn online.

[Nếu là đại lý brand]: [Tên] là đại lý ủy quyền chính thức của [Brand] tại [khu vực], với mã đại lý [code] do [Brand] cấp.

Liên hệ [Tên] qua số [phone] hoặc Zalo [số] để được tư vấn và hỗ trợ 
[dịch vụ chính] tại [khu vực].
```

---

## 9. Quality Score Target

| Tiêu chí | Min | Target |
|----------|-----|--------|
| Điểm chất lượng tổng (100đ) | 70 | 85+ |
| Ảnh đại diện (có, rõ mặt) | Bắt buộc | ≥3 ảnh |
| Bio length | 100 từ | 200+ từ |
| Số dịch vụ liệt kê | 2 | 5+ |
| Reviews | 0 | 5+ |
| Schema validation | Pass | Pass + no warnings |

---

## Version Tracking
| Version | Ngày | Thay đổi |
|---------|------|---------|
| 1.2.0 | 2026-05-06 | Bổ sung `agent_type` (freelance vs location-based), cập nhật Section 2.2 với bảng so sánh 2 loại, cập nhật page layout theo type, bio template dual-path, bổ sung Section 10 Freelance Agent spec |
| 1.1.0 | 2026-05-06 | Bổ sung Brand Authorization fields (Section 2.5), cập nhật address format VN admin mới |
| 1.0.0 | 2026-05-06 | Khởi tạo đặc tả Agent Page |

---

## 10. Freelance Agent — Đặc tả riêng

> **Định nghĩa**: Freelance Agent là đại lý làm việc trực tiếp với Brand (VinFast, Manulife, Vinhomes...) mà **không gắn với bất kỳ Location/văn phòng nào**. Họ gặp khách tại nhà khách hoặc tư vấn online.

### 10.1 Điểm khác biệt cốt lõi so với Location-based Agent

| Yếu tố | Location-based | Freelance |
|--------|---------------|-----------|
| Địa chỉ cố định | ✅ Có (văn phòng/showroom) | ❌ Không có |
| GBP type | `LocalBusiness` + `Person` | `Person` (Service Area Business) |
| Schema `address` | Bắt buộc | **Không dùng** |
| Schema `geo` | Bắt buộc | **Không dùng** |
| `areaServed` granularity | Phường/Quận | Tỉnh/TP (rộng hơn) |
| URL internal linking | Brand + Location + Category | Brand + Category (không có Location) |
| Google Maps embed | ✅ Có | ❌ Không có |
| Sitemap priority | 0.8 | 0.7 (vì không có geo anchor) |

### 10.2 Schema Markup — Freelance Agent

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pro.thodia.so/agent/tran-thi-lan-vinfast#person",
      "name": "Trần Thị Lan",
      "jobTitle": "Đại lý VinFast Độc lập",
      "description": "[Bio 150-300 từ, đề cập rõ 'phục vụ tại nhà khách hoặc online']",
      "image": "https://pro.thodia.so/images/agents/tran-thi-lan.jpg",
      "telephone": "+84901234567",
      "email": "lan.vinfast@example.com",
      "url": "https://pro.thodia.so/agent/tran-thi-lan-vinfast",
      "worksFor": {
        "@type": "Organization",
        "name": "VinFast",
        "url": "https://vinfastauto.com"
      },
      "areaServed": [
        {
          "@type": "State",
          "name": "TP. Hồ Chí Minh"
        },
        {
          "@type": "State",
          "name": "Bình Dương"
        }
      ],
      "serviceType": "Mobile/Home Visit & Online Consultation",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceType": "Home Visit",
        "availableLanguage": "vi"
      },
      "brand": [
        {
          "@type": "Brand",
          "name": "VinFast",
          "url": "https://vinfastauto.com"
        }
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Chứng nhận đại lý VinFast",
        "recognizedBy": {
          "@type": "Organization",
          "name": "VinFast Auto"
        }
      },
      "sameAs": [
        "https://www.facebook.com/tran.thi.lan.vinfast",
        "https://zalo.me/0901234567"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://pro.thodia.so"},
        {"@type": "ListItem", "position": 2, "name": "Đại lý Xe cộ", "item": "https://pro.thodia.so/xe-co"},
        {"@type": "ListItem", "position": 3, "name": "VinFast", "item": "https://pro.thodia.so/brand/vinfast"},
        {"@type": "ListItem", "position": 4, "name": "Trần Thị Lan", "item": "https://pro.thodia.so/agent/tran-thi-lan-vinfast"}
      ]
    }
  ]
}
```

> ⚠️ **Lưu ý Schema**: Freelance Agent **KHÔNG dùng** `LocalBusiness` schema — chỉ dùng `Person`. Không có `address`, không có `geo`, không có `openingHoursSpecification`.

### 10.3 GBP Setup — Freelance Agent

Freelance Agent dùng kiểu **Service Area Business (SAB)** trên Google:

```
GBP Type: Service Area Business
Địa chỉ: Ẩn địa chỉ (tick "I serve customers at their location")
Service Area: Chọn tỉnh/TP phục vụ
Category GBP:
  - Xe: "Car Dealer" hoặc "Motor Vehicle Dealer"
  - BĐS: "Real Estate Agent"  
  - Bảo hiểm: "Insurance Agency"
```

> ✅ **Lợi ích SAB**: Google hiểu đây là dịch vụ lưu động, vẫn rank được trong local pack nhưng không hiện địa chỉ cố định.

### 10.4 Internal Linking — Freelance Agent

```
Freelance Agent được liên kết từ:
├── /brand/{brand-slug}/dai-ly/           ← Brand Dealer listing
├── /xe-co/{tinh-slug}/                   ← Category Province listing
├── /xe-co/{tinh-slug}/khu-vuc-{quan}/    ← Geo Cluster (nếu có service area)
└── /agent/                               ← Agent directory

Freelance Agent KHÔNG liên kết từ:
└── Location pages (vì không thuộc location nào)
```

### 10.5 Meta Tags — Freelance Agent

```html
<!-- Title: nhấn mạnh "độc lập" và brand -->
<title>Trần Thị Lan - Đại lý VinFast Độc lập tại TP.HCM | Pro.Thodia.so</title>

<!-- Meta description: nhấn mạnh "phục vụ tại nhà" -->
<meta name="description" content="Trần Thị Lan — đại lý VinFast ủy quyền, tư vấn tại nhà và online toàn TP.HCM. 5 năm kinh nghiệm. ☎ 0901 234 567 — Zalo sẵn sàng 8h–20h.">

<!-- KHÔNG dùng geo meta tags vì không có địa chỉ cố định -->
<!-- geo.region, geo.placename, geo.position: BỎ QUA -->
```

### 10.6 FAQ Template — Freelance Agent

```
Q: [Tên] có văn phòng hay showroom không?
A: [Tên] là đại lý [Brand] độc lập, phục vụ khách hàng tại địa chỉ của quý khách 
   hoặc qua tư vấn online. Điều này giúp quý khách tiết kiệm thời gian di chuyển.

Q: Tôi có thể gặp [Tên] ở đâu?
A: Quý khách có thể đặt lịch gặp tại địa chỉ của mình, tại showroom [Brand] 
   gần nhất, hoặc tư vấn qua Zalo/video call. Liên hệ [phone] để sắp xếp.

Q: [Tên] có phải đại lý chính thức của [Brand] không?
A: Có. [Tên] là đại lý ủy quyền chính thức của [Brand], mã đại lý [code], 
   được [Brand] cấp và xác nhận tại [link chứng nhận].
```

### 10.7 Quality Score — Freelance Agent

| Tiêu chí | Min | Target | Ghi chú |
|----------|-----|--------|---------|
| Score tổng (100đ) | 65 | 80+ | Thấp hơn location-based vì thiếu geo |
| Bio length | 150 từ | 250+ từ | Bù đắp thiếu địa chỉ bằng nội dung |
| Brand cert URL | Bắt buộc | Link chứng nhận | Thay thế cho địa chỉ văn phòng |
| Service area description | Bắt buộc | Rõ ràng tỉnh/TP | Bù cho thiếu geo |
| Reviews | 3 | 8+ | Social proof quan trọng hơn |
| GBP SAB verified | Bắt buộc | ✅ | Thay thế địa chỉ cố định |
