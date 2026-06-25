import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHabitList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),

  "& .habit-card": {
    padding: theme.spacing(2),
  },

  "& .habit-grid": {
    alignItems: "center",
  },

  "& .habit-frequency": {
    textTransform: "capitalize",
  },

  "& .button-container": {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },

  "& .progress-section": {
    marginTop: theme.spacing(2),
  },

  "& .progress-bar": {
    marginTop: theme.spacing(1),
  },
}));

export default StyledHabitList;
