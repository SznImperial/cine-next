import { People } from "@/components/templates/People";
import { redirect } from "next/navigation";
import { PopularPeople, TMDB } from "tmdb-ts";

export default async function PeopleSSR({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const api = new TMDB(process.env.TMDB_API_KEY!);

  let result: PopularPeople;

  try {
    const params = await searchParams;

    // Helper function to extract single value from string array
    const getValue = (
      param: string | string[] | undefined,
    ): string | undefined => {
      if (!param) return undefined;
      return Array.isArray(param) ? param[0] : param;
    };

    // Build peopleParams with explicit type safety
    const peopleParams = {
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
    };

    result = await api.people.popular(peopleParams);
  } catch (e) {
    console.error(e);

    return redirect("/people");
  }

  return <People result={result} />;
}
