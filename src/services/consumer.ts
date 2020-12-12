import { Consumer } from "../store/consumer/consumer.types";

export const getConsumers = async (): Promise<Consumer[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/consumers`);
  return ((await response.json()) as unknown) as Consumer[];
};

export const updateConsumer = async (
  id: number,
  data: Partial<Consumer>
): Promise<Consumer> => {
  const response = await fetch(`${process.env.REACT_APP_API}/consumers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return ((await response.json()) as unknown) as Consumer;
};
