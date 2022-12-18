import Image from "next/image";
import Link from "next/link";
import React from "react";

export function HeroDecorative({ results }: any) {
  return (
    <div className="mt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
      >
        <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                <Image
                  width={400}
                  height={300}
                  src={results[0].main_image}
                  alt={results[0].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
              <Image
                  width={400}
                  height={300}
                  src={results[1].main_image}
                  alt={results[1].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg">
              <Image
                  width={400}
                  height={300}
                  src={results[2].main_image}
                  alt={results[2].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
              <Image
                  width={400}
                  height={300}
                  src={results[3].main_image}
                  alt={results[3].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
              <Image
                  width={400}
                  height={300}
                  src={results[4].main_image}
                  alt={results[4].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg">
              <Image
                  width={400}
                  height={300}
                  src={results[5].main_image}
                  alt={results[5].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
              <Image
                  width={400}
                  height={300}
                  src={results[6].main_image}
                  alt={results[6].name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        href={'/products'}
        className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
      >
        Ver Productos
      </Link>
    </div>
  );
}
