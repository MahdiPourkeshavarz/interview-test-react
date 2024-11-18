import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuestions } from "../../api/getQuestions";
import { getTopics } from "../../api/getTopics";
import { questionData, topicData } from "../../types";
import { AdminQuestionCard } from "../../components/AdminQuestionCard";
import { PaginationButtons } from "../../components/PaginationButtons";

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
    queryKey: ["questions", options],
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
          {originalData && (
            <PaginationButtons
              totalPages={originalData.totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
