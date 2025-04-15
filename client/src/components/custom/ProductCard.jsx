import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LinkButton } from "./LinkButton";
import { startsGenerators } from "@/constants/helper";

export const ProductCard = ({
  name = "Product Title",
  price = 2000,
  rating = 4,
  image = {
    url: "images/1.jpg",
    alt: "product image",
    id: "1234",
  },
}) => {
  return (
    <div className="relative border w-fit overflow-clip grid z-1 hover:shadow-md rounded-2xl">
      <img src={image.url} alt={name} className="object-cover w-[30rem] h-[18rem] " />

      <div className="px-3 grid gap-1 py-2 absolute bg-white bottom-0 w-full dark:bg-zinc-900 translate-y-[3rem] hover:translate-y-0 transition-all ease-in-out rounded-xl transform duration-300">
        <h2>{name}</h2>
        <div className="flex justify-between "> 
            <div className="flex gap-1">
               {startsGenerators(rating, )}
            </div>
            <span>₹{price}</span>
        </div>
       <LinkButton to={`/product/${name.split(" ").join("-")}`} text="View Product" />

      </div>
    </div>
  );
};
