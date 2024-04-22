import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";
import io from "socket.io-client";
import opt from "../../../../settings.json";

export default function LineChart({ height }) {
  const theme = useTheme();
  const [data, setData] = useState({
    humedad: [],
    temperatura: [],
    level_water: [],
    nivel_ph: [],
  });

  const [jwtoken, setJwtoken] = useState(localStorage.getItem("jwtToken"));

  useEffect(() => {
    const socket = io(`${opt.protocol}://${opt.hostws}:${opt.portws}`, {
      auth: {
        token: jwtoken,
      },
    }); 
    socket.on("IncomingData", (msg) => {
      console.log(msg);
      const { user, humedad, temperatura, level_water, nivel_ph } = JSON.parse(
        msg.message
      );
      setData((prevData) => ({
        ...prevData,
        humedad: [...prevData.humedad, humedad],
        temperatura: [...prevData.temperatura, temperatura],
        level_water: [...prevData.level_water, level_water],
        nivel_ph: [...prevData.nivel_ph, nivel_ph],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const option = {
    grid: { top: "10%", bottom: "10%", left: "5%", right: "5%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily,
      },
    },
    xAxis: {
      type: "category",
      data: data.humedad.map((_, index) => index),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    series: [
      {
        data: data.humedad,
        type: "line",
        name: "Humedad",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: data.temperatura,
        type: "line",
        name: "Temperatura",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: data.level_water,
        type: "line",
        name: "Nivel de Agua",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: data.nivel_ph,
        type: "line",
        name: "Nivel de pH",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
}
