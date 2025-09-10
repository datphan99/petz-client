"use client";

import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tabs,
  Tab,
  Input,
  Button,
  Spinner,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useProductActionAdmin from "./_hooks/useProductActionAdmin";
import { ProductOption } from "@/types/Product";
import ModalDelete from "./Modal/ModalDelete";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import formatMoney from "@/utils/formatMoney";
import { useSession } from "next-auth/react";
import ProductTableFilter from "./ProductTableFilter";
import { useState } from "react";
import ModalUnHidden from "./Modal/ModalUnHidden";

export default function ProductTable() {
  const {
    productList,
    isLoading,
    pages,
    totalPages,
    handleSetPage,
    handleDeleteProduct,
    deleteModalOpen,
    handleCancelDelete,
    handleConfirmDelete,
    handleSearchProduct,
    setSaleFilter,
    saleFilter,
    outStockFilter,
    setOutStockFilter,
    handleClearQueryParams,
    setProductBuyFilter,
    productBuyFilter,
    subCateFilter,
    setSubCateFilter,
    queryParams,
    hiddenFilter,
    setHiddenFilter,
    handleUnhidden,
    handleUnHiddenproduct,
    handleCancelUnhidden,
    unHiddenModalOpen,
  } = useProductActionAdmin({ initialPage: 1 });

  const session = useSession();
  const userRole = session.data?.user.userRole;

  const baseColumns = [
    { key: "productName", label: "TÊN SẢN PHẨM" },
    { key: "salePercent", label: "GIẢM GIÁ" },
    { key: "productBuy", label: "LƯỢT MUA" },
    { key: "productThumbnail", label: "ẢNH" },
    { key: "productOption", label: "TÙY CHỌN" },
    { key: "isHidden", label: "ẨN/HIỆN" },
    { key: "productStatus", label: "TRẠNG THÁI" },
  ];

  const columns =
    userRole === "staff"
      ? baseColumns
      : [...baseColumns, { key: "action", label: "ACTION" }];

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Input
          className="w-2/3"
          onValueChange={handleSearchProduct}
          placeholder="Tên sản phẩm"
        />

        {userRole === "admin" && (
          <Button
            className="ml-auto bg-primary px-6 text-white dark:text-black"
            variant="flat"
          >
            <NormalTransitionLink href="/admin/add-product">
              + Thêm sản phẩm
            </NormalTransitionLink>
          </Button>
        )}
      </div>
      <ProductTableFilter
        queryParams={queryParams}
        setSaleFilter={setSaleFilter}
        saleFilter={saleFilter}
        setOutStockFilter={setOutStockFilter}
        outStockFilter={outStockFilter}
        setProductBuyFilter={setProductBuyFilter}
        productBuyFilter={productBuyFilter}
        subCateFilter={subCateFilter}
        setSubCateFilter={setSubCateFilter}
        handleClearQueryParams={handleClearQueryParams}
        hiddenFilter={hiddenFilter}
        setHiddenFilter={setHiddenFilter}
      />
      <Table
        aria-label="Product Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              classNames={{
                cursor: "bg-black",
              }}
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
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent="Không tìm thấy sản phẩm nào"
          items={productList || []}
        >
          {(item) => (
            <TableRow className="dark:text-white" key={item._id}>
              {(columnKey) => {
                if (columnKey === "action") {
                  return (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {(item as any).isHidden && (
                          <button
                            onClick={() => handleUnHiddenproduct(item._id)}
                          >
                            <Icon className="size-6" icon="mdi:eye" />
                          </button>
                        )}

                        {!(item as any).isHidden && (
                          <button onClick={() => handleDeleteProduct(item._id)}>
                            <Icon className="size-6" icon="mdi:eye-off" />
                          </button>
                        )}
                        <NormalTransitionLink
                          href={`shop/edit-product/${item.productSlug}`}
                        >
                          <Icon className="size-6" icon="mynaui:edit" />
                        </NormalTransitionLink>
                      </div>
                    </TableCell>
                  );
                } else if (columnKey === "productOption") {
                  return (
                    <TableCell>
                      <Tabs aria-label="Options">
                        {item.productOption.map((option: ProductOption) => (
                          <Tab key={option._id} title={option.name}>
                            <p>Giá: {formatMoney(option.productPrice)}</p>
                            <p>Số lượng: {option.productQuantity}</p>
                          </Tab>
                        ))}
                      </Tabs>
                    </TableCell>
                  );
                } else if (columnKey === "productThumbnail") {
                  return (
                    <TableCell>
                      <Image
                        unoptimized
                        src={item.productThumbnail}
                        alt={item.productName}
                        width={500}
                        height={500}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                  );
                } else if (columnKey === "isHidden") {
                  return (
                    <TableCell>
                      {(item as any).isHidden === true ? "Ẩn" : "Hiển thị"}
                    </TableCell>
                  );
                } else if (columnKey === "productStatus") {
                  const totalQuantity = item.productOption.reduce(
                    (sum: number, option: ProductOption) =>
                      sum + option.productQuantity,
                    0,
                  );

                  const status =
                    totalQuantity < 5 ? (
                      <span className="rounded-full bg-red-100 px-4 py-2 font-bold text-[#e71f1f]">
                        Sắp hết hàng
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-[#2ab66c]">
                        Còn hàng
                      </span>
                    );

                  return <TableCell>{status}</TableCell>;
                } else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {deleteModalOpen && (
        <ModalDelete
          handleConfirmDelete={handleConfirmDelete}
          isDialogOpen={deleteModalOpen}
          handleCloseDialog={handleCancelDelete}
        />
      )}
      {unHiddenModalOpen && (
        <ModalUnHidden
          handleConfirmDelete={handleUnhidden}
          isDialogOpen={unHiddenModalOpen}
          handleCloseDialog={handleCancelUnhidden}
        />
      )}
    </div>
  );
}
