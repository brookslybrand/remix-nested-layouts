import { Link, Outlet, useParams } from "react-router-dom";
import clsx from "clsx";
import { json, useRouteData } from "remix";

import { APP_BAR_HEIGHT } from "../components/nav-bar";

import type { LoaderFunction } from "remix";

// This API comes from the free "Learn GraphQL with Apollo" tutorials
const baseURL = `https://odyssey-lift-off-rest-api.herokuapp.com`;

export type TeamMember = {
  id: string;
  name: string;
  photo: string;
};

export let loader: LoaderFunction = async () => {
  const response = await fetch(`${baseURL}/tracks`);
  const data = await response.json();

  // get all of hte unique authors
  const authorIds = new Set(
    data.map(({ authorId }: { authorId: string }) => {
      return authorId;
    })
  );
  const members = await Promise.all(
    Array.from(authorIds).map(async (authorId) => {
      const response = await fetch(`${baseURL}/author/${authorId}`);
      const data = await response.json();
      return data as TeamMember;
    })
  );

  return json(members);
};

export default function TeamLayout() {
  const team = useRouteData<TeamMember[]>();

  const { id: memberId } = useParams();
  console.log({ memberId });

  return (
    <div
      className="fixed overflow-hidden w-full flex"
      style={{ height: `calc(100% - ${APP_BAR_HEIGHT})` }}
    >
      <aside
        className={clsx(
          "px-4 py-6 bg-gray-300 relative h-full overflow-y-auto max-w-max"
        )}
      >
        <ul className="space-y-2">
          {team.map(({ id, name }) => (
            <li key={id}>
              <Link
                to={`/team/${id}`}
                className={clsx(
                  "text-lg font-bold tracking-wide text-gray-800 hover:text-blue-800",
                  id === memberId ? "text-blue-600" : null
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
