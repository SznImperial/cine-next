import { Poster } from "@/components/molecules/Poster";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Slider from "react-slick";
import { Movie, Person, TV } from "tmdb-ts";

export function Carousel<T extends Movie | TV | Person>({
  title,
  data,
}: {
  title: string;
  data: T[];
}) {
  return (
    <Card className="container bg-white/10">
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
