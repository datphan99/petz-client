import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import { useGetSubCategoriesQuery } from "@/libs/features/services/subcategories";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { motion } from "framer-motion";

interface ProductTableFilterProps {
  setSaleFilter: any;
  saleFilter: any;
  setOutStockFilter: any;
  outStockFilter: any;
  setProductBuyFilter: any;
  productBuyFilter: any;
  subCateFilter: any;
  setSubCateFilter: any;
  handleClearQueryParams: any;
  queryParams: any;
  setHiddenFilter: any;
  hiddenFilter: any;
}

export default function ProductTableFilter({
  setSaleFilter,
  saleFilter,
  setOutStockFilter,
  outStockFilter,
  setProductBuyFilter,
  productBuyFilter,
  subCateFilter,
  setSubCateFilter,
  handleClearQueryParams,
  queryParams,
  hiddenFilter,
  setHiddenFilter,
}: ProductTableFilterProps) {
  const { data } = useGetCategoriesQuery();

  return (
    <motion.div className="my-4 flex items-center gap-1">
      <p>Lọc:</p>
      <Dropdown>
        <DropdownTrigger className="border-none">
          <Button variant="flat">
            {(formatSelectedKeys(saleFilter) as any) == 1
              ? "Giảm giá"
              : "Không giảm giá"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setSaleFilter}
        >
          <DropdownItem className="dark:text-white" key={1}>
            Sale
          </DropdownItem>
          <DropdownItem className="dark:text-white" key={0}>
            Không sale
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button variant="flat">
            {((formatSelectedKeys(outStockFilter) as any) == 1 && "Hết hàng") ||
              "Trạng thái"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setOutStockFilter}
        >
          <DropdownItem className="dark:text-white" key={1}>
            Sắp hết hàng
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button variant="flat">
            {((formatSelectedKeys(hiddenFilter) as any) == 1 && "") ||
              "Ẩn/Hiện"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setHiddenFilter}
        >
          <DropdownItem className="dark:text-white" key={1}>
            Sản phẩm đang ẩn
          </DropdownItem>
          <DropdownItem className="dark:text-white" key={2}>
            Sản phẩm hiển thị
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="h-full">
        <DropdownTrigger className="border-none">
          <Button variant="flat">
            {subCateFilter
              ? data?.find(
                  (item) => item._id === formatSelectedKeys(subCateFilter),
                )?.categoryName || "Chọn danh mục"
              : "Chọn danh mục"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={setSubCateFilter}
          items={data}
        >
          {(item) => (
            <DropdownItem className="dark:text-white" key={item._id}>
              {item.categoryName}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <button
        disabled={Object.keys(queryParams).length == 0}
        className={`ml-2 font-[500] transition delay-75 duration-300 ${Object.keys(queryParams).length > 0 ? "text-blue-600" : "text-sky-300"}`}
        onClick={handleClearQueryParams}
      >
        Xóa
      </button>
      <div className="ml-auto inline-block">
        Sắp xếp:{" "}
        <Dropdown className="h-full">
          <DropdownTrigger className="border-none">
            <Button variant="flat">
              {((formatSelectedKeys(productBuyFilter) as any) ==
                "productBuyDesc" &&
                "Giảm dần") ||
                ((formatSelectedKeys(productBuyFilter) as any) ==
                  "productBuyAsc" &&
                  "Tăng dần") ||
                "Theo lượt mua"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple selection example"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="single"
            onSelectionChange={setProductBuyFilter}
          >
            <DropdownItem className="dark:text-white" key="productBuyDesc">
              Lượt mua giảm dần
            </DropdownItem>
            <DropdownItem className="dark:text-white" key="productBuyAsc">
              Lượt mua tăng dần
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </motion.div>
  );
}
