"use client";

import { ShopProvider } from "./_store/useShopContext";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductSort from "./ProductFilter/ProductSort";
import ProductList from "./ProductList";
import ShopBanner from "./ShopBanner/ShopBanner";

export default function Shop() {
  return (
    <main>
      <div className="container my-[100px]">
        <ShopBanner />
        <ShopProvider>
          <div className="mt-8">
            <ProductFilter />
            <ProductList />
          </div>
        </ShopProvider>
      </div>
    </main>
  );
}
