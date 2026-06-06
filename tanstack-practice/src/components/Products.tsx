import React, { useState } from "react";
import { useProducts } from "../services/queries";
import { useProduct } from "../services/queries";
import { Comment } from "../types/comments";

export default function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const getProductQuery = useProduct(selectedProductId);
  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.map((product: Comment) => (
            <React.Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                Product {product.id}
              </button>
              <br />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      <div>
        <br />
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </button>
        <br />
        <div>{
          getProductQuery.isFetching ? <span>Loading ...</span> : JSON.stringify(getProductQuery.data)
        }</div>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
