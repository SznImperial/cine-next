import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as HeroLink,
  Input,
  cn,
} from "@heroui/react";
import Image from "next/image";
import logo from "../../assets/logo.webp";
import Link from "next/link";
import { SearchIcon } from "../atoms/SearchIcon";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isInPath = (
    target: "/movies" | "/tvshows" | "/people" | "/favorites",
  ) => pathname.endsWith(target);

  return (
    <header>
      <Navbar className="w-full bg-black/20">
        <NavbarBrand className="flex shrink-0">
          <Link href="/">
            <Image
              src={logo.src}
              alt="App Logo"
              width={logo.width}
              height={logo.height}
              className="w-12 h-auto object-contain"
            />
          </Link>
        </NavbarBrand>

        <NavbarContent className="flex-1 px-4">
          <NavbarItem className="w-[750px]">
            <form action={"/search"} method="GET">
              <Input
                classNames={{
                  base: "w-full",
                  mainWrapper: "w-full",
                  inputWrapper:
                    "w-full h-full font-normal text-default-500 bg-default-500/20",
                  input: "text-small",
                }}
                placeholder="Search for a movie, tv show, person..."
                size="md"
                type="search"
                endContent={
                  <button className="bg-primary p-1 rounded-sm text-white hover:bg-primary/50 active:bg-primary/20 cursor-pointer hover:scale-110">
                    <SearchIcon size={18} />
                  </button>
                }
                name="query"
              />
            </form>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end" />
      </Navbar>

      <div className="flex gap-6 px-6 py-1.5 border-t border-default-200 justify-center border-b bg-black/40">
        <HeroLink
          href="/movies"
          className={cn(
            "text-sm text-default-600 hover:text-primary",
            isInPath("/movies") && "opacity-40",
          )}
          isDisabled={isInPath("/movies")}
        >
          Movies
        </HeroLink>
        <HeroLink
          href="/tvshows"
          className={cn(
            "text-sm text-default-600 hover:text-primary",
            isInPath("/tvshows") && "opacity-40",
          )}
          isDisabled={isInPath("/tvshows")}
        >
          TV Shows
        </HeroLink>
        <HeroLink
          href="/people"
          className={cn(
            "text-sm text-default-600 hover:text-primary",
            isInPath("/people") && "opacity-40",
          )}
          isDisabled={isInPath("/people")}
        >
          People
        </HeroLink>
        <HeroLink
          href="/favorites"
          className={cn(
            "text-sm text-default-600 hover:text-primary",
            isInPath("/favorites") && "opacity-40",
          )}
          isDisabled={isInPath("/favorites")}
        >
          My Favorites
        </HeroLink>
      </div>
    </header>
  );
}
