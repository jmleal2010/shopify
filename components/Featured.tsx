import Image from "next/image";
import React from "react";
import featured from "../public/img/featured.jpg";
export function Featured() {
  return (
    <div className="relative bg-gray-800 mb-24 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={featured}
          width={400}
          height={400}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="cause-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Es la mejor compra que hará nunca
        </h2>
        <p className="mt-3 text-xl text-white">
          No dejes pasar esta última oportunidad
        </p>
      </div>
    </div>
  );
}
