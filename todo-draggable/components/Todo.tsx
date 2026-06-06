"use client";

import { useRemoveTask } from "@/lib/mutation";
import { Task, useTodoStore } from "@/lib/store";
import { useState } from "react";

export default function Todo({
  task
}: Readonly<{
  task: Task
}>) {
  const removeTask = useTodoStore((state) => state.removeTask);
  const dragTask = useTodoStore((state) => state.dragTask);
  const [hidden, setHidden] = useState(false);
  const removeTaskMutation = useRemoveTask();
  const handleRemove = async () => {
    setHidden(true);
    setTimeout(() => {
      removeTaskMutation.mutate(task.id)
    }, 2000);
  }
  return (
    <li
      draggable
      onDragStart={() => dragTask(task.id)}
      className={`${hidden ? "opacity-0" : "opacity-100"} bg-white transition-opacity w-full rounded-md text-black flex justify-between items-center p-2`}
    >
      <span>
        <strong>Title :</strong> {task.title}
        <br />
        <strong>Description :</strong> {task.description}
        <br />
        <strong>Type :</strong> {task.type}
      </span>

      <button onClick={handleRemove} className="text-xl text-red-600">X</button>
    </li>
  );
}
