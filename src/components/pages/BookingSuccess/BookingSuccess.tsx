"use client";

import { useGetUserQuery } from "@/libs/features/services/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const BookingSuccess = () => {
  const searchParams = useSearchParams();
  const resultCode = searchParams.get("resultCode");
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const { data: sessionData, update: sessionUpdate } = useSession();
  const userId = sessionData?.user._id;

  console.log(resultCode);

  const { data: userData } = useGetUserQuery(userId ?? skipToken);

  useEffect(() => {
    if (userData) {
      sessionUpdate({
        user: userData,
      });
    }
  }, [userData]);

  const isSuccess = resultCode === "0";

  useEffect(() => {
    if (!resultCode || !orderId) {
      router.push("/");
    }
  }, [resultCode, orderId, router]);

  return (
    <div className="mt-[70px] min-h-screen px-[20px]">
      <div className="mt-[20px] flex flex-col items-center justify-center">
        {isSuccess ? (
          <>
            <Icon icon="lets-icons:check-ring" color="green" width={100} />
            <h1 className="text-[22px] font-[700]">Thanh toán thành công</h1>
            <div className="mt-[20px] space-y-2">
              <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của PETZ </p>
              <div className="flex justify-center gap-1">
                <p>Bạn có thể xem chi tiết trong</p>
                <Link href="/user/service-list" className="text-blue-500">
                  lịch đặt của tôi.
                </Link>
              </div>
              <div className="flex flex-row items-center justify-center gap-[10px]">
                <button className="flex w-[180px] flex-row items-center justify-center rounded-full bg-gray-100 py-[8px] text-gray-600 hover:shadow-custom">
                  <Icon icon="basil:caret-left-solid" width={20} />
                  <Link href="/">Quay về trang chủ</Link>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Icon icon="basil:warning-circle-solid" color="red" width={100} />
            <h1 className="text-[22px] font-[700] text-red-600">
              Thanh toán thất bại
            </h1>
            <div className="mt-[20px] flex flex-col gap-[15px]">
              <p>Rất tiếc! Đã có lỗi xảy ra trong quá trình thanh toán.</p>
              <p>Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
              <div className="flex items-center justify-center">
                <button className="flex w-[180px] flex-row items-center justify-center rounded-full bg-primary py-[8px] text-white hover:shadow-custom">
                  <Icon icon="basil:caret-left-solid" width={20} />
                  <Link href="/">Quay về trang chủ</Link>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
