import React from "react";

export const OrderProductTile = ({quantity, id, color}) => {
  return (
    <div className="justify-between flex items-start sm:items-center p-3 rounded-lg bg-gary-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img src={id?.images[0].url} alt={id?.name} className="w-20 sm:w-24 rounded-lg" />
        <div className="grid sm:gap-1 ">
          <h1 className="font-semibold text-sm sm:text-base">
          {id?.name}
          </h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color: {" "}
              <span style={{ backgroundColor: color }}>{color}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty: <span className="font-medium text-customYellow" >{quantity}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price: <span className="font-medium text-customYellow" >₹{id?.price}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
