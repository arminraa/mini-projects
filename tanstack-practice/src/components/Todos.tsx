// import { useIsFetching } from "@tanstack/react-query";
import { FormEvent, useState, useId } from "react";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutation";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todos";

export default function Todos() {
  const todosIdsQuery = useTodosIds("enabled");
  const todosQuery = useTodos(todosIdsQuery.data!);
  const createTodosMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const id = useId();
  // const isFetching = useIsFetching();
  // if (postsIdsQuery.isPending) return <div>Loading ...</div>;
  // if (postsIdsQuery.isError) return <div>Error !</div>;

  const handleCreatePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTodosMutation.mutate({ id: id, title, description, checked: false });
  };
  const handleMarkAsDoneSubmit = (todo: Todo) => {
    updateTodoMutation.mutate({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      checked: !todo.checked,
    });
  };
  const deleteTodoHandler = (id: string) => {
    deleteTodoMutation.mutate(id);
  };
  return (
    <>
      {/* <h3>Fetch Function Status : {postsIdsQuery.fetchStatus}</h3>
      <h3>Fetch Data Status : {postsIdsQuery.status}</h3>
      <h3>IsFetching : {isFetching} </h3> */}
      {/* POSTSIDSQUERY
      {postsIdsQuery.data?.map((id) => (
        <div key={id}>Id : {id}</div>
      ))} */}
      <form onSubmit={(e) => handleCreatePostSubmit(e)}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="title"
        />
        <br />
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="description"
        />
        <button type="submit" disabled={createTodosMutation.isPending}>
          {createTodosMutation.isPending ? "Creating ..." : "Submit"}
        </button>
      </form>
      <br />
      **** Todos Query ****
      <ul>
        {todosQuery.map(({ data }) => {
          if (data) {
            return (
              <li key={data.id}>
                <span>Title : {data.title}</span>
                <br />
                <span>Description : {data.description}</span>
                <br />
                <button
                  disabled={data.checked}
                  onClick={() => handleMarkAsDoneSubmit(data)}
                >
                  {data.checked ? "Done" : "Mark as Done"}
                </button>
                <button onClick={() => deleteTodoHandler(data.id)}>
                  Delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
