import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogout } from "@/redux/slices/authSlice";

export const LogoutToggle = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="text-sm">
              {user?.name?.charAt(0).toUpperCase()} 
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <Link to="/orders">
            {" "}
            <DropdownMenuItem>My Orders</DropdownMenuItem>{" "}
          </Link>
          <DropdownMenuItem
            className="text-red-600 "
            onClick={() => dispatch(setUserLogout())}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
