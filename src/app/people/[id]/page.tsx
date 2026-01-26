import { PeopleSingle } from "@/components/templates/PeopleSingle";
import { redirect } from "next/navigation";
import { PersonDetails, TMDB } from "tmdb-ts";

export default async function PeopleSSR({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const api = new TMDB(process.env.TMDB_API_KEY!);

  let result: PersonDetails;

  try {
    result = await api.people.details(parseInt(id));
  } catch (e) {
    console.error(e);

    return redirect("/movies");
  }

  return <PeopleSingle result={result} />;
}
