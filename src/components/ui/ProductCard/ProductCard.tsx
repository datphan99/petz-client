import { memo, useState } from "react";
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
    const [settledImage, setSettledImage] = useState<string | null>(null);
    const isImageLoading = settledImage !== productThumbnail;

    return (
      <div className={`min-w-0 ${additionalClassess ?? ""}`}>
        <div className="relative isolate overflow-hidden rounded-md">
          <div>
            <NormalTransitionLink
              className="!w-full !max-w-none cursor-none"
              href={`/shop/${Product?.productSlug}`}
            >
              {isImageLoading && (
                <div
                  role="status"
                  className="pointer-events-none absolute inset-0 -z-10 bg-gray-200 motion-safe:animate-pulse dark:bg-gray-800"
                >
                  <span className="sr-only">Đang tải ảnh sản phẩm...</span>
                </div>
              )}
              <Image
                className="aspect-square w-full select-none object-cover"
                src={productThumbnail}
                alt="Product Image"
                loading="lazy"
                sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
                width={500}
                height={500}
                onLoad={() => setSettledImage(productThumbnail)}
                onError={() => setSettledImage(productThumbnail)}
              />
              {Product.salePercent >= 1 && (
                <>
                  <p className="absolute left-2 top-2 rounded-lg bg-black px-2 py-1 text-[10px] text-white md:px-4 md:text-base">
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
