import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import store from "../app/store";
import AddHabitForm from "./AddHabitForm";
import { render, screen } from "@testing-library/react";

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("Add Habit Form", () => {
  test("should render form add habit form", () => {
    renderWithProvider(<AddHabitForm />);
    expect(
      screen.getByRole("textbox", { name: /Habit Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Frequency/i }),
    ).toBeInTheDocument();
  });
});
