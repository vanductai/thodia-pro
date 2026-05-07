import type { Metadata } from "next";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng — Pro.Thodia.so",
  description: "Điều khoản và điều kiện sử dụng dịch vụ Pro.Thodia.so. Vui lòng đọc kỹ trước khi sử dụng nền tảng.",
  alternates: { canonical: "https://pro.thodia.so/dieu-khoan-su-dung" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Điều khoản sử dụng</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-2">Điều khoản sử dụng</h1>
      <p className="text-sm text-muted-foreground mb-6">Cập nhật lần cuối: 01/05/2026</p>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
        <p>
          Bằng việc truy cập và sử dụng Pro.Thodia.so, bạn đồng ý với các điều khoản
          và điều kiện sau đây.
        </p>

        <Separator />

        <h2 className="text-base font-semibold text-foreground">1. Phạm vi dịch vụ</h2>
        <p>
          Pro.Thodia.so cung cấp nền tảng danh bạ thông tin đại lý kinh doanh. Chúng tôi
          không chịu trách nhiệm về các giao dịch giữa người dùng và đại lý.
        </p>

        <h2 className="text-base font-semibold text-foreground">2. Độ chính xác thông tin</h2>
        <p>
          Thông tin đại lý được xác minh định kỳ. Tuy nhiên, người dùng nên liên hệ trực tiếp
          với đại lý để xác nhận thông tin trước khi giao dịch.
        </p>

        <h2 className="text-base font-semibold text-foreground">3. Quyền sở hữu trí tuệ</h2>
        <p>
          Toàn bộ nội dung trên Pro.Thodia.so (logo, văn bản, cấu trúc dữ liệu) thuộc sở hữu
          của Pro.Thodia.so. Nghiêm cấm sao chép, phân phối khi chưa có sự cho phép bằng văn bản.
        </p>

        <h2 className="text-base font-semibold text-foreground">4. Hành vi bị cấm</h2>
        <p>
          Người dùng không được thu thập dữ liệu tự động (crawling/scraping), đăng thông tin
          sai lệch, hoặc sử dụng dịch vụ cho mục đích gian lận.
        </p>

        <h2 className="text-base font-semibold text-foreground">5. Liên hệ</h2>
        <p>
          Mọi thắc mắc về điều khoản sử dụng:{" "}
          <a href="mailto:legal@thodia.so" className="text-primary hover:underline">
            legal@thodia.so
          </a>
        </p>
      </div>
    </div>
  );
}
