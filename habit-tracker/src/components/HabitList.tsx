import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Delete from "@mui/icons-material/Delete";
import { removeHabit, toggleHabit, type Habit } from "../app/habit-slice";
import StyledHabitList from "./HabitListStyles";

function HabitList() {
  const habitsList = useSelector((state: RootState) => state.habits.habits);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch<AppDispatch>();

  const getStreak = (habistList: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habistList.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <StyledHabitList>
      {habitsList.map((habit) => (
        <Paper key={habit.id} elevation={2} className="habit-card">
          <Grid container className="habit-grid">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6">{habit.name}</Typography>

              <Typography variant="body2" className="habit-frequency">
                {habit.frequency}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <div className="button-container">
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle />}
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => dispatch(removeHabit({ id: habit.id }))}
                >
                  Remove
                </Button>
              </div>
            </Grid>
          </Grid>

          <div className="progress-section">
            <Typography variant="body2">
              Current Streak: {getStreak(habit)} days
            </Typography>

            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
              className="progress-bar"
            />
          </div>
        </Paper>
      ))}
    </StyledHabitList>
  );
}

export default HabitList;
