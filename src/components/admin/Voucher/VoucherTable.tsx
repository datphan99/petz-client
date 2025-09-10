"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import useVoucherAction from "./_hooks/useVoucherAction";
import { VoucherType } from "@/types/Voucher";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import ModalAdd from "./ModalVoucher/ModalAdd";
import ModalDelete from "./ModalVoucher/ModalDelete";
import ModalEdit from "./ModalVoucher/ModalEdit";
import ButtonAdmin from "../UI/Sidebar/ButtonAdmin";
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";
import VoucherTableFilter from "./VoucherTableFilter";
import formatDiscount from "@/utils/formatDiscount";
import ModalShow from "./ModalVoucher/ModalShow";

const columns = [
  {
    key: "voucherPoint",
    label: "ĐIỂM",
  },
  {
    key: "sale",
    label: "GIẢM GIÁ",
  },

  {
    key: "maxRedemption",
    label: "ĐỔI TỐI ĐA",
  },
  {
    key: "expirationDate",
    label: "HẾT HẠN SAU ĐỔI",
  },
  {
    key: "limitedDate",
    label: "NGÀY HẾT HẠN ",
  },
  {
    key: "voucherQuantity",
    label: "SỐ LƯỢNG",
  },

  {
    key: "totalToUse",
    label: "TỔNG ĐƠN",
  },
  {
    key: "isHidden",
    label: "ẨN/HIỆN",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function VoucherTable() {
  const {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    handleAddVoucher,
    addModalOpen,
    handleCancelAddVoucher,
    handleDeleteVoucher,
    deleteVoucher,
    handleCancelDelete,
    deleteModalOpen,
    editVoucher,
    handleEditVoucher,
    handleCancelEdit,
    editModalOpen,
    setSelectedKeys,
    selectedValue,
    clearQuery,
    setTypeSelected,
    selectedType,
    queryParams,
    handleShowVoucher,
    handleCancelShow,
    showModalOpen,
  } = useVoucherAction({ initialPage: 1 });

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <p className="w-fit rounded-full bg-primary px-8 py-2 text-h4 font-bold text-white shadow-sm dark:bg-black dark:text-white">
          Danh sách voucher
        </p>
        <ButtonAdmin
          onClick={handleAddVoucher}
          className="block w-fit bg-[#f2f2f2] px-4 py-2 text-black hover:bg-[#e0e0e0]"
        >
          + Thêm voucher
        </ButtonAdmin>
      </div>
      <VoucherTableFilter
        queryParams={queryParams}
        setSelectedKeys={setSelectedKeys}
        selectedValue={selectedValue}
        clearQuery={clearQuery}
        setTypeSelected={setTypeSelected}
        selectedType={selectedType}
      />
      <Table
        aria-label="Bảng hiển thị danh mục"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={pages}
              total={totalPages || 1}
              onChange={(page: number) => handleSetPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={voucher?.vouchers || []}>
          {(item) => (
            <TableRow className="dark:text-white" key={item._id}>
              {(columnKey) =>
                columnKey === "action" ? (
                  <TableCell>
                    <button
                      className="btn-edit mr-1"
                      onClick={() => handleEditVoucher(item._id)}
                    >
                      <Icon className="size-5" icon="uil:edit" />
                    </button>
                    {item.isHidden && (
                      <button
                        className="btn-delete"
                        onClick={() => handleShowVoucher(item._id)}
                      >
                        <Icon
                          className="size-5"
                          icon="bxs:show"
                          width="24"
                          height="24"
                        />
                      </button>
                    )}
                    {!item.isHidden && (
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteVoucher(item._id)}
                      >
                        <Icon
                          className="size-5"
                          icon="mdi:hide"
                          width="24"
                          height="24"
                        />{" "}
                      </button>
                    )}
                  </TableCell>
                ) : columnKey === "_id" ? (
                  <TableCell className="font-bold">
                    {item._id.slice(-3).toUpperCase()}
                  </TableCell>
                ) : columnKey === "expirationDate" ? (
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Icon icon="tabler:clock" width="24" height="24" />
                      <span>-</span>
                      {item.expirationDate as any} ngày
                    </span>
                  </TableCell>
                ) : columnKey === "maxRedemption" ? (
                  <TableCell className="font-bold">
                    {item.maxRedemption ? `${item.maxRedemption} lần` : "Không"}
                  </TableCell>
                ) : columnKey === "totalToUse" ? (
                  <TableCell className="font-bold">
                    {item.totalToUse
                      ? `${formatDiscount(item.totalToUse)} `
                      : "Không"}
                  </TableCell>
                ) : columnKey === "limitedDate" ? (
                  <TableCell className="font-bold">
                    {formatDate(item.limitedDate) || "Không"}
                  </TableCell>
                ) : columnKey === "isHidden" ? (
                  <TableCell className="font-bold">
                    <span
                      className={`flex w-fit items-center gap-2 rounded-full px-2 py-1 ${item.isHidden ? "bg-[#f4e7e6] text-[#b5251a]" : "bg-[#ddf0e5] text-[#108152]"} `}
                    >
                      <div
                        className={`size-1 rounded-full ${item.isHidden ? "bg-[#b5251a]" : "bg-[#108152]"}`}
                      />
                      {item.isHidden ? "Ẩn" : "Hiện"}
                    </span>
                  </TableCell>
                ) : columnKey === "voucherQuantity" ? (
                  <TableCell className="font-bold">
                    <span
                      className={`flex w-fit items-center gap-2 rounded-full px-2 py-1 ${item.voucherQuantity && item.voucherQuantity < 50 ? "bg-[#f4e7e6] text-[#b5251a]" : "bg-[#ddf0e5] text-[#108152]"} `}
                    >
                      <div
                        className={`size-1 rounded-full ${item.voucherQuantity && item.voucherQuantity < 50 ? "bg-[#b5251a]" : "bg-[#108152]"}`}
                      />
                      {item.voucherQuantity
                        ? `Còn lại ${item.voucherQuantity}`
                        : "Không giới hạn"}
                    </span>
                  </TableCell>
                ) : columnKey === "sale" ? (
                  <TableCell>
                    {item.voucherType === "FLAT_DISCOUNT" && (
                      <span className="flex w-fit items-center gap-1 rounded-full bg-[#ececef] px-2 py-1 font-medium">
                        <Icon icon="tdesign:money" width="24" height="24" />
                        <span>-</span>
                        {formatDiscount(item.flatDiscountAmount)}
                      </span>
                    )}
                    {item.voucherType === "ON_ORDER_SAVINGS" && (
                      <span className="flex w-fit items-center gap-1 rounded-full bg-[#ececef] px-2 py-1 font-medium">
                        <Icon
                          icon="tabler:shopping-bag-discount"
                          width="24"
                          height="24"
                        />
                        <span>-</span>
                        {item.salePercent}%
                      </span>
                    )}

                    {item.voucherType === "SHIPPING_DISCOUNT" && (
                      <span className="flex w-fit items-center gap-1 rounded-full bg-[#ececef] px-2 py-1 font-medium">
                        <Icon
                          icon="material-symbols:local-shipping-outline"
                          width="24"
                          height="24"
                        />
                        <span>-</span>
                        {item.shippingDiscountAmount}%
                      </span>
                    )}
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
      {addModalOpen && (
        <ModalAdd
          isDialogOpen={addModalOpen}
          handleCloseDialog={handleCancelAddVoucher}
        />
      )}
      {deleteModalOpen && (
        <ModalDelete
          isDialogOpen={deleteModalOpen}
          handleCloseDialog={handleCancelDelete}
          voucherId={deleteVoucher}
        />
      )}
      {editModalOpen && (
        <ModalEdit
          isDialogOpen={editModalOpen}
          handleCloseDialog={handleCancelEdit}
          voucherId={editVoucher}
        />
      )}
      {showModalOpen && (
        <ModalShow
          isDialogOpen={showModalOpen}
          handleCloseDialog={handleCancelShow}
          voucherId={deleteVoucher}
        />
      )}
    </div>
  );
}
