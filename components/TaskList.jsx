import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTask = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }
    return res.json();
  } catch (error) {
    console.log("Error Loading Task", error);
  }
};

export default async function TaskList() {
  const { tasks } = await getTask();

  return (
    <>
      {tasks
        ? tasks.map((t) => (
            <div
              key={t._id}
              className="flex items-start justify-between gap-5 p-4 my-3 bg-white border shadow-lg rounded-xl">
              <div>
                <h2 className="text-2xl font-bold">{t.title}</h2>
                <div>{t.description}</div>
              </div>
              <div className="flex gap-2">
                <RemoveBtn id={t._id} />
                <Link href={`/editTask/${t._id}`} className="hover:scale-125">
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))
        : null}
    </>
  );
}
