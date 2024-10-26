import { QUESTIONS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { questionData } from "../types";

export async function editQuestion(questionData: Partial<questionData>) {
  try {
    const response = await httpRequest.patch(
      `${QUESTIONS_URL}/${questionData.id}`,
      questionData
    );
    return response.status;
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
