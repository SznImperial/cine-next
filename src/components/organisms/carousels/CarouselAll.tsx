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
import { isMovie, isPerson, isTV } from "@/libs/tmdb/utils";
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
                href={
                  isMovie(each)
                    ? `/movies/${each.id}`
                    : isTV(each)
                      ? `/tvshows/${each.id}`
                      : isPerson(each)
                        ? `/people/${each.id}`
                        : "#"
                }
                title={
                  each.media_type === "movie"
                    ? each.title
                    : each.media_type === "tv"
                      ? each.name
                      : each.name
                }
                imageSrc={
                  each.media_type === "movie"
                    ? each.poster_path
                    : each.media_type === "tv"
                      ? each.poster_path
                      : each.profile_path
                }
              />
            </div>
          ))}
        </Slider>
      </CardBody>
    </Card>
  );
}
