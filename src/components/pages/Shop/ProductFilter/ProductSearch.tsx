import { Input } from "@nextui-org/react";
import { useShopContext } from "../_store/useShopContext";

export default function ProductSearch() {
  const { handleSearchProduct } = useShopContext();

  return (
    <div className="mb-8 flex w-1/4 min-w-[400px] items-center gap-2">
      <Input onValueChange={handleSearchProduct} placeholder="Tìm sản phẩm" />
    </div>
  );
}
