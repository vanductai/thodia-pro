import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Gem, Medal, Award } from "lucide-react";

interface BadgeVerifiedProps {
  label?: string;
}

export function BadgeVerified({ label = "Đã xác minh" }: BadgeVerifiedProps) {
  return (
    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700">
      <ShieldCheck className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  );
}

export function BadgeFreelance() {
  return (
    <Badge variant="outline" className="border-violet-400 text-violet-600 dark:text-violet-400">
      Đại lý Độc lập
    </Badge>
  );
}

export function BadgeBrandTier({ tier }: { tier: "gold" | "silver" | "bronze" }) {
  const config = {
    gold: {
      className: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300/70",
      icon: Gem,
      label: "Gold Dealer",
    },
    silver: {
      className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-300/70",
      icon: Medal,
      label: "Silver Dealer",
    },
    bronze: {
      className: "bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-300/70",
      icon: Award,
      label: "Bronze Dealer",
    },
  };
  const { className, icon: Icon, label } = config[tier];
  return (
    <Badge variant="outline" className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  );
}
