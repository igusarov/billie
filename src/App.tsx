import React, { FC, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import selectors from "./store/selectors";
import * as consumerActions from "./store/consumer/consumer.asyncActions";

const App: FC = () => {
  const dispatch = useDispatch();

  const consumers = useSelector(selectors.consumer.getConsumers);

  useEffect(() => {
    dispatch(consumerActions.getConsumers());
  }, [dispatch]);

  return (
    <div>
      {consumers.map((consumer) => (
        <div key={consumer.id}>{consumer.name}</div>
      ))}
    </div>
  );
};

export default App;
