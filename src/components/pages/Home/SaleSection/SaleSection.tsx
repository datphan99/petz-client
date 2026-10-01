"use client";

import ProductCard from "@/components/ui/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCard/ProductCardSkeleton";
import { useInView } from "react-intersection-observer";
import { useGetProductsQuery } from "@/libs/features/services/product";
import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SaleSection() {
  const { ref, inView } = useInView({
    rootMargin: "300px 0px",
    triggerOnce: true,
    fallbackInView: true,
  });
  const {
    data: Products,
    isUninitialized,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsQuery({ salePercent: 1, limit: 4 }, { skip: !inView });
  const showSkeleton =
    !inView || isUninitialized || isLoading || (isFetching && !Products);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [Products, showSkeleton, isError]);

  return (
    <section className="mt-[250px]">
      <div className="container">
        <div>
          <div className="relative z-10 text-[32px] font-bold uppercase md:text-h1 md:leading-[70px]">
            <div className="flex">
              <div className="relative h-full w-full">
                <div className="absolute p-4">
                  <span className="text-primary">Ưu đãi</span> tốt
                  <div>Cho bạn</div>
                </div>
                <video
                  className="h-[300px] w-full rounded-lg object-cover object-right lg:h-[400px] lg:object-center"
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="/video/sale-section-video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div
            ref={ref}
            aria-busy={showSkeleton || isFetching}
            className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-4"
          >
            {isError ? (
              <div className="col-span-full py-16 text-center" role="alert">
                <p>Không thể tải sản phẩm ưu đãi.</p>
                <button
                  type="button"
                  className="mt-3 underline"
                  onClick={() => refetch()}
                >
                  Thử lại
                </button>
              </div>
            ) : showSkeleton ? (
              Array.from({ length: 4 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : !Products?.products.length ? (
              <p className="col-span-full py-16 text-center" role="status">
                Chưa có sản phẩm ưu đãi.
              </p>
            ) : (
              Products.products.map((product) => (
                <ProductCard key={product._id} Product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
