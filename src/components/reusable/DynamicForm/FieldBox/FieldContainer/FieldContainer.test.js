import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { FieldContainer } from "./FieldContainer";

jest.mock("./Input/Input", () => ({
  Input: ({
    changeHandler,
    clickHandler,
    userInformation,
    values,
    value,
    currentKey,
  }) => (
    <input
      data-testid={`input-${value}`}
      onChange={changeHandler}
      onClick={clickHandler}
      value={values[value]?.value || ""}
      aria-label={value}
    />
  ),
}));

jest.mock("./Label/Label", () => ({
  Label: ({ initialFormValues, values, value }) => (
    <label data-testid={`label-${value}`}>
      {initialFormValues[value]?.label || value}
    </label>
  ),
}));

describe("FieldContainer Component", () => {
  const clickHandler = jest.fn();
  const blurHandler = jest.fn();
  const changeHandler = jest.fn();
  const userInformation = {};
  const initialFormValues = { test: { label: "Test Label" } };
  const values = { test: { value: "test value", errorMessage: "" } };
  const value = "test";
  const currentKey = "test-key";

  test("renders Input and Label components with correct props", () => {
    render(
      <FieldContainer
        clickHandler={clickHandler}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        userInformation={userInformation}
        initialFormValues={initialFormValues}
        values={values}
        value={value}
        currentKey={currentKey}
      />
    );

    const input = screen.getByTestId(`input-${value}`);
    expect(input).toHaveValue(values[value].value);
    expect(input).toBeInTheDocument();

    const label = screen.getByTestId(`label-${value}`);
    expect(label).toHaveTextContent(initialFormValues[value]?.label || value);
    expect(label).toBeInTheDocument();
  });

  test("applies error class when errorMessage is not empty", () => {
    const errorValues = {
      ...values,
      [value]: { ...values[value], errorMessage: "Error" },
    };
    render(
      <FieldContainer
        clickHandler={clickHandler}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        userInformation={userInformation}
        initialFormValues={initialFormValues}
        values={errorValues}
        value={value}
        currentKey={currentKey}
      />
    );

    const container = screen.getByTestId("field-container");
    expect(container).toHaveClass("error");
  });

  test("calls clickHandler and blurHandler on click and blur events", () => {
    render(
      <FieldContainer
        clickHandler={clickHandler}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        userInformation={userInformation}
        initialFormValues={initialFormValues}
        values={values}
        value={value}
        currentKey={currentKey}
      />
    );

    const container = screen.getByTestId("field-container");
    fireEvent.click(container);
    expect(clickHandler).toHaveBeenCalledWith(value);

    fireEvent.blur(container);
    expect(blurHandler).toHaveBeenCalledWith(value);
  });
});
