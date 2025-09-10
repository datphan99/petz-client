import { Button, Input } from "@nextui-org/react";
import { useStaffContext } from "./_store/StaffContext";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function StaffFilter() {
  const { handleClearQueryParams, handleEmailUserSearch, handleAddUser } =
    useStaffContext();

  return (
    <div className="flex items-center gap-4">
      <Input
        onValueChange={handleEmailUserSearch}
        className="w-1/3"
        placeholder="Tìm theo email"
      />

      <Button variant="flat" onClick={handleClearQueryParams}>
        Xóa lọc
      </Button>

      <Button variant="flat" className="ml-auto" onClick={handleAddUser}>
        <Icon icon="mynaui:plus-solid" className="size-6" />
        Thêm tài khoản
      </Button>
    </div>
  );
}
