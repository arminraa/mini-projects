import { useState } from "react";
import { useComments } from "../services/queries";

export default function Comments() {
  const [page, setPage] = useState(1);
  const { data, isFetching, isPending, isError, error, isPlaceholderData } =
    useComments(page);
  useComments(page);

  return (
    <div>
      {isPending ? (
        <h1>Loading ...</h1>
      ) : isError ? (
        <h1>Error : {error.message}</h1>
      ) : data ? (
        <>
          {data &&
            data.map((comment) => (
              <div key={comment.id}>
                <span>Id : {comment.id}</span>
                <br />
                <span>Name : {comment.name}</span>
                <br />
                <span>Body : {comment.body}</span>
                <br />
                ***
              </div>
            ))}
          {page}
          <button
            onClick={() => {
              if (!isPlaceholderData) {
                setPage(page + 1);
              }
            }}
            disabled={isPlaceholderData}
          >
            Next
          </button>{" "}
          <button onClick={() => (page > 1 ? setPage(page - 1) : "")}>
            Previous
          </button>
          {isFetching ? <h1>Loading ...</h1> : ""}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
