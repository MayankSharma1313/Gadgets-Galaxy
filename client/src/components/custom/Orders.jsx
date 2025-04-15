import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { OrderProductTile } from "./OrderProductTile";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import useErrorLogout from "../../hooks/use-error-logout";
import axios from "axios";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { handleErrorLogout } = useErrorLogout();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        axios
          .get(
            import.meta.env.VITE_API_URL +
              `/get-all-orders?page=${currentPage}&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            const { data, totalPages, currentPage } = res.data;
            setOrders(data);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          });
      } catch (error) {
        return handleErrorLogout(error, error.response.data.message);
      }
    };
    fetchOrders();
  }, [currentPage]);

  const updateOrderStatus = async (status, paymenId) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/update-order-status/${paymenId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);

      return handleErrorLogout(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col mx-auto  gap-5">
        <div className="space-y-8 ">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>

            <div className="grid space-y-1 gap-2 sm:w-[70vw]">
              {orders.length === 0 ? (
                <h2 className="text-primary text-md">
                  Nothing to show, Please add some products...
                </h2>
              ) : (
                orders.map((item) => (
                  <Card key={item._id} className="space-y-2 p-3 shadow-md">
                    <div className="grid sm:grid-cols-3 gap-2">
                      {item?.products?.map((product) => (
                        <OrderProductTile key={product._id} {...product} />
                      ))}
                    </div>
                    <hr />
                    <div>
                      <p className="flex justify-between sm:justify-normal gap-2 items-center px-3">
                        <span className="font-bold">Total:</span>
                        <span className="font-sm text-customGray">
                          ₹{item?.amount}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-normal gap-2 items-center px-3">
                        <span className="font-bold">Address:</span>
                        <span className="font-sm text-customGray">
                          {item?.address}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-normal gap-2 items-center px-3">
                        <span className="font-bold">Name:</span>
                        <span className="font-sm text-customGray">
                          {item?.userId.name}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-normal gap-2 items-center px-3">
                        <span className="font-bold">Email:</span>
                        <span className="font-sm text-customGray">
                          {item?.userId?.email}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-normal gap-2 items-center px-3">
                        <span className="font-bold">Payment Id:</span>
                        <span className="font-sm text-customGray">
                          {item?.razorpayPaymentID}
                        </span>
                      </p>
                    </div>
                    <Select
                      onValueChange={(value) => {
                        alert("Do you really want to update status?");
                        updateOrderStatus(value, item.razorpayPaymentID);
                      }}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Pending" />
                        <SelectContent className="capitalize">
                          <SelectItem value="pending">pending</SelectItem>
                          <SelectItem value="packed">packed</SelectItem>
                          <SelectItem value="in transit">in transit</SelectItem>
                          <SelectItem value="completed">completed</SelectItem>
                          <SelectItem value="failed">failed</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  setCurrentPage((currentPage) =>
                    currentPage >= 2 ? currentPage - 1 : 1
                  );
                }}
              />
            </PaginationItem>
            <PaginationItem>
              {Array.from({ length: totalPages }, (data, i) => (
                <PaginationLink
                  href="#"
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
