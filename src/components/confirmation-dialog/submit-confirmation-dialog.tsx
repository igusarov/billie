import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Consumer } from "../../store/consumer/consumer.types";

type Props = {
  onAccept: () => void;
  onDismiss: () => void;
  consumer?: Consumer;
};

const SubmitConfirmationDialog: React.FC<Props> = ({
  consumer,
  onAccept,
  onDismiss,
}) => {
  return (
    <Dialog maxWidth="xs" open onClose={onDismiss}>
      <DialogTitle>Submit confirmation</DialogTitle>
      <DialogContent>
        Do you want to submit new data for {consumer?.name} ?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button onClick={onAccept} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitConfirmationDialog;
