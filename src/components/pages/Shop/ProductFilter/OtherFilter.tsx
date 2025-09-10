import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useState } from "react";
import { useShopContext } from "../_store/useShopContext";
import { Button, Input } from "@nextui-org/react";

export default function OrderFilter() {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [openPriceFilter, setOpenPriceFilter] = useState<boolean>(false);
  const { handleFilterPrice, queryParams } = useShopContext();

  function handleToggleCategory() {
    console.log(minPrice);
    console.log(maxPrice);
    setOpenPriceFilter((prevState) => !prevState);
  }

  function handleApplyPriceFilter() {
    if (minPrice !== undefined && maxPrice !== undefined) {
      handleFilterPrice(parseInt(minPrice), parseInt(maxPrice));
    }
  }

  return (
    <motion.div>
      <button
        className="mt-4 flex w-full items-center"
        onClick={handleToggleCategory}
      >
        <h4 className="text-h4">Theo giá tiền</h4>
        <Icon
          className={`ml-auto ${
            openPriceFilter ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
          icon="majesticons:chevron-up"
          width="24"
          height="24"
        />
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: openPriceFilter ? "auto" : 0,
          opacity: openPriceFilter ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="mt-2 max-h-60 overflow-y-hidden"
      >
        <div className="flex items-center gap-2">
          <Input
            placeholder="Giá thấp nhất"
            defaultValue={queryParams.minPrice || ""}
            onValueChange={setMinPrice}
          />
          <Icon icon="stash:minus-solid" width="24" height="24" />
          <Input
            placeholder="Giá cao nhất"
            defaultValue={queryParams.maxPrice || ""}
            onValueChange={setMaxPrice}
          />
        </div>
        <Button
          onClick={handleApplyPriceFilter}
          className="mt-4 w-full bg-primary px-4 py-2 text-white"
        >
          Áp dụng
        </Button>
      </motion.div>
    </motion.div>
  );
}
