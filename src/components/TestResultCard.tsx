import { useState } from "react";
import { Collapse } from "@mui/material"; // For smooth dropdown effect
import { questionData, resultData } from "../types";

interface props {
  resultData: resultData;
}

export function TestResultCard({ resultData }: props) {
  const [expanded, setExpanded] = useState(false);

  const { username, topic, numberofquestions, result } = resultData;
  const correctAnswers = result?.right?.length || 0;
  const wrongAnswers = result?.wrong?.length || 0;
  const unanswered = result?.withoutAnswer?.length || 0;
  const totalQuestions = parseInt(numberofquestions, 10);
  const passThreshold = Math.ceil(totalQuestions * 0.7);
  const hasPassed = correctAnswers >= passThreshold;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full my-4 rounded-lg shadow-lg border border-gray-300">
      <div
        className="flex items-center justify-between px-4 py-6 cursor-pointer"
        onClick={toggleExpand}
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{topic}</h2>
          <p className="text-gray-500">User: {username}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-gray-700">
            Correct: {correctAnswers}/{totalQuestions}
          </div>
          <div className="text-gray-700">
            Wrong: {wrongAnswers}/{totalQuestions}
          </div>
          <div className="text-gray-700">
            Unanswered: {unanswered}/{totalQuestions}
          </div>
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium text-white ${
              hasPassed ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {hasPassed ? "Passed" : "Failed"}
          </div>
        </div>
      </div>

      <Collapse in={expanded}>
        <div className="p-4 bg-gray-50">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Detailed Breakdown:
          </h3>

          <div className="mb-4">
            <h4 className="text-green-600 font-semibold">Correct Answers</h4>
            {result?.right &&
              result?.right.map((question: questionData) => (
                <div key={question.id} className="p-2 border-b border-gray-300">
                  <p className="font-medium text-gray-900">{question.title}</p>
                  <p className="text-green-500">Correct: {question.right}</p>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>A: {question.a}</p>
                    <p>B: {question.b}</p>
                    <p>C: {question.c}</p>
                    <p>D: {question.d}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="mb-4">
            <h4 className="text-red-600 font-semibold">Wrong Answers</h4>
            {result?.wrong &&
              result?.wrong.map((question: questionData) => (
                <div key={question.id} className="p-2 border-b border-gray-300">
                  <p className="font-medium text-gray-900">{question.title}</p>
                  <p className="text-red-500">Correct: {question.right}</p>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>A: {question.a}</p>
                    <p>B: {question.b}</p>
                    <p>C: {question.c}</p>
                    <p>D: {question.d}</p>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <h4 className="text-yellow-600 font-semibold">Unanswered</h4>
            {result?.withoutAnswer &&
              result?.withoutAnswer.map((question: questionData) => (
                <div key={question.id} className="p-2 border-b border-gray-300">
                  <p className="font-medium text-gray-900">{question.title}</p>
                  <p className="text-yellow-500">Correct: {question.right}</p>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>A: {question.a}</p>
                    <p>B: {question.b}</p>
                    <p>C: {question.c}</p>
                    <p>D: {question.d}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
}
