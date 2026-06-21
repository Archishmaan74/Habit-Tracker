import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk<
  Habit[],
  void,
  { rejectValue: string }
>("habits/fetchHabits", async (_, { rejectWithValue }) => {
  try {
    const fetchCall = new Promise<Habit[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Read",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Exercise",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 1000);
    });

    const habits = await fetchCall;
    return habits;
  } catch (error) {
    console.log("Error: ", error);
    return rejectWithValue("Failed to fetch habits");
  }
});

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabits: (
      state,
      action: PayloadAction<{
        name: string;
        frequency: "daily" | "weekly";
      }>,
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
        const index = habitSearch.completedDates.indexOf(action.payload.date);

        if (index > -1) {
          habitSearch.completedDates.splice(index, 1);
        } else {
          habitSearch.completedDates.push(action.payload.date);
        }
      }
    },

    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { addHabits, toggleHabit, removeHabit } = habitSlice.actions;

export default habitSlice.reducer;
