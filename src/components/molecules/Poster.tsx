import Image from "next/image";
import Link from "next/link";
import { getFullImagePath, PosterSize } from "tmdb-ts";
import { FavoriteButtonAbsolute } from "./FavoriteButton";
import { FavoritesStoreType } from "@/store/favorites.store";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export function Poster({
  children,
  data,
}: {
  children?: React.ReactNode;
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
}) {
  const imageSrc =
    data.type === "movie"
      ? data.poster_path
      : data.type === "people"
        ? data.profile_path
        : data.poster_path;

  const imageUrl = imageSrc
    ? getFullImagePath(TMDB_IMAGE_BASE_URL, PosterSize.W185, imageSrc)
    : null;

  const href =
    data.type === "movie"
      ? `/movies/${data.id}`
      : data.type === "people"
        ? `/people/${data.id}`
        : `/tvshows/${data.id}`;

  const title =
    data.type === "movie"
      ? data.title
      : data.type === "people"
        ? data.name
        : data.name;

  return (
    <Link
      href={href}
      className="block relative w-[154px] h-[229px] m-auto transition-all hover:scale-98"
    >
      <FavoriteButtonAbsolute data={data} size="normal" />
      {imageUrl ? (
        <Image
          title={title}
          src={imageUrl}
          alt={"Movie Iamge"}
          loading="lazy"
          width={154}
          height={138}
          className="object-fill h-full rounded-lg border-2 border-white/30"
        />
      ) : (
        <div
          title={title}
          className="w-[154px] h-[229px] bg-gray-400/40 object-fill h-full rounded-lg border-2 border-white/30 cursor-pointer transition-all hover:scale-98"
        />
      )}
      {children && <div>{children}</div>}
    </Link>
  );
}
