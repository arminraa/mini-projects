"use client";

import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createTodo, FormState } from "@/action/todos";
import { FormEvent, useActionState, useEffect, useState } from "react";
import { useTodoStore } from "@/lib/store";
import { useAddTask } from "@/lib/mutation";

export default function Modal() {
  const [state, formAction, isPending] = useActionState(createTodo, {
    status: "",
    message: "",
  });
  const addTask = useTodoStore((state) => state.addTask);
  const addTaskMutation = useAddTask();
  useEffect(() => {
    if (state.status === "success") {
      // addTask(state.data!.title, state.data!.description);
      addTaskMutation.mutate({ title: state.data!.title, description: state.data!.description })
    }
  }, [state])
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-blue-900 cursor-pointer p-3 text-white rounded-md" onClick={() => setOpen(true)}>
            New Task
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>You can add a new Task !</DialogDescription>
          </DialogHeader>
          <form action={formAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" className="col-span-3" />
                <div className="text-red-600 text-sm whitespace-nowrap">
                  {state?.name === "title" ? state.message : ""}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  className="col-span-3"
                />
                <div className="text-red-600 text-sm whitespace-nowrap">
                  {state?.name === "description" ? state.message : ""}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white p-2 rounded-md" disabled={isPending}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
