import { Colors } from "@/constants/colors";
import React from "react";

export const CheckoutProducts = ({
  name = "Custom Designed Keyboard",
  price = 299,
  quantity = 2,
  image = {
    url: "images/2.jpg",
  },
  color = Colors.customYellow,
}) => {
  return (
    <div className="flex justify-between items-start p-3 rounded-lg bg-gary-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img src={image} alt={name} className="w-20 sm:w-24 rounded-lg " />
        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">
            Custom Designed Keyboard
          </h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color: <span style={{ backgroundColor: color }}>{color}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty :{" "}
              <span className="font-medium text-customYellow">{quantity}</span>{" "}
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price :{" "}
              <span className="font-medium text-customYellow">₹599</span>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
