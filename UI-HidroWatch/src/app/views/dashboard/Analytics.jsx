import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import LineChart from "../charts/echarts/LineChart";
import io from "socket.io-client";
import Campaigns from "./shared/Campaigns";
import TopSellingTable from "./shared/TopSellingTable";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.primary,
}));

const AlertMessage = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
}));

const OptimalMessage = styled("span")(({ theme }) => ({
  color: theme.palette.success.main,
}));

export default function Analytics() {
  const { palette } = useTheme();

  const socket = io("https://ws-hw.onrender.com"); // Asegúrate de cambiar la URL por la de tu servidor WebSocket.
  const [latestData, setLatestData] = useState({
    humedad: null,
    temperatura: null,
    level_water: null,
    nivel_ph: null,
  });

  useEffect(() => {
    const socket = io("https://ws-hw.onrender.com"); // Cambia esto por la URL de tu servidor WebSocket
    socket.on("IncomingData", (msg) => {
      const { user, humedad, temperatura, level_water, nivel_ph } = JSON.parse(
        msg.message
      );
      setLatestData({
        humedad,
        temperatura,
        level_water,
        nivel_ph,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderAlertMessage = (value, minValue, maxValue) => {
    if (value < minValue || value > maxValue) {
      return <AlertMessage>¡Alerta!</AlertMessage>;
    }
    return <OptimalMessage>¡Óptimo!</OptimalMessage>;
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid alignItems={"center"} item lg={8} md={8} sm={12} xs={12}>
            <H4>Graficos en tiempo real</H4>
            <LineChart height="550px" />
            {/* Mostrando datos */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Metricas</Title>
              <H4>
                Humedad: {latestData.humedad ?? "Cargando..."}%{" "}
                {renderAlertMessage(latestData.humedad, 50, 70)}
              </H4>
              <H4>
                Temperatura: {latestData.temperatura ?? "Cargando..."}°C{" "}
                {renderAlertMessage(latestData.temperatura, 20, 35)}
              </H4>
              <H4>
                Nivel de Ph: {latestData.nivel_ph ?? "Cargando..."}{" "}
                {renderAlertMessage(latestData.nivel_ph, 5, 7)}
              </H4>
              <H4>
                Nivel de Agua: {latestData.level_water ?? "Cargando..."}{" "}
                {renderAlertMessage(latestData.level_water, 300, 599)}
              </H4>
            </Card>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <H4>PLANTULAS</H4>
              <TopSellingTable />
            </Card>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
