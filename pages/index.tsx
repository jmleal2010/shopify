
import { getProducts } from "../axios/productsApi";
import { Categories, Cta, Featured, Hero } from "../components";
import { PageLayout } from "../components/Layout";

export async function getStaticProps() {
  const { results: products } = await getProducts({
    page: 1,
    ordering: "asc",
    page_size: 7,
  });
  const { results: categories } = await getProducts({
    page: 1,
    ordering: "name",
    page_size: 3,
  });
  return {
    props: {
      products,
      categories,
    },
  };
}

export default function Example({ products, categories = [] }: any) {
  return (
    <PageLayout>
      <header className="relative overflow-hidden">
        <Hero results={products} />
      </header>

      <main>
        <section aria-labelledby="category-heading" className="bg-gray-50">
          <Categories categories={categories} />
        </section>

        <section aria-labelledby="cause-heading">
          <Featured />
        </section>

        <section aria-labelledby="sale-heading">
          <Cta items={products} />
        </section>
      </main>
    </PageLayout>
  );
}
