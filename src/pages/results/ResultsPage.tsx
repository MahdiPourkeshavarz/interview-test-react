import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getResults } from "../../api/getResults";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../../api/getTopics";
import { resultData, topicData } from "../../types";
import { TestResultCard } from "../../components/TestResultCard";
import { PaginationButtons } from "../../components/PaginationButtons";

export function ResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("_page")) || 1
  );

  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get("topic_like") || ""
  );

  const [userName, setUserName] = useState(
    searchParams.get("username_like") || ""
  );

  const { data: resultsData, isLoading } = useQuery({
    queryKey: ["results", options],
    queryFn: () => getResults(options),
  });

  const { data: topicsList, isLoading: isTopicsLoading } = useQuery({
    queryKey: ["list"],
    queryFn: () => getTopics(""),
  });

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedTopic) {
      queryParams.set("topic_like", selectedTopic);
    }

    if (userName) {
      queryParams.set("username_like", userName);
    }

    queryParams.set("_page", currentPage.toString());
    queryParams.set("_limit", "2");

    const queryString = `?${queryParams.toString()}`;

    setSearchParams(queryParams);

    setOptions(queryString);
  }, [currentPage, selectedTopic, setSearchParams, userName]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      <div className="flex flex-col px-4 py-8">
        <div className="items-center flex mx-auto space-x-6">
          {!isTopicsLoading && (
            <select
              className="w-40 rounded-lg bg-slate-200 px-2 py-1 dark:text-blue-500"
              name="categoryList"
              id="categoryList"
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentPage(1);
              }}
              value={selectedTopic === "" ? "Topics" : selectedTopic}
            >
              <option value="">Topics</option>
              {topicsList?.topics.map((topic: topicData) => (
                <option value={topic.name} key={topic.timeUnit}>
                  {topic.name}
                </option>
              ))}
            </select>
          )}
          <div>
            <input
              type="text"
              placeholder="Search by Username..."
              className="border-none h-10 w-52 rounded-lg"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 grid-cols-1">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            resultsData?.results?.map((result: resultData, idx: number) => (
              <TestResultCard key={idx} resultData={result} />
            ))
          )}
        </div>

        <div className="mt-4 flex justify-center">
          {resultsData && (
            <PaginationButtons
              totalPages={resultsData.totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
