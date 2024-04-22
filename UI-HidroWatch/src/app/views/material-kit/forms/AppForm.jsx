import { Stack } from "@mui/material";
import { Box, styled, Icon, Button } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
import StepperForm from "./StepperForm";
import Calendar from "./Calendar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import opt from "../../../../settings.json";
import { Span } from "app/components/Typography";
import Swal from "sweetalert2";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function AppForm() {

  const [stationId, setStationId] = useState(JSON.parse(localStorage.getItem("station_id")));
  const [stationName, setStationName] = useState();
  const [stationDescription, setStationDescription] = useState();

  useEffect(() => {
    console.log(stationId);
    getStation();
  }, [])

  const getStation = async () => {
    try {
      const response = await axios.get(`${opt.protocol}://${opt.host}:${opt.port}/stations`, stationId);
      setStationName(response.data.data[0].name);
      setStationDescription(response.data.data[0].description);
    } catch (error) {
      console.log("Hubo un error al encontrar la estacion");
    }
  };

  const handleEdit = () => {
    Swal.fire({
      title: 'Editar Estación',
      html: `
      <label for="station-name" class="swal2-label">Nombre:</label>
      <input id="station-name" class="swal2-input" value="${stationName}" placeholder="Nombre de la estación">
      <label for="station-description" class="swal2-label">Detalle:</label>
      <input id="station-description" class="swal2-input" value="${stationDescription}" placeholder="Descripción de la estación">
      `,
      focusConfirm: false,
      showCancelButton: true, // Mostrar botón de cancelar
      cancelButtonText: 'Cancelar', // Texto del botón de cancelar
      preConfirm: async () => {
        const newName = Swal.getPopup().querySelector('#station-name').value;
        const newDescription = Swal.getPopup().querySelector('#station-description').value;
        setStationName(newName);
        setStationDescription(newDescription);
        try {
          const response = await axios.put(`${opt.protocol}://${opt.host}:${opt.port}/stations/${stationId}`, {
            name: newName,
            description: newDescription
          });
          Swal.fire({
            icon: "success",
            title: "Se ha modificado la estacion",
            showConfirmButton: false,
            timer: 1500
          })
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "No se modifico la estacion",
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    });
  };


  return (


    <Container>
      <Box className="breadcrumb"></Box>
      <Stack spacing={3}>
        <SimpleCard >
          <h1>{stationName}</h1>
          <h3>{stationDescription}</h3> <br />
          <Button color="primary" variant="contained" type="submit" onClick={handleEdit}>
            <Icon>edit</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Editar</Span>
          </Button>
        </SimpleCard>
      </Stack><br />

      <h1>Plantulas</h1>
      <Box className="breadcrumb"></Box>
      <Stack spacing={3}>
        <SimpleCard title="Registrar Plantulas">
          <SimpleForm />
        </SimpleCard>
      </Stack><br />


      <Box className="breadcrumb"></Box>
      <Stack spacing={3}>
        <SimpleCard title="Fecha de siembra"><br />
          <Calendar />
        </SimpleCard>
      </Stack>

    </Container>

  );
}
