import React, { useEffect, useState } from "react";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

import { products, setProducts } from "../../store/productSlice";
import Image from "next/image";
import { PageLayout } from "../../components/Layout";
import { Product } from "../../types";
import { useDispatch } from "react-redux";
import { Payment } from "../../components/cart";
import Empty from "../../components/Empty";
import { ConfirmDialog } from "../../components/dialogs";

export default function Shopping() {
  const [items, setItems] = useState<Product[]>(useSelector(products));
  const [item, setItem] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    const result: Product[] = [];
    items.forEach((item: Product) => {
      const quantity = items.filter(
        (fil: Product) => fil.id === item.id
      ).length;
      const exist = result.find((i: Product, pI: number) => i.id === item.id);

      if (!exist) {
        result.push({ ...item, quantity });
      }
    });

    setItems(result);
  };

  const handleItemQuantity = (item: Product, quantity: string) => {
    item.quantity = parseInt(quantity);
    setItems([...items]);
  };

  const getTotal = () => {
    let total = 0;
    items.forEach((item: Product) => {
      total += item.price * item.quantity!;
    });

    return total;
  };

  const onRemove = (item: Product) => {
    setItem(item);
    setConfirmDelete(true);
  };

  const deleteItem = () => {
    const newItems = items.filter(
      (product: Product) => product.id !== item!.id
    );

    setConfirmDelete(false);
    setItems(newItems);
    dispatch(setProducts(newItems));
  };

  return (
    <PageLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Carro de Compras
          </h1>
          {items.length > 0 ? (
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Elementos en el carrito de compras
                </h2>

                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-t border-b border-gray-200"
                >
                  {items.map((product, productIdx) => (
                    <li key={productIdx} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <Image
                          width={300}
                          height={300}
                          src={product.main_image}
                          alt={product.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Precio: ${product.price}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Cantidad Total: $
                              {product.price * product.quantity!}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label
                              htmlFor={`quantity-${productIdx}`}
                              className="sr-only"
                            >
                              Cantidad, {product.name}
                            </label>
                            <select
                              onChange={(el) =>
                                handleItemQuantity(product, el.target.value)
                              }
                              defaultValue={product.quantity}
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              {[1, 2, 3, 4, 5, 6, 7].map(
                                (item: number, index: number) => (
                                  <option
                                    selected={product.quantity === item}
                                    key={item}
                                    value={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>

                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon
                                  onClick={() => onRemove(product)}
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {product.stock ? (
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          <span>
                            {product.stock
                              ? `En existencia (${product.stock})`
                              : `Envío en "Desconocido"`}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Resúmen de Órden
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${getTotal()}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setPayment(true);
                    }}
                    type="button"
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Realizar pago
                  </button>
                </div>
              </section>
            </form>
          ) : (
            <Empty />
          )}
        </div>
        {payment && <Payment />}
        {confirmDelete && (
          <ConfirmDialog
            onRemove={deleteItem}
            onHide={() => {
              setConfirmDelete(false);
            }}
          />
        )}
      </div>
    </PageLayout>
  );
}
