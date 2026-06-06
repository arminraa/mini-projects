"use client";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { Task, useTodoStore } from "@/lib/store";
import { useEditTask } from "@/lib/mutation";
// import { useGetTasks } from "@/lib/queries";

export default function Todos({
  type,
}: Readonly<{
  type: "New" | "In Progress" | "Completed";
}>) {
  const tasks = useTodoStore((state) => state.tasks);
  const state = useTodoStore((state) => state);
  const editTask = useTodoStore((state) => state.editTask);
  const draggedTask = useTodoStore((state) => state.draggedTask);
  const [filteredTodos, setFilteredTodos] = useState<Task[]>([]);
  const editTaskMutate = useEditTask();
  // const getTasksQuery = useGetTasks();

  useEffect(() => {
    setFilteredTodos(tasks.filter((task: Task) => task.type === type))
  }, [state])
  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={() => draggedTask && editTaskMutate.mutate({ draggedTask, newType: type })} className="h-[500px] sm:col-span-6   lg:col-span-4 col-span-12 bg-blue-900 text-white py-6 px-4 rounded-md">
      <div className="text-start pb-2 px-2 text-lg">{type}</div>
      <ul className="w-full flex flex-col gap-3 justify-center">
        {filteredTodos.map((task) => (
          <Todo task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}
