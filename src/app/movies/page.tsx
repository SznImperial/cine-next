import { Movies } from "@/components/templates/Movies";
import { redirect } from "next/navigation";
import {
  MonetizationType,
  MovieDiscoverResult,
  MovieQueryOptions,
  SortOption,
  TMDB,
} from "tmdb-ts";
import { Genres } from "tmdb-ts/dist/endpoints";

export default async function MoviesSSR({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const api = new TMDB(process.env.TMDB_API_KEY!);

  let result: MovieDiscoverResult;
  let categories: Genres;

  /*
  ------------
  This is a smart way to pass search params to API query params
  ------------
  */
  try {
    const params = await searchParams;

    // Helper function to extract single value from string array
    const getValue = (
      param: string | string[] | undefined,
    ): string | undefined => {
      if (!param) return undefined;
      return Array.isArray(param) ? param[0] : param;
    };

    // Build movieParams with explicit type safety
    const movieParams: MovieQueryOptions = {
      // Page parameter
      ...(params.page && {
        page: (() => {
          const pageNum = parseInt(getValue(params.page)!, 10);
          if (isNaN(pageNum) || pageNum < 1) {
            throw new Error("Page must be a positive number");
          }
          return pageNum;
        })(),
      }),

      // Language parameter
      ...(params.language && {
        language: getValue(params.language),
      }),

      // Sort by parameter
      ...(params.sort_by && {
        sort_by: (() => {
          const sortBy = getValue(params.sort_by)!;
          const validSortOptions: SortOption[] = [
            "popularity.asc",
            "popularity.desc",
            "release_date.asc",
            "release_date.desc",
            "revenue.asc",
            "revenue.desc",
            "primary_release_date.asc",
            "primary_release_date.desc",
            "original_title.asc",
            "original_title.desc",
            "vote_average.asc",
            "vote_average.desc",
            "vote_count.asc",
            "vote_count.desc",
          ];
          if (!validSortOptions.includes(sortBy as SortOption)) {
            throw new Error("Invalid sort_by option");
          }
          return sortBy as SortOption;
        })(),
      }),

      // Numeric range parameters
      ...(params["vote_average.gte"] && {
        "vote_average.gte": (() => {
          const parsed = parseFloat(getValue(params["vote_average.gte"])!);
          if (isNaN(parsed))
            throw new Error("vote_average.gte must be a number");
          return parsed;
        })(),
      }),

      ...(params["vote_average.lte"] && {
        "vote_average.lte": (() => {
          const parsed = parseFloat(getValue(params["vote_average.lte"])!);
          if (isNaN(parsed))
            throw new Error("vote_average.lte must be a number");
          return parsed;
        })(),
      }),

      ...(params["vote_count.gte"] && {
        "vote_count.gte": (() => {
          const parsed = parseFloat(getValue(params["vote_count.gte"])!);
          if (isNaN(parsed)) throw new Error("vote_count.gte must be a number");
          return parsed;
        })(),
      }),

      ...(params["vote_count.lte"] && {
        "vote_count.lte": (() => {
          const parsed = parseFloat(getValue(params["vote_count.lte"])!);
          if (isNaN(parsed)) throw new Error("vote_count.lte must be a number");
          return parsed;
        })(),
      }),

      ...(params["with_runtime.gte"] && {
        "with_runtime.gte": (() => {
          const parsed = parseFloat(getValue(params["with_runtime.gte"])!);
          if (isNaN(parsed))
            throw new Error("with_runtime.gte must be a number");
          return parsed;
        })(),
      }),

      ...(params["with_runtime.lte"] && {
        "with_runtime.lte": (() => {
          const parsed = parseFloat(getValue(params["with_runtime.lte"])!);
          if (isNaN(parsed))
            throw new Error("with_runtime.lte must be a number");
          return parsed;
        })(),
      }),

      // Boolean parameters
      ...(params.include_adult && {
        include_adult: getValue(params.include_adult) === "true",
      }),

      ...(params.include_video && {
        include_video: getValue(params.include_video) === "true",
      }),

      // Year parameters
      ...(params.primary_release_year && {
        primary_release_year: (() => {
          const parsed = parseInt(getValue(params.primary_release_year)!, 10);
          if (isNaN(parsed) || parsed < 1900 || parsed > 2100) {
            throw new Error("primary_release_year must be a valid year");
          }
          return parsed;
        })(),
      }),

      ...(params.year && {
        year: (() => {
          const parsed = parseInt(getValue(params.year)!, 10);
          if (isNaN(parsed) || parsed < 1900 || parsed > 2100) {
            throw new Error("year must be a valid year");
          }
          return parsed;
        })(),
      }),

      // Date parameters
      ...(params["primary_release_date.gte"] && {
        "primary_release_date.gte": (() => {
          const value = getValue(params["primary_release_date.gte"])!;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) {
            throw new Error(
              "primary_release_date.gte must be in YYYY-MM-DD format",
            );
          }
          return value;
        })(),
      }),

      ...(params["primary_release_date.lte"] && {
        "primary_release_date.lte": (() => {
          const value = getValue(params["primary_release_date.lte"])!;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) {
            throw new Error(
              "primary_release_date.lte must be in YYYY-MM-DD format",
            );
          }
          return value;
        })(),
      }),

      ...(params["release_date.gte"] && {
        "release_date.gte": (() => {
          const value = getValue(params["release_date.gte"])!;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) {
            throw new Error("release_date.gte must be in YYYY-MM-DD format");
          }
          return value;
        })(),
      }),

      ...(params["release_date.lte"] && {
        "release_date.lte": (() => {
          const value = getValue(params["release_date.lte"])!;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) {
            throw new Error("release_date.lte must be in YYYY-MM-DD format");
          }
          return value;
        })(),
      }),

      // String parameters
      ...(params.with_genres && { with_genres: getValue(params.with_genres) }),
      ...(params.without_genres && {
        without_genres: getValue(params.without_genres),
      }),
      ...(params.with_keywords && {
        with_keywords: getValue(params.with_keywords),
      }),
      ...(params.without_keywords && {
        without_keywords: getValue(params.without_keywords),
      }),
      ...(params.with_companies && {
        with_companies: getValue(params.with_companies),
      }),
      ...(params.without_companies && {
        without_companies: getValue(params.without_companies),
      }),
      ...(params.with_cast && { with_cast: getValue(params.with_cast) }),
      ...(params.with_crew && { with_crew: getValue(params.with_crew) }),
      ...(params.with_people && { with_people: getValue(params.with_people) }),
      ...(params.with_release_type && {
        with_release_type: getValue(params.with_release_type),
      }),
      ...(params.region && { region: getValue(params.region) }),
      ...(params.certification_country && {
        certification_country: getValue(params.certification_country),
      }),
      ...(params.certification && {
        certification: getValue(params.certification),
      }),
      ...(params["certification.lte"] && {
        "certification.lte": getValue(params["certification.lte"]),
      }),
      ...(params["certification.gte"] && {
        "certification.gte": getValue(params["certification.gte"]),
      }),
      ...(params.with_original_language && {
        with_original_language: getValue(params.with_original_language),
      }),
      ...(params.with_watch_providers && {
        with_watch_providers: getValue(params.with_watch_providers),
      }),
      ...(params.watch_region && {
        watch_region: getValue(params.watch_region),
      }),
      ...(params.with_watch_monetization_types && {
        with_watch_monetization_types: (() => {
          const value = getValue(params.with_watch_monetization_types)!;
          const validMonetizationTypes: MonetizationType[] = [
            "flatrate",
            "free",
            "ads",
            "rent",
            "buy",
          ];
          if (!validMonetizationTypes.includes(value as MonetizationType)) {
            throw new Error(
              "with_watch_monetization_types must be one of: flatrate, free, ads, rent, buy",
            );
          }
          return value as MonetizationType;
        })(),
      }),
    };

    [result, categories] = await Promise.all([
      await api.discover.movie(movieParams),
      await api.genres.movies(),
    ]);
  } catch (e) {
    // Search params are not valid!
    console.error(e);

    // If something is bad redirect to "/movies".
    // Basically clearing all of the URL params
    return redirect("/movies");
  }

  return <Movies result={result} categories={categories} />;
}
