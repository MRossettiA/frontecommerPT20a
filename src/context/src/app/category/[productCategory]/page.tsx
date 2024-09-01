import Card from "@/components/Card/Card"
import { getProductByCategory } from "@/helpers/product.helper"
import Link from "next/link"

const ProductCategory = async({params}: {params:{productCategory: string}})=>{
  
  const products = await getProductByCategory(params.productCategory)

  return (
    <div>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Card key={product.id} {...product} />
          </Link>
        ))}
    </div>
      ) : (
        <p>No products found for this category.</p>
      )}
      </div>
  )
  
}
export default ProductCategory