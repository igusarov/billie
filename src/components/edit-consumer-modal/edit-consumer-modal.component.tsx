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
  consumer?: Consumer;
  isShown: boolean;
  onDismiss: () => void;
  onSubmit: (consumer: Consumer) => void;
};

const EditConsumerModal: React.FC<Props> = ({
  consumer,
  onDismiss,
  isShown,
  onSubmit,
}) => {
  const handleSubmit = () => {
    if (consumer) {
      onSubmit(consumer);
    }
  };

  const isSubmitButtonDisabled = false;

  return (
    <Dialog
      open={isShown}
      onClose={onDismiss}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>{consumer?.name}</DialogTitle>
      <DialogContent>Hello world</DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button
          disabled={isSubmitButtonDisabled}
          onClick={handleSubmit}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditConsumerModal;
