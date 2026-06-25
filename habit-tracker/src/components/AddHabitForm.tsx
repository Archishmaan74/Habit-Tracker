import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, type SubmitEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addHabits } from "../app/habit-slice";
import StyledAddHabitForm from "./AddHabitFormStyles";

function AddHabitForm() {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim()) {
      dispatch(
        addHabits({
          name,
          frequency,
        }),
      );
      setName("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <StyledAddHabitForm>
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Frequency:</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </StyledAddHabitForm>
    </form>
  );
}

export default AddHabitForm;
