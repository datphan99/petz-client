import { ServicesType } from "@/types/Services";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface ServiceTableFilterProps {
  setSelectedKeys: any;
  selectedValue: any;
  clearQueryParams: any;
  setbookingOrder: any;
  bookingOrderSelect: any;
  queryParams: any;
}

export default function ServiceTableFilter({
  setSelectedKeys,
  selectedValue,
  clearQueryParams,
  setbookingOrder,
  queryParams,
}: ServiceTableFilterProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="space-x-2">
        <span>Lọc theo:</span>
        <Dropdown className="h-full">
          <DropdownTrigger className="border-none">
            <Button variant="flat">
              {ServicesType[selectedValue as keyof typeof ServicesType] ||
                "Loại dịch vụ"}
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
            {Object.keys(ServicesType).map((statusKey) => (
              <DropdownItem className="dark:text-white" key={statusKey}>
                {ServicesType[statusKey as keyof typeof ServicesType]}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <button
          disabled={Object.keys(queryParams).length == 0}
          className={`ml-2 font-[500] transition delay-75 duration-300 ${Object.keys(queryParams).length > 0 ? "text-blue-600" : "text-sky-300"}`}
          onClick={clearQueryParams}
        >
          Xóa lọc
        </button>
      </div>
      <div className="space-x-2">
        <span>Sắp xếp:</span>
        <Dropdown className="h-full">
          <DropdownTrigger className="border-none">
            <Button variant="flat">Sắp xếp theo lượt đặt</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple selection example"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="single"
            onSelectionChange={setbookingOrder as any}
          >
            <DropdownItem className="dark:text-white" key="asc">
              Lượt đặt tăng dần
            </DropdownItem>
            <DropdownItem className="dark:text-white" key="desc">
              Lượt giảm giảm dần
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
