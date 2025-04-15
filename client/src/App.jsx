import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { RouterProvider } from "react-router";
import { Navbar } from "./components/custom/Navbar";
import { ThemeProvider } from "./components/Provider/theme-provider";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";
import { AdminLogin } from "./pages/AdminLogin";
import { Error } from "./pages/Error";
import { Success } from "./pages/Success";
import { RootLayout } from "./layouts/RootLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { CreateProducts } from "./components/custom/CreateProducts";
import { AllProducts } from "./components/custom/AllProducts";
import { Analytics } from "./components/custom/Analytics";
import { Orders } from "./components/custom/Orders";
import { Settings } from "./components/custom/Settings";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MyOrders } from "./pages/MyOrders";
import { Toaster } from "./components/ui/toaster";
import { ProtectedRoute } from "./components/custom/ProtectedRoute";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Home />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <ProtectedRoute>
            <Navbar />
            <Signup />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <ProtectedRoute>
            <Navbar />
            <Login />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/product/:productName",
      element: <RootLayout children={<Product />} />,
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <RootLayout children={<MyOrders />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <RootLayout children={<Checkout />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/login",
      element: (
        <ProtectedRoute>
          <RootLayout children={<AdminLogin />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<CreateProducts />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/all-products",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<AllProducts />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/analytics",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Analytics />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/orders",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Orders />} />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/settings",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Settings />} />,
        </ProtectedRoute>
      ), 
    },
    {
      path: "/*",
      element: (
        <>
          <Error />
        </>
      ),
    },
    {
      path: "/success",
      element: (
        <>
          <Success />
        </>
      ),
    },
  ]);
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <Toaster />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  );
};
