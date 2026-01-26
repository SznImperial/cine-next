"use client";

import { Poster } from "@/components/molecules/Poster";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import {
  MovieWithMediaType,
  PersonWithMediaType,
  TVWithMediaType,
} from "tmdb-ts";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { isMovie, isTV } from "@/libs/tmdb/utils";
import homeBackground from "../../../assets/hero_background.webp";

export function CarouselAll({
  title,
  data,
}: {
  title: string;
  data: (TVWithMediaType | MovieWithMediaType | PersonWithMediaType)[];
}) {
  return (
    <Card
      className="container bg-white/10"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeBackground.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <CardHeader>
        <p>{title}</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-0 m-0">
        <Slider
          className="mx-10 my-7.5"
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
