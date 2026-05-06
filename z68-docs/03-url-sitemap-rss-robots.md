# URL Structure, Sitemap, RSS & Robots.txt
> Pro.Thodia.so | Local SEO Technical Architecture

---

## 1. URL Taxonomy — Toàn bộ cấu trúc

### 1.1 Nguyên tắc thiết kế URL
- **Lowercase**: `/tp-ho-chi-minh` không phải `/TP-Ho-Chi-Minh`
- **Hyphens**: `moi-gioi-bds` không phải `moi_gioi_bds`
- **Không dấu**: `/ha-noi` không phải `/hà-nội`
- **Keyword-rich**: URL chứa từ khóa chính (city + service)
- **Không quá 4 levels**: Tránh URL quá sâu
- **Canonical chuẩn**: Mọi URL có duy nhất 1 canonical

### 1.2 Sơ đồ phân cấp URL đầy đủ

```
pro.thodia.so/                           ← Trang chủ
├── agent/                               ← Danh sách tất cả đại lý
│   └── {agent-slug}/                    ← Agent Profile Page
│
├── brand/                               ← [Mới] Danh sách thương hiệu
│   └── {brand-slug}/                    ← Brand Overview Page
│       └── dai-ly/                      ← Danh sách đại lý brand này
│           └── {tinh-slug}/             ← Đại lý theo tỉnh
│               └── {phuong-slug}/       ← Đại lý theo phường
│
├── bds/                                 ← Category: Bất động sản
│   ├── {tinh-slug}/                     ← BĐS tại [Tỉnh/TP]
│   │   ├── khu-vuc-{quan-slug}/         ← [Dual] Geo Cluster (index, tên quận cũ)
│   │   └── {phuong-slug}/               ← [Mới] Category tại Phường (canonical)
│   └── tim-kiem/                        ← Tìm kiếm nâng cao
│
├── xe-co/                               ← Category: Xe cộ
│   └── {tinh-slug}/
│       ├── khu-vuc-{quan-slug}/
│       └── {phuong-slug}/
│
├── bao-hiem/                            ← Category: Bảo hiểm
│   └── {tinh-slug}/
│       ├── khu-vuc-{quan-slug}/
│       └── {phuong-slug}/
│
├── {tinh-slug}/                         ← Location listing theo tỉnh
│   ├── khu-vuc-{quan-slug}/             ← [Dual] Geo Cluster page (index)
│   │   └── {location-slug}/             ← 301 redirect → canonical
│   └── {phuong-slug}/                   ← [Mới] Location listing theo phường
│       └── {location-slug}/             ← Location Detail Page (canonical)
│
├── sitemap.xml                          ← XML Sitemap index
├── sitemap-agents.xml
├── sitemap-locations.xml
├── sitemap-categories.xml
├── sitemap-brands.xml                   ← [Mới] Sitemap: Brand pages
├── feed.xml / rss.xml
└── robots.txt
```

> 📌 **VN Admin Dual-Structure**: `khu-vuc-{quan-slug}` = Geo Cluster page (có thể index, capture search volume tên quận cũ). `{phuong-slug}` = canonical mới. Xem `07-vn-admin-seo-strategy.md`.

### 1.3 URL Examples — Thực tế

```
AGENT PAGES:
/agent/nguyen-van-minh-bds-phuong-tan-thuan-tay
/agent/le-thi-lan-dai-ly-xe-vinfast-ha-noi
/agent/tran-quoc-bao-bao-hiem-manulife-da-nang

BRAND PAGES [Mới]:
/brand/vinfast/
/brand/vinfast/dai-ly/
/brand/vinfast/dai-ly/tp-ho-chi-minh/
/brand/honda/dai-ly/ha-noi/
/brand/manulife/dai-ly/da-nang/

CATEGORY LANDING PAGES:
/bds/tp-ho-chi-minh/                          ← Tỉnh-level
/bds/tp-ho-chi-minh/khu-vuc-quan-7/          ← Geo Cluster (index, tên cũ)
/bds/tp-ho-chi-minh/phuong-tan-thuan-tay/    ← Canonical (tên phường mới)
/xe-co/ha-noi/khu-vuc-cau-giay/
/bao-hiem/da-nang/phuong-hai-chau-1/

LOCATION DETAIL PAGES (canonical dùng phường):
/tp-ho-chi-minh/phuong-tan-thuan-tay/van-phong-bds-nguyen-van-minh
/ha-noi/phuong-dich-vong-hau/showroom-vinfast-le-thi-lan
/da-nang/phuong-hai-chau-1/van-phong-bao-hiem-tran-bao

LOCATION REDIRECT (tên quận cũ → 301 redirect về canonical):
/tp-ho-chi-minh/khu-vuc-quan-7/van-phong-bds-nguyen-van-minh
→ 301 → /tp-ho-chi-minh/phuong-tan-thuan-tay/van-phong-bds-nguyen-van-minh

SEARCH / FILTER:
/tim-kiem?loai=bds&tinh=tp-ho-chi-minh&phuong=phuong-tan-thuan-tay
(noindex — chỉ cho UX, không index)
```

### 1.3 URL Examples — Thực tế

```
AGENT PAGES:
/agent/nguyen-van-minh-bds-quan7
/agent/le-thi-lan-dai-ly-xe-toyota-ha-noi
/agent/tran-quoc-bao-bao-hiem-da-nang

CATEGORY LANDING PAGES:
/bds/tp-ho-chi-minh
/bds/tp-ho-chi-minh/quan-7
/bds/ha-noi/cau-giay
/xe-co/tp-ho-chi-minh
/xe-co/ha-noi/dong-da
/bao-hiem/da-nang
/bao-hiem/can-tho/ninh-kieu

LOCATION DETAIL PAGES:
/tp-ho-chi-minh/quan-7/van-phong-bds-nguyen-van-minh
/ha-noi/cau-giay/showroom-xe-toyota-le-thi-lan
/da-nang/hai-chau/van-phong-bao-hiem-nhan-tho-tran-bao

SEARCH / FILTER:
/tim-kiem?loai=bds&tinh=tp-ho-chi-minh&quan=quan-7
(noindex — chỉ cho UX, không index)
```

---

## 2. Sitemap Architecture

### 2.1 Sitemap Index (`/sitemap.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <sitemap>
    <loc>https://pro.thodia.so/sitemap-main.xml</loc>
    <lastmod>2026-05-06</lastmod>
  </sitemap>

  <sitemap>
    <loc>https://pro.thodia.so/sitemap-agents.xml</loc>
    <lastmod>2026-05-06</lastmod>
  </sitemap>

  <sitemap>
    <loc>https://pro.thodia.so/sitemap-locations.xml</loc>
    <lastmod>2026-05-06</lastmod>
  </sitemap>

  <sitemap>
    <loc>https://pro.thodia.so/sitemap-categories.xml</loc>
    <lastmod>2026-05-06</lastmod>
  </sitemap>

  <!-- [Mới] Brand sitemap -->
  <sitemap>
    <loc>https://pro.thodia.so/sitemap-brands.xml</loc>
    <lastmod>2026-05-06</lastmod>
  </sitemap>

</sitemapindex>
```

### 2.2 Main Sitemap (`/sitemap-main.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Trang chủ -->
  <url>
    <loc>https://pro.thodia.so/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Category Root Pages -->
  <url>
    <loc>https://pro.thodia.so/bds/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://pro.thodia.so/xe-co/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://pro.thodia.so/bao-hiem/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Static pages -->
  <url>
    <loc>https://pro.thodia.so/gioi-thieu/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://pro.thodia.so/chinh-sach-bao-mat/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://pro.thodia.so/dieu-khoan-su-dung/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>
```

### 2.3 Agent Sitemap (`/sitemap-agents.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Mỗi Agent Page -->
  <url>
    <loc>https://pro.thodia.so/agent/nguyen-van-minh-bds-quan7</loc>
    <lastmod>2026-04-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://pro.thodia.so/images/agents/nguyen-van-minh.jpg</image:loc>
      <image:title>Nguyễn Văn Minh - Môi giới BĐS Quận 7</image:title>
    </image:image>
  </url>

  <!-- ... repeat for all agents ... -->

</urlset>
```

### 2.4 Location Sitemap (`/sitemap-locations.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Tỉnh/Thành phố listing pages -->
  <url>
    <loc>https://pro.thodia.so/tp-ho-chi-minh/</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Quận/Huyện listing pages -->
  <url>
    <loc>https://pro.thodia.so/tp-ho-chi-minh/quan-7/</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Location detail pages -->
  <url>
    <loc>https://pro.thodia.so/tp-ho-chi-minh/quan-7/van-phong-bds-nguyen-van-minh</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://pro.thodia.so/images/locations/bds-quan7-exterior.jpg</image:loc>
      <image:title>Văn phòng BĐS Quận 7 – Nguyễn Văn Minh</image:title>
    </image:image>
  </url>

</urlset>
```

### 2.5 Category Sitemap (`/sitemap-categories.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- BĐS by province -->
  <url>
    <loc>https://pro.thodia.so/bds/tp-ho-chi-minh/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- [Mới] Geo Cluster page (tên quận cũ — index được, tương thích người dùng VN) -->
  <url>
    <loc>https://pro.thodia.so/bds/tp-ho-chi-minh/khu-vuc-quan-7/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.65</priority>
  </url>

  <!-- [Mới] Canonical page theo phường (cấu trúc hành chính mới) -->
  <url>
    <loc>https://pro.thodia.so/bds/tp-ho-chi-minh/phuong-tan-thuan-tay/</loc>
    <lastmod>2026-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Repeat for other categories & provinces -->

</urlset>
```

### 2.6 Sitemap Priority Matrix

| Loại trang | Priority | Changefreq |
|-----------|----------|------------|
| Trang chủ | 1.0 | weekly |
| Category root (bds/, xe-co/, bao-hiem/) | 0.9 | weekly |
| Brand Overview (/brand/{slug}/) | 0.8 | weekly |
| Province listing (/tp-ho-chi-minh/) | 0.8 | weekly |
| Category + Province (/bds/tp-ho-chi-minh/) | 0.8 | weekly |
| Geo Cluster page (/khu-vuc-quan-7/) | 0.65 | weekly |
| Ward Canonical page (/phuong-tan-thuan-tay/) | 0.7 | weekly |
| Agent Page (location-based) | 0.8 | monthly |
| Agent Page (freelance) | 0.7 | monthly |
| Location Detail Page (canonical) | 0.7 | monthly |
| Brand Dealer by Province (/brand/.../dai-ly/tinh/) | 0.7 | weekly |
| Static pages (About, Policy) | 0.3–0.5 | yearly |
| 301 Redirect pages (URL quận cũ) | **Không đưa vào sitemap** | — |
| Search result pages | **Noindex** | — |

---

## 3. RSS Feed

### 3.1 Feed cho Listings mới (`/feed.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#">

  <channel>
    <title>Pro.Thodia.so – Đại lý kinh doanh mới</title>
    <link>https://pro.thodia.so</link>
    <description>Danh sách đại lý kinh doanh BĐS, xe cộ và bảo hiểm mới nhất tại Việt Nam</description>
    <language>vi</language>
    <copyright>Copyright 2026 Pro.Thodia.so</copyright>
    <lastBuildDate>Tue, 06 May 2026 02:00:00 +0700</lastBuildDate>
    <atom:link href="https://pro.thodia.so/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://pro.thodia.so/images/logo.png</url>
      <title>Pro.Thodia.so</title>
      <link>https://pro.thodia.so</link>
    </image>

    <!-- Mỗi Agent/Location mới -->
    <item>
      <title>Nguyễn Văn Minh – Môi giới BĐS Quận 7, TP.HCM</title>
      <link>https://pro.thodia.so/agent/nguyen-van-minh-bds-quan7</link>
      <description><![CDATA[
        Nguyễn Văn Minh là môi giới BĐS với 8 năm kinh nghiệm tại Quận 7, TP.HCM.
        Chuyên mua bán căn hộ, đất nền khu Phú Mỹ Hưng và lân cận.
        ☎ 0901 234 567
      ]]></description>
      <pubDate>Tue, 06 May 2026 08:00:00 +0700</pubDate>
      <guid isPermaLink="true">https://pro.thodia.so/agent/nguyen-van-minh-bds-quan7</guid>
      <category>Bất động sản</category>
      <category>TP. Hồ Chí Minh</category>
      <category>Quận 7</category>
      <geo:lat>10.7285416</geo:lat>
      <geo:long>106.7178903</geo:long>
    </item>

  </channel>
</rss>
```

### 3.2 Các Feed nên có

| Feed | URL | Mục đích |
|------|-----|---------|
| All new listings | `/feed.xml` | Feed tổng |
| BĐS only | `/bds/feed.xml` | Category feed |
| Xe cộ only | `/xe-co/feed.xml` | Category feed |
| Bảo hiểm only | `/bao-hiem/feed.xml` | Category feed |
| Listings by city | `/tp-ho-chi-minh/feed.xml` | Geo feed |
| Brand new dealers | `/brand/vinfast/feed.xml` | [Mới] Brand dealer feed |

---

## 4. Robots.txt

```
# robots.txt — Pro.Thodia.so
# Last updated: 2026-05-06

User-agent: *
Allow: /

# Disallow search/filter result pages (prevent duplicate content)
Disallow: /tim-kiem/
Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*page=
Disallow: /*?lat=
Disallow: /*?lng=
Disallow: /*?ref=

# Disallow admin/backend areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /auth/

# Disallow utility pages
Disallow: /print/
Disallow: /embed/

# Allow critical resources for rendering
Allow: /images/
Allow: /css/
Allow: /js/
Allow: *.jpg$
Allow: *.png$
Allow: *.webp$
Allow: *.svg$

# Sitemap declaration
Sitemap: https://pro.thodia.so/sitemap.xml

# Crawl delay (optional — only if server capacity is limited)
# Crawl-delay: 1

# GoogleBot specific rules
User-agent: Googlebot
Allow: /
Disallow: /tim-kiem/
Disallow: /admin/
Disallow: /api/

# GoogleBot Image
User-agent: Googlebot-Image
Allow: /images/

# Bingbot
User-agent: Bingbot
Allow: /
Disallow: /tim-kiem/
Disallow: /admin/

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
```

### 4.1 Lý giải các quyết định Robots.txt

| Rule | Lý do |
|------|-------|
| `Disallow: /tim-kiem/` | Trang search result có param → duplicate content |
| `Disallow: /*?lat=` | Near-me URLs với tọa độ → near-duplicate |
| `Disallow: /api/` | API endpoints không cần index |
| `Allow: /images/` | Đảm bảo Google Images crawl được ảnh |
| Block AhrefsBot, SemrushBot | Giảm crawler budget cho competitor tools |

---

## 5. Canonical URL Strategy

### 5.1 Rules
```html
<!-- Agent Page -->
<link rel="canonical" href="https://pro.thodia.so/agent/nguyen-van-minh-bds-phuong-tan-thuan-tay">

<!-- Location Detail Page (canonical dùng phường) -->
<link rel="canonical" href="https://pro.thodia.so/tp-ho-chi-minh/phuong-tan-thuan-tay/van-phong-bds-nguyen-van-minh">

<!-- Geo Cluster page (khu vực quận cũ — tự canonical về chính nó) -->
<link rel="canonical" href="https://pro.thodia.so/tp-ho-chi-minh/khu-vuc-quan-7/">

<!-- Brand Page -->
<link rel="canonical" href="https://pro.thodia.so/brand/vinfast/">

<!-- Category Page -->
<link rel="canonical" href="https://pro.thodia.so/bds/tp-ho-chi-minh/phuong-tan-thuan-tay/">

<!-- Paginated pages: canonical về page 1 -->
<link rel="canonical" href="https://pro.thodia.so/bds/tp-ho-chi-minh/">
<!-- PLUS pagination tags: -->
<link rel="next" href="https://pro.thodia.so/bds/tp-ho-chi-minh/?page=2">
```

### 5.2 Near-me URL Handling
```html
<!-- URL: /bds/tp-ho-chi-minh/?lat=10.728&lng=106.717 -->
<!-- Phải có canonical về URL không có params -->
<link rel="canonical" href="https://pro.thodia.so/bds/tp-ho-chi-minh/">
<!-- VÀ noindex nếu nội dung thực sự là near-me dynamic -->
<meta name="robots" content="noindex, follow">
```

---

## 6. Hreflang (nếu mở rộng quốc tế)

```html
<!-- Khi có phiên bản tiếng Anh cho SEA/Úc -->
<link rel="alternate" hreflang="vi" href="https://pro.thodia.so/agent/nguyen-van-minh">
<link rel="alternate" hreflang="en" href="https://pro.thodia.so/en/agent/nguyen-van-minh">
<link rel="alternate" hreflang="x-default" href="https://pro.thodia.so/agent/nguyen-van-minh">
```

---

## Version Tracking
| Version | Ngày | Thay đổi |
|---------|------|---------|
| 1.1.0 | 2026-05-06 | Bổ sung Brand URL tree, sitemap-brands.xml, Geo Cluster page pattern, VN admin dual-structure URL, cập nhật Priority Matrix |
| 1.0.0 | 2026-05-06 | Khởi tạo URL structure, Sitemap, RSS, Robots.txt |
