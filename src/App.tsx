import React, { FC, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import selectors from "./store/selectors";
import * as consumerActions from "./store/consumer/consumer.asyncActions";
import ConsumerList from "./components/consumer/consumer-list.component";
import { Consumer } from "./store/consumer/consumer.types";

const App: FC = () => {
  const dispatch = useDispatch();

  const consumers = useSelector(selectors.consumer.getConsumers);

  useEffect(() => {
    dispatch(consumerActions.getConsumers());
  }, [dispatch]);

  const handleClickItem = (item: Consumer) => {
    console.log(item);
  };

  return (
    <Container maxWidth="sm">
      <ConsumerList onClickItem={handleClickItem} items={consumers} />
    </Container>
  );
};

export default App;
