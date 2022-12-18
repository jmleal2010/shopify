import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const filters: any[] = [
  {
    id: "department",
    name: "Departamento",
    options: [],
  },
  {
    id: "section",
    name: "Sección",
    options: [],
  },
  {
    id: "price",
    name: "Precio",
    options: [
      { id: 10, es_name: "10$" },
      { id: 20, es_name: "20$" },
      { id: "20, 40", es_name: "20$ - 40$" },
      { id: "40, 70", es_name: "40$ - 70$" },
      { id: "70,100000", es_name: "+70$" },
    ],
  },
];

type FilterProps = {
  departments: any[];
  sections?: any[];
  mobile?: boolean;
  onFilter: (filters: any) => void;
};

export function Filter({
  departments,
  sections,
  onFilter,
  mobile = true,
}: FilterProps) {
  filters.find((item: any) => item.id === "department").options = departments;
  filters.find((item: any) => item.id === "section").options = sections;

  const [section, setSection] = useState<number | null>(null);
  const [department, setDepartment] = useState<number | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const filterClass = mobile
    ? {
        wrapper: "mt-4 border-t border-gray-200",
        ul: 'px-2 py-3 font-medium text-gray-900"',
        disclosure:
          "flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500",
      }
    : {
        wrapper: "hidden lg:block",
        ul: "space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900",
        disclosure:
          "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500",
      };

  const handleFilter = (id: number, section: string) => {
    const value = filters
      .find((item: any) => item.id === section)
      .options.find((option: any) => option.id === id).id;
    if (section === "department") {
      setDepartment(value);
    } else if (section === "section") {
      setSection(value);
    } else {
      setPrice(value);
    }
  };

  const handleFilterForm = (e: any) => {
    e.preventDefault();

    onFilter({ section, department, price });
  };

  return (
    <form className={filterClass.wrapper} onSubmit={handleFilterForm}>
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-t border-gray-200 px-4 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-mx-2 -my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-6">
                  {section.options.map((option: any, optionIdx: number) => (
                    <div key={optionIdx} className="flex items-center">
                      <input
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}`}
                        type="radio"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(evt: any) =>
                          handleFilter(option.id, section.id)
                        }
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                      >
                        {option.es_name}
                      </label>
                    </div>
                  ))}
                  {/* {section.id === "price" && (
                    <div className="mt-1">
                      <div>
                        <div className="flex space-x-2">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Otra cantidad
                          </label>
                          <InformationCircleIcon className="w-5 cursor-pointer" />
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name={`price`}
                            id="amount"
                            className="bg-white block w-full rounded border border-gray-300 bg-white p-1.5 text-sm text-gray-900 focus:outline-none border-solid focus:border-gray-400 focus:ring-gray-400"
                          />
                        </div>
                      </div>{" "}
                    </div>
                  )} */}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <button
        type="submit"
        className="justify-center w-full rounded-md border border-transparent bg-blue-400 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-blue-500 text-white"
      >
        Filtrar
      </button>
    </form>
  );
}
