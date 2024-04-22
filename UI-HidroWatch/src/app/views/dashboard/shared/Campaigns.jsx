import Box from "@mui/material/Box";
import { Small } from "app/components/Typography";
import { MatxProgressBar, SimpleCard } from "app/components";

export default function Campaigns() {
  return (
    <Box>
      <SimpleCard title="Historial">
        <Small color="text.primary">Hoy</Small>
        <MatxProgressBar value={75} customColor="#FF8300" text="Temperatura" coloredText="primary" />
        <MatxProgressBar value={45} color="secondary" text="Humedad" coloredText="primary" />
        <MatxProgressBar value={75} color="primary" text="Ph" coloredText="primary" />
        <MatxProgressBar value={75} customColor="#FF2512" text="Nivel de agua" coloredText="primary" />

        <Small color="text.primary" display="block" pt={4}>
          Ayer
        </Small>
        <MatxProgressBar value={75} customColor="#FF8300" text="Temperatura" coloredText="primary" />
        <MatxProgressBar value={45} color="secondary" text="Humedad" coloredText="primary" />
        <MatxProgressBar value={75} color="primary" text="Ph" coloredText="primary" />
        <MatxProgressBar value={75} customColor="#FF2512" text="Nivel de agua" coloredText="primary" />

        <Small color="text.primary" display="block" pt={4}>
          Semana pasada
        </Small>
        <MatxProgressBar value={75} customColor="#FF8300" text="Temperatura" coloredText="primary" />
        <MatxProgressBar value={45} color="secondary" text="Humedad" coloredText="primary" />
        <MatxProgressBar value={75} color="primary" text="Ph" coloredText="primary" />
        <MatxProgressBar value={75} customColor="#FF2512" text="Nivel de agua" coloredText="primary" />
      </SimpleCard>
    </Box>
  );
}
