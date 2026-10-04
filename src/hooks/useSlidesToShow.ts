import { useWindowSize } from "./useWindowSize";

/*
Number of slides a carousel should show at a given viewport width.
Shared so both carousel variants stay in sync.
*/
export function useSlidesToShow() {
  const width = useWindowSize();

  if (width > 1120) {
    return 6;
  }

  if (width > 969) {
    return 5;
  }

  if (width > 821) {
    return 4;
  }

  if (width > 650) {
    return 3;
  }

  if (width > 500) {
    return 2;
  }

  if (width > 410) {
    return 1.5;
  }

  if (width > 330) {
    return 1;
  }

  return 0.75;
}