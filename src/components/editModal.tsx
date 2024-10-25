import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { httpRequest } from "../lib/axiosConfig";
import { QUESTIONS_URL } from "../constants";
import toast from "react-hot-toast";
import { questionData, topicData } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../api/getTopics";
import { useFieldValidation } from "../hooks/useFieldValidation";

interface Props {
  open: boolean;
  handleState: () => void;
  question?: questionData;
}

export function EditModal({ open, handleState, question }: Props) {
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

  useEffect(() => {
    if (question) {
      setSelectedCategory(question.topic);
      setTitleValue(question.title);
      setCorrectAnswerValue(question.right);
      setAValue(question.options[0]);
      setBValue(question.options[1]);
      setCValue(question.options[2]);
      setDValue(question.options[3]);
    }
  }, [question]);

  return (
    <Dialog
      open={open}
      onClose={handleState}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (
            !isAValid ||
            !isBValid ||
            !isCValid ||
            !isDValid ||
            !isCorrectAnswerValid
          ) {
            toast.error("Inavalid question. try again!", {
              position: "bottom-center",
            });
            return;
          }
          try {
            await httpRequest.patch(`${QUESTIONS_URL}/${question?.id}`, {
              topic: selectedCategory,
              title: titleValue,
              right: correctAnswerValue,
              options: [AValue, BValue, CValue, DValue],
            });
            setTitleValue("");
            setSelectedCategory("");
            toast.success("question edited successfully", {
              position: "bottom-center",
            });
            refetch();
          } catch (error) {
            console.error("Error adding question:", error);
          }
          handleState();
        },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-y-6 text-center px-10 min-w-[400px]">
          <FormControl className="mb-2">
            <InputLabel>Select Topic</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
          />
          <TextField
            label="Correct answer"
            variant="outlined"
            value={correctAnswerValue}
            onChange={(e) => setCorrectAnswerValue(e.target.value)}
            error={correctAnswerValue === "" ? false : !isCorrectAnswerValid}
          />
          <div className="grid grid-cols-1 gap-y-4">
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleState}>cancel</Button>
        <Button type="submit">submit</Button>
      </DialogActions>
    </Dialog>
  );
}
