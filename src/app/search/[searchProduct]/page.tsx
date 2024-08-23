"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import { getProductsDB } from '@/helpers/product.helper';
import IProduct from '@/interfaces/Product';

const SearchProduct = () => {
  const searchParams = useSearchParams();
  const searchProduct = searchParams.get('q') || '';
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
        <p>No products found for &quot;{searchProduct}&quot;</p>
      )}
    </div>
  );
};

export default SearchProduct;
