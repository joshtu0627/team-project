import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import ProductCard from "../ProductCard";
import Product from "../../../types/Product";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { backendurl } from "../../../constants/urls";

type ProductGridProps = {
  selectInfo: [number, string];
};

async function fetchProducts(selectInfo: [number, string], pageParam: number) {
  let url = "";

  console.log("selectInfo", selectInfo);
  await new Promise((r) => setTimeout(r, 400));
  if (selectInfo[0] === 1 && selectInfo[1] === "all") {
    url = `${backendurl}/api/1.0/products/all?paging=${pageParam}`;
  } else if (selectInfo[0] === 1) {
    url = `${backendurl}/api/1.0/products/${selectInfo[1]}?paging=${pageParam}`;
  } else if (selectInfo[0] == 2) {
    url = `${backendurl}/api/1.0/products/search?keyword=${selectInfo[1]}&paging=${pageParam}`;
  }
  console.log("url", url);

  const response = await fetch(url);
  response.data = await response.json();
  return response.data;
}

export default function ProductGrid({ selectInfo }: ProductGridProps) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["products", selectInfo],
    queryFn: ({ pageParam = 0 }) => fetchProducts(selectInfo, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next_paging,
  });
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <div className="flex justify-center w-full my-16">
        <div className="w-4/5">
          {isFetching}
          <div
            className={
              "grid " + (windowWidth > 1280 ? "grid-cols-3" : "m-5 grid-cols-2")
            }
          >
            {data?.pages.map((page, i) => (
              <>
                {page.data.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </>
            ))}

            {isFetching && (
              <>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      className="flex flex-col justify-center mx-5 animate-pulse"
                      key={i}
                    >
                      <div className="w-full bg-gray-200 h-96 rounded-2xl"></div>
                      <div className="w-full mt-5 bg-gray-200 animate-pulse h-7 rounded-2xl"></div>
                      <div className="w-3/4 my-2 bg-gray-200 animate-pulse h-7 rounded-2xl"></div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      {/* infinite scroll */}
      <div ref={ref} />
    </>
  );
}
