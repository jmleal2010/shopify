import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export function Switcher({ onSidebar }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={() => onSidebar(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
