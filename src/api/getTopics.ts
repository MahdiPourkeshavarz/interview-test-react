import { TOPICS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function getTopics() {
  try {
    const response = await httpRequest.get(TOPICS_URL);
    return response.data;
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
