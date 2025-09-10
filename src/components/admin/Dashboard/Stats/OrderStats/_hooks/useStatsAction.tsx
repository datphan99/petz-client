import { useState, useCallback, useEffect } from "react";
import {
  useGetOrderStatsQuery,
  useGetBookingStatsQuery,
} from "@/libs/features/services/orderStatsAPI";
import {
  formatDate,
  getToday,
  getThisMonth,
  getThisYear,
} from "@/utils/formatDateStats";
import { errorModal, warningModal } from "@/utils/callModalANTD";

interface OrderReportData {
  totalOrder?: number;
  ordersSold?: number;
  ordersCancelled?: number;
  orderPending?: number;
  orderDelivering?: number;
}

interface BookingReportData {
  totalBooking?: number;
  bookingDone?: number;
  bookingCancelled?: number;
}

export const useOrderStats = () => {
  const [firstDayOfMonth, lastDayOfMonth] = getThisMonth();

  const [startDate, setStartDate] = useState<string>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<string>(lastDayOfMonth);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const handleGenerateReport = useCallback(() => {
    setShouldFetch(true);
  }, []);

  const { data, error, isLoading } = useGetOrderStatsQuery({
    startDate: formatDate(new Date(startDate)),
    endDate: formatDate(new Date(endDate)),
    year: startDate ? new Date(startDate).getFullYear() : undefined,
    month: startDate ? new Date(startDate).getMonth() + 1 : undefined,
    day: startDate === endDate ? new Date(startDate).getDate() : undefined,
  });

  useEffect(() => {
    if (data && !isLoading && !error && shouldFetch) {
      setShouldFetch(false);
    }

    if (error) {
      warningModal({ content: (error as any).data.error });
    }
  }, [data, isLoading, error, shouldFetch]);

  return {
    data,
    startDate,
    endDate,
    handleGenerateReport,
    setStartDate,
    setEndDate,
    isLoading,
    error,
  };
};
