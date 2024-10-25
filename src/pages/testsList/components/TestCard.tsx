import { Link } from "react-router-dom";
import { topicData } from "../../../types";

interface props {
  test: topicData;
}

export function TestCard({ test }: props) {
  const totalTime = Math.ceil((20 * Number(test.timeUnit)) / 60);

  return (
    <Link
      to={`/home/tests/${test.name}`}
      className="relative w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {test?.participants && (
        <div className="absolute top-[218px] right-4 flex space-x-2 items-center text-white bg-slate-100/10 px-1 py-1 rounded-xl shadow-md">
          <p>Participants:</p>
          <div className="flex space-x-1 items-center">
            <p>{test.participants}</p>
            <img src="/participants.png" alt="_" className="w-4 h-4" />
          </div>
        </div>
      )}
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src={test.imgSrc}
        alt={test.name}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {test.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Questions: 20
        </p>
        <div className="flex justify-between space-x-10">
          <p className="font-medium text-gray-900 dark:text-white">
            Time per Question: {test.timeUnit}s
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            Total Time: {totalTime}m
          </p>
        </div>
      </div>
    </Link>
  );
}
