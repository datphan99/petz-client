import { Skeleton } from "@nextui-org/react";

export default function BookingSkeleton() {
  return (
    <section className="mt-14">
      <div className="container">
        <h1 className="text-[72px] font-bold uppercase">Đặt lịch spa</h1>
        <div className="xl:flex">
          <div className="relative pb-8 xl:w-1/2">
            <div className="absolute right-0 top-0 h-full w-[1px] rounded-[10px] bg-gray-200" />

            <div className="relative mb-4">
              <div className="absolute right-0 top-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
              <div className="absolute bottom-0 right-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
              <h1 className="text-h1 font-semibold uppercase">Đặt lịch</h1>
            </div>
            <div className="relative">
              <div>
                <p>Thông tin liên hệ của bạn</p>
              </div>
              <div className="mt-4 space-y-3 pr-4">
                <Skeleton className="rounded-lg px-4">
                  <div className="h-10 rounded-[5px] bg-default-200" />
                </Skeleton>
                <Skeleton className="rounded-lg px-4">
                  <div className="h-10 rounded-[5px] bg-default-200" />
                </Skeleton>
                <Skeleton className="rounded-lg px-4">
                  <div className="h-10 rounded-[5px] bg-default-200" />
                </Skeleton>
              </div>
            </div>
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
            <div className="relative mt-4 py-4">
              <div className="absolute right-0 top-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
              <div>
                <p>Chọn ngày thư giãn cho bé</p>
              </div>
              <div className="mt-4 pr-4">
                <Skeleton className="rounded-lg px-4">
                  <div className="h-10 rounded-[5px] bg-default-200" />
                </Skeleton>
              </div>
            </div>
            <div className="relative mt-4 py-4">
              <div className="absolute right-0 top-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
              <div>
                <p>Chọn giờ phù hợp cho bé</p>
              </div>
              <div className="mt-4 pr-4">
                <Skeleton className="rounded-lg px-4">
                  <div className="h-10 rounded-[5px] bg-default-200" />
                </Skeleton>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
}
