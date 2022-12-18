import { EyeIcon, StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Product } from "../../types";

type ProductProp = {
  product: Product;
  onAddToCart: () => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function Product({ product, onAddToCart }: ProductProp) {
  const navigation = useRouter();
  return (
    <div
     /*  onClick={() => {
        navigation.push({ pathname: `/product/${product.id}/details` });
      }} */
      key={product.id}
      className="group relative cursor-pointer border-r h-96 border-b border-gray-200 p-4 sm:p-6"
    >
      <div className="h-36 w-36 flex mx-auto overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <Image
          width={300}
          height={300}
          src={product.main_image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pt-2 pb-2 h-32 text-center">
        <h3 className="text-sm font-medium text-gray-900 h-12">
          <a href="#" className="">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name.length > 20
              ? product.name.substring(0, 50).concat("...")
              : product.name}
          </a>
        </h3>
        <div className="mt-2 flex flex-col items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-base font-medium text-gray-900">
          Precio: {product.price} $
        </p>
      </div>
      <div className="mt-2">
        <button
          onClick={onAddToCart}
          className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Adicionar al carro
          <span className="sr-only">, {product.name}</span>
        </button>
      </div>
    </div>
  );
}
