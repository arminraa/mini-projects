import { Task } from "./store";

const baseUrl = process.env.BASE_URL;
export const addTaskServer = async (title: string, description: string) => {
  return await fetch(`http://localhost:3001/tasks`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: String(Date.now()),
      title,
      description,
      type: "New",
    }),
  }).then((res) => res.json());
};

export const EditTaskServer = async (
  draggedTask: Task,
  newType: "New" | "In Progress" | "Completed"
) => {
  return await fetch(`http://localhost:3001/tasks/${draggedTask.id}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...draggedTask,
      type: newType,
    }),
  }).then((res) => res.json());
};

export const removeTaskServer = async (id: string) => {
  return await fetch(`http://localhost:3001/tasks/${id}`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

// export const getTasksServer = async () => {
//   return await fetch("http://localhost:3001/tasks")
//     .then((res) => res.json())
//     .then((data) => data);
// };
