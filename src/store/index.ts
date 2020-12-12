import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { ConsumerState } from "./consumer/consumer.types";
import consumerReducer from "./consumer/consumer.reducer";

export type AppState = Readonly<{
  consumer: ConsumerState;
}>;

const composedEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware));

const createRootReducer = () =>
  combineReducers<AppState>({
    consumer: consumerReducer,
  });

const store = createStore(createRootReducer(), composedEnhancers);

export default store;
