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
import { PopularPeople } from "tmdb-ts";
import { Poster } from "../molecules/Poster";
import Link from "next/link";

export function People({ result }: { result: PopularPeople }) {
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
            <CardHeader className="bg-black/40">
              <h2>
                <span className="font-bold">Results:</span>
                <span className="opacity-80 ml-2">
                  {result.page * result.results.length} of{" "}
                  {result.total_results}
                </span>
              </h2>
            </CardHeader>
            <Divider />
            <CardBody className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
              {result.results.map((each) => (
                <div key={each.id}>
                  <Poster title={each.name} imageSrc={each.profile_path} />
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
