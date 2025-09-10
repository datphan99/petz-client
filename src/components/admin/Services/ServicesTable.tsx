"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

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
import useServicesAction from "./_hook/useServicesAction";
import { ServicesType } from "@/types/Services";
import ModalAdd from "./Modal/ModalAdd";
import ModalDelete from "./Modal/ModalDelete";
import ModalEdit from "./Modal/ModalEdit";
import ServiceTableFilter from "./ServiceTableFilter";
import ButtonAdmin from "../UI/Sidebar/ButtonAdmin";
import ModalShow from "./Modal/ModalShow";

const columns = [
  {
    key: "_id",
    label: "ID DỊCH VỤ",
  },
  {
    key: "serviceName",
    label: "TÊN DỊCH VỤ",
  },
  {
    key: "bookingAmount",
    label: "SỐ LƯỢNG ĐẶT",
  },
  {
    key: "servicePrice",
    label: "GIÁ TIỀN",
  },
  {
    key: "serviceType",
    label: "KIỂU DỊCH VỤ",
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

export default function ServicesTable() {
  const {
    services,
    pages,
    totalPages,
    handleSetPage,
    handleAddServices,
    handleCancelAddServices,
    handleEditServices,
    editModalOpen,
    handleCancelEdit,
    handleDeleteServices,
    handleCancelDelete,
    addModalOpen,
    deleteServices,
    deleteModalOpen,
    editServices,
    setSelectedKeys,
    selectedValue,
    clearQueryParams,
    setbookingOrder,
    bookingOrderSelect,
    queryParams,
    showeModalOpen,
    handleShowServices,
    handleCancelShow,
  } = useServicesAction({
    initialPage: 1,
  });

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <p className="mb-4 w-fit rounded-full bg-primary px-8 py-2 text-h4 font-bold text-white shadow-sm dark:bg-black dark:text-white">
          Dịch vụ
        </p>
        <ButtonAdmin onClick={handleAddServices}>+ Thêm dịch vụ</ButtonAdmin>
      </div>
      <ServiceTableFilter
        queryParams={queryParams}
        setbookingOrder={setbookingOrder}
        bookingOrderSelect={bookingOrderSelect}
        selectedValue={selectedValue}
        setSelectedKeys={setSelectedKeys}
        clearQueryParams={clearQueryParams}
      />
      <Table
        aria-label="Bảng hiển thị danh mục"
        className="mt-4 w-full dark:text-white"
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
        <TableBody items={services?.services || []}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) =>
                columnKey === "action" ? (
                  <TableCell>
                    <button
                      className="btn-edit mr-1"
                      onClick={() => handleEditServices(item._id)}
                    >
                      <Icon className="size-5" icon="uil:edit" />
                    </button>
                    {item.isHidden && (
                      <button
                        className="btn-delete"
                        onClick={() => handleShowServices(item._id)}
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
                        onClick={() => handleDeleteServices(item._id)}
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
                ) : columnKey === "serviceType" ? (
                  <TableCell>
                    {
                      ServicesType[
                        item.serviceType as keyof typeof ServicesType
                      ]
                    }
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
          handleCloseDialog={handleCancelAddServices}
        />
      )}
      {deleteModalOpen && (
        <ModalDelete
          isDialogOpen={deleteModalOpen}
          handleCloseDialog={handleCancelDelete}
          serviceId={deleteServices}
        />
      )}
      {editModalOpen && (
        <ModalEdit
          isDialogOpen={editModalOpen}
          handleCloseDialog={handleCancelEdit}
          editServiceId={editServices}
        />
      )}
      {showeModalOpen && (
        <ModalShow
          isDialogOpen={showeModalOpen}
          handleCloseDialog={handleCancelShow}
          serviceId={deleteServices}
        />
      )}
    </div>
  );
}
