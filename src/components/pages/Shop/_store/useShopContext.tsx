import { createContext, useContext, ReactNode } from "react";
import useShopAction from "../_hook/useShopAction";
import { Product } from "@/types/Product";
import { QueryParamsAtShopQuery } from "@/apis/product";
interface ShopContext {
  ProductList: Product[] | undefined;
  handleFilterCategory: (category: string) => void;
  isLoading: boolean;
  sortType?:
    | Set<never>
    | "productBuyDesc"
    | "productBuyAsc"
    | "latest"
    | "priceDesc"
    | "priceAsc";
  handleSortProduct: any;
  queryParams: QueryParamsAtShopQuery;
  handleFilterPrice: (minPrice: number, maxPrice: number) => void;
  handleChangePage: (page: number) => void;
  totalPages: number | undefined;
  handleSearchProduct: (productName: string) => void;
}

const ShopContext = createContext<ShopContext | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const {
    ProductList,
    handleFilterCategory,
    isLoading,
    sortType,
    handleSortProduct,
    queryParams,
    handleFilterPrice,
    handleChangePage,
    totalPages,
    handleSearchProduct,
  } = useShopAction({
    initialPage: 1,
  });
  return (
    <ShopContext.Provider
      value={{
        ProductList,
        handleFilterCategory,
        isLoading,
        sortType,
        handleSortProduct,
        queryParams,
        handleFilterPrice,
        handleChangePage,
        totalPages,
        handleSearchProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
};
