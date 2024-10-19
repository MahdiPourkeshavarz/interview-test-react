import { TOPICS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { topicData } from "../types";

export async function createTopic(topicData: topicData) {
  try {
    const response = await httpRequest.post(TOPICS_URL, topicData);
    return response.status;
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
