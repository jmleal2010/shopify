import React from "react";

export function Category({ main, item }: any) {
  const classes = main
    ? {
        wrappClass:
          "group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2",
        imgClass: "object-cover object-center group-hover:opacity-75",
        insetClass: "bg-gradient-to-b from-transparent to-black opacity-50",
      }
    : {
        wrappClass:
          "group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full",
        imgClass:
          "object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full",
        insetClass:
          "bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0",
      };
  return (
    <div className={classes.wrappClass}>
      <img
        src={item.main_image}
        alt={item.name}
        className={classes.imgClass}
      />
      <div aria-hidden="true" className={classes.insetClass} />
      <div className="flex items-end p-6">
        <div>
          <h3 className="font-semibold text-white">
            <a href="#">
              <span className="absolute inset-0" />
              {item.name}
            </a>
          </h3>
          <p aria-hidden="true" className="mt-1 text-sm text-white">
            Comprar ahora
          </p>
        </div>
      </div>
    </div>
  );
}
