"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTask = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Chache-Control": "no-store",
          },
        }
      );
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <>
      <button onClick={removeTask} className="text-red-400 hover:scale-125">
        <HiOutlineTrash size={24} />
      </button>
    </>
  );
}
