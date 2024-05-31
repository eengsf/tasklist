import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-4 shadow-lg sm:px-8 bg-slate-800 rounded-xl ">
      <Link className="text-xl font-bold text-white" href={"/"}>
        Task List
      </Link>
      <Link
        className="px-3 py-2 bg-white rounded-xl hover:scale-105"
        href={"/addTask"}>
        Add Task
      </Link>
    </nav>
  );
}
