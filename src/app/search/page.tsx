import { Search as SearchComponent } from "@/components/templates/Search";
import { redirect } from "next/navigation";
import { Search, TMDB, MultiSearchResult } from "tmdb-ts";
import { MultiSearchOptions } from "tmdb-ts/dist/endpoints";

export default async function SearchSSR({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const api = new TMDB(process.env.TMDB_API_KEY!);

  let result: Search<MultiSearchResult>;
  const params = await searchParams;

  try {
    const getValue = (
      param: string | string[] | undefined,
    ): string | undefined => {
      if (!param) return undefined;
      return Array.isArray(param) ? param[0] : param;
    };

    const searchOptions: MultiSearchOptions = {
      query: getValue(params.query) || "",
      ...(params.page && {
        page: (() => {
          const pageNum = parseInt(getValue(params.page)!, 10);
          if (isNaN(pageNum) || pageNum < 1) {
            throw new Error("Page must be a positive number");
          }
          return pageNum;
        })(),
      }),
    };

    if (!searchOptions.query) {
      return redirect("/");
    }

    result = await api.search.multi(searchOptions);
  } catch (e) {
    console.error(e);
    return redirect("/movies");
  }

  return <SearchComponent query={params.query as string} result={result} />;
}
