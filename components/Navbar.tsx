import { Dialog, Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDepartments } from "../axios/productsApi";
import { products } from "../store/productSlice";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dptos, setDptos] = useState<any[]>([]);

  const items = useSelector(products);
  const nav = useRouter();

  useEffect(() => {
    const depts = async () => {
      const { data } = await getDepartments();
      setDptos(data);
    };

    depts();
  }, []);

  const navigation = {
    categories: [
      {
        id: "departments",
        name: "Productos",
        href: "/products",
      },
      { id: "sections", name: "Secciones", href: "#" },
      { id: "stores", name: "Tiendas", href: "#" },
    ],
    pages: [
      { name: "Company", href: "#" },
      { name: "Stores", href: "#" },
    ],
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <nav
        aria-label="Top"
        className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href={"/"}>
                <span className="sr-only">Your Company</span>
                <Image
                  width={80}
                  height={80}
                  className="h-8 w-auto"
                  src="https://www.clipartmax.com/png/full/219-2190038_bags-woman-shopping-icon-transparent.png"
                  alt=""
                />
              </Link>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (

                  
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            onClick={() => {
                              nav.push(category.href);
                            }}
                            className={classNames(
                              open
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-700 hover:text-gray-800",
                              "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                            )}
                          >
                            {category.name}
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full bg-white text-sm text-gray-500">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {items.length > 0 && (
                    <span className="inline-flex relative -top-2 -left-3 items-center rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white">
                      {items.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
