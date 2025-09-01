"use client";

import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const defaultDateRange = {
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  to: new Date(),
};

export default function DateFilter() {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (items: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());

      items.forEach((item) => params.set(item.name, item.value));

      return params.toString();
    },
    [searchParams],
  );

  function handleDateChange(data: { from: Date; to: Date }) {
    setSelectedDateRange(data);

    const query = createQueryString([
      { name: "from", value: data.from.toISOString() },
      { name: "to", value: data.to.toISOString() },
    ]);
    router.push(`${pathname}?${query}`);
  }
  return (
    <>
      <CalendarDatePicker
        align="end"
        date={selectedDateRange}
        onDateSelect={(data) => handleDateChange(data)}
      />
    </>
  );
}
