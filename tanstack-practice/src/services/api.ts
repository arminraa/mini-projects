import { Comment } from "../types/comments";
import { Todo } from "../types/todos";

const baseUrl = "http://localhost:3000";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getTodosIds() {
  // await delay(4000);
  return await fetch(`${baseUrl}/todos`)
    .then((res) => res.json())
    .then((todos: Todo[]) => todos.map((todo) => todo.id))
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function getTodos(id: string) {
  // await delay(4000);
  return await fetch(`${baseUrl}/todos/${id}`)
    .then((res) => res.json())
    .then((todo: Todo) => todo)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function createTodo(todo: Todo) {
  await delay(4000);
  return await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function updateTodo(todo: Todo) {
  return await fetch(`${baseUrl}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((todo) => todo)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function deleteTodo(id: string) {
  return await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getComments(page: number) {
  return await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=3`
  )
    .then((res) => res.json())
    .then((comments: Comment[]) => comments)
    .catch((err) => {
      throw err;
    });
}

export async function getProducts({ pageParam }: { pageParam: number }) {
  return await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${
      pageParam + 1
    }&_limit=3`
  ).then((res) => res.json());
}

export async function getProduct(id: number) {
  return await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`
  ).then((res) => res.json());
}
