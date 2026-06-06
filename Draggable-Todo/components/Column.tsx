import { Status, Task, useTodoStore } from "@/lib/store";

export default function Column({
  title,
  status,
}: Readonly<{
  title: string;
  status: Status;
}>) {
  const tasks = useTodoStore((state) => state.tasks);
  const dragTask = useTodoStore((state) => state.dragTask);
  const draggedTask = useTodoStore((state) => state.draggedTask);
  const updateTask = useTodoStore((state) => state.updateTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const filteredTasks = tasks.filter((task: Task) => task.status === status);
  const handleDrop = () => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex-col gap-2 h-[500px] col-span-4 flex justify-start items-center rounded-md bg-gray-600 p-6"
    >
      {filteredTasks &&
        filteredTasks.map((task: Task) => (
          <article
            key={task.id}
            className="w-full bg-white rounded-md text-black py-2 px-4 flex justify-between items-center"
            draggable

            onDragStart={() => dragTask(task.id)}
          >
            <div className="flex flex-col justify-center gap-1 items-start">
              <span className="font-semibold text-lg">
                Title : {task.title}
              </span>
              <span className="self-start">Status : {task.status}</span>
            </div>
            <span
              onClick={() => deleteTask(task.id)}
              className="text-red-600 text-lg cursor-pointer"
            >
              DEL
            </span>
          </article>


        ))}
    </div>
  );
}
