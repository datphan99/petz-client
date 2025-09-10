import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  SelectItem,
  Select,
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react";

import { useStaffContext } from "./_store/StaffContext";
import { User, UserRole } from "@/types/User";
import { useSession } from "next-auth/react";
import ModalEdit from "./Modal/EditModal";
import ModalAdd from "./Modal/ModalAdd";

const columns = [
  {
    key: "username",
    label: "USERNAME",
  },
  {
    key: "displayName",
    label: "TÊN HIỂN THỊ",
  },
  {
    key: "userEmail",
    label: "EMAIL USER",
  },

  {
    key: "action",
    label: "ACTION",
  },
];

export default function StaffTable() {
  const {
    userList,
    handleSetPage,
    page,
    totalPages,
    changeShift,
    editUserId,
    handleCancelChangeShift,
    handleChangeShift,
    addUser,
    handleAddUser,
  } = useStaffContext();

  return (
    <>
      <div className="mt-4">
        <Table
          className="dark:text-white"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                classNames={{
                  cursor: "bg-black",
                }}
                total={totalPages}
                onChange={(page) => handleSetPage(page)}
              />
            </div>
          }
          aria-label="Example table with dynamic content"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="Không tìm người dùng nào"
            items={userList?.data || []}
          >
            {(user: User) => (
              <TableRow key={user._id}>
                {(columnKey) => {
                  if (columnKey === "displayName") {
                    return (
                      <TableCell>
                        {user.displayName || "Chưa có tên hiển thị"}
                      </TableCell>
                    );
                  }

                  if (columnKey === "action") {
                    return (
                      <TableCell>
                        <Button
                          onClick={() => handleChangeShift(user._id)}
                          className="bg-[#f2f2f2] text-black hover:bg-[#e0e0e0]"
                        >
                          Xóa nhân viên
                        </Button>
                      </TableCell>
                    );
                  }
                  if (columnKey === "bannedUser") {
                    return (
                      <TableCell>
                        {user.bannedUser ? (
                          <span className="rounded-full bg-red-100 px-4 py-2 font-bold text-[#e71f1f]">
                            Hạn chế
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-[#2ab66c]">
                            Bình thường
                          </span>
                        )}
                      </TableCell>
                    );
                  }
                  return <TableCell>{getKeyValue(user, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ModalEdit
          handleCloseDialog={handleCancelChangeShift}
          userId={editUserId}
          isDialogOpen={changeShift}
        />
        <ModalAdd isDialogOpen={addUser} handleCloseDialog={handleAddUser} />
      </div>
    </>
  );
}
