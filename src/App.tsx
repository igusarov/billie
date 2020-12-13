import React, { FC, useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import selectors from "./store/selectors";
import * as consumerActions from "./store/consumer/consumer.async-actions";
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
  const [draftConsumer, setDraftConsumer] = useState<Consumer>();
  const [openedModal, setOpenedModal] = useState(ModalType.None);
  const consumers = useSelector(selectors.consumer.getConsumers);

  useEffect(() => {
    dispatch(consumerActions.getConsumers());
  }, [dispatch]);

  const handleClickItem = (item: Consumer) => {
    setDraftConsumer(item);
    setOpenedModal(ModalType.Edit);
  };

  const handleSubmit = (consumer: Consumer) => {
    setDraftConsumer(consumer);
    setOpenedModal(ModalType.Confirm);
  };

  const handleSubmitAccept = () => {
    if (!draftConsumer) {
      return;
    }
    const { id, budget } = draftConsumer;
    dispatch(
      consumerActions.updateConsumer(id, {
        budget,
      })
    );
    setOpenedModal(ModalType.None);
  };

  return (
    <Container maxWidth="sm">
      <ConsumerList onClickItem={handleClickItem} items={consumers} />
      {openedModal === ModalType.Edit && draftConsumer && (
        <EditConsumerModal
          onDismiss={() => setOpenedModal(ModalType.None)}
          onSubmit={handleSubmit}
          consumer={draftConsumer}
        />
      )}
      {openedModal === ModalType.Confirm && draftConsumer && (
        <SubmitConfirmationDialog
          onDismiss={() => setOpenedModal(ModalType.Edit)}
          onAccept={handleSubmitAccept}
          consumer={draftConsumer}
        />
      )}
    </Container>
  );
};

export default App;
