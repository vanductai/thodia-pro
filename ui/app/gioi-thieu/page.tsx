import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE_STATS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Giới thiệu — Pro.Thodia.so",
  description: "Pro.Thodia.so là nền tảng danh bạ đại lý kinh doanh BĐS, xe cộ và bảo hiểm uy tín tại Việt Nam. Thông tin chuẩn xác, đã xác minh, chuẩn Local SEO.",
  alternates: { canonical: "https://pro.thodia.so/gioi-thieu" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://pro.thodia.so/#organization",
  name: "Pro.Thodia.so",
  url: "https://pro.thodia.so",
  logo: { "@type": "ImageObject", url: "https://pro.thodia.so/logo.svg" },
  description: "Nền tảng danh bạ đại lý kinh doanh BĐS, xe cộ và bảo hiểm uy tín tại Việt Nam.",
  areaServed: { "@type": "Country", name: "Vietnam" },
  sameAs: ["https://pro.thodia.so"],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Giới thiệu</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold mb-4">Giới thiệu Pro.Thodia.so</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            <strong className="text-foreground">Pro.Thodia.so</strong> là nền tảng danh bạ đại lý kinh doanh
            chuyên biệt dành cho thị trường Việt Nam, tập trung vào ba lĩnh vực chính: Bất động sản,
            Xe cộ và Bảo hiểm.
          </p>

          <p>
            Với hơn <strong className="text-foreground">{SITE_STATS.agents.toLocaleString()} đại lý</strong> đã
            xác minh tại <strong className="text-foreground">{SITE_STATS.provinces} tỉnh thành</strong>,
            chúng tôi cung cấp thông tin chuẩn xác, minh bạch — giúp người dùng tìm được đúng
            đại lý uy tín ở khu vực của mình.
          </p>

          <Separator className="my-6" />

          <h2 className="text-lg font-semibold text-foreground">Sứ mệnh</h2>
          <p>
            Xây dựng hệ sinh thái thông tin đại lý minh bạch, chuẩn hóa dữ liệu địa lý theo
            cấu trúc hành chính mới 2025, và tối ưu hóa khả năng tìm kiếm địa phương (Local SEO)
            để kết nối người dùng với đại lý uy tín gần nhất.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Cam kết chất lượng</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Xác minh thông tin NAP (Tên, Địa chỉ, Số điện thoại) trước khi đăng</li>
            <li>Cập nhật địa chỉ theo cải cách hành chính 2025</li>
            <li>Đánh giá thực từ khách hàng đã giao dịch</li>
            <li>Dữ liệu GPS chính xác, tích hợp Google Maps</li>
          </ul>

          <Separator className="my-6" />

          <p className="text-sm">
            Để đăng ký hồ sơ đại lý hoặc hợp tác kinh doanh, vui lòng liên hệ:{" "}
            <a href="mailto:contact@thodia.so" className="text-primary hover:underline">
              contact@thodia.so
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
