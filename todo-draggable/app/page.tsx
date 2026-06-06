import Modal from "@/components/Modal";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="bg-blue-950 w-full min-h-screen text-white">
      <div className="container mx-auto px-7 min-h-screen grid place-content-center grid-cols-12 gap-4">
        <div className="col-span-12 text-start">
          <Modal />
        </div>
        <Todos type="New" />
        <Todos type="In Progress" />
        <Todos type="Completed" />
      </div>
    </main>
  );
}
