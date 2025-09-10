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
      <div className="absolute bottom-4 left-4 items-center justify-between text-left">
        <div>
          <h2 className="flex justify-between font-serif text-[14px] text-black lg:text-[16px]">
            {productName}
          </h2>
          <h2 className="text-[12px] text-gray-500 lg:text-[14px]">
            <div className="space-x-2">
              <span>{formatMoney(salePrice)}</span>
              {salePercent > 0 && (
                <del>{formatMoney(selectedOption?.productPrice)}</del>
              )}
              <span className="ml-auto text-[13px] text-gray-400">
                ({selectedOption?.name})
              </span>
            </div>
          </h2>
        </div>
      </div>
    );
  },
);

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
