import { Outlet } from "react-router";
import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Home",
  };
};

export default function Index() {
  return (
    <main className="m-4 p-4 border-[16px] border-green-300">
      <Outlet />
    </main>
  );
}
