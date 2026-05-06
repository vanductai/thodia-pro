# DESIGN.md — Pro.Thodia.so UI Design Standards

> **Quy chuẩn bắt buộc** áp dụng cho mọi file trong `ui/`. Mọi PR/change phải tuân thủ tài liệu này trước khi merge.

---

## 1. Technology Stack

| Layer | Công nghệ | Phiên bản |
|-------|-----------|-----------|
| Framework | Next.js App Router | 16.x (Turbopack) |
| UI Library | **shadcn/ui v4 (Nova style)** | `style: "base-nova"` |
| Primitive | `@base-ui/react` | — |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) | — |
| Icons | `lucide-react` | — |
| Fonts | Inter (Google Fonts, `latin + vietnamese`) | — |

> ⚠️ **Quan trọng**: Đây là shadcn/ui **Nova style** (dựa trên `@base-ui/react`), **không phải** shadcn/ui v0/v1 thông thường. API component có thể khác.

---

## 2. Design Tokens (globals.css)

Token được định nghĩa dạng **OKLCH** trong `app/globals.css`. **Không được hardcode màu hex/hsl/rgb trực tiếp** trong component.

### 2.1 Semantic Color Tokens

```css
/* Light mode */
--primary:           oklch(0.365 0.155 264.5)   /* Indigo đậm */
--primary-foreground: oklch(0.985 0 0)
--secondary:         oklch(0.97 0 0)
--muted:             oklch(0.97 0 0)
--muted-foreground:  oklch(0.556 0 0)
--accent:            oklch(0.97 0 0)
--destructive:       oklch(0.577 0.245 27.325)
--border:            oklch(0.922 0 0)
--radius:            0.625rem
```

### 2.2 Mapping Token → Tailwind Class

| Token | Class |
|-------|-------|
| background | `bg-background` / `text-foreground` |
| primary | `bg-primary` / `text-primary` / `text-primary-foreground` |
| muted | `bg-muted` / `text-muted-foreground` |
| border | `border-border` |
| card | `bg-card` / `text-card-foreground` |
| destructive | `text-destructive` / `bg-destructive` |
| ring | `ring-ring` |

### 2.3 Radius Classes

```
rounded-xl  → var(--radius-lg) = 0.625rem (dùng trong Card)
rounded-lg  → calc(var(--radius) - 0px) ≈ 0.625rem
rounded-md  → calc(var(--radius) - 2px) ≈ 0.5rem
rounded-sm  → calc(var(--radius) - 4px) ≈ 0.375rem
```

---

## 3. Quy tắc Component

### 3.1 Các component được phép dùng từ `@/components/ui/`

```
accordion    avatar      badge       breadcrumb
button       card        dialog      hover-card
input        select      separator   sheet
skeleton     table       tabs        tooltip
```

**Không** tự tạo component UI mới nếu đã có sẵn trong list trên.

### 3.2 Shared Components (`@/components/shared/`)

| Component | Dùng khi nào |
|-----------|-------------|
| `<RatingStars>` | Hiển thị điểm đánh giá (mọi nơi) |
| `<BadgeVerified>` | Badge xác minh đại lý |
| `<BadgeFreelance>` | Badge đại lý độc lập |
| `<BadgeBrandTier tier="gold\|silver\|bronze">` | Badge cấp thương hiệu |
| `<CTAButtons phone zalo>` | Nút liên hệ chính (agent/location pages) |
| `<FAQAccordion items schemaId>` | FAQ với JSON-LD tự động |

---

## 4. Quy tắc Màu sắc

### 4.1 ✅ ĐƯỢC phép — Màu semantic

```tsx
// Dùng token Tailwind ánh xạ từ CSS variables
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="border-border" />
<div className="text-destructive" />
```

### 4.2 ⚠️ NGOẠI LỆ CÓ KIỂM SOÁT — Màu ngữ nghĩa trang trí

Một số màu Tailwind được **chấp nhận** vì mang ngữ nghĩa cụ thể, không thể thay thế bằng token:

| Màu | Dùng cho | Class được phép |
|-----|---------|----------------|
| `yellow` | Sao đánh giá (RatingStars) | `fill-yellow-400 text-yellow-400` |
| `emerald/green` | Icon success/verified, checkmark | `text-emerald-500`, `text-emerald-700` |
| `amber` | Banner cảnh báo hành chính | `bg-amber-50 text-amber-700 border-amber-200` (+ dark variants) |
| `violet` | Badge/banner đại lý độc lập (freelance) | `border-violet-400 text-violet-600 bg-violet-50` (+ dark variants) |
| `gold/silver/bronze` | Badge tier thương hiệu | Xem `BadgeBrandTier` trong `badge-verified.tsx` |

> **Quy tắc**: Nếu thêm màu mới không có trong bảng trên, phải cân nhắc kỹ và cập nhật bảng này.

### 4.3 ❌ KHÔNG được phép

```tsx
// ❌ Hardcode màu HEX
<div style={{ color: '#3b82f6' }} />

// ❌ Dùng màu Tailwind tuỳ tiện không có trong ngoại lệ
<div className="bg-red-100 text-red-600" />   // Dùng bg-destructive/10 text-destructive
<div className="bg-blue-500 text-white" />    // Dùng bg-primary text-primary-foreground
<div className="bg-gray-100" />               // Dùng bg-muted
```

---

## 5. Quy tắc Button & Interactive Elements

### 5.1 Luôn dùng `<Button>` từ shadcn

```tsx
// ✅ ĐÚNG
import { Button } from "@/components/ui/button"
<Button variant="default">Lưu</Button>
<Button variant="outline" size="sm">Huỷ</Button>

// ❌ SAI — tự clone style button
<div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary text-white">
  Lưu
</div>
```

**Variants có sẵn**: `default | outline | secondary | ghost | destructive | link`  
**Sizes có sẵn**: `default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg`

### 5.2 Link dạng Button — dùng `asChild` pattern hoặc `<Button>` bọc `<Link>`

```tsx
// ✅ ĐÚNG — Link + Button child
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Cách 1: Button bao Link (render as <a>)
<Link href="/brand">
  <Button>Thương hiệu</Button>
</Link>

// Cách 2: Nếu cần dùng as anchor
<a href="tel:+84901234567">
  <Button variant="outline" size="sm">
    <Phone className="h-4 w-4" /> Gọi
  </Button>
</a>

// ❌ SAI — clone button style trực tiếp trên <Link> hay <a>
<Link href="/brand" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary...">
```

### 5.3 Nút Tel trong card — tránh nested `<a>`

**Vấn đề**: HTML không cho phép `<a>` lồng trong `<a>`. Khi dùng `<Link>` (render as `<a>`) bao `<Card>`, không được đặt `<a href="tel:">` bên trong.

```tsx
// ✅ ĐÚNG — tel link nằm ngoài Link wrapper
<div className="relative">
  <Link href={`/agent/${agent.slug}`} className="block">
    <Card>
      <CardContent className="pr-20"> {/* padding right để tránh overlap */}
        {/* nội dung card */}
        <span className="...">Gọi</span> {/* chỉ là visual, không phải <a> */}
      </CardContent>
    </Card>
  </Link>
  {/* Tel link absolute, nằm ngoài <Link> */}
  <a
    href={`tel:${agent.phone}`}
    className="absolute right-3 top-1/2 -translate-y-1/2 ..."
    onClick={(e) => e.stopPropagation()}
  >
    <Phone className="h-3 w-3" /> Gọi
  </a>
</div>

// ❌ SAI — nested <a>
<Link href="/agent/...">
  <Card>
    <a href="tel:+84...">Gọi</a> {/* INVALID HTML — hydration error */}
  </Card>
</Link>
```

---

## 6. Quy tắc Card

Card trong dự án này dùng **Nova style** — có `ring-1 ring-foreground/10` thay vì `border`.

```tsx
// ✅ ĐÚNG — Dùng Card components từ shadcn
<Card>
  <CardHeader>
    <CardTitle>Tiêu đề</CardTitle>
  </CardHeader>
  <CardContent>Nội dung</CardContent>
</Card>

// ✅ Interactive card — chỉ thêm hover state
<Card className="hover:border-primary/40 transition-colors cursor-pointer">

// ❌ SAI — tự tạo card
<div className="rounded-xl border p-4 shadow">
```

---

## 7. Quy tắc Breadcrumb

Mọi page phải có breadcrumb ở đầu trang. Cấu trúc theo URL taxonomy:

```
/ → /{service} → /{service}/{province} → /{service}/{province}/{area} → /locations/...
/ → /brand → /brand/{slug} → /brand/{slug}/dai-ly/{province}
/ → /agent → /agent/{slug}
/ → /{province}   (province listing)
```

```tsx
// ✅ ĐÚNG
<Breadcrumb className="mb-5">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/bds">Đại lý BĐS</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      {/* Trang hiện tại dùng BreadcrumbPage (không có href) */}
      <BreadcrumbPage>TP. Hồ Chí Minh</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Quy tắc breadcrumb**:
- Trang cuối (current) dùng `<BreadcrumbPage>`, KHÔNG có `href`
- Tất cả cấp trước dùng `<BreadcrumbLink href="...">`
- Không được bỏ qua cấp (ví dụ: agent detail phải có service root → province → agent)

---

## 8. Quy tắc Typography

```tsx
// Heading chính của page — mỗi page đúng 1 <h1>
<h1 className="text-xl font-semibold">   // Listing page
<h1 className="text-2xl sm:text-3xl font-bold tracking-tight"> // Detail page

// Section headers
<h2 className="text-xl font-semibold">   // Trong detail page
<h2 className="text-base font-semibold"> // Trong listing / compact

// Body text
<p className="text-sm text-muted-foreground">
<p className="text-xs text-muted-foreground">

// KHÔNG dùng font-weight tùy tiện — chỉ: font-normal, font-medium, font-semibold, font-bold
```

---

## 9. Quy tắc Spacing & Layout

```tsx
// Container chuẩn
<div className="container mx-auto max-w-5xl px-4 py-6">   // Listing pages
<div className="container mx-auto max-w-6xl px-4 py-6">   // Detail pages (với sidebar)

// Section spacing
<section className="mb-7">   // Giữa các section trong listing
<section className="mb-8">   // Giữa các section lớn trong detail

// Card list spacing
<div className="space-y-2">   // Danh sách card compact
<div className="grid grid-cols-1 gap-4">   // Grid layout
```

---

## 10. JSON-LD Schema

Mọi page cần có **ít nhất** 2 schema objects:
1. Schema chính (Person/LocalBusiness/CollectionPage/Organization)
2. BreadcrumbList schema

```tsx
// Đặt ở đầu JSX, ngoài container div
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  <div className="container ...">
    {/* page content */}
  </div>
</>
```

---

## 11. URL & Link Rules

### Navigation links
| Destination | Href |
|-------------|------|
| BĐS root | `/bds` |
| Xe cộ root | `/xe-co` |
| Bảo hiểm root | `/bao-hiem` |
| Brand listing | `/brand` |
| Agent listing | `/agent` |
| Search | `/tim-kiem` |

### Internal links chuẩn
```tsx
// Agent detail
href={`/agent/${agent.slug}`}

// Location detail — dùng /locations/ prefix (canonical hiện tại)
href={`/locations/${loc.province}/${loc.phuong}/${loc.slug}`}

// Service → Province
href={`/${service}/${province}`}   // e.g. /bds/tp-ho-chi-minh

// Brand → Province dealers
href={`/brand/${brandSlug}/dai-ly/${provinceSlug}`}

// Province listing (all services)
href={`/${provinceSlug}`}   // e.g. /ha-noi
```

> **Lưu ý**: `/locations/` prefix là canonical hiện tại trong code. Spec gốc dùng `/{tinh}/{phuong}/{slug}` nhưng route đó chưa được tạo để tránh conflict với `/{service}` dynamic route.

---

## 12. Turbopack / Build Notes

- **Sau khi thay đổi nhiều file cùng lúc**: Chạy `rm -rf .next` trước khi restart dev server để tránh cache corruption gây `require is not defined`
- **Build check**: Luôn chạy `npx next build` để verify trước khi deploy
- **RSC (React Server Component)**: Mặc định. Chỉ thêm `"use client"` khi component dùng hooks (`useState`, `useEffect`, `usePathname`...) hoặc event handlers trực tiếp

---

## 13. Checklist Review Trước Khi Merge

- [ ] Không có hardcode màu hex/rgb/hsl ngoài ngoại lệ đã định nghĩa ở mục 4.2
- [ ] Không tự clone button/card style — phải dùng component từ `@/components/ui/`
- [ ] Không có `<a>` lồng trong `<Link>` (nested anchor)
- [ ] Mọi page có `<Breadcrumb>` đúng cấu trúc
- [ ] Mỗi page có đúng 1 `<h1>`
- [ ] JSON-LD schema có BreadcrumbList
- [ ] Không dùng `<h1>` hay `<h2>` với class font tuỳ tiện ngoài quy chuẩn mục 8
- [ ] `<BreadcrumbPage>` cho trang hiện tại (không có href)
- [ ] Internal links dùng đúng pattern theo bảng mục 11

---

## 14. Known Issues & Exceptions

| Issue | Lý do | Kế hoạch |
|-------|-------|----------|
| `BadgeBrandTier` dùng `yellow/gray/orange` | Semantic: màu kim loại không có token tương đương | Giữ nguyên, đã document |
| `BadgeVerified` dùng `emerald` | Semantic: màu "verified/success" | Giữ nguyên, đã document |
| `CTAButtons` dùng `<a>` thay vì `<Button>` | CTA tel/zalo phải là native anchor | Acceptable — `<a href="tel:">` + `<a href="zalo.me">` |
| `/locations/` prefix trong link | Route `/{tinh}/{phuong}/{slug}` chưa tạo | Sẽ migrate khi implement canonical routes |
| `brand/[slug]` — "Tìm đại lý gần tôi" hardcode TPHCM | MVP demo, chưa có geolocation | Sẽ thay bằng dynamic province detection |

---

## Version Tracking

| Version | Ngày | Thay đổi |
|---------|------|----------|
| 1.0 | 2026-05-06 | Khởi tạo sau audit toàn bộ pages v1 |
