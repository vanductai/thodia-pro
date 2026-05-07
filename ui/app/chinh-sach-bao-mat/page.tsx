import type { Metadata } from "next";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Chính sách bảo mật — Pro.Thodia.so",
  description: "Chính sách bảo mật thông tin người dùng của Pro.Thodia.so. Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn.",
  alternates: { canonical: "https://pro.thodia.so/chinh-sach-bao-mat" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Trang chủ</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Chính sách bảo mật</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-2">Chính sách bảo mật</h1>
      <p className="text-sm text-muted-foreground mb-6">Cập nhật lần cuối: 01/05/2026</p>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
        <p>
          Pro.Thodia.so cam kết bảo vệ quyền riêng tư của người dùng. Chính sách này mô tả
          cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân.
        </p>

        <Separator />

        <h2 className="text-base font-semibold text-foreground">1. Thông tin chúng tôi thu thập</h2>
        <p>
          Khi sử dụng dịch vụ, chúng tôi có thể thu thập: tên, số điện thoại, địa chỉ email,
          thông tin địa lý (tỉnh/thành phố) và dữ liệu tương tác với nền tảng.
        </p>

        <h2 className="text-base font-semibold text-foreground">2. Mục đích sử dụng</h2>
        <p>
          Thông tin được dùng để xác minh hồ sơ đại lý, hiển thị thông tin chính xác, và
          cải thiện chất lượng dịch vụ. Chúng tôi không bán dữ liệu người dùng cho bên thứ ba.
        </p>

        <h2 className="text-base font-semibold text-foreground">3. Bảo mật dữ liệu</h2>
        <p>
          Dữ liệu được lưu trữ an toàn với các biện pháp bảo mật tiêu chuẩn ngành.
          Mọi truyền tải dữ liệu đều được mã hóa qua HTTPS.
        </p>

        <h2 className="text-base font-semibold text-foreground">4. Liên hệ</h2>
        <p>
          Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ:{" "}
          <a href="mailto:privacy@thodia.so" className="text-primary hover:underline">
            privacy@thodia.so
          </a>
        </p>
      </div>
    </div>
  );
}
