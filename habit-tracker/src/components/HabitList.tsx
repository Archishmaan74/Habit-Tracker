import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Box, Grid, Paper, Typography } from "@mui/material";

function HabitList() {
  const habitsList = useSelector((state: RootState) => state.habits.habits);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habitsList.map((habits) => (
        <Paper key={habits.id} elevation={2} sx={{ p: 2 }}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid>
              <Typography variant="h6">{habits.name}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}

export default HabitList;
