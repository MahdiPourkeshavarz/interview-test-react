import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CreateTopic } from "./components/topic/CreateTopicDropdown";
import { CreateQuestion } from "./components/question/CreateQuestionDropdown";

export function AdminPage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const username = localStorage.getItem("username");
  //   if (!username || username !== "adminzadeh") {
  //     toast.error("عدم دسترسی مجاز!", {
  //       position: "bottom-center",
  //     });
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      <div className="myContainer mx-auto p-4 md:px-14 lg:px-32">
        <div className="my-8">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h5">Add Topic</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreateTopic />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mb-8">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h5">Add Question</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreateQuestion />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
