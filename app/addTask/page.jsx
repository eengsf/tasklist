/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to craete a task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="px-8 py-5 bg-white border shadow-lg rounded-xl"
          type="text"
          placeholder="Task Title"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="px-8 py-5 bg-white border shadow-lg rounded-xl"
          type="text"
          placeholder="Task Description"
        />
        <button
          type="submit"
          className="px-6 py-3 font-bold text-black bg-slate-300 w-fit rounded-xl hover:bg-slate-600 hover:text-white">
          Add Task
        </button>
      </form>
    </>
  );
}
