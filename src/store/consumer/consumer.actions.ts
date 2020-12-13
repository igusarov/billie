import { action } from "typesafe-actions";
import { Consumer, ConsumerActionTypes } from "./consumer.types";

export const getConsumers = () => action(ConsumerActionTypes.GET_CONSUMERS);
export const getConsumersSuccess = (consumers: Consumer[]) =>
  action(ConsumerActionTypes.GET_CONSUMERS_SUCCESS, consumers);
export const getConsumersFail = (e: Error) =>
  action(ConsumerActionTypes.GET_CONSUMERS_FAIL, e);
export const updateConsumer = (id: number) =>
  action(ConsumerActionTypes.UPDATE_CONSUMER, id);
export const updateConsumerSuccess = (consumer: Consumer) =>
  action(ConsumerActionTypes.UPDATE_CONSUMER_SUCCESS, consumer);
export const updateConsumerFail = (id: number, e: Error) =>
  action(ConsumerActionTypes.UPDATE_CONSUMER_FAIL, e);
