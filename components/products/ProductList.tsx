import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { products, setProducts } from "../../store/productSlice";
import { Product as ProductType} from "../../types";
import { Product } from "./Product";

export function ProductList({ items, page = 1, page_size = 10 }: any) {
  const elements = useSelector(products);
  const dispatch = useDispatch();

  const handleAddProduct = (product: ProductType) => {
     dispatch(setProducts([...elements, product]))
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Productos</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product: ProductType) => (
            <Product
              onAddToCart={()=>handleAddProduct(product)}
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
