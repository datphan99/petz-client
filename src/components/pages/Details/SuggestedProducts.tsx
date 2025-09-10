import { useGetProductsQuery } from "@/libs/features/services/product";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductBox from "@/components/ui/ProductCard/ProductCard";
import "swiper/css";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
export default function SuggestedProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  const { data } = useGetProductsQuery({
    productCategory: categoryId,
    limit: 4,
  });
  const formatCurrency = (amount: any) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };
  return (
    <Swiper
      className="relative z-50"
      pagination={{
        clickable: true,
      }}
      loop={true}
      breakpoints={{
        375: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1280: { slidesPerView: 3 },
      }}
    >
      {data?.products?.map((product) => (
        <SwiperSlide className="relative z-50" key={product._id}>
          <NormalTransitionLink href={`/shop/${product.productSlug}`}>
            <ProductBox Product={product} />
          </NormalTransitionLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
