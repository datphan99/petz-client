import { ProductOption } from "@/types/Product";

import calculateSalePrice from "@/utils/caculateSalePrice";
import formatMoney from "@/utils/formatMoney";
import { memo } from "react";
interface ProductInfoProps {
  productName: string;
  subCategoryId: string;
  salePercent: number;
  productOption: ProductOption[];
  priceSort?: string;
  minPriceOption?: any[];
  maxPriceOption?: any[];
}

const ProductInfo = memo(
  ({
    productName,
    productOption,
    salePercent,
    priceSort,
    minPriceOption,
    maxPriceOption,
  }: ProductInfoProps) => {
    const selectedOption =
      priceSort === "priceAsc"
        ? minPriceOption?.[0]
        : priceSort === "priceDesc"
          ? maxPriceOption?.[0]
          : productOption?.[0];

    const productPrice = selectedOption?.productPrice || 0;
    const { salePrice } = calculateSalePrice(salePercent, productPrice);

    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-2 pb-2 pt-6 text-left sm:px-4 sm:pb-4">
        <div>
          <h2 className="line-clamp-2 break-words font-serif text-[14px] leading-snug text-black lg:text-[16px]">
            {productName}
          </h2>
          <div className="text-[12px] text-gray-500 lg:text-[14px]">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span>{formatMoney(salePrice)}</span>
              {salePercent > 0 && (
                <del>{formatMoney(selectedOption?.productPrice)}</del>
              )}
              <span className="min-w-0 break-words text-[12px] text-gray-500 lg:text-[13px]">
                ({selectedOption?.name})
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
