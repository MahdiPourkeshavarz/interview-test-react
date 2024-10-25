import { useEffect, useState } from "react";
import { httpRequest } from "../../lib/axiosConfig";
import { QUESTIONS_URL, TOPICS_URL } from "../../constants";
import { questionData } from "../../types";
import { useLoaderData } from "react-router-dom";
import { useStore } from "../../context/store";

export function TestPage() {
  const data = useLoaderData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(
    Number(data?.topic?.timeUnit) * 20
  );
  const [questionCount, setQuestionCount] = useState(1);

  const { setCurrentTest } = useStore();

  const [answers, setAnswers] = useState(Array.from({ length: 20 }, () => ""));

  const [questionList] = useState(data?.questions);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data?.questions?.length - 1) {
      setQuestionCount((prev) => prev + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentTest({ answers, questions: questionList });
      alert("Test finished!");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setQuestionCount((prev) => prev - 1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  function handleSelectedOption(option: string) {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = option;
      return newAnswers;
    });
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!data?.questions) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow-2xl rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-xl font-semibold text-gray-700">
              Question {questionCount} of 20
            </p>
            <p className="text-lg font-semibold text-red-500">
              Time Remaining: {formatTime(timeRemaining)}
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {data?.questions[currentQuestionIndex]?.title}
          </h2>

          <div className="space-y-4">
            {data.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <label
                  key={index}
                  className={`block p-4 rounded-lg border cursor-pointer transition-colors duration-300
            ${
              answers[currentQuestionIndex] === option
                ? "bg-blue-100 border-blue-600 text-blue-800"
                : "border-gray-300 hover:bg-gray-100"
            }`}
                >
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleSelectedOption(option)}
                    className="form-radio text-blue-600 hidden"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              )
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousQuestion}
              className="w-40 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md
                hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            <button
              onClick={handleNextQuestion}
              className={`w-40 py-3 bg-blue-600 text-white rounded-lg shadow-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
                disabled:bg-blue-300 disabled:cursor-not-allowed`}
              disabled={!currentQuestionIndex > 19}
            >
              {currentQuestionIndex < data?.questions?.length - 1
                ? "Next"
                : "Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function testLoader({ params }) {
  const testName = params.test;
  try {
    const response = await httpRequest.get(
      `${QUESTIONS_URL}?topic_like=${testName}`
    );
    const questionsList = response?.data.map(
      (question: questionData) => question
    );
    const idList = shuffleArray(
      response?.data.map((question: questionData) => Number(question.id))
    );
    const shuffledQuestionsId = generateShuffledQuestionIdList(idList);
    const testQuestions = shuffledQuestionsId.map((chosenId) => {
      return questionsList.find(
        (question: questionData) => question.id === chosenId
      );
    });
    const topicDetailres = await httpRequest.get(
      `${TOPICS_URL}?name_like=${testName}`
    );
    return {
      questions: testQuestions,
      topic: topicDetailres.data[0],
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function generateShuffledQuestionIdList(shuffledIds: number[]) {
  const startIndex = Math.floor(Math.random() * shuffledIds.length);

  const slicedIds = [];
  for (let i = 0; i < 20; i++) {
    const index = (startIndex + i) % shuffledIds.length;
    slicedIds.push(shuffledIds[index]);
  }
  return slicedIds;
}

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
