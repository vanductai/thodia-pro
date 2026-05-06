"use client";
import Link from "next/link";
import { Moon, Sun, Search, MapPin, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted transition-colors", className)}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-primary">Pro</span>
          <span className="text-muted-foreground font-normal">.Thodia.so</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 mr-auto">
          <NavLink href="/bds">BĐS</NavLink>
          <NavLink href="/xe-co">Xe cộ</NavLink>
          <NavLink href="/bao-hiem">Bảo hiểm</NavLink>
          <NavLink href="/brand">Thương hiệu</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Search — desktop only */}
          <Link
            href="/tim-kiem"
            aria-label="Tìm kiếm"
            className="hidden md:inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Dark mode toggle — Button từ Shadcn, dùng relative container cho icon swap */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Chuyển chế độ sáng/tối"
            >
              <Sun className="h-4 w-4 transition-transform duration-200 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 transition-transform duration-200 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          {/* Mobile menu — SheetTrigger wraps button-styled div, không nest Button vào Button */}
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="md:hidden inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  aria-label="Mở menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              }
            />
            <SheetContent side="left" className="w-64 p-6">
              <div className="flex items-center gap-2 font-bold text-lg mb-8">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-primary">Pro</span>
                <span className="text-muted-foreground font-normal">.Thodia.so</span>
              </div>
              <nav className="flex flex-col gap-1">
                <Link href="/bds" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors">Bất động sản</Link>
                <Link href="/xe-co" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors">Xe cộ</Link>
                <Link href="/bao-hiem" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors">Bảo hiểm</Link>
                <Link href="/brand" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors">Thương hiệu</Link>
                <Link href="/agent" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition-colors">Đại lý</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
