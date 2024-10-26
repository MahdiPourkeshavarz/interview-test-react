import { useMutation } from "@tanstack/react-query";
import { questionData } from "../types";
import { useState } from "react";
import { deleteQuestion } from "../api/deleteQuestion";
import { EditModal } from "./editModal";
import { DeleteModal } from "./deleteModal";
import { queryClient } from "../lib/reactQueryConfig";

interface props {
  question: questionData;
  refetch: () => void;
}

export function AdminQuestionCard({ question, refetch }: props) {
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [questionToEdit, setQuestionToEdit] = useState<questionData>();
  const [deleteQuestionId, setDeleteQuestionId] = useState<number>();

  const names = ["A.", "B.", "C.", "D."];

  function handleEditModalState() {
    setEditModalOpen((prev) => !prev);
    refetch();
  }

  function handleModalState() {
    setOpen((prev) => !prev);
  }

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  function handleDeleteQuestion() {
    setOpen(false);
    deleteMutation.mutate(deleteQuestionId as number);
    refetch();
  }

  return (
    <>
      <DeleteModal
        open={open}
        handleState={handleModalState}
        handleDeleteQuestion={handleDeleteQuestion}
      />
      <EditModal
        open={editModalOpen}
        handleState={handleEditModalState}
        question={questionToEdit}
      />
      <div className="relative bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {question.title}
        </h3>

        <div className="space-y-3">
          {question?.options?.map((option, index) => {
            return (
              <p
                key={index} // Use index as the key to avoid errors in rendering
                className={`${
                  question.right === option
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"
                } transition-colors duration-300 ease-in-out`}
              >
                {names[index]} {option}
              </p>
            );
          })}
        </div>

        <div className="absolute bottom-2 right-4 flex items-center space-x-4">
          <button
            className="text-blue-600 transition-all hover:text-blue-500"
            onClick={() => {
              setQuestionToEdit(question);
              handleEditModalState();
            }}
            aria-label="Edit product"
            title="Edit"
          >
            <img width="28px" src="/Edit.png" alt="Edit" />
          </button>
          <button
            className="text-red-600 transition-all hover:text-red-500"
            onClick={() => {
              setDeleteQuestionId(question?.id as number);
              handleModalState();
            }}
            aria-label="Delete product"
            title="Delete"
          >
            <img width="30px" src="/Delete.png" alt="Delete" />
          </button>
        </div>
      </div>
    </>
  );
}
