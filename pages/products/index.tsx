import {
  getDepartments,
  getProducts,
  getSections,
} from "../../axios/productsApi";
import { PageLayout } from "../../components/Layout";
import { ProductList } from "../../components/products/ProductList";

export async function getStaticProps() {
  const { results, count, next, previous } = await getProducts();
  const { data: departments } = await getDepartments();
  const { data: sections } = await getSections();

  return {
    props: {
      results,
      count,
      next,
      previous,
      departments,
      sections,
    },
  };
}

import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Filter } from "../../components/products";
import Link from "next/link";
import { Pagination } from "../../components";
import Empty from "../../components/Empty";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Index({ results, count, departments, sections }: any) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<any[]>(results);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [ordering, setOrdering] = useState<string | null>("name");
  const [search, setSearch] = useState<string | null>(null);
  const [price, setPrice] = useState<number | string | null>(null);
  const [department, setDepartment] = useState<number | null>(null);
  const [section, setSection] = useState<number | null>(null);

  const [sortOptions, setSortOptions] = useState<any[]>([
    { name: "Nombre", value: "name", href: "#", current: true },
    { name: "Descripción", value: "description", href: "#", current: false },
    { name: "Precio", value: "price", href: "#", current: false },
    { name: "Sección", value: "section", href: "#", current: false },
    { name: "Departamento", value: "department", href: "#", current: false },
  ]);

  const onFilter = async ({ section, department, price }: any) => {
    const { results } = await getProducts({
      page,
      page_size: pageSize,
      ordering,
      search,
      section,
      department,
      price,
    });
    setPrice(price);
    setDepartment(department);
    setProducts(results);
    setSection(section);
  };

  const onOrder = async (sortOption: any) => {
    sortOption.current = true;

    const newOptions = sortOptions.map((item: any) => {
      if (item.value !== sortOption.value) {
        item.current = false;
      }
      return item;
    });

    setOrdering(sortOption.value);
    setSortOptions([...newOptions]);

    const { results } = await getProducts({
      page,
      page_size: pageSize,
      ordering: sortOption.value,
      search,
      section,
      department,
      price,
    });

    setProducts(results);
  };

  const onPrev = async () => {
    if (page > 1) {
      const { results } = await getProducts({
        page: page - 1,
        page_size: pageSize,
        ordering,
        search,
        section,
        department,
        price,
      });

      setPage(page - 1);
      setProducts(results);
    }
  };

  const onNext = async () => {
    const newPage = page + 1;
    const amount = pageSize * newPage;
    const calc = count - amount;
    const page_size = calc < 0 ? amount / newPage + calc : pageSize;

    if (pageSize * page <= count) {
      const { results } = await getProducts({
        page: newPage,
        page_size,
        ordering,
        search,
        section,
        department,
        price,
      });

      setPage(newPage);
      setProducts(results);
    }
  };

  return (
    <PageLayout>
      <div className="bg-white">
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtrar
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <Filter
                    onFilter={onFilter}
                    departments={departments}
                    sections={sections}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-12 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Productos
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ordenar
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              onClick={() => onOrder(option)}
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <Filter
                onFilter={onFilter}
                departments={departments}
                sections={sections}
                mobile={false}
              />

              {products.length > 0 ? (
                <div className="lg:col-span-3">
                  <ProductList items={products} />
                  <div className="mt-2">
                    <Pagination
                      count={count}
                      pageSize={pageSize}
                      page={page}
                      onPrev={onPrev}
                      onNext={onNext}
                    />
                  </div>
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
