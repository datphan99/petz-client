import { Select, SelectItem } from "@nextui-org/react";
import { useShopContext } from "../_store/useShopContext";

export const sortType = [
  { key: "all", label: "Tất cả" },
  { key: "productBuyDesc", label: "Sản phẩm bán chạy" },
  { key: "latest", label: "Sản phẩm mới nhất" },
  { key: "priceDesc", label: "Giá giảm dần" },
  { key: "priceAsc", label: "Giá tăng dần" },
];

export default function ProductSort() {
  const { handleSortProduct } = useShopContext();

  return (
    <div className="mb-8 ml-auto flex w-1/4 min-w-[400px] items-center gap-2">
      <Select
        aria-label="Sắp xếp theo"
        onSelectionChange={handleSortProduct}
        className="md:ml-4 md:max-w-xs lg:ml-auto"
        items={sortType}
        placeholder="Sắp xếp theo"
      >
        {(sort) => <SelectItem key={sort.key}>{sort.label}</SelectItem>}
      </Select>
    </div>
  );
}
