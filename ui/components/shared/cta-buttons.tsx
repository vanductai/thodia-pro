import { Button, buttonVariants } from "@/components/ui/button";
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
  const btnSize = size === "lg" ? "lg" : size === "sm" ? "sm" : "default";

  return (
    <div className="flex flex-wrap gap-2">
      {/* Dark primary — Direction C editorial style */}
      <a
        href={`tel:${phoneClean}`}
        id="cta-call"
        className={cn(
          buttonVariants({ size: btnSize }),
          "bg-foreground text-background hover:bg-foreground/90"
        )}
      >
        <Phone className="h-4 w-4" />
        Gọi ngay
      </a>

      {/* Outline teal — phân biệt rõ với primary */}
      {zalo && (
        <a
          href={`https://zalo.me/${phoneClean}`}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-zalo"
          className={cn(
            buttonVariants({ variant: "outline", size: btnSize }),
            "border-primary/50 text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
          )}
        >
          <MessageCircle className="h-4 w-4" />
          Zalo
        </a>
      )}

      {showSchedule && (
        <Button size={btnSize} variant="outline" id="cta-schedule">
          <Calendar className="h-4 w-4" />
          Đặt lịch tư vấn
        </Button>
      )}
    </div>
  );
}
