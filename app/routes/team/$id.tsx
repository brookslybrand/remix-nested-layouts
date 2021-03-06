import { useMatches } from "remix";

import type { MetaFunction } from "remix";
import type { TeamMember } from "../team";

export let meta: MetaFunction = ({ parentsData, params }) => {
  const { id: authorId } = params;
  const team = parentsData["routes/team"] as TeamMember[];
  const teamMember = team.find(({ id }) => id === authorId);
  return {
    title: `Team Member – ${teamMember?.name ?? "Not Found"}`,
  };
};

export default function TeamMember() {
  const teamMember = useTeamMember();

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

function useTeamMember() {
  const matches = useMatches();

  let team: TeamMember[] = [];
  let memberId: undefined | string;
  let foundTeam = false;
  let foundMemberId = false;
  for (const { data, params } of matches) {
    if (Array.isArray(data) && data.length > 0) {
      // if the first element is a team member, we'll just assume the whole array is good
      if (isTeamMember(data[0])) {
        team = data;
        foundTeam = true;
      }
    }
    if (params.id !== undefined) {
      memberId = params.id;
      foundMemberId = true;
    }

    // this loop has served it's purpose
    if (foundTeam && foundMemberId) {
      break;
    }
  }

  const teamMember = team.find(({ id }) => memberId === id);

  return teamMember;
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
