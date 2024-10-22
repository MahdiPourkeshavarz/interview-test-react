import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { httpRequest } from "../../../../lib/axiosConfig";

import toast from "react-hot-toast";
import { useFieldValidation } from "../../../../hooks/useFieldValidation";
import { QUESTIONS_URL } from "../../../../constants";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../../../../api/getTopics";
import { topicData } from "../../../../types";

export function CreateQuestion() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    value: titleValue,
    isValid: isTitleValid,
    setValue: setTitleValue,
  } = useFieldValidation("", "");

  const {
    value: correctAnswerValue,
    isValid: isCorrectAnswerValid,
    setValue: setCorrectAnswerValue,
  } = useFieldValidation("", "");

  const {
    value: AValue,
    isValid: isAValid,
    setValue: setAValue,
  } = useFieldValidation("", "");

  const {
    value: BValue,
    isValid: isBValid,
    setValue: setBValue,
  } = useFieldValidation("", "");

  const {
    value: CValue,
    isValid: isCValid,
    setValue: setCValue,
  } = useFieldValidation("", "");

  const {
    value: DValue,
    isValid: isDValid,
    setValue: setDValue,
  } = useFieldValidation("", "");

  const { data: topicsList, refetch } = useQuery({
    queryKey: ["list"],
    queryFn: () => getTopics(""),
  });
  const handleAddQuestion = async () => {
    if (
      !isAValid ||
      !isBValid ||
      !isCValid ||
      !isDValid ||
      !isCorrectAnswerValid ||
      !isTitleValid
    ) {
      toast.error("Inavalid question. try again!", {
        position: "bottom-center",
      });
      return;
    }
    try {
      await httpRequest.post(QUESTIONS_URL, {
        topic: selectedCategory,
        title: titleValue,
        right: correctAnswerValue,
        a: AValue,
        b: BValue,
        c: CValue,
        d: DValue,
      });
      setTitleValue("");
      setSelectedCategory("");
      setAValue("");
      setBValue("");
      setCValue("");
      setDValue("");
      setCorrectAnswerValue("");
      toast.success("question added successfully", {
        position: "bottom-center",
      });
      refetch();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 px-16 text-center">
      <FormControl className="mb-2">
        <InputLabel>Select Topic</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          {topicsList?.topics?.map((category: topicData) => (
            <MenuItem key={category?.timeUnit} value={category?.name}>
              {category?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Question's Title"
        variant="outlined"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        error={titleValue === "" ? false : !isTitleValid}
        helperText="required"
      />
      <TextField
        label="Correct answer"
        variant="outlined"
        value={correctAnswerValue}
        onChange={(e) => setCorrectAnswerValue(e.target.value)}
        error={correctAnswerValue === "" ? false : !isCorrectAnswerValid}
      />
      <div className="grid grid-cols-4">
        <TextField
          label="D"
          variant="outlined"
          value={DValue}
          onChange={(e) => setDValue(e.target.value)}
          error={DValue === "" ? false : !isDValid}
        />
        <TextField
          label="C"
          variant="outlined"
          value={CValue}
          onChange={(e) => setCValue(e.target.value)}
          error={CValue === "" ? false : !isCValid}
        />
        <TextField
          label="B"
          variant="outlined"
          value={BValue}
          onChange={(e) => setBValue(e.target.value)}
          error={BValue === "" ? false : !isBValid}
        />
        <TextField
          label="A"
          variant="outlined"
          value={AValue}
          onChange={(e) => setAValue(e.target.value)}
          error={AValue === "" ? false : !isAValid}
        />
      </div>
      <Button variant="contained" color="inherit" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );
}
