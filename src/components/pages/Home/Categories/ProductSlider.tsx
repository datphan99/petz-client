import ProductBox from "@/components/ui/ProductCard/ProductCard";
import {
  QueryParams,
  useGetProductsQuery,
} from "@/libs/features/services/product";
import { useInView } from "react-intersection-observer";
import ProductCardSkeleton from "@/components/ui/ProductCard/ProductCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface ProductSliderProps {
  filterOption?: QueryParams;
}

export default function ProductSlider({ filterOption }: ProductSliderProps) {
  const { ref, inView } = useInView({
    rootMargin: "300px 0px",
    triggerOnce: true,
    fallbackInView: true,
  });
  const {
    currentData: data,
    isUninitialized,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsQuery(
    { ...filterOption, limit: 8, page: 1 },
    { skip: !inView },
  );
  const showSkeleton =
    !inView || isUninitialized || isLoading || (isFetching && !data);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [data, showSkeleton, isError]);

  return (
    <div ref={ref} aria-busy={showSkeleton || isFetching}>
      {showSkeleton ? (
        <div className="flex gap-3 overflow-hidden md:gap-5 xl:gap-[30px]">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 basis-[calc((100%-6px)/1.5)] min-[375px]:basis-[calc((100%-12px)/2)] md:basis-[calc((100%-40px)/3)] xl:basis-[calc((100%-90px)/4)]"
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="py-16 text-center" role="alert">
          <p>Không thể tải sản phẩm.</p>
          <button
            type="button"
            className="mt-3 underline"
            onClick={() => refetch()}
          >
            Thử lại
          </button>
        </div>
      ) : !data?.products.length ? (
        <p className="py-16 text-center" role="status">
          Chưa có sản phẩm.
        </p>
      ) : (
        <Swiper
          key={JSON.stringify(filterOption)}
          className="relative z-50"
          slidesPerView={1.5}
          spaceBetween={12}
          pagination={{
            clickable: true,
          }}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 2,
            minimumVelocity: 0,
          }}
          modules={[FreeMode]}
          breakpoints={{
            375: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {data?.products?.map((product) => (
            <SwiperSlide className="relative z-50 shadow-sm" key={product._id}>
              <ProductBox Product={product} status={filterOption?.sortBy} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
