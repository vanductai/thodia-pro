import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

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
  const styles = {
    gold: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300",
    silver: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-gray-300",
    bronze: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-orange-300",
  };
  const labels = { gold: "🥇 Gold Dealer", silver: "🥈 Silver Dealer", bronze: "🥉 Bronze Dealer" };
  return <Badge variant="outline" className={styles[tier]}>{labels[tier]}</Badge>;
}
