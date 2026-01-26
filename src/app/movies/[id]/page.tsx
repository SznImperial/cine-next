import { Movie } from "@/components/templates/Movie";
import { redirect } from "next/navigation";
import { MovieDetails, TMDB } from "tmdb-ts";

export default async function MovieSSR({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const api = new TMDB(process.env.TMDB_API_KEY!);

  let result: MovieDetails;

  try {
    result = await api.movies.details(parseInt(id));
  } catch (e) {
    console.error(e);

    return redirect("/movies");
  }

  return <Movie result={result} />;
}
