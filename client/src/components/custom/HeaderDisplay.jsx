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
    "https://images.unsplash.com/photo-1628832306751-ec751454119c?q=80&w=2145&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1638494004454-d6e53a585f28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fG1vdXNlJTIwcmdifGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1598662779094-110c2bad80b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGtleWJvYXJkfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1560762484-813fc97650a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1628832306751-ec751454119c?q=80&w=2145&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div>
      <Carousel
        className="my-10 mx-auto w-[90vw] overflow-x-clip sm:overflow-x-visible"
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
