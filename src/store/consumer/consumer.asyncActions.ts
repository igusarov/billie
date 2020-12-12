import { Dispatch } from "redux";
import * as consumerActions from "./consumer.actions";
import { Consumer } from "./consumer.types";
import * as consumerService from "../../services/consumer";

export const getConsumers = () => async (dispatch: Dispatch) => {
  dispatch(consumerActions.getConsumers());
  try {
    const consumers = await consumerService.getConsumers();
    dispatch(consumerActions.getConsumersSuccess(consumers));
  } catch (e) {
    dispatch(consumerActions.getConsumersFail(e));
  }
};

export const updateConsumer = (
  id: number,
  consumer: Partial<Consumer>
) => async (dispatch: Dispatch) => {
  dispatch(consumerActions.updateConsumer(id));
  try {
    const updatedConsumer = await consumerService.updateConsumer(id, consumer);
    dispatch(consumerActions.updateConsumerSuccess(updatedConsumer));
  } catch (e) {
    dispatch(consumerActions.updateConsumerFail(id, e));
  }
};
