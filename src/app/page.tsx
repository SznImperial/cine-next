import { Home } from "@/components/templates/Home";
import { TMDB } from "tmdb-ts";

export default async function HomeSSR() {
  const api = new TMDB(process.env.TMDB_API_KEY!);

  const [
    trending,
    trendingMovies,
    trendingTv,
    trendingPerson,
    hiddenGems,
    animeWorld,
    bingeTv,
    yearReleases,
    international,
    movieCategories,
  ] = await Promise.all([
    api.trending.trending("all", "day"),
    api.trending.trending("movie", "day"),
    api.trending.trending("tv", "day"),
    api.trending.trending("person", "day"),
    api.discover.movie({ with_genres: "18", "vote_count.gte": 500 }),
    api.discover.movie({ with_keywords: "210024" }),
    api.discover.tvShow({ "with_runtime.gte": 45 }),
    api.discover.movie({ primary_release_year: new Date().getFullYear() }),
    api.discover.movie({ with_original_language: "fr|ko|es" }),
    api.genres.movies(),
  ]);

  return (
    <Home
      trending={trending}
      trendingMoviesData={trendingMovies.results}
      trendingTvShowsData={trendingTv.results}
      popularStarsData={trendingPerson.results}
      hiddenGemsData={hiddenGems.results}
      animeWorldData={animeWorld.results}
      bingeTvData={bingeTv.results}
      yearReleases={yearReleases.results}
      internationalCinema={international.results}
      categories={movieCategories}
      currentYear={new Date().getFullYear()}
    />
  );
}
