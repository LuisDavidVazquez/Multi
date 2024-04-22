import { Box, styled, useTheme } from "@mui/material";

import Breadcrumb from "app/components/Breadcrumb";
import SimpleCard from "app/components/SimpleCard";

import AreaChart from "./AreaChart";
import LineChart from "./LineT";
import DoughnutChart from "./Doughnut";
import ComparisonChart from "./ComparisonChart";

// STYLED COMPONENT
const Container = styled("div")(({ theme }) => ({
  margin: 30,
  [theme.breakpoints.down("sm")]: { margin: 16 },
  "& .breadcrumb": {
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: { marginBottom: 16 },
  },
}));

export default function AppEchart() {
  const theme = useTheme();

  return (
    <Container>
      <h1>TEMPERATURA ACTUAL</h1>

      <Box sx={{ py: "12px" }} />

        <LineChart
          height="550px"
          color={[theme.palette.primary, theme.palette.primary.light]}
        />



      <Box sx={{ py: "12px" }} />

      <Box sx={{ py: "12px" }} />
    </Container>
  );
}
