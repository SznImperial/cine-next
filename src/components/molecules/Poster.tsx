import Image from "next/image";
import { getFullImagePath, PosterSize } from "tmdb-ts";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export function Poster({
  title,
  imageSrc,
  children,
}: {
  title: string;
  imageSrc: string;
  children?: React.ReactNode;
}) {
  const imageUrl = getFullImagePath(
    TMDB_IMAGE_BASE_URL,
    PosterSize.W185,
    imageSrc,
  );

  return (
    <div className="w-full h-55 m-auto">
      <Image
        title={title}
        src={imageUrl}
        alt={"Movie Iamge"}
        loading="lazy"
        width={154}
        height={138}
        className="object-fill h-full rounded-lg border-2 border-white/30 cursor-pointer transition-all hover:scale-98"
      />
      {children && <div>{children}</div>}
    </div>
  );
}
