import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export const HeaderDisplay = () => {

    const imagesData = [
        "images/2.jpg","images/1.jpg","images/3.jpg","images/4.jpg",
    ]

    return (
        <div>
            <Carousel className='my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-x-visible'
             plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
                <CarouselContent>
                   {
                    imagesData.map((image, index) => (
                        <CarouselItem key={index}>
                            <img src={image} loading='lazy' className='object-cover w-full h-[60vh] rounded-3xl' alt="img" />
                        </CarouselItem>
                    ))
                   }
                    
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}
