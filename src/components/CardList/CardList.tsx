"use client"; // Añadir esta línea en la parte superior

import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { getProductsDB } from "@/helpers/product.helper";
import Link from "next/link";
import IProduct from "@/interfaces/Product";

const CardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data: IProduct[] = await getProductsDB();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Card key={product.id} {...product} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardList;
