import Carousel from "./carousel.astro";
import {
  type CarouselApi,
  type CarouselManager,
  type CarouselOptions,
  initCarousel
} from "./carousel-script";
import CarouselContent from "./carousel-content.astro";
import CarouselItem from "./carousel-item.astro";
import CarouselNext from "./carousel-next.astro";
import CarouselPrev from "./carousel-prev.astro";

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  type CarouselManager,
  CarouselNext,
  type CarouselOptions,
  CarouselPrev,
  initCarousel
};

export default {
  Root: Carousel,
  Content: CarouselContent,
  Item: CarouselItem,
  Next: CarouselNext,
  Prev: CarouselPrev,
  init: initCarousel
};
