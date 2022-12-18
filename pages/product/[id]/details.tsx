import { useRouter } from "next/router";
import React from "react";
import { getProducts } from "../../../axios/productsApi";
import { ProductOverview } from "../../../components/products";

export async function getStaticProps() {
  const { results, count, next, previous } = await getProducts({
    page: 1,
    page_size: 100,
    ordering: "es_name",
    search: null,
    section: null,
    department: null,
    price: null,
  });

  return {
    props: {
      results,
      count,
      next,
      previous,
    },
  };
}

export default function Details({ results }: any) {
  const router = useRouter();

  const { id } = router.query;
  if (id) {
    const product = results.find((item: any) => item.id.toString() === id);
    return <ProductOverview item={product} />;
  }
}
