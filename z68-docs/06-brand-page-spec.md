# Brand Page — Đặc tả thông tin & SEO Standards
> Pro.Thodia.so | Đại lý của các brand lớn: Vinfast, Honda, Manulife...

---

## 1. Vai trò của Brand trong hệ thống Pro.Thodia.so

```
BRAND (Vinfast, Honda, Manulife...)
    ↓ isRelatedTo / brand
LOCATION (Đại lý chính thức Vinfast Q.7)
    ↓ employee / hasEmployee
AGENT (Nguyễn Văn Minh - tư vấn viên)
```

**3 loại quan hệ Brand–Location–Agent:**
| Quan hệ | Schema Property | Mô tả |
|---------|----------------|--------|
| Location là đại lý của Brand | `brand` + `sameAs` | Showroom Vinfast ủy quyền |
| Location thuộc Organization của Brand | `subOrganization` / `parentOrganization` | Chi nhánh trực thuộc |
| Agent được Brand cấp phép | `hasCredential` | Đại lý bảo hiểm được Manulife cấp phép |

---

## 2. Brand Page — Thông tin bắt buộc

### 2.1 Thông tin Brand

| Field | Mô tả | Format | Ví dụ |
|-------|--------|--------|-------|
| `brand_name` | Tên brand chính thức | Text | VinFast |
| `brand_name_local` | Tên địa phương hóa | Text | VinFast Việt Nam |
| `brand_logo` | Logo chính thức | URL, ≥200×60px | — |
| `brand_category` | Ngành hàng | Enum: xe-co / bds / bao-hiem | xe-co |
| `brand_sub_category` | Chuyên ngành | Text | Xe điện, xe máy điện |
| `brand_website` | Website chính thức | URL | https://vinfastauto.com |
| `brand_description` | Mô tả thương hiệu | 150–300 từ | — |
| `brand_founding_year` | Năm thành lập | Integer | 2017 |
| `brand_country_origin` | Quốc gia gốc | ISO 3166-1 alpha-2 | VN |
| `brand_headquarters` | Trụ sở chính | Full address | Hà Nội, VN |

### 2.2 Thông tin đại lý ủy quyền

| Field | Mô tả |
|-------|--------|
| `authorized_dealer_program` | Tên chương trình đại lý | VD: "VinFast Authorized Dealer" |
| `dealer_tier` | Cấp đại lý | Gold / Silver / Bronze |
| `dealer_requirements` | Yêu cầu trở thành đại lý | Vốn, diện tích, chứng chỉ... |
| `dealer_count_vn` | Số lượng đại lý tại VN | Integer |
| `contact_for_dealership` | Liên hệ xin đại lý | URL / email / phone |

---

## 3. Brand Page — Cấu trúc URL

```
Pattern:
/brand/{brand-slug}/                          → Brand overview page
/brand/{brand-slug}/dai-ly/                   → Danh sách đại lý của brand này
/brand/{brand-slug}/dai-ly/{tinh-slug}/       → Đại lý theo tỉnh
/brand/{brand-slug}/dai-ly/{tinh-slug}/{phuong-slug}/  → Đại lý theo phường

Ví dụ:
/brand/vinfast/
/brand/vinfast/dai-ly/
/brand/vinfast/dai-ly/tp-ho-chi-minh/
/brand/vinfast/dai-ly/tp-ho-chi-minh/phuong-tan-thuan-tay/

/brand/honda/
/brand/honda/dai-ly/ha-noi/

/brand/manulife/
/brand/manulife/dai-ly/da-nang/
```

---

## 4. Brand Page — Schema Markup

### 4.1 Brand Overview Page
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "AutoDealer"],
      "@id": "https://pro.thodia.so/brand/vinfast#brand",
      "name": "VinFast",
      "alternateName": "VinFast Auto",
      "url": "https://vinfastauto.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pro.thodia.so/images/brands/vinfast-logo.png"
      },
      "description": "VinFast là thương hiệu ô tô Việt Nam, chuyên sản xuất xe điện và xe máy điện...",
      "foundingDate": "2017",
      "foundingLocation": {
        "@type": "Place",
        "name": "Hải Phòng, Việt Nam"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Việt Nam"
      },
      "sameAs": [
        "https://vinfastauto.com",
        "https://www.facebook.com/VinFastVietnam",
        "https://en.wikipedia.org/wiki/VinFast"
      ]
    },
    {
      "@type": "ItemList",
      "name": "Danh sách đại lý VinFast tại Việt Nam",
      "numberOfItems": 127,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://pro.thodia.so/tp-ho-chi-minh/showroom-vinfast-tan-thuan"
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://pro.thodia.so"},
        {"@type": "ListItem", "position": 2, "name": "Thương hiệu xe cộ", "item": "https://pro.thodia.so/xe-co/"},
        {"@type": "ListItem", "position": 3, "name": "VinFast", "item": "https://pro.thodia.so/brand/vinfast/"}
      ]
    }
  ]
}
```

### 4.2 Brand cập nhật trong Location Page Schema
```json
{
  "@type": ["LocalBusiness", "AutoDealer"],
  "name": "Showroom VinFast Tân Thuận – Nguyễn Văn Minh",
  "brand": {
    "@type": "Brand",
    "name": "VinFast",
    "url": "https://vinfastauto.com",
    "logo": "https://vinfastauto.com/images/logo.png"
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "VinFast Auto",
    "url": "https://vinfastauto.com"
  }
}
```

### 4.3 Brand cập nhật trong Agent Page Schema (Bảo hiểm)
```json
{
  "@type": "Person",
  "name": "Trần Thị Lan",
  "jobTitle": "Tư vấn bảo hiểm Manulife",
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Chứng chỉ đại lý bảo hiểm nhân thọ",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Manulife Việt Nam",
      "url": "https://www.manulife.com.vn"
    },
    "issuedBy": {
      "@type": "Organization",
      "name": "Cục Quản lý, giám sát bảo hiểm"
    }
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Manulife Việt Nam",
    "url": "https://www.manulife.com.vn"
  }
}
```

---

## 5. Brand Page — Layout & Content

```
[HERO]
- Brand logo (chính thức, high-res)
- H1: "Đại lý [Brand] ủy quyền tại Việt Nam"
- Tagline của brand
- Nút: "Tìm đại lý gần bạn" (geo-trigger)

[BRAND INFO] (H2)
- Giới thiệu brand (150-300 từ, không phải copy từ website brand)
- Năm thành lập, xuất xứ, quy mô
- Sản phẩm/dịch vụ chính

[DEALER FINDER] (H2)
- Search by tỉnh/thành phố
- Hoặc "Dùng vị trí của tôi" (geolocation)
- Danh sách đại lý theo địa lý

[DEALER MAP]
- Map toàn quốc với pins của từng đại lý

[AUTHORIZED DEALER INFO] (H2)
- Dấu hiệu nhận biết đại lý chính thức
- Quyền lợi khi mua qua đại lý ủy quyền
- CTA: "Đăng ký trở thành đại lý"

[RELATED BRANDS]
- Brands cùng ngành (Honda, Yamaha nếu đang xem Vinfast)
```

---

## 6. Brand Fields bổ sung vào Agent & Location Page

### Bổ sung vào Agent Page
| Field | Bắt buộc | Mô tả |
|-------|----------|--------|
| `authorized_brands` | ✅ | Danh sách brand được ủy quyền (array) |
| `brand_dealer_code` | 🔵 | Mã đại lý do brand cấp |
| `brand_certification_url` | 🔵 | Link chứng nhận đại lý chính thức |
| `brand_tier` | 🔵 | Hạng đại lý (Gold/Silver/Bronze) |

### Bổ sung vào Location Page
| Field | Bắt buộc | Mô tả |
|-------|----------|--------|
| `primary_brand` | ✅ | Brand chính (duy nhất) |
| `additional_brands` | 🔵 | Brands phụ (nếu đa thương hiệu) |
| `is_authorized_dealer` | ✅ | Boolean: có phải đại lý chính thức |
| `brand_showroom_id` | 🔵 | Mã showroom trong hệ thống brand |
| `brand_dealer_agreement` | 🔵 | Năm ký kết hợp đồng đại lý |

---

## 7. Meta Tags — Brand Page

```html
<!-- Brand Overview -->
<title>Đại lý VinFast ủy quyền tại Việt Nam | Pro.Thodia.so</title>
<meta name="description" content="Tìm [X] đại lý VinFast chính hãng trên toàn quốc. Xem địa chỉ, giờ mở cửa, đánh giá. Mua xe VinFast từ đại lý uy tín gần bạn.">

<!-- Brand + Location -->
<title>Đại lý VinFast [Tỉnh/TP] – Danh sách đại lý chính hãng | Pro.Thodia.so</title>
<meta name="description" content="[X] đại lý VinFast chính hãng tại [Tỉnh/TP]. Showroom, dịch vụ bảo hành, lái thử. Tìm đại lý gần nhất tại [Tỉnh].">
```

---

## 8. Sitemap bổ sung cho Brand

```xml
<!-- sitemap-brands.xml -->
<urlset>
  <url>
    <loc>https://pro.thodia.so/brand/vinfast/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pro.thodia.so/brand/vinfast/dai-ly/tp-ho-chi-minh/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ... -->
</urlset>
```

---

## 9. Danh sách Brand theo ngành (seed data)

### Xe cộ (AutoDealer)
| Brand | Schema Type | Website |
|-------|------------|---------|
| VinFast | `AutoDealer` | vinfastauto.com |
| Honda | `AutoDealer` | honda.com.vn |
| Toyota | `AutoDealer` | toyota.com.vn |
| Hyundai | `AutoDealer` | hyundai.com.vn |
| Kia | `AutoDealer` | kia.vn |
| Ford | `AutoDealer` | ford.com.vn |
| Yamaha | `AutoDealer` | yamaha-motor.vn |
| Suzuki | `AutoDealer` | suzuki.com.vn |

### Bảo hiểm (InsuranceAgency)
| Brand | Schema Type | Website |
|-------|------------|---------|
| Manulife | `InsuranceAgency` | manulife.com.vn |
| Prudential | `InsuranceAgency` | prudential.com.vn |
| AIA | `InsuranceAgency` | aia.com.vn |
| Bảo Việt | `InsuranceAgency` | baoviet.com.vn |
| Generali | `InsuranceAgency` | generali.com.vn |
| Sun Life | `InsuranceAgency` | sunlifeinsurance.com.vn |

### BĐS (RealEstateAgent)
| Brand | Schema Type | Ghi chú |
|-------|------------|---------|
| Vinhomes | `RealEstateAgent` | Sàn Vinhomes |
| Nam Long | `RealEstateAgent` | Sàn Nam Long |
| Novaland | `RealEstateAgent` | Novaland Group |
| Hưng Thịnh | `RealEstateAgent` | Hưng Thịnh Corp |

---

## 10. Quality Score — Brand Page

| Tiêu chí | Min | Target |
|----------|-----|--------|
| Logo chất lượng cao | ✅ | ≥512px |
| Brand description unique | ≥100 từ | 200+ từ |
| Schema Organization đúng type | Pass | No warnings |
| Số lượng đại lý listed | ≥5 | 20+ |
| sameAs brand website | ✅ | + Wikipedia + GBP |

---

## Version Tracking
| Version | Ngày | Thay đổi |
|---------|------|---------|
| 1.0.0 | 2026-05-06 | Khởi tạo Brand Page spec |
