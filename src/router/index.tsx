import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout";
import { ErrorPage } from "../pages/error/ErrorPage";
import { LandingPage } from "../pages/landing/LandingPage";
import { AuthenticationPage } from "../pages/authentication/AuthenticationPage";
import { AdminLayout } from "../layout/admin/AdminLayout";
import { AdminPage } from "../pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import { QuestionsPage } from "../pages/questions/QuestionsPage";
import { ResultsPage } from "../pages/results/ResultsPage";
import { HomePage } from "../pages/home/HomePage";
import { TestsListPage } from "../pages/testsList/TestsListPage";
import { testLoader, TestPage } from "../pages/test/TestPage";
import {
  resultLoader,
  TestResultPage,
} from "../pages/testResult/TestResultPage";

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
          {
            path: "/admin/questions",
            element: <QuestionsPage />,
          },
          {
            path: "/admin/results",
            element: <ResultsPage />,
          },
        ],
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/home/tests",
        element: <TestsListPage />,
      },
      {
        path: "/home/tests/:test",
        element: <TestPage />,
        loader: testLoader,
      },
      {
        path: "/home/testresult/:test",
        element: <TestResultPage />,
        loader: resultLoader,
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
