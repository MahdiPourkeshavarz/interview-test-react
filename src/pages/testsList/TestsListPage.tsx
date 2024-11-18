import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopics } from "../../api/getTopics";
import { topicData } from "../../types";
import { TestCard } from "./components/TestCard";
import { PaginationButtons } from "../../components/PaginationButtons";

export function TestsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("_page")) || 1
  );

  const username = localStorage.getItem("username");

  const { data: topicsList, isLoading: isTopicsLoading } = useQuery({
    queryKey: ["list"],
    queryFn: () => getTopics(options),
  });

  useEffect(() => {
    const queryParams = new URLSearchParams();

    queryParams.set("_page", currentPage.toString());
    queryParams.set("_limit", "3");

    const queryString = `?${queryParams.toString()}`;

    setSearchParams(queryParams);

    setOptions(queryString);
  }, [currentPage, setSearchParams]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      <div className="flex flex-col px-4 py-8">
        {!username ? (
          <div className="mt-48 flex flex-col mx-auto text-2xl space-y-5 items-center justify-center px-4 py-8 rounded-lg shadow-xl">
            <p>Please Login or Signup before taking the tests</p>
            <Link
              to="/auth"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Login/Signup
            </Link>
          </div>
        ) : (
          <>
            <div className="myContainer grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {isTopicsLoading ? (
                <p>Loading...</p>
              ) : (
                topicsList?.topics?.map((topic: topicData, idx: number) => (
                  <TestCard key={idx} test={topic} />
                ))
              )}
            </div>

            <div className="mt-4 flex justify-center">
              {topicsList && (
                <PaginationButtons
                  totalPages={topicsList.totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
