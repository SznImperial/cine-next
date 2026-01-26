import { addToast } from "@heroui/react";
import { Movie, Person, TV } from "tmdb-ts";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FavoritesStoreType = {
  movies: Pick<Movie, "id" | "poster_path" | "title">[];
  tvShows: Pick<TV, "id" | "poster_path" | "name">[];
  people: Pick<Person, "id" | "profile_path" | "name">[];

  addMovie: (movie: FavoritesStoreType["movies"][number]) => void;
  removeMovie: (movie: FavoritesStoreType["movies"][number]["id"]) => void;

  addTvShow: (tv: FavoritesStoreType["tvShows"][number]) => void;
  removeTvShow: (movie: FavoritesStoreType["tvShows"][number]["id"]) => void;

  addPerson: (tv: FavoritesStoreType["people"][number]) => void;
  removePerson: (movie: FavoritesStoreType["people"][number]["id"]) => void;
};

export const useFavoritesStore = create<FavoritesStoreType>()(
  persist(
    (set) => ({
      movies: [],
      tvShows: [],
      people: [],

      // Movie methods
      addMovie: (movie) => {
        set((state) => ({
          movies: [...state.movies, movie],
        }));
        addToast({
          title: `You have added "${movie.title}" to favorites!`,
          color: "success",
        });
      },
      removeMovie: (movieId) => {
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== movieId),
        }));
        addToast({
          title: `You have removed a movie from favorites!`,
          color: "danger",
        });
      },

      // TV Show methods
      addTvShow: (tvShow) => {
        set((state) => ({
          tvShows: [...state.tvShows, tvShow],
        }));
        addToast({
          title: `You have added "${tvShow.name}" to favorites!`,
          color: "success",
        });
      },
      removeTvShow: (showId) => {
        set((state) => ({
          tvShows: state.tvShows.filter((s) => s.id !== showId),
        }));
        addToast({
          title: `You have removed a tv show from favorites!`,
          color: "danger",
        });
      },

      // People methods
      addPerson: (person) => {
        set((state) => ({
          people: [...state.people, person],
        }));
        addToast({
          title: `You have added "${person.name}" to favorites!`,
          color: "success",
        });
      },
      removePerson: (personId) => {
        set((state) => ({
          people: state.people.filter((p) => p.id !== personId),
        }));
        addToast({
          title: `You have removed a person from favorites!`,
          color: "danger",
        });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
