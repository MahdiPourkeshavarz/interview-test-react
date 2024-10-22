import { topicData } from "../../../types";

interface props {
  test: topicData;
}

export function TestCard({ test }: props) {
  const totalTime = Math.ceil(
    (Number(test.quantity) * Number(test.timeUnit)) / 60
  );

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
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
          Questions: {test.quantity}
        </p>
        <div className="flex justify-between">
          <p className="font-medium text-gray-900 dark:text-white">
            Time per Question: {test.timeUnit} seconds
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            Total Time: {totalTime} minutes
          </p>
        </div>
      </div>
    </div>
  );
}
