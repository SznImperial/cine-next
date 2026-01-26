"use client";

import { useFavoritesStore } from "@/store/favorites.store";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Poster } from "../molecules/Poster";

export function Favorites() {
  const { movies, people, tvShows } = useFavoritesStore();

  return (
    <main>
      <Card>
        <CardHeader className="bg-black/40">
          <p>
            Your favorites ({movies.length + people.length + tvShows.length})
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <Container title="Movies">
            {movies.length
              ? movies.map((each) => (
                  <Poster
                    key={each.id}
                    data={{
                      type: "movie",
                      id: each.id,
                      poster_path: each.poster_path,
                      title: each.title,
                    }}
                  />
                ))
              : null}
          </Container>
          <Container title="TV shows">
            {tvShows.length
              ? tvShows.map((each) => (
                  <Poster
                    key={each.id}
                    data={{
                      type: "tvshow",
                      id: each.id,
                      poster_path: each.poster_path,
                      name: each.name,
                    }}
                  />
                ))
              : null}
          </Container>
          <Container title="People">
            {people.length
              ? people.map((each) => (
                  <Poster
                    key={each.id}
                    data={{
                      type: "people",
                      id: each.id,
                      name: each.name,
                      profile_path: each.profile_path,
                    }}
                  />
                ))
              : null}
          </Container>
        </CardBody>
      </Card>
    </main>
  );
}

function Container({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode | null;
}) {
  if (!children) {
    return;
  }

  return (
    <div>
      <p className="text-2xl my-4">{title}:</p>
      <div className="bg-black/40 py-4 px-2 rounded-2xl grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {children}
      </div>
    </div>
  );
}
