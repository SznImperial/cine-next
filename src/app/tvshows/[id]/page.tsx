import { TVShow } from "@/components/templates/TVShow";
import { redirect } from "next/navigation";
import {  TMDB, TvShowDetails } from "tmdb-ts";

export default async function TVShowSSR({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const api = new TMDB(process.env.TMDB_API_KEY!);

  let result: TvShowDetails;

  try {
    result = await api.tvShows.details(parseInt(id));
  } catch (e) {
    console.error(e);

    return redirect("/movies");
  }

  return <TVShow result={result} />;
}
