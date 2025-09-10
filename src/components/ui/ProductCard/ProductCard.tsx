import { memo } from "react";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { Product } from "@/types/Product";
import ProductCardCartButton from "./ProductCardCartButton";
import NormalTransitionLink from "../NormalTransitionLink";

interface ProductBoxProps {
  Product: Product;
  additionalClassess?: string;
  status?: string | undefined;
  priceSort?: string;
}

const ProductCard = memo(
  ({ Product, additionalClassess, priceSort }: ProductBoxProps) => {
    const productThumbnail = Product?.productThumbnail;

    return (
      <div className={`${additionalClassess} `}>
        <div className="relative block">
          <div>
            <NormalTransitionLink
              className="cursor-none"
              href={`shop/${Product?.productSlug}`}
            >
              <Image
                className="rounded-xl select-none rounded-md object-cover"
                src={productThumbnail}
                alt="Product Image"
                priority
                width={500}
                height={500}
                style={{ width: "100%", height: "100%" }}
              />
              {Product.salePercent >= 1 && (
                <>
                  <p className="absolute left-2 top-2 rounded-lg bg-black px-4 py-1 text-[10px] text-white md:text-base">
                    {Product.salePercent}%
                  </p>
                </>
              )}
            </NormalTransitionLink>
          </div>
          <ProductCardCartButton Product={Product} />
          <ProductInfo
            priceSort={priceSort}
            salePercent={Product?.salePercent}
            productName={Product?.productName}
            subCategoryId={Product?.productSubCategory}
            productOption={Product?.productOption}
            minPriceOption={(Product as any)?.minPriceOption}
            maxPriceOption={(Product as any)?.maxPriceOption}
          />
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
