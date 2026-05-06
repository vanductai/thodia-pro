"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface Province {
  name: string;
  slug: string;
  dealer_count: number;
}

interface BrandProvinceCTAProps {
  brandSlug: string;
  provinces: Province[];
}

export function BrandProvinceCTA({ brandSlug, provinces }: BrandProvinceCTAProps) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]?.slug ?? "");

  const handleGo = () => {
    if (selectedProvince) {
      router.push(`/brand/${brandSlug}/dai-ly/${selectedProvince}`);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 border rounded-md overflow-hidden">
        <span className="pl-2.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
        </span>
        <Select value={selectedProvince} onValueChange={(v) => { if (v) setSelectedProvince(v); }}>
          <SelectTrigger
            className="border-0 h-8 min-w-36 focus-visible:ring-0 shadow-none rounded-none bg-transparent"
            aria-label="Chọn tỉnh thành"
          >
            <SelectValue placeholder="Chọn tỉnh/TP..." />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>
                {p.name}
                <span className="text-muted-foreground ml-1.5 text-xs">({p.dealer_count})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button size="sm" onClick={handleGo} id="brand-find-dealer-btn">
        Tìm đại lý
      </Button>
    </div>
  );
}
