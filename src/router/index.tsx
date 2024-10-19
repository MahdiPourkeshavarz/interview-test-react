import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout";
import { ErrorPage } from "../pages/error/ErrorPage";
import { LandingPage } from "../pages/landing/LandingPage";
import { AuthenticationPage } from "../pages/authentication/AuthenticationPage";
import { AdminLayout } from "../layout/admin/AdminLayout";
import { AdminPage } from "../pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <AuthenticationPage />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);

export default function AppRoute() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}
