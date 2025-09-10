import { getProductAtShop, QueryParamsAtShopQuery } from "@/apis/product";
import { Product } from "@/types/Product";
import { errorModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import { useEffect, useState, useCallback } from "react";

interface useShopActionProps {
  initialPage: number;
}

export default function useShopAction({ initialPage }: useShopActionProps) {
  const [queryParams, setQueryParams] = useState<QueryParamsAtShopQuery>({
    limit: 12,
    page: initialPage,
  });
  const [sortType, setSortType] = useState(new Set([]));
  const [ProductList, setProductList] = useState<Product[] | undefined>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // === LOGIC FILTER ===
  const updateQueryParams = useCallback(
    (newParams: Partial<QueryParamsAtShopQuery>) => {
      setQueryParams((prevParams) => ({
        ...prevParams,
        ...newParams,
      }));
    },
    [],
  );

  const handleFilterCategory = useCallback(
    (categoryId: string) => {
      if (categoryId === queryParams.productCategory) {
        updateQueryParams({ productCategory: undefined });
      } else {
        updateQueryParams({ productCategory: categoryId });
      }
    },
    [queryParams, updateQueryParams],
  );

  const handleSortProduct = useCallback(
    (sortOption: any) => {
      const formatSortType = formatSelectedKeys(sortOption);
      setSortType(sortOption);
      updateQueryParams({ sortBy: formatSortType as any });
    },
    [updateQueryParams],
  );

  const handleFilterPrice = useCallback(
    (minPrice: number, maxPrice: number) => {
      if (maxPrice > 5000000 || minPrice > maxPrice) {
        errorModal({
          content: "Vui lòng nhập giá hợp lệ ( Cao nhất: 5.000.000)",
          duration: 3,
        });
        return;
      }
      updateQueryParams({ minPrice, maxPrice });
    },
    [updateQueryParams],
  );

  const handleChangePage = useCallback(
    (page: number) => {
      updateQueryParams({ page });
    },
    [updateQueryParams],
  );

  const handleSearchProduct = useCallback(
    (productName: string) => {
      updateQueryParams({ productName });
    },
    [updateQueryParams],
  );

  // === FETCH DATA ===
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getProductAtShop({
        page: 1,
        ...queryParams,
      });
      setTotalPages(response?.totalPages);
      setProductList(response?.products);
    } catch (error) {
      errorModal({ content: "Lỗi khi lấy dữ liệu sản phẩm", duration: 3 });
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [queryParams]);

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 200);

    return () => clearTimeout(debounceFetch);
  }, [fetchProducts]);

  return {
    ProductList,
    isLoading,
    handleFilterCategory,
    sortType,
    handleSortProduct,
    queryParams,
    handleFilterPrice,
    handleChangePage,
    totalPages,
    handleSearchProduct,
  };
}
