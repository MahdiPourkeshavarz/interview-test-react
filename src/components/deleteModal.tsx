import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface props {
  open: boolean;
  handleState: () => void;
  handleDeleteQuestion: () => void;
}

export function DeleteModal({
  open,
  handleState,
  handleDeleteQuestion,
}: props) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleState}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"آیا مطمعنید ؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this question
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleState}>انصراف</Button>
          <Button onClick={handleDeleteQuestion} autoFocus>
            تایید میکنم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
