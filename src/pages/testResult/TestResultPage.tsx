import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/store";

export function TestResultPage() {
  const { currentTest, clearStore } = useStore();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const { answers, questions } = currentTest;

  const rightAnswers = questions.filter(
    (question, index) => answers[index] === question.right
  );

  const wrongAnswers = questions.filter(
    (question, index) =>
      answers[index] !== question.right && answers[index] !== ""
  );

  const unanswered = questions.filter(
    (question, index) => answers[index] === ""
  );

  const isUserPassed = wrongAnswers.length + unanswered.length < 7;

  function handleClearTest() {
    clearStore();
    navigate("/home");
  }

  if (!currentTest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <p className="text-lg font-semibold text-gray-700">
          No test results available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8">
        <div className="flex text-center text-xl font-semibold text-black pb-7">
          {isUserPassed ? (
            <div className="flex flex-col space-y-2">
              <p className="flex justify-between">
                Congratulation{" "}
                <span className="text-green-600 pl-4">{username}</span>
              </p>
              <p>You have passed the test</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <p className="flex justify-between">
                Too Bad! <span className="text-green-600 pl-4">{username}</span>
              </p>
              <p>You have not passed the test!</p>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Results</h2>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Correct Answers:{" "}
            <span className="text-green-600">{rightAnswers.length}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Wrong Answers:{" "}
            <span className="text-red-600">{wrongAnswers.length}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Unanswered:{" "}
            <span className="text-orange-600">{unanswered.length}</span>
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Detailed Results:
        </h3>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const isCorrect = answers[index] === question.right;
            const isUnanswered = answers[index] === "";
            return (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  isCorrect
                    ? "border-green-500 bg-green-100"
                    : isUnanswered
                    ? "border-orange-500 bg-orange-100"
                    : "border-red-500 bg-red-100"
                }`}
              >
                <h4 className="font-medium text-lg">{question.title}</h4>
                <p className="text-sm text-gray-600">
                  Your Answer: {answers[index] || "No answer"}
                </p>
                {!isUnanswered && (
                  <p className="text-sm text-gray-600">
                    Correct Answer: {question.right}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleClearTest}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}
