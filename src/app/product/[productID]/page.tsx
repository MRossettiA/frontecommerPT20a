// DetailProduct.tsx
import ProductDetail from "@/components/ProductDetails/ProductDetail";
import { getProductById } from "@/helpers/product.helper";
import DetailProductProps from "@/interfaces/DetailProductProps";
import React from "react";

const DetailProduct: React.FC<DetailProductProps> = async ({ params }) => {
  const { productID } = params;
  const product = await getProductById(productID);

  
  return (
    <div className="flex justify-center p-4">
      <div >
        <ProductDetail {...product} />
      </div>
    </div>
  );
};

export default DetailProduct;
