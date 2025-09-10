import {
  QueryParams,
  useGetVouchersQuery,
} from "@/libs/features/services/voucher";
import { useEffect, useMemo, useState } from "react";

interface useVoucherActionProps {
  initialPage: number;
}

export default function useVoucherAction({
  initialPage,
}: useVoucherActionProps) {
  const [pages, setPages] = useState<number>(initialPage);
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const { data: voucher, refetch } = useGetVouchersQuery({
    page: pages,
    limit: 25,
    ...queryParams,
  });
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editVoucher, setEditVoucher] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [showModalOpen, setShowModalOpen] = useState<boolean>(false);
  const [deleteVoucher, setDeleteVoucher] = useState<string>("");

  const [selectedKeys, setSelectedKeys] = useState(
    new Set(["Sắp xếp theo điểm"]),
  );
  const [typeSelect, setTypeSelected] = useState(
    new Set(["Lọc theo kiểu giảm giá"]),
  );

  useEffect(() => {
    setTotalPages(voucher?.totalPages);
  }, [voucher]);

  function handleSetPage(page: number) {
    setPages(page);
    refetch();
  }

  pages;

  function handleAddVoucher() {
    setAddModalOpen(true);
  }

  function handleCancelAddVoucher() {
    setAddModalOpen(false);
  }

  function handleEditVoucher(id: string) {
    setEditModalOpen(true);
    setEditVoucher(id);
  }

  function handleCancelEdit() {
    setEditModalOpen(false);
  }

  function handleDeleteVoucher(id: string) {
    setDeleteModalOpen(true);
    setDeleteVoucher(id);
  }

  function handleCancelDelete() {
    setDeleteModalOpen(false);
  }

  function handleShowVoucher(id: string) {
    setShowModalOpen(true);
    setDeleteVoucher(id);
  }

  function handleCancelShow() {
    setShowModalOpen(false);
  }

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const selectedType = useMemo(
    () => Array.from(typeSelect).join(", "),
    [typeSelect],
  );

  useEffect(() => {
    if (selectedValue !== "Sắp xếp theo điểm") {
      setQueryParams((prev) => ({ ...prev, pointSort: selectedValue }));
    }

    if (selectedType !== "Lọc theo kiểu giảm giá") {
      setQueryParams((prev) => ({ ...prev, typeFilter: selectedType }));
    }
  }, [selectedValue, selectedType]);

  function clearQuery() {
    setQueryParams({});
    setSelectedKeys(new Set(["Sắp xếp theo điểm"]));
    setTypeSelected(new Set(["Lọc theo kiểu giảm giá"]));
  }

  return {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    handleEditVoucher,
    handleCancelEdit,
    editVoucher,
    editModalOpen,
    addModalOpen,
    handleAddVoucher,
    handleCancelAddVoucher,
    deleteModalOpen,
    handleDeleteVoucher,
    deleteVoucher,
    handleCancelDelete,
    setSelectedKeys,
    selectedValue,
    clearQuery,
    setTypeSelected,
    selectedType,
    queryParams,
    handleShowVoucher,
    handleCancelShow,
    showModalOpen,
  };
}
