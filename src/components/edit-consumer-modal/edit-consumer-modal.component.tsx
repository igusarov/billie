import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Consumer } from "../../store/consumer/consumer.types";

type Props = {
  consumer: Consumer;
  onDismiss: () => void;
  onSubmit: (consumer: Consumer) => void;
};

const EditConsumerModal: React.FC<Props> = ({
  consumer,
  onDismiss,
  onSubmit,
}) => {
  const [draftBudget, setDraftBudget] = useState<string>(
    consumer.budget.toString()
  );

  const handleSubmit = () => {
    onSubmit({
      ...consumer,
      budget: Number(draftBudget),
    });
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const budget = event.target.value;
    setDraftBudget(budget);
  };

  const isSubmitButtonDisabled = false;

  return (
    <Dialog open onClose={onDismiss} aria-labelledby="form-dialog-title">
      <DialogTitle>Edit {consumer?.name}</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <FormControl>
            <InputLabel required>Budget</InputLabel>
            <Input
              fullWidth
              value={draftBudget}
              onChange={handleBudgetChange}
            />
          </FormControl>
        </form>
      </DialogContent>
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
