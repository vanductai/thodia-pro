import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonsProps {
  phone: string;
  zalo?: string;
  showSchedule?: boolean;
  size?: "sm" | "default" | "lg";
}

export function CTAButtons({ phone, zalo, showSchedule = true, size = "default" }: CTAButtonsProps) {
  const phoneClean = phone.replace(/\s/g, "");
  const padding = size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`tel:${phoneClean}`}
        id="cta-call"
        className={cn("inline-flex items-center font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors", padding)}
      >
        <Phone className="mr-2 h-4 w-4" />
        Gọi ngay
      </a>
      {zalo && (
        <a
          href={`https://zalo.me/${phoneClean}`}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-zalo"
          className={cn("inline-flex items-center font-medium rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors", padding)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Zalo
        </a>
      )}
      {showSchedule && (
        <Button size={size} variant="outline" id="cta-schedule">
          <Calendar className="mr-2 h-4 w-4" />
          Đặt lịch tư vấn
        </Button>
      )}
    </div>
  );
}
