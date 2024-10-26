import { TOPICS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function getTopics(options: string) {
  try {
    const response = await httpRequest.get(TOPICS_URL + options);
    const totalQuestions = parseInt(response.headers["x-total-count"], 10) || 0;

    return {
      topics: response.data,
      totalPages: Math.ceil(totalQuestions / 3),
    };
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
