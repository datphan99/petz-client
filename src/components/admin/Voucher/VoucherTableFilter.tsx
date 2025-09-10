import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { VoucherType } from "@/types/Voucher";

enum SortOrder {
  asc = "Điểm tăng dần",
  desc = "Điểm giảm dần",
}

interface VoucherTableFilterProps {
  setSelectedKeys: any;
  selectedValue: any;
  clearQuery: any;
  setTypeSelected: any;
  selectedType: any;
  queryParams: any;
}

export default function VoucherTableFilter({
  setSelectedKeys,
  selectedValue,
  clearQuery,
  setTypeSelected,
  selectedType,
  queryParams,
}: VoucherTableFilterProps) {
  return (
    <div className="my-4 flex items-center justify-between gap-1">
      <div className="space-x-2">
        <span>Lọc theo:</span>
        <Dropdown className="h-full">
          <DropdownTrigger>
            <Button variant="flat" className="capitalize">
              {VoucherType[selectedType as keyof typeof VoucherType] ||
                "Theo loại voucher"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple selection example"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="single"
            onSelectionChange={setTypeSelected as any}
          >
            {Object.keys(VoucherType).map((statusKey) => (
              <DropdownItem key={statusKey}>
                {VoucherType[statusKey as keyof typeof VoucherType]}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <button
          disabled={Object.keys(queryParams).length == 0}
          className={`ml-2 font-[500] transition delay-75 duration-300 ${Object.keys(queryParams).length > 0 ? "text-blue-600" : "text-sky-300"}`}
          onClick={clearQuery}
        >
          Xóa lọc
        </button>
      </div>
      <div className="space-x-2">
        <span>Sắp xếp:</span>
        <Dropdown className="h-full">
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {SortOrder[selectedValue as keyof typeof SortOrder] ||
                "Sắp xếp theo điểm"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple selection example"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="single"
            onSelectionChange={setSelectedKeys as any}
          >
            <DropdownItem key="asc">Điểm tăng dần</DropdownItem>
            <DropdownItem key="desc">Điểm giảm dần</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
