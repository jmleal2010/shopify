import React from "react";
import { Category } from "./Category";

export function Categories({ categories }: any) {
  console.log(categories)
  return (
    <div className="mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <h2
          id="category-heading"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Comprar por departamentos
        </h2>
        <a
          href="#"
          className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
        >
          Buscar todas los departamentos
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        {categories.map((item: any, index: number) => (
          <Category main={index === 0} key={index} item={item} />
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <a
          href="#"
          className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Buscar todas los departamentos
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
