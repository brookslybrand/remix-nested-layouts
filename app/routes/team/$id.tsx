import { LoaderFunction, useRouteData } from "remix";

import { baseURL } from "../team";

import type { MetaFunction } from "remix";
import type { TeamMember } from "../team";

export let meta: MetaFunction = ({ data }) => {
  const name = isTeamMember(data) ? data.name : "Not Found";
  return {
    title: `Team Member – ${name}`,
  };
};

export let loader: LoaderFunction = ({ params }) => {
  return fetch(`${baseURL}/author/${params.id}`);
};

export default function TeamMember() {
  const teamMember = useRouteData<TeamMember>();

  return (
    <>
      {teamMember === undefined ? (
        <h1 className="text-4xl py-4 text-center">Author not found</h1>
      ) : (
        <article className="flex flex-col mx-auto max-w-max px-8">
          <h1 className="text-4xl py-4 text-center">{teamMember.name}</h1>

          <div className="relative overflow-hidden rounded-full h-80 w-80 mt-2 bg-blue-100">
            <img
              key={teamMember.id}
              alt={teamMember.name}
              src={teamMember.photo}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        </article>
      )}
    </>
  );
}

// taken from https://fettblog.eu/typescript-hasownproperty/
function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

function isTeamMember(teamMember: unknown): teamMember is TeamMember {
  // return typeof teamMember === "object" && typeof teamMember?.id === "string";
  if (typeof teamMember !== "object" || teamMember === null) return false;
  if (!hasOwnProperty(teamMember, "id") || typeof teamMember.id !== "string") {
    return false;
  }
  if (
    !hasOwnProperty(teamMember, "name") ||
    typeof teamMember.name !== "string"
  ) {
    return false;
  }
  if (
    !hasOwnProperty(teamMember, "photo") ||
    typeof teamMember.photo !== "string"
  ) {
    return false;
  }
  return true;
}
