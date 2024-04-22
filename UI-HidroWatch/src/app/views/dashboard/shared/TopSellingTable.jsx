import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Paragraph } from "app/components/Typography";
import { format } from "date-fns";
import opt from "../../../../settings.json";

// Componente TopSellingTable
const TopSellingTable = () => {
  const [plants, setPlants] = useState([]);
  const [stationId, setStationId] = useState(JSON.parse(localStorage.getItem("station_id")));
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${opt.protocol}://${opt.host}:${opt.port}/plants/station/${stationId}`);
        setPlants(response.data.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <Card elevation={1} sx={{ pt: "20px", mb: 3 }}>
      <Box overflow="auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} align="left" sx={{ color: "black" }}>Nombre</TableCell>
              <TableCell colSpan={2} align="left" sx={{ color: "black" }}>Siembra</TableCell>
              <TableCell colSpan={4} align="left" sx={{ color: "black" }}>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.id} hover>
                <TableCell colSpan={4} align="left">
                  <Paragraph sx={{ color: "black" }}>{plant.name}</Paragraph>
                </TableCell>
                <TableCell colSpan={2} align="left" sx={{ color: "black" }}>
  {format(new Date(plant.seed_time), "dd/MM/yyyy")}
</TableCell>

                <TableCell colSpan={4} align="left">
                  <Paragraph sx={{ color: "black" }}>{plant.amount}</Paragraph>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default TopSellingTable;
