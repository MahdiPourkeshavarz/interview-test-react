import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuestions } from "../../api/getQuestions";
import { getTopics } from "../../api/getTopics";
import { questionData, topicData } from "../../types";
import { AdminQuestionCard } from "../../components/AdminQuestionCard";

export function QuestionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("_page")) || 1
  );
  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get("topic_like") || ""
  );

  const {
    data: originalData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["question", options],
    queryFn: () => getQuestions(options),
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

    queryParams.set("_page", currentPage.toString());
    queryParams.set("_limit", "6");

    const queryString = `?${queryParams.toString()}`;

    setSearchParams(queryParams);

    setOptions(queryString);
  }, [currentPage, selectedTopic, setSearchParams]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }
  const generatePaginationButtons = (totalPages: number) => {
    const visiblePages = 5;
    const currentPageIndex = currentPage - 1;
    let startPage = Math.max(
      0,
      currentPageIndex - Math.floor(visiblePages / 2)
    );
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    if (startPage < 0) {
      endPage = Math.min(totalPages - 1, visiblePages - 1);
      startPage = 0;
    }
    if (endPage >= totalPages) {
      startPage = Math.max(0, totalPages - visiblePages);
      endPage = totalPages - 1;
    }

    const buttons = [];

    if (startPage > 1) {
      buttons.push(
        <button
          key="start-ellipsis"
          className="mx-1 rounded-full border border-blue-600 bg-white px-4 py-2 text-blue-600"
        >
          ...
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i + 1}
          className={`ml-4 px-4 py-2 ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          } rounded-full border border-blue-600`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      );
    }

    if (endPage < totalPages - 2) {
      buttons.push(
        <button
          key="end-ellipsis"
          className="mx-1 rounded-full border border-blue-600 bg-white px-4 py-2 text-blue-600"
        >
          ...
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="flex flex-col px-4 py-8">
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
            {topicsList?.topics?.map((topic: topicData) => (
              <option value={topic.name} key={topic.timeUnit}>
                {topic.name}
              </option>
            ))}
          </select>
        )}

        <div className="mt-8 grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            originalData?.questions?.map(
              (question: questionData, idx: number) => (
                <AdminQuestionCard
                  key={idx}
                  question={question}
                  refetch={() => refetch()}
                />
              )
            )
          )}
        </div>

        <div className="mt-4 flex justify-center">
          {originalData &&
            generatePaginationButtons(originalData?.totalPages as number)}
        </div>
      </div>
    </>
  );
}
