/*
TMDB returns a fixed number of results per page for the endpoints this app uses
(discover.movie, discover.tvShow, people.popular, search.multi and trending).
Keeping it in one place avoids the off-by-N maths being re-derived per template.
*/
export const TMDB_PAGE_SIZE = 20;

export function formatResultRange({
  page,
  totalResults,
  pageSize = TMDB_PAGE_SIZE,
}: {
  page: number;
  totalResults: number;
  pageSize?: number;
}) {
  if (totalResults <= 0) {
    return "0 of 0";
  }

  // Clamped so an out-of-range page never renders a start beyond the total.
  const start = Math.min((page - 1) * pageSize + 1, totalResults);
  const end = Math.min(page * pageSize, totalResults);

  return `${start}-${end} of ${totalResults}`;
}