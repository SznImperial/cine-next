# CineNext

#### Video Demo:

#### Description:

## Short note

I have decided to use Next.js because I have more experience with it than with other technologies. It works similarly to Flask in some ways (Server-Side Rendering). I was also inspired by the project involving the movies database we used in the course with SQLite.

## Overview (big picture)

> Disclosure: This README was drafted with assistance from ChatGPT (AI). I reviewed and edited the content; the project code and implementation are my own work.

**CineNext** is a compact, polished movie and TV discovery web application built as a CS50x project. It aggregates data from The Movie Database (TMDB) and exposes an experience similar to a streaming discovery portal: a large hero highlighting a currently trending item, horizontally scrollable carousels for curated sections, paginated lists for movies, TV shows and people, and a multi-type search that returns movies, TV shows and people in a single view.

It intentionally mixes server-side and client-side rendering: pages fetch the data server-side to deliver fast initial loads and use client components for interactive pieces such as pagination, favorites, and poster interactions.

## Technologies and key libraries

- Next.js (App Router) with server-side rendering (SSR)
  - The project uses the Next.js app directory architecture. Top-level route files are async server components which fetch TMDB data before rendering and then pass it into client templates.
- TypeScript
  - Strong typing is used throughout. The project uses typed result objects from the tmdb-ts client and typed component props.
- tmdb-ts
  - A typed wrapper around The Movie Database API is used for clear endpoint usage and type safety (examples: `api.trending.trending(...)`, `api.discover.movie(...)`, `api.search.multi(...)`).
- Tailwind CSS
  - Utility-first classes (e.g., `grid`, `text-gray-300`, `md:grid-cols-3`) provide responsive layouts and consistent spacing/typography.
- @heroui/react
  - Provides UI primitives such as `Card`, `Pagination`, `Button`, `Divider` and others for consistent components and accessible controls.
- Environment variables
  - TMDB API key is supplied via `process.env.TMDB_API_KEY` and instantiated with `new TMDB(process.env.TMDB_API_KEY!)`.
- Image helpers
  - Utilities from `tmdb-ts` (like `getFullImagePath` and available poster sizes) are used to generate correct TMDB image URLs.

## Source code structure and where things live

The application follows a tidy structure under `src/` with clear separation between routing (pages), templates, composed components and low-level molecules. The main folders are:

- src/app
  - Contains Next.js App Router route files; each route is a server component that fetches data and returns a template component.
  - Key files:
    - `src/app/page.tsx` — Home SSR entry. Constructs a TMDB client, concurrently fetches many datasets via `Promise.all` (trending across all media types, trending movies/TV, popular people, discover queries for hidden gems, anime, binge-worthy TV, recent releases, international selections, and genres) and passes them to the `Home` template.
    - `src/app/movies/page.tsx` — Movies SSR route. Reads `searchParams`, validates and converts query params, builds typed `MovieQueryOptions` and calls `api.discover.movie(...)`. Returns the `Movies` template.
    - `src/app/tvshows/page.tsx` — TV shows SSR route. Similar to movies route but uses `discover.tvShow(...)` and typed `TvShowQueryOptions`.
    - `src/app/people/page.tsx` — People SSR route. Handles pagination for popular people via `api.people.popular(...)`.
    - `src/app/search/page.tsx` — Search SSR route. Builds a `MultiSearchOptions` object and calls `api.search.multi(...)` to return search mixed results.
  - Each route includes robust validation for query parameters (e.g., page numbers, year ranges, date formats), and invalid queries redirect to a safe route.

- src/components
  - templates
    - High-level page templates that receive data from server pages and render UI. Many are client components (they begin with `use client`) because they include interactive features:
      - `src/components/templates/Home.tsx` — Renders `HeroSection` plus multiple `Carousel` and `CarouselAll` sections; receives many lists and genres from the server `page.tsx`.
      - `src/components/templates/Movies.tsx` — Renders filter buttons (genres), results grid and pagination wired to `searchParams`.
      - `src/components/templates/TVShows.tsx`, `People.tsx`, `Search.tsx` — Analogous templates for their respective data types; handle results grid and pagination.
      - `src/components/templates/Movie.tsx` — Detail template for a movie (hero/backdrop, tagline, overview and metadata).
  - organisms
    - Composed UI blocks used across templates:
      - `src/components/organisms/HeroSection.tsx` — Large hero that uses `getFullImagePath` to show backdrop/poster and renders genre buttons.
      - Carousels (e.g., `Carousel`, `CarouselAll`) — horizontally scrolling lists for display.
  - molecules
    - Reusable small components like `Poster`, `FavoriteButton` used to represent individual items, images, and interactions.
- src/libs
  - Utility logic and type guards (e.g., `isMovie`, `isTV`, `isPerson`) used to differentiate result types when rendering mixed search results or building link targets.

## Data flow and notable implementation patterns

- Server-first fetching: Pages are async server components that build a `TMDB` client and fetch data before rendering; e.g., the Home page runs many requests in parallel via `Promise.all` for minimal latency.
- Query param parsing: Routes read `searchParams` (Next.js App Router shape), use a `getValue` helper to normalize a `string | string[] | undefined` into a single string, validate/convert values (numbers, dates, booleans), and build typed query objects used by `tmdb-ts`.
- Pagination: Templates use `@heroui/react` Pagination controls, create canonical URLs by cloning `searchParams` and setting `page`, and cap the total pages at TMDB’s 500 page limit when rendering controls.
- Client vs server split: Templates that require user interactions are client components (`"use client"`), while data-gathering route files remain on the server. This yields SEO and initial performance benefits while keeping interactivity where needed.
- Error handling: Routes wrap parsing and API calls in `try/catch` and typically redirect to a fallback (e.g., `/movies`) if params are invalid or an error occurs.

## Next steps and suggestions

- README additions: Add setup instructions (install, env var for `TMDB_API_KEY`, `npm run dev`), and a short deployment note (Vercel recommended).
- Tests and CI: Add basic unit/smoke tests for `libs` helpers and route validation; add a GitHub Actions workflow to run type checks and linting.
- Caching: Consider adding short-term caching (or ISR) for trending/discover endpoints to reduce API usage and improve responsiveness.

This README text is intended to be pasted directly into your repository README.md. If you want, I can also:

- Add installation and environment setup instructions,
- Create a short “How it works” diagram (ASCII or Mermaid) showing server-to-client data flow,
- Or convert this into a shorter project blurb for a portfolio. Which would you prefer?

## Installation & Running (local development)

Prerequisites

- Node.js 18 or later (recommended).
- npm (comes with Node) or another package manager of your choice.
- A TMDB API key (create a free account at https://www.themoviedb.org/ and get an API key).

Clone the repository

```bash
git clone https://github.com/lukadevv-edu/cine-next.git
cd cine-next
```

Install dependencies

```bash
npm install
```

```bash
bun install
```

(or `pnpm install` / `yarn` if you prefer and your repo supports them)

Create environment file

- Create a `.env.local` file in the project root and add your TMDB API key:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

- Save the file. Next.js loads `.env.local` automatically in development.

Run in development mode

```bash
npm run dev
```

```bash
bun dev
```

- Open http://localhost:3000 in your browser to view the app.
- The dev server typically runs on port 3000 unless configured otherwise.

Build for production

```bash
npm run build
npm run start
```

- `npm run build` compiles the app for production.
- `npm run start` runs the production server (after a successful build).

Deploying

- Vercel is a convenient option for Next.js projects:
  - Import the repository into Vercel, set the `TMDB_API_KEY` environment variable in the Vercel dashboard, and deploy.
- Alternatively, any host that supports Node/Next.js can be used. Make sure to set `TMDB_API_KEY` in the host's environment settings and run the build/start steps.

Troubleshooting

- Missing key or invalid key: requests to TMDB will fail; verify `TMDB_API_KEY` is correct and present in `.env.local` (or in the hosting environment).
- Port conflicts: if port 3000 is in use, run with PORT environment (e.g., `PORT=3001 npm run dev`) or change local configuration.
- API rate limits: TMDB imposes API rate limits—consider caching commonly requested endpoints if you hit limits during development or deployment.
