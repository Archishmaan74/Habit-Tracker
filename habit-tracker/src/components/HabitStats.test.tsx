import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import store from "../app/store";
import HabitStats from "./HabitStats";
import {
  addHabits,
  fetchHabits,
  resetHabits,
  setCompletedDates,
  setError,
  setLoading,
} from "../app/habit-slice";

vi.mock("../app/habit-slice", async () => {
  const actual =
    await vi.importActual<typeof import("../app/habit-slice")>(
      "../app/habit-slice",
    );

  return {
    ...actual,
    fetchHabits: vi.fn(() => () => Promise.resolve()),
  };
});

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("Habit Stats", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    store.dispatch(resetHabits());

    store.dispatch(
      addHabits({
        name: "Read Book",
        frequency: "daily",
      }),
    );

    store.dispatch(
      addHabits({
        name: "Exercise",
        frequency: "daily",
      }),
    );
  });

  test("should dispatch fetch habits on mount", () => {
    renderWithProvider(<HabitStats />);

    expect(fetchHabits).toHaveBeenCalledTimes(1);
  });

  test("should render statistics heading", () => {
    renderWithProvider(<HabitStats />);

    expect(screen.getByText(/Habit Statistics/i)).toBeInTheDocument();
  });

  test("should display total habits", () => {
    renderWithProvider(<HabitStats />);

    expect(screen.getByText(/Total Habits: 2/i)).toBeInTheDocument();
  });

  test("should display completed today count as 0", () => {
    renderWithProvider(<HabitStats />);

    expect(screen.getByText(/Completed Today: 0/i)).toBeInTheDocument();
  });

  test("should display completed today count as 1", () => {
    const today = new Date().toISOString().split("T")[0];

    const habitId = store.getState().habits.habits[0].id;

    store.dispatch(
      setCompletedDates({
        id: habitId,
        completedDates: [today],
      }),
    );

    renderWithProvider(<HabitStats />);

    expect(screen.getByText(/Completed Today: 1/i)).toBeInTheDocument();
  });

  test("should display longest streak as 0", () => {
    renderWithProvider(<HabitStats />);

    expect(screen.getByText(/Longest Streak: 0 days/i)).toBeInTheDocument();
  });

  test("should display longest streak as 2", () => {
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const habitId = store.getState().habits.habits[0].id;

    store.dispatch(
      setCompletedDates({
        id: habitId,
        completedDates: [
          today.toISOString().split("T")[0],
          yesterday.toISOString().split("T")[0],
        ],
      }),
    );

    renderWithProvider(<HabitStats />);

    expect(screen.getByText(/Longest Streak: 2 days/i)).toBeInTheDocument();
  });

  test("should render loading indicator", () => {
    store.dispatch(setLoading(true));

    renderWithProvider(<HabitStats />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("should render error message", () => {
    store.dispatch(setLoading(false));
    store.dispatch(setError("Failed to fetch habits"));

    renderWithProvider(<HabitStats />);

    expect(screen.getByText("Failed to fetch habits")).toBeInTheDocument();
  });
});
