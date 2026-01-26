import { Poster } from "@/components/molecules/Poster";
import { isMovie, isPerson, isTV } from "@/libs/tmdb/utils";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Slider from "react-slick";
import { Movie, Person, TV } from "tmdb-ts";
import homeBackground from "../../../assets/hero_background.webp";

export function Carousel<T extends Movie | TV | Person>({
  title,
  data,
  withBackground,
}: {
  title: string;
  data: T[];
  withBackground?: boolean;
}) {
  return (
    <Card
      className="container bg-white/10"
      style={
        withBackground
          ? {
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeBackground.src})`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
            }
          : undefined
      }
    >
      <CardHeader>
        <p>{title}</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-0 m-0">
        <Slider
          className="mx-10 mb-6.5 mt-3"
          centerMode
          dots
          infinite
          speed={500}
          slidesToShow={6}
          swipeToSlide
        >
          {data.map((each) => (
            <div key={each.id}>
              <Poster
                href={
                  isMovie(each)
                    ? `/movies/${each.id}`
                    : isTV(each)
                      ? `/tvshows/${each.id}`
                      : isPerson(each)
                        ? `/people/${each.id}`
                        : "#"
                }
                title={"title" in each ? each.title : each.name}
                imageSrc={
                  (each as Movie | TV).poster_path ??
                  (each as Person).profile_path
                }
              />
            </div>
          ))}
        </Slider>
      </CardBody>
    </Card>
  );
}
