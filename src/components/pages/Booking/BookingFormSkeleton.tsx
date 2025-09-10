import { Skeleton } from "@nextui-org/react";

export default function BookingFormSkeleton() {
  return (
    <div className="relative mt-4 py-4">
      <div className="absolute right-0 top-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
      <div>
        <p>Chọn dịch vụ cho bé</p>
      </div>
      <div className="mt-4 flex gap-4 pr-4">
        <div>
          <Skeleton className="rounded-lg px-4">
            <div className="h-48 w-20 rounded-[5px] bg-default-200" />
          </Skeleton>
        </div>
        <div className="flex-grow self-start">
          <Skeleton className="rounded-lg px-4">
            <div className="h-28 w-1/2 rounded-[5px] bg-default-200" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
