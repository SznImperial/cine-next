import { Button, cn } from "@heroui/react";
import { StarIcon } from "../atoms/StarIcon";
import { StarFilledIcon } from "../atoms/StarFilledIcon";
import { FavoritesStoreType, useFavoritesStore } from "@/store/favorites.store";

export function FavoriteButton({
  data,
  size,
}: {
  data:
    | (FavoritesStoreType["movies"][number] & {
        type: "movie";
      })
    | (FavoritesStoreType["tvShows"][number] & {
        type: "tvshow";
      })
    | (FavoritesStoreType["people"][number] & {
        type: "people";
      });
  size: "large" | "normal";
}) {
  const {
    movies,
    tvShows,
    people,
    addMovie,
    addPerson,
    addTvShow,
    removeMovie,
    removePerson,
    removeTvShow,
  } = useFavoritesStore();

  const has = (() => {
    if (data.type === "movie") {
      if (movies.some((each) => each.id === data.id)) {
        return true;
      }
    }

    if (data.type === "tvshow") {
      if (tvShows.some((each) => each.id === data.id)) {
        return true;
      }
    }

    if (data.type === "people") {
      if (people.some((each) => each.id === data.id)) {
        return true;
      }
    }

    return false;
  })();

  const toggle = () => {
    if (data.type === "movie") {
      if (!has) {
        addMovie({
          id: data.id,
          poster_path: data.poster_path,
          title: data.title,
        });
      } else {
        removeMovie(data.id);
      }
    } else if (data.type === "tvshow") {
      if (!has) {
        addTvShow({
          id: data.id,
          poster_path: data.poster_path,
          name: data.name,
        });
      } else {
        removeTvShow(data.id);
      }
    } else if (data.type === "people") {
      if (!has) {
        addPerson({
          id: data.id,
          profile_path: data.profile_path,
          name: data.name,
        });
      } else {
        removePerson(data.id);
      }
    }
  };

  return (
    <Button
      color="warning"
      className={cn(
        "bg-gray-800 text-yellow-500 min-w-0 min-h-0 w-10 h-10 p-0 rounded-full",
        size === "normal" && "w-7 h-7 bg-gray-800/30",
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        toggle();
      }}
    >
      {has ? (
        <StarFilledIcon size={size === "large" ? 28 : 20} />
      ) : (
        <StarIcon size={size === "large" ? 28 : 20} />
      )}
    </Button>
  );
}

export function FavoriteButtonAbsolute({
  data,
  size,
}: React.ComponentProps<typeof FavoriteButton>) {
  if (size === "large") {
    return (
      <div className="absolute z-20 top-0 right-0 -translate-x-[40%] translate-y-[25%]">
        <FavoriteButton data={data} size={size} />
      </div>
    );
  }

  return (
    <div
      className={
        "absolute z-20 top-0 right-0 -translate-x-[15%] translate-y-[15%]"
      }
    >
      <FavoriteButton data={data} size={size} />
    </div>
  );
}
