import React, { FC, useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import selectors from "./store/selectors";
import * as consumerActions from "./store/consumer/consumer.asyncActions";
import ConsumerList from "./components/consumer/consumer-list.component";
import { Consumer } from "./store/consumer/consumer.types";
import EditConsumerModal from "./components/edit-consumer-modal/edit-consumer-modal.component";
import SubmitConfirmationDialog from "./components/confirmation-dialog/submit-confirmation-dialog";

enum ModalType {
  None = "None",
  Edit = "Edit",
  Confirm = "Confirm",
}

const App: FC = () => {
  const dispatch = useDispatch();
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer>();
  const [customerDraft, setCustomerDraft] = useState<Consumer>();
  const [openedModal, setOpenedModal] = useState(ModalType.None);
  const consumers = useSelector(selectors.consumer.getConsumers);

  useEffect(() => {
    dispatch(consumerActions.getConsumers());
  }, [dispatch]);

  const handleClickItem = (item: Consumer) => {
    setSelectedConsumer(item);
    setOpenedModal(ModalType.Edit);
  };

  const handleSubmit = (consumer: Consumer) => {
    setCustomerDraft(consumer);
    setOpenedModal(ModalType.Confirm);
  };

  const handleSubmitAccept = () => {
    console.log("submit accepted", customerDraft);
    setOpenedModal(ModalType.None);
  };

  return (
    <Container maxWidth="sm">
      <ConsumerList onClickItem={handleClickItem} items={consumers} />
      <EditConsumerModal
        onDismiss={() => setOpenedModal(ModalType.None)}
        onSubmit={handleSubmit}
        isShown={openedModal === ModalType.Edit}
        consumer={selectedConsumer}
      />
      <SubmitConfirmationDialog
        isShown={openedModal === ModalType.Confirm}
        onDismiss={() => setOpenedModal(ModalType.Edit)}
        onAccept={handleSubmitAccept}
        consumer={selectedConsumer}
      />
    </Container>
  );
};

export default App;
