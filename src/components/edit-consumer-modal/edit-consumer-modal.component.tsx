import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { Consumer } from "../../store/consumer/consumer.types";

const createBudgetValidator = (budgetSpent: number) => (
  budget: string
): string | "OK" => {
  if (!budget.trim()) {
    return "Shouldn't be empty";
  }
  if (budgetSpent > Number(budget)) {
    return "The value must not be less than the budget spent";
  }

  return "OK";
};

const useStyles = makeStyles({
  content: {
    width: "300px",
  },
});

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
  const classes = useStyles();

  const [draftBudget, setDraftBudget] = useState<string>(
    consumer.budget.toString()
  );

  const [error, setError] = useState<string | null>(null);

  const budgetValidator = useMemo(() => {
    return createBudgetValidator(consumer.budget_spent);
  }, [consumer.budget_spent]);

  const handleSubmit = () => {
    onSubmit({
      ...consumer,
      budget: Number(draftBudget),
    });
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const budget = event.target.value;
    setDraftBudget(budget);
    const validationResult = budgetValidator(budget);
    setError(validationResult === "OK" ? null : validationResult);
  };

  return (
    <Dialog open onClose={onDismiss}>
      <DialogTitle>Edit {consumer?.name}</DialogTitle>
      <DialogContent className={classes.content}>
        <form noValidate autoComplete="off">
          <FormControl error={!!error} fullWidth>
            <InputLabel required>Budget</InputLabel>
            <Input
              fullWidth
              value={draftBudget}
              onChange={handleBudgetChange}
              type="number"
            />
            {!!error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button disabled={!!error} onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditConsumerModal;
