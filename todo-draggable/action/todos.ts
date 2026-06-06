"use server";

export type FormState = {
  status: "error" | "success" | "";
  message: string;
  name?: "title" | "description";
  data?: {
    title: string;
    description: string;
  };
};

export async function createTodo(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (title === "") {
    return {
      status: "error",
      name: "title",
      message: "Title is required !",
    };
  }
  if (description === "") {
    return {
      status: "error",
      name: "description",
      message: "Description is required !",
    };
  }
  return {
    status: "success",
    message: "Successful",
    data: { title, description },
  };
}
