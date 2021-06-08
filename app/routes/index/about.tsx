import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "About",
  };
};

export default function About() {
  return (
    <>
      <h1 className="text-5xl">This is the about page</h1>
      <p className="mt-4 text-lg">There's really not much here</p>
    </>
  );
}
