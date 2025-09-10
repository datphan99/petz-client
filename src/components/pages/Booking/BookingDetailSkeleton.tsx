import { Skeleton } from "@nextui-org/react";

export default function BookingDetailSkeleton() {
  return (
    <div className="relative pb-8 xl:w-1/2">
      <div className="relative mb-4">
        <div className="absolute right-0 top-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
        <div className="absolute bottom-0 right-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
        <h1 className="px-4 text-h1 font-semibold uppercase">Chi tiết</h1>
      </div>
      <div className="px-4">
        <div>
          <p>Thông tin liên hệ của bạn</p>
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="rounded-lg px-4">
            <div className="h-40 rounded-[5px] bg-default-200" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
