import React, { Fragment, useState } from "react";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};
export function PageLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="https://www.clipartmax.com/png/full/219-2190038_bags-woman-shopping-icon-transparent.png"
        />
        <title>Shopify</title>
      </Head>
      <div className="bg-white">
        <Navbar />
        {children}
        <footer aria-labelledby="footer-heading" className="bg-white">
          <Footer />
        </footer>
      </div>
    </>
  );
}
