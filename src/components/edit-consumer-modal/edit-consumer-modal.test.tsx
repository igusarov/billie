import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditConsumerModal from "./edit-consumer-modal";
import { Consumer } from "../../store/consumer/consumer.types";

const consumerMock: Consumer = {
  budget: 2000,
  budget_spent: 1000,
  date_of_first_purchase: "",
  id: 0,
  name: "mock name",
};

let onDismiss: any;
let onSubmit: any;

const typeInput = (val: string) => {
  const input = screen.getByTestId("budget-input").querySelector("input");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fireEvent.change(input, { target: { value: val } });
};

beforeEach(() => {
  onSubmit = jest.fn();
  onDismiss = jest.fn();
  render(
    <EditConsumerModal
      consumer={consumerMock}
      onDismiss={onDismiss}
      onSubmit={onSubmit}
    />
  );
});

it("should render title", () => {
  expect(screen.getByTestId("title")).toHaveTextContent(
    `Edit ${consumerMock.name}`
  );
});

it("should call submit handler on press submit button", () => {
  const button = screen.getByTestId("submit-button");
  typeInput("2500");
  fireEvent.click(button);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(onSubmit).toHaveBeenCalledWith({
    ...consumerMock,
    budget: 2500,
  });
});

it("should call dismiss handler on press cancel button", () => {
  const button = screen.getByTestId("cancel-button");
  fireEvent.click(button);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(onDismiss).toHaveBeenCalled();
});

describe("form validation", () => {
  it("should restrict empty field", () => {
    typeInput("");
    expect(screen.getByTestId("error-field")).toHaveTextContent(
      "Shouldn't be empty"
    );
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("should restrict budget less than budget spent", () => {
    typeInput("500");
    expect(screen.getByTestId("error-field")).toHaveTextContent(
      "The value must not be less than the budget spent"
    );
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("shouldn't display error when valid data", () => {
    typeInput("1000");
    expect(screen.queryByTestId("error-field")).toBeNull();
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });
});
