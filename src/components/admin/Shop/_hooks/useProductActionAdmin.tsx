import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { getProduct, deleteProduct, unHiddenProduct } from "@/apis/product";
import { errorModal, successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import {
  QueryParams,
  useLowstockNofiMutation,
} from "@/libs/features/services/product";

interface UseGetProductProps {
  initialPage: number;
}

export default function useProductActionAdmin({
  initialPage,
}: UseGetProductProps) {
  const [pages, setPages] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [productList, setProductList] = useState<Product[]>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [saleFilter, setSaleFilter] = useState(new Set(["Giảm giá"]));
  const [outStockFilter, setOutStockFilter] = useState(new Set(["Tình trạng"]));
  const [productBuyFilter, setProductBuyFilter] = useState(
    new Set(["Theo lượt mua"]),
  );
  const [subCateFilter, setSubCateFilter] = useState(new Set(["Danh mục"]));
  const [hiddenFilter, setHiddenFilter] = useState(new Set(["Ẩn/Hiện"]));
  const [unHiddenModalOpen, setunHiddenModalOpen] = useState<boolean>(false);

  // Thêm state isLoading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [lowstockNofi, { data, error, isLoading: lowstockNofiLoading }] =
    useLowstockNofiMutation();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProduct({
          page: pages,
          limit: 10,
          ...queryParams,
        });
        setTotalPages(response?.totalPages);
        setProductList(response?.products);
      } catch (error) {
        errorModal({ content: "Lỗi khi lấy dữ liệu sản phẩm", duration: 3 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [pages, queryParams]);

  function handleSetPage(page: number) {
    setPages(page);
  }

  const handleDeleteProduct = (productId: string) => {
    setDeleteProductId(productId);
    setDeleteModalOpen(true);
  };

  const handleUnHiddenproduct = (productId: string) => {
    setDeleteProductId(productId);
    setunHiddenModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleCancelUnhidden = () => {
    setunHiddenModalOpen(false);
  };

  async function handleConfirmDelete() {
    if (deleteProductId) {
      try {
        await deleteProduct(deleteProductId); // hàm này cập nhật isHidden bên server

        setDeleteModalOpen(false);

        // Duyệt qua productList, nếu product._id = deleteProductId thì set isHidden = true
        setProductList((prevList) =>
          prevList?.map((product) =>
            product._id === deleteProductId
              ? { ...product, isHidden: true }
              : product,
          ),
        );

        successModal({ content: "Cập nhật thành công", duration: 3 });
      } catch (error) {
        errorModal({ content: "Cập nhật thất bại", duration: 3 });
      }
    }
  }

  async function handleUnhidden() {
    if (deleteProductId) {
      try {
        await unHiddenProduct(deleteProductId); // hàm này cập nhật isHidden bên server

        setunHiddenModalOpen(false);

        // Duyệt qua productList, nếu product._id = deleteProductId thì set isHidden = true
        setProductList((prevList) =>
          prevList?.map((product) =>
            product._id === deleteProductId
              ? { ...product, isHidden: false }
              : product,
          ),
        );

        successModal({ content: "Cập nhật thành công", duration: 3 });
      } catch (error) {
        errorModal({ content: "Cập nhật thất bại", duration: 3 });
      }
    }
  }

  console.log(productList);

  const handleSearchProduct = (value: string) => {
    if (value === "") {
      setQueryParams((prev) => {
        const { productName, ...rest } = prev;
        return rest;
      });
    } else {
      setQueryParams((prev) => ({
        ...prev,
        productName: value,
      }));
    }
  };

  useEffect(() => {
    if (formatSelectedKeys(saleFilter) !== "Giảm giá") {
      setQueryParams((prev) => ({
        ...prev,
        salePercent: formatSelectedKeys(saleFilter) as any,
      }));
    }
    if (formatSelectedKeys(outStockFilter) !== "Tình trạng") {
      setQueryParams((prev) => ({
        ...prev,
        lowStock:
          (formatSelectedKeys(outStockFilter) as any) == 1 ? true : false,
      }));
    }
    if (formatSelectedKeys(productBuyFilter) !== "Theo lượt mua") {
      setQueryParams((prev) => ({
        ...prev,
        sortBy: formatSelectedKeys(productBuyFilter) as any,
      }));
    }
    if (formatSelectedKeys(subCateFilter) !== "Danh mục") {
      setQueryParams((prev) => ({
        ...prev,
        productCategory: formatSelectedKeys(subCateFilter) as any,
      }));
    }
    if (formatSelectedKeys(hiddenFilter) !== "Ẩn/Hiện") {
      setQueryParams((prev) => ({
        ...prev,
        isHidden: (formatSelectedKeys(hiddenFilter) as any) == 1 ? true : false,
      }));
    }
  }, [
    saleFilter,
    outStockFilter,
    productBuyFilter,
    subCateFilter,
    hiddenFilter,
  ]);

  function handleClearQueryParams() {
    setQueryParams({});
    setSaleFilter(new Set(["Giảm giá"]));
    setOutStockFilter(new Set(["Tình trạng"]));
    setProductBuyFilter(new Set(["Theo lượt mua"]));
    setSubCateFilter(new Set(["Danh mục"]));
    setHiddenFilter(new Set(["Ẩn/Hiện"]));
  }

  function handleLowstockNofi(productId: string) {
    setTimeout(() => {
      lowstockNofi(productId);
    }, 1000);
  }

  useEffect(() => {
    if (data) {
      successModal({ content: "Gửi thông báo thành công" });
    }
  }, [data]);

  return {
    productList,
    totalPages,
    pages,
    handleSetPage,
    handleDeleteProduct,
    handleCancelDelete,
    handleConfirmDelete,
    deleteProduct,
    deleteModalOpen,
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
    handleLowstockNofi,
    lowstockNofiLoading,
    isLoading,
    queryParams,
    hiddenFilter,
    setHiddenFilter,
    handleUnhidden,
    handleUnHiddenproduct,
    handleCancelUnhidden,
    unHiddenModalOpen,
  };
}
