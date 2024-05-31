"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTaskForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${id}`, {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to Update Task");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="px-8 py-5 border shadow-lg rounded-xl"
          type="text"
          placeholder="Task Title"
        />
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="px-8 py-5 border shadow-lg rounded-xl"
          type="text"
          placeholder="Task Description"
        />
        <button className="px-6 py-3 font-bold text-black bg-slate-300 w-fit rounded-xl hover:bg-slate-600 hover:text-white">
          Update Task
        </button>
      </form>
    </>
  );
}
