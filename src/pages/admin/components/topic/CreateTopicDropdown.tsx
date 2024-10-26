import { TextField, Button } from "@mui/material";
import { useFieldValidation } from "../../../../hooks/useFieldValidation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { topicData } from "../../../../types";
import { createTopic } from "../../../../api/createTopic";
import { queryClient } from "../../../../lib/reactQueryConfig";

export function CreateTopic() {
  const {
    value: topicNameValue,
    isValid,
    setValue: setTopicValue,
  } = useFieldValidation("", "english");

  const {
    value: topicSrcValue,
    isValid: isSrcValid,
    setValue: setTopicSrcValue,
  } = useFieldValidation("", "");

  const {
    value: timeValue,
    isValid: isTimeValid,
    setValue: setTimeValue,
  } = useFieldValidation("", "number");

  const createTopicMutation = useMutation({
    mutationKey: ["topic"],
    mutationFn: (topic: topicData) => createTopic(topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topic"] });
      setTopicValue("");
      setTimeValue("");
      setTopicSrcValue("");
      toast.success("Topic Added successfully", {
        position: "bottom-center",
      });
    },
  });

  async function handleAddCategory() {
    if (!isValid || !isTimeValid) {
      toast.error("Invalid topic. try again!", {
        position: "bottom-center",
      });
      return;
    }
    try {
      const topic = {
        name: topicNameValue,
        timeUnit: timeValue,
        imgSrc: topicSrcValue,
      };
      createTopicMutation.mutate(topic);
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  }

  return (
    <div className="flex flex-col gap-y-6 px-16 text-center lg:px-36">
      <TextField
        label="Topic's Name"
        variant="outlined"
        value={topicNameValue}
        onChange={(e) => {
          setTopicValue(e.target.value);
        }}
        error={topicNameValue === "" ? false : !isValid}
      />
      <TextField
        label="Topic's Image Src"
        variant="outlined"
        value={topicSrcValue}
        onChange={(e) => {
          setTopicSrcValue(e.target.value);
        }}
        error={topicSrcValue === "" ? false : !isSrcValid}
      />
      <div className="grid grid-cols-2">
        <TextField
          label="Each question answer time(seconds)?"
          variant="outlined"
          value={timeValue}
          onChange={(e) => {
            setTimeValue(e.target.value);
          }}
          error={timeValue === "" ? false : !isTimeValid}
        />
      </div>
      <Button variant="contained" color="inherit" onClick={handleAddCategory}>
        Add Topic
      </Button>
    </div>
  );
}
