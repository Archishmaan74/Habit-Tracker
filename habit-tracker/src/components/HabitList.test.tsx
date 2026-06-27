import { Provider } from "react-redux";
import { beforeEach, describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import store from "../app/store";
import HabitList from "./HabitList";
import { addHabits, resetHabits } from "../app/habit-slice";

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("Habit List", () => {
  beforeEach(() => {
    store.dispatch(resetHabits());

    store.dispatch(
      addHabits({
        name: "Read Book",
        frequency: "daily",
      }),
    );
  });

  test("should render habit name and frequency", () => {
    renderWithProvider(<HabitList />);

    expect(screen.getByText("Read Book")).toBeInTheDocument();
    expect(screen.getByText("daily")).toBeInTheDocument();
  });

  test("should render action buttons", () => {
    renderWithProvider(<HabitList />);

    expect(
      screen.getByRole("button", { name: /Mark Complete/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Remove/i })).toBeInTheDocument();
  });

  test("should mark habit as completed", () => {
    renderWithProvider(<HabitList />);

    const completeButton = screen.getByRole("button", {
      name: /Mark Complete/i,
    });

    fireEvent.click(completeButton);

    expect(
      screen.getByRole("button", { name: /Completed/i }),
    ).toBeInTheDocument();
  });

  test("should remove habit", () => {
    renderWithProvider(<HabitList />);

    const removeButton = screen.getByRole("button", {
      name: /Remove/i,
    });

    fireEvent.click(removeButton);

    expect(screen.queryByText("Read Book")).not.toBeInTheDocument();
  });
});
