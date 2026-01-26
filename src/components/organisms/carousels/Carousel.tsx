import { Poster } from "@/components/molecules/Poster";
import { isMovie, isTV } from "@/libs/tmdb/utils";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Slider from "react-slick";
import { Movie, Person, TV } from "tmdb-ts";
import homeBackground from "../../../assets/hero_background.webp";
import { useWindowSize } from "@/hooks/useWindowSize";

export function Carousel<T extends Movie | TV | Person>({
  title,
  data,
  withBackground,
}: {
  title: string;
  data: T[];
  withBackground?: boolean;
}) {
  const width = useWindowSize();

  const slidesToShow = (() => {
    if (width > 1120) {
      return 6;
    }

    if (width > 969) {
      return 5;
    }

    if (width > 821) {
      return 4;
    }

    if (width > 650) {
      return 3;
    }

    if (width > 500) {
      return 2;
    }

    if (width > 410) {
      return 1.5;
    }

    if (width > 330) {
      return 1;
    }

    return 0.75;
  })();

  return (
    <Card
      className="bg-white/10"
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
          slidesToShow={slidesToShow}
          swipeToSlide
        >
          {data.map((each) => (
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
        </Slider>
      </CardBody>
    </Card>
  );
}
