import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import axios from "axios";
import { useDispatch} from "react-redux"
import {setProducts} from "../../redux/slices/productSlice"

const categoryData = {
  trigger: "Category",
  items: ["Keyboard", "Mouse", "Monitor", "Laptop", "Headset"],
};
const priceData = {
  trigger: "Price",
  items: [1000, 3000, 5000, 10000, 20000],
};

export const FilterMenu = () => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    const getFilterProducts = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API_URL +
          `/get-products?category=${category}&price=${price}&search=${search}`
      );
      const data = await res.data;
      dispatch(setProducts(data.data))
    };
    getFilterProducts()
  }, [ category,price,search]);

  return (
    <div className="w-[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0">
      {/* Dropdown Filters */}
      <div className="flex sm:w-[30%] w-full gap-3">
        {/* Category */}
        <Select
          onValueChange={(value) => {
            setCategory(value);
          }}
        >
          <SelectTrigger id={categoryData.trigger}>
            <SelectValue placeholder={categoryData.trigger} />
          </SelectTrigger>
          <SelectContent postion="poper">
            {categoryData.items.map((item, index) => (
              <SelectItem key={index} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price */}
        <Select
          onValueChange={(value) => {
            setPrice(value);
          }}
        >
          <SelectTrigger id={priceData.trigger}>
            <SelectValue placeholder={priceData.trigger} />
          </SelectTrigger>
          <SelectContent postion="poper">
            {priceData.items.map((item, index) => (
              <SelectItem key={index} value={item} className="capitalize">
                Less Than {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input  */}
      <div className="sm:w-[60%] w-full">
        <Input
          id="search"
          placeholder="Search Here.."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
