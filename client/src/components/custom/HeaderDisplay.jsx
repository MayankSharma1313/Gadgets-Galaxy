import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const HeaderDisplay = () => {
  const imagesData = [
    "https://m.media-amazon.com/images/I/81tioCUVf4L._AC_SX296_SY426_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/41HFqEr055L._AC_SR100,100_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61HBpQuLjVL._AC_SX296_SY426_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61QNaY7PMpL._AC_SR526,526_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61vrPzaPnSL._AC_SR526,526_FMwebp_QL65_.jpg",
  ];

  return (
    <div>
      <Carousel
        className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-x-visible"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {imagesData.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                loading="lazy"
                className="object-cover w-full h-[60vh] rounded-3xl"
                alt="img"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
