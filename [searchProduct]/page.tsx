"use client";

import { useSearchContext } from "@/context/SearchContext"; 
import Link from "next/link";
import Card from "@/components/Card/Card";

const SearchProduct = () => {
  const { products, loading, searchProduct } = useSearchContext();

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                stock={product.stock}
                categoryId={product.categoryId}
                description={product.description}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p>
  {/* eslint-disable-next-line react/no-unescaped-entities */}
  No products found for "{searchProduct}"
</p>

      )}
    </div>
  );
};

export default SearchProduct;
