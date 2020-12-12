import { createSelector } from "reselect";
import { AppState } from "../index";
import { Consumer, ConsumerState } from "./consumer.types";

export const getConsumerState = (state: AppState): ConsumerState =>
  state.consumer;
export const getConsumers = createSelector<AppState, ConsumerState, Consumer[]>(
  getConsumerState,
  (state) => Object.values(state.items)
);
