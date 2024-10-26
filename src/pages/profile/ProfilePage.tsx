import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TESTS_URL } from "../../constants";
import { httpRequest } from "../../lib/axiosConfig";
import { UserTestResultCard } from "./testCard/userTestCard";
import { resultData } from "../../types";

interface ProfileData {
  tests: resultData[];
  username: string | undefined;
}

export function ProfilePage() {
  const loaderData = useLoaderData() as ProfileData | null;

  const { tests = [], username = "" } = loaderData || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {username}'s Test History
        </h2>

        {tests.length === 0 ? (
          <p className="text-lg text-gray-700">No tests found for this user.</p>
        ) : (
          <div className="space-y-4">
            {tests.map((test: resultData) => (
              <UserTestResultCard key={test.id} testData={test} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function profileLoader({
  params,
}: LoaderFunctionArgs): Promise<ProfileData | null> {
  const username = params.username;
  try {
    const response = await httpRequest.get(
      `${TESTS_URL}?username_like=${username}`
    );
    return {
      tests: response.data,
      username: username,
    };
  } catch (e) {
    console.log(e);
    return { tests: [], username: username };
  }
}
