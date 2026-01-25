import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { getFullImagePath, PosterSize, TrendingResults } from "tmdb-ts";
import { TMDB_IMAGE_BASE_URL } from "../molecules/Poster";
import { Genres } from "tmdb-ts/dist/endpoints";

export function HeroSection({
  data,
  genres,
}: {
  data: TrendingResults<"all">["results"][0];
  genres: Genres;
}) {
  const imageUrl = getFullImagePath(
    TMDB_IMAGE_BASE_URL,
    PosterSize.W780,
    data.media_type === "movie"
      ? data.poster_path
      : data.media_type === "person"
        ? data.profile_path
        : data.poster_path,
  );

  return (
    <>
      <Card
        className="relative overflow-hidden bg-background/0 h-[450px] p-5"
        style={{
          background: `url(${imageUrl})`,
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      >
        <CardHeader>
          <div>
            <h1 className="text-6xl font-bold">
              {data.media_type === "movie" ? data.title : data.name}
            </h1>
            <h2 className="text-2xl pt-4">#1 Trending</h2>
          </div>
        </CardHeader>
        <CardBody className="max-w-[550px] mt-4">
          <p className="bg-black/50 p-3 rounded-2xl">
            {data.media_type === "movie" ? data.overview : data.original_name}
          </p>
        </CardBody>
        <CardFooter>
          <div className="flex gap-4 max-w-[450px] h-full items-end">
            <Button className="w-full text-lg" color="primary">
              Watch
            </Button>
          </div>
        </CardFooter>
      </Card>
      <section className="mt-5 flex gap-2 flex-wrap">
        {genres.genres.map((each) => (
          <Button key={each.id} color="default" className="border-1 bg-red-950 border-white/20">{each.name}</Button>
        ))}
      </section>
    </>
  );
}
