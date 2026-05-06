"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MapPin, Home, Building2, Car, Shield, Tag,
  Search, Moon, Sun, ChevronRight, Menu, X, Users
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// ─── Nav config ────────────────────────────────────────────────────────────────
const NAV_MAIN = [
  { label: "Trang chủ", href: "/", icon: Home },
  { label: "Bất động sản", href: "/bds", icon: Building2 },
  { label: "Xe cộ", href: "/xe-co", icon: Car },
  { label: "Bảo hiểm", href: "/bao-hiem", icon: Shield },
];

const NAV_SECONDARY = [
  { label: "Thương hiệu", href: "/brand", icon: Tag },
  { label: "Đại lý", href: "/agent", icon: Users },
  { label: "Tìm kiếm", href: "/tim-kiem", icon: Search },
];

// ─── Nav item ──────────────────────────────────────────────────────────────────
function NavItem({
  href, icon: Icon, label, collapsed, onClick,
}: { href: string; icon: React.ElementType; label: string; collapsed: boolean; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

// ─── Shared nav content ────────────────────────────────────────────────────────
function NavContent({ collapsed = false, onNavClick }: { collapsed?: boolean; onNavClick?: () => void }) {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex flex-col h-full w-full">
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_MAIN.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} onClick={onNavClick} />
        ))}
        <div className={cn("my-2 border-t", collapsed && "mx-1")} />
        {NAV_SECONDARY.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} onClick={onNavClick} />
        ))}
      </nav>

      {/* Bottom: theme toggle */}
      <div className={cn("border-t px-2 py-2 shrink-0", collapsed && "flex justify-center")}>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Chuyển giao diện sáng/tối"
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full",
            collapsed && "justify-center px-2 w-auto"
          )}
        >
          <div className="relative h-4 w-4 shrink-0">
            <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          {!collapsed && <span>Giao diện</span>}
        </button>
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ───────────────────────────────────────────────────────────
export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r bg-sidebar transition-all duration-200 shrink-0 sticky top-0 h-screen",
        collapsed ? "w-14" : "w-52"
      )}
      aria-label="Điều hướng chính"
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2 px-3 h-13 border-b shrink-0",
        collapsed && "justify-center px-2"
      )}>
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        {!collapsed && (
          <span className="font-semibold text-sm">
            <span className="text-primary">Pro</span>
            <span className="text-muted-foreground font-normal">.Thodia.so</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto text-muted-foreground hover:text-foreground transition-colors", collapsed && "ml-0")}
          aria-label={collapsed ? "Mở rộng sidebar" : "Thu nhỏ sidebar"}
        >
          <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", !collapsed && "rotate-180")} />
        </button>
      </div>

      <NavContent collapsed={collapsed} />
    </aside>
  );
}

// ─── Mobile Top Bar (dùng ở root layout, ngoài max-w wrapper) ─────────────────
export function MobileTopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  return (
    <>
      {/* Topbar — full viewport width */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center h-12 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Mở menu"
          className="text-muted-foreground hover:text-foreground mr-3"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-1.5 font-semibold text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-primary">Pro</span>
          <span className="text-muted-foreground font-normal">.Thodia.so</span>
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-auto text-muted-foreground hover:text-foreground"
          aria-label="Chuyển giao diện"
        >
          <div className="relative h-4 w-4">
            <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
        </button>
      </div>

      {/* Mobile drawer — full viewport, không bị constrain bởi max-w wrapper */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-50 w-64 max-w-[80vw] bg-sidebar border-r flex flex-col shadow-xl">
            <div className="flex items-center gap-2 px-3 h-13 border-b shrink-0">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="font-semibold text-sm">
                <span className="text-primary">Pro</span>
                <span className="text-muted-foreground font-normal">.Thodia.so</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="ml-auto text-muted-foreground hover:text-foreground"
                aria-label="Đóng menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavContent onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
