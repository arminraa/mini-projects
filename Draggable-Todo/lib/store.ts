import { create } from "zustand";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";
export type Task = {
  id: number;
  title: string;
  status: Status;
};

export type State = {
  tasks: Task[];
  draggedTask: number | null;
};
export type Action = {
  addTask: (title: string) => void;
  dragTask: (id: number | null) => void;
  updateTask: (id: number, status: Status) => void;
  deleteTask: (id: number) => void;
};

export const useTodoStore = create<State & Action>()((set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title: string) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title: title, status: "TODO" }],
    })),
  dragTask: (id: number | null) => set({ draggedTask: id }),
  updateTask: (id: number, status: Status) =>
    set((state) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
  deleteTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== id),
    })),
}));
