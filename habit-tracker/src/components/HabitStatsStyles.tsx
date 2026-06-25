import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHabitStats = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),

  "& .stats-container": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

export default StyledHabitStats;
