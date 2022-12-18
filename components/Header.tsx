import React from "react";
import { ProfilePreview } from "./ProfilePreview";

export function Header() {
  return (
    <div className="bg-white shadow">
    <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div className="min-w-0 flex-1">
          {/* Profile */}
         <ProfilePreview />
        </div>
        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Opcion 1
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Opcion 2
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
