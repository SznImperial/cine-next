"use client";

import { Card } from "@heroui/react";
import Image from "next/image";
import { PersonDetails } from "tmdb-ts";

interface PeopleProps {
  result: PersonDetails;
}

export function PeopleSingle({ result }: PeopleProps) {
  return (
    <main>
      <Card className="mx-auto overflow-hidden">
        <div className="relative h-96 from-blue-500 to-purple-600">
          {result.profile_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w1280${result.profile_path}`}
              alt={result.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              width={1280}
              height={680}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{result.name}</h1>
              <p className="text-xl italic opacity-90">
                {result.known_for_department}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Biography</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {result.biography || "No biography available."}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="font-semibold">Birthday:</span>
                  <p className="text-gray-400">
                    {result.birthday
                      ? new Date(result.birthday).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Place of Birth:</span>
                  <p className="text-gray-400">
                    {result.place_of_birth || "Unknown"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Department:</span>
                  <p className="text-gray-400">{result.known_for_department}</p>
                </div>
                <div>
                  <span className="font-semibold">Popularity:</span>
                  <p className="text-gray-400">
                    {result.popularity.toFixed(1)}
                  </p>
                </div>
              </div>

              {result.also_known_as && result.also_known_as.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Also Known As</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.also_known_as.map((name, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {result.profile_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                  alt={result.name}
                  className="w-full rounded-lg shadow-md"
                  width={500}
                  height={700}
                />
              )}

              {result.deathday && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">Deathday</h3>
                  <p className="text-gray-300">
                    {new Date(result.deathday).toLocaleDateString()}
                  </p>
                </div>
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
        </div>
      </Card>
    </main>
  );
}
