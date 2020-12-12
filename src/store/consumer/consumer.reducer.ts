import { ActionType, createReducer } from "typesafe-actions";
import * as ConsumerActions from "./consumer.actions";
import { ConsumerState, ConsumerActionTypes, Consumer } from "./consumer.types";

const initialState: ConsumerState = {
  isLoading: false,
  error: null,
  items: {},
};

const consumerReducer = createReducer<
  ConsumerState,
  ActionType<typeof ConsumerActions>
>(initialState)
  .handleType(ConsumerActionTypes.GET_CONSUMERS, (state) => ({
    ...state,
    isLoading: true,
  }))
  .handleType(ConsumerActionTypes.GET_CONSUMERS_SUCCESS, (state, action) => ({
    ...state,
    isLoading: false,
    items: action.payload.reduce<{ [key: string]: Consumer }>(
      (acc, consumer) => {
        return {
          ...acc,
          [consumer.id]: consumer,
        };
      },
      {}
    ),
  }))
  .handleType(ConsumerActionTypes.UPDATE_CONSUMER_FAIL, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleType(ConsumerActionTypes.UPDATE_CONSUMER, (state) => ({
    ...state,
    isLoading: true,
  }))
  .handleType(ConsumerActionTypes.UPDATE_CONSUMER_SUCCESS, (state, action) => ({
    ...state,
    isLoading: false,
    items: {
      ...state.items,
      [action.payload.id]: action.payload,
    },
  }));

export default consumerReducer;
