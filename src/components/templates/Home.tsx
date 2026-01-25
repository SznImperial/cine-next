"use client";

import { TrendingResults, Movie, TV, Person } from "tmdb-ts";
import { Carousel } from "../organisms/carousels/Carousel";
import { HeroSection } from "../organisms/HeroSection";
import { Genres } from "tmdb-ts/dist/endpoints";
import { CarouselAll } from "../organisms/carousels/CarouselAll";

export function Home({
  trending,
  trendingMoviesData,
  trendingTvShowsData,
  popularStarsData,
  hiddenGemsData,
  animeWorldData,
  bingeTvData,
  yearReleases,
  internationalCinema,
  currentYear,
  categories,
}: {
  trending: TrendingResults<"all">;
  trendingMoviesData: Movie[];
  trendingTvShowsData: TV[];
  popularStarsData: Person[];
  hiddenGemsData: Movie[];
  animeWorldData: Movie[];
  bingeTvData: TV[];
  yearReleases: Movie[];
  internationalCinema: Movie[];
  currentYear: number;
  categories: Genres;
}) {
  return (
    <main>
      <HeroSection data={trending.results[0]} genres={categories} />
      <div className="flex flex-col mt-6 gap-4">
        <CarouselAll title="Trending" data={trending.results} />
        <Carousel title="Trending Movies" data={trendingMoviesData} />
        <Carousel title="Trending TV Shows" data={trendingTvShowsData} />
        <Carousel title="Hidden Gems" data={hiddenGemsData} />
        <Carousel title="Anime World" data={animeWorldData} />
        <Carousel title="Binge-Worthy TV" data={bingeTvData} />
        <Carousel title={`${currentYear} Releases`} data={yearReleases} />
        <Carousel title="International Cinema" data={internationalCinema} />
        <Carousel title="Trending Stars" data={popularStarsData} />
      </div>
    </main>
  );
}
