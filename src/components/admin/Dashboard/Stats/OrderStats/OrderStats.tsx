"use client";

import { Skeleton } from "@nextui-org/react";
import { useOrderStats } from "./_hooks/useStatsAction";
import formatMoney from "@/utils/formatMoney";

export default function OrderStats() {
  const { startDate, endDate, data, setStartDate, setEndDate, isLoading } =
    useOrderStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-lg bg-default-300" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative z-20 mt-8 w-full rounded-lg bg-white p-8 shadow-lg dark:bg-[#18181b] dark:text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Doanh thu đơn hàng</h1>
        <p className="text-gray-500">
          Xem tổng quan doanh thu và trạng thái đơn hàng
        </p>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="date"
          className="flex-1 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="flex-1 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4 shadow-md">
          <h2 className="text-lg font-medium text-blue-700">Tổng doanh thu</h2>
          <p className="mt-2 text-2xl font-semibold text-blue-900">
            {formatMoney(data.totalOrder)}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4 shadow-md">
          <h2 className="text-lg font-medium text-green-700">
            Đơn hàng đã bán
          </h2>
          <p className="mt-2 text-2xl font-semibold text-green-900">
            {data.ordersSold} đơn
          </p>
        </div>

        <div className="rounded-lg bg-red-50 p-4 shadow-md">
          <h2 className="text-lg font-medium text-red-700">Đơn hàng đã hủy</h2>
          <p className="mt-2 text-2xl font-semibold text-red-900">
            {data.ordersCancelled} đơn
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 p-4 shadow-md">
          <h2 className="text-lg font-medium text-orange-700">
            Đơn hàng đang giao
          </h2>
          <p className="mt-2 text-2xl font-semibold text-orange-900">
            {data.orderDelivering} đơn
          </p>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4 shadow-md">
          <h2 className="text-lg font-medium text-yellow-700">
            Đơn hàng đang xử lý
          </h2>
          <p className="mt-2 text-2xl font-semibold text-yellow-900">
            {data.orderPending} đơn
          </p>
        </div>
      </div>
    </div>
  );
}
