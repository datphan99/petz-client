import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { useShopContext } from "./_store/useShopContext";
import ProductListSkeleton from "./ProductListSkeleton";
import ProductSort from "./ProductFilter/ProductSort";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import { motion } from "framer-motion";
import { Pagination, Button } from "@nextui-org/react";
import ProductSearch from "./ProductFilter/ProductSearch";

export default function ProductList() {
  const {
    ProductList,
    isLoading,
    sortType,
    queryParams,
    handleChangePage,
    totalPages,
  } = useShopContext();
  const SKELETON_NUMBER = 12;

  return (
    <div className="flex-grow">
      <div className="flex flex-col md:flex-row">
        <ProductSearch />
        <ProductSort />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading &&
          Array.from({ length: SKELETON_NUMBER }).map((_, index) => (
            <ProductListSkeleton key={index} />
          ))}
        {!isLoading &&
          ProductList?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard
                priceSort={formatSelectedKeys(sortType)}
                Product={product}
              />
            </motion.div>
          ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          color="primary"
          page={queryParams.page}
          total={totalPages as any}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
