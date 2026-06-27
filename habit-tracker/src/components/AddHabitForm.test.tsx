import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import store from "../app/store";
import AddHabitForm from "./AddHabitForm";
import { fireEvent, render, screen } from "@testing-library/react";

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

  test("should show menu items of click of frequency", () => {
    renderWithProvider(<AddHabitForm />);
    const combobox = screen.getByRole("combobox", { name: /Frequency/i });
    fireEvent.mouseDown(combobox);
    expect(screen.getByRole("option", { name: "Daily" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Weekly" })).toBeInTheDocument();
  });

  test("should show selected frequency after selection in the frequency field", () => {
    renderWithProvider(<AddHabitForm />);
    const combobox = screen.getByRole("combobox", { name: /Frequency/i });
    fireEvent.mouseDown(combobox);
    const clikedWeekly = screen.getByRole("option", { name: /Weekly/i });
    fireEvent.click(clikedWeekly);
    expect(combobox).toHaveTextContent("Weekly");
  });
});
