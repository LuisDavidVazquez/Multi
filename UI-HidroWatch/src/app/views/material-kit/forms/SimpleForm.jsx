import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios"; // Asegúrate de importar axios
import io from "socket.io-client";
import opt from "../../../../settings.json";
import Swal from "sweetalert2";

const TextField = styled(TextValidator)(({ theme }) => ({
  width: "100%",
  marginBottom: "16px",
  color: "#ffffff", // Cambia el color del texto según tu preferencia (por ejemplo, blanco)
}));

const SimpleForm = () => {

  const [stationId, setStationId] = useState(JSON.parse(localStorage.getItem("station_id")));

  const [state, setState] = useState({
    ubicacion: "",
    nombre: "",
    seccion: "",
  });

  const [data, setData] = useState({
    humedad: [],
    temperatura: [],
    level_water: [],
    nivel_ph: [],
  });

  useEffect(() => {
    const socket = io("https://ws-hw.onrender.com"); // Cambia esto por la URL de tu servidor WebSocket
    socket.on("IncomingData", (msg) => {
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



   const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post(`${opt.protocol}://${opt.host}:${opt.port}/plants/${stationId}`, {
        name: formData.get("nombre"),
        amount: formData.get("cantidad"),
        seed_time: formData.get("fecha de siembra"),
      });
      Swal.fire({
        icon: "success",
        title: "Se registro la planta correctamente",
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se registro la planta",
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="nombre"
              label="Nombre"
              errorMessages={["Este campo es obligatorio"]}
            />

            <TextField
              type="number"
              name="cantidad"
              label="Cantidad de plantulas"
              errorMessages={["Este campo es obligatorio"]}
            />

            <TextField
              type="date"
              name="fecha de siembra"
              label="Fecha de siembra"
              errorMessages={["Este campo es obligatorio"]}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: ' ' }}
            />

          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Registrar</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
