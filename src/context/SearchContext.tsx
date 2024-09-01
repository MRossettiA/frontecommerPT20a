"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProductsDB } from "@/helpers/product.helper";
import IProduct from "@/interfaces/Product";

interface SearchContextType {
  searchProduct: string;
  setSearchProduct: (query: string) => void;
  products: IProduct[];
  loading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchProduct) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const allProducts = await getProductsDB();
          const filteredProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(searchProduct.toLowerCase())
          );
          setProducts(filteredProducts);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [searchProduct]);

  return (
    <SearchContext.Provider value={{ searchProduct, setSearchProduct, products, loading }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
