export type Consumer = {
  id: number;
  name: string;
  budget: number;
  budget_spent: number;
  date_of_first_purchase: string;
};

export type ConsumerState = Readonly<{
  isLoading: boolean;
  error: Error | null;
  items: {
    [key: number]: Consumer;
  };
}>;

export enum ConsumerActionTypes {
  GET_CONSUMERS = "CONSUMER/GET_CONSUMERS",
  GET_CONSUMERS_SUCCESS = "CONSUMER/GET_CONSUMERS_SUCCESS",
  GET_CONSUMERS_FAIL = "CONSUMER/GET_CONSUMERS_FAIL",
  UPDATE_CONSUMER = "CONSUMER/UPDATE_CONSUMER",
  UPDATE_CONSUMER_SUCCESS = "CONSUMER/UPDATE_CONSUMER_SUCCESS",
  UPDATE_CONSUMER_FAIL = "CONSUMER/UPDATE_CONSUMER_FAIL",
}
