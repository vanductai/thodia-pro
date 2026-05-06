import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="px-4 py-6 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          <Link href="/bds" className="hover:text-foreground transition-colors">Môi giới BĐS</Link>
          <Link href="/xe-co" className="hover:text-foreground transition-colors">Đại lý xe hơi</Link>
          <Link href="/bao-hiem" className="hover:text-foreground transition-colors">Bảo hiểm</Link>
          <Link href="/brand" className="hover:text-foreground transition-colors">Thương hiệu</Link>
          <Link href="/agent" className="hover:text-foreground transition-colors">Đại lý</Link>
        </div>
        <Separator className="mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>© 2026 Pro.Thodia.so</p>
          <div className="flex gap-4">
            <Link href="/chinh-sach-bao-mat" className="hover:text-foreground">Bảo mật</Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-foreground">Điều khoản</Link>
            <Link href="/gioi-thieu" className="hover:text-foreground">Giới thiệu</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
