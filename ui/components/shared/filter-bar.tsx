"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export interface FilterState {
  query: string;
  minRating: string;
  type: string;
}

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    minRating: "all",
    type: "all",
  });

  const update = useCallback(
    (patch: Partial<FilterState>) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      onFilterChange?.(next);
    },
    [filters, onFilterChange],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-2" role="search" aria-label="Bộ lọc">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Tìm tên, địa chỉ..."
          className="pl-9 h-8 text-sm"
          aria-label="Tìm kiếm"
          value={filters.query}
          onChange={(e) => update({ query: e.target.value })}
        />
      </div>

      <Select value={filters.minRating} onValueChange={(v) => update({ minRating: v ?? "all" })}>
        <SelectTrigger className="w-full sm:w-36 h-8 text-sm" aria-label="Lọc đánh giá">
          <SelectValue placeholder="Đánh giá" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="4.5">4.5+ sao</SelectItem>
          <SelectItem value="4">4+ sao</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.type} onValueChange={(v) => update({ type: v ?? "all" })}>
        <SelectTrigger className="w-full sm:w-36 h-8 text-sm" aria-label="Lọc loại">
          <SelectValue placeholder="Loại" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="agent">Cá nhân</SelectItem>
          <SelectItem value="location">Văn phòng / Showroom</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0"
        aria-label="Bộ lọc nâng cao"
        type="button"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
