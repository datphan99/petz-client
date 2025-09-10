import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useState } from "react";
import { useShopContext } from "../_store/useShopContext";

export default function FilterCategories() {
  const {
    data: CategoryList,
    error: QueryError,
    isLoading,
  } = useGetCategoriesQuery();

  const { handleFilterCategory, queryParams } = useShopContext();

  if (isLoading) {
    return <p>Đang tải danh mục...</p>;
  }

  if (QueryError) {
    return <p>Không thể tải danh mục. Vui lòng thử lại.</p>;
  }

  return (
    <div className="mt-2 overflow-x-auto">
      <div className="flex w-max flex-nowrap gap-2">
        {CategoryList?.map((category) => (
          <button
            className={`mb-4 whitespace-nowrap rounded-lg bg-gray-100 px-4 py-2 text-left text-[14px] transition ${
              queryParams.productCategory === category._id
                ? "bg-gray-200 font-bold text-black"
                : "hover:bg-gray-100"
            }`}
            key={category.categoryName}
            onClick={() => handleFilterCategory(category._id)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
}
