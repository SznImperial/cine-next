"use client";

import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { TvShowDetails } from "tmdb-ts";
import { FavoriteButtonAbsolute } from "../molecules/FavoriteButton";

interface TvShowProps {
  result: TvShowDetails;
}

export function TVShow({ result }: TvShowProps) {
  return (
    <main>
      <Card className="mx-auto overflow-hidden">
        <FavoriteButtonAbsolute
          data={{
            type: "tvshow",
            id: result.id,
            poster_path: result.poster_path,
            name: result.name,
          }}
          size="large"
        />
        <div className="relative h-96 from-blue-500 to-purple-600">
          {result.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w1280${result.backdrop_path}`}
              alt={result.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              width={1280}
              height={680}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{result.name}</h1>
              {result.tagline && (
                <p className="text-xl italic opacity-90">{result.tagline}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {result.overview}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="font-semibold">First Air Date:</span>
                  <p className="text-gray-400">
                    {new Date(result.first_air_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>
                  <p className="text-gray-400">{result.status}</p>
                </div>
                <div>
                  <span className="font-semibold">Rating:</span>
                  <p className="text-gray-400">
                    {result.vote_average.toFixed(1)}/10 ({result.vote_count}{" "}
                    votes)
                  </p>
                </div>
              </div>

              {result.genres && result.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.genres.map((genre) => (
                      <Button
                        key={genre.id}
                        as={Link}
                        href={`/tvshows?with_genres=${genre.id}`}
                        name="with_genres"
                        value={genre.name}
                      >
                        {genre.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {result.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.name}
                  className="w-full rounded-lg shadow-md"
                  width={500}
                  height={700}
                />
              )}

              {result.homepage && (
                <div className="mt-4">
                  <a
                    href={result.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Official Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {result.production_companies &&
            result.production_companies.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">
                  Production Companies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.production_companies.map((company) => (
                    <div key={company.id} className="text-center">
                      {company.logo_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className="h-16 mx-auto mb-2 object-contain"
                          width={200}
                          height={87}
                        />
                      ) : (
                        <div className="w-[161.25px] h-[64px] bg-gray-400/20 rounded-xl mx-auto" />
                      )}
                      <p className="text-sm text-gray-300">{company.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </Card>
    </main>
  );
}
