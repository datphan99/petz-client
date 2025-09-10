import { useGetSubCategoriesPaginateQuery } from "@/libs/features/services/subcategories";
import { useEffect, useState } from "react";

interface useSubCategoriesActionProps {
  initialPage: number;
}

export default function useSubCategoriesAction({
  initialPage,
}: useSubCategoriesActionProps) {
  const [pages, setPages] = useState<number>(initialPage);
  const { data: subcategories, refetch: refetchData } =
    useGetSubCategoriesPaginateQuery(pages);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editSubCategory, setEditSubCategory] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState<string>("");

  useEffect(() => {
    setTotalPages(subcategories?.totalPages);
  }, [subcategories]);

  function handleSetPage(page: number) {
    setPages(page);
  }

  function handleAddSubCategory() {
    setAddModalOpen(true);
  }

  function handleCancelAddSubCategory() {
    setAddModalOpen(false);
  }

  function handleEditSubCategory(id: string) {
    setEditModalOpen(true);
    setEditSubCategory(id);
  }

  function handleCancelEdit() {
    setEditModalOpen(false);
  }

  function handleDeleteSubCategory(id: string) {
    setDeleteModalOpen(true);
    setDeleteSubCategory(id);
  }

  function handleCancelDelete() {
    setDeleteModalOpen(false);
  }

  return {
    subcategories,
    pages,
    totalPages,
    handleSetPage,
    handleEditSubCategory,
    handleCancelEdit,
    editSubCategory,
    editModalOpen,
    addModalOpen,
    handleAddSubCategory,
    handleCancelAddSubCategory,
    deleteModalOpen,
    handleDeleteSubCategory,
    deleteSubCategory,
    handleCancelDelete,
  };
}
