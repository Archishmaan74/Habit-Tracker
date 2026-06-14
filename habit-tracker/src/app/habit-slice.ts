import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabits: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>,
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>,
    ) => {
      const habitSearch = state.habits.find((h) => h.id === action.payload.id);

      if (habitSearch) {
        const index = habitSearch?.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habitSearch.completedDates.splice(index, 1);
        } else {
          habitSearch.completedDates.push(action.payload.date);
        }
      }
    },
  },
});

export const { addHabits, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;
