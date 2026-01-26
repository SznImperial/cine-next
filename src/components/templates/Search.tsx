"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
  PaginationItem,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { MultiSearchResult, Search as SearchType } from "tmdb-ts";
import { Poster } from "../molecules/Poster";
import Link from "next/link";
import { isMovie, isPerson, isTV } from "@/libs/tmdb/utils";

export function Search({
  result,
  query,
}: {
  query: string;
  result: SearchType<MultiSearchResult>;
}) {
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    return `?${params.toString()}`;
  };

  return (
    <main>
      <form method="GET">
        <input type="hidden" name="page" value="1" />
        <section className="mt-4">
          <Card>
            <CardHeader className="flex justify-between bg-black/40">
              <h2>{`Results for "${query}"`}</h2>
              <h2>
                <span className="font-bold">Results:</span>
                <span className="opacity-80 ml-2">
                  {(result.page - 1) * 20 + 1}-
                  {Math.min(result.page * 20, result.total_results)} of{" "}
                  {result.total_results}
                </span>
              </h2>
            </CardHeader>
            <Divider />
            <CardBody className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
              {result.results.map((each) => (
                <div key={each.id}>
                  <Poster
                    data={
                      isMovie(each)
                        ? {
                            type: "movie",
                            id: each.id,
                            title: each.title,
                            poster_path: each.poster_path,
                          }
                        : isTV(each)
                          ? {
                              type: "tvshow",
                              id: each.id,
                              name: each.name,
                              poster_path: each.poster_path,
                            }
                          : {
                              type: "people",
                              id: each.id,
                              name: each.name,
                              profile_path: each.profile_path,
                            }
                    }
                  />
                </div>
              ))}
            </CardBody>
            <Divider />
            <CardFooter className="bg-black/40">
              <Pagination
                showControls
                total={Math.min(result.total_pages, 500)}
                page={result.page}
                renderItem={({ key, ...props }) => (
                  <PaginationItem
                    key={key}
                    {...props}
                    as={Link}
                    href={createPageUrl(props.page)}
                  />
                )}
                className="m-auto"
              />
            </CardFooter>
          </Card>
        </section>
      </form>
    </main>
  );
}
