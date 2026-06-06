"use client";
import Column from "@/components/Column";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Task, useTodoStore } from "@/lib/store";
import { useState } from "react";

export default function Home() {
  const tasks = useTodoStore((state) => state.tasks);
  const addTask = useTodoStore((state) => state.addTask);

  const [open, setOpen] = useState(false);
  return (
    <main className="h-screen overflow-hidden bg-gray-900">
      <section className="h-full container mx-auto px-2">
        <Dialog open={open} onOpenChange={setOpen}>

          <DialogTrigger className="bg-white p-3 text-black rounded-md my-4">
            Add new Todo
          </DialogTrigger>


          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new Todo</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTask(
                  (document.getElementById("salam") as HTMLInputElement)!.value
                );
                setOpen(false);
              }}
            >
              <div className="flex flex-col justify-center items-stretch gap-2 mt-4">
                <label className="text-[1rem]">Title</label>
                <input
                  id="salam"
                  type="text"
                  className="outline-0 bg-gray-300 p-4 rounded-md text-black text-[1rem]"
                />
                <button type="submit" className="self-start border border-black py-2 px-4 grid place-content-center rounded-md">Ok</button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <div className="h-full grid grid-cols-12 gap-8 justify-items-stretch place-content-center text-center mt-8">
          <Column title="todo" status="TODO" />
          <Column title="In Progress" status="IN_PROGRESS" />
          <Column title="Done" status="DONE" />
        </div>
      </section>
    </main>
  );
}
