import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState } from 'react';
import opt from "../../../../settings.json";
import axios from 'axios';
import Swal from 'sweetalert2';


function Calendar() {

    const [eventos, setEventos] = useState("");
    const [stationId, setStationId] = useState(JSON.parse(localStorage.getItem("station_id")));

    useEffect(() => {
        cargarEventos();
    }, [])

    const cargarEventos = async () => {
        const response = await axios.get(`${opt.protocol}://${opt.host}:${opt.port}/plants/station/${stationId}`, stationId);
        const data = response.data.data
        const eventosFormateados = data.map(evento => {

            const fechaOriginal = new Date(evento.seed_time);
            fechaOriginal.setHours(fechaOriginal.getHours() + 2);
            return ({
                title: "Siembra de  " + evento.name,
                start: evento.seed_time,
                end: fechaOriginal,
                color: "#12B76A",
                cita_id: evento._id,
                name: evento.name,
                amount: evento.amount,
            })
        })
        setEventos(eventosFormateados);
    };


    const handleEventClick = async (arg) => {
        
        Swal.fire({
            icon: 'success',
            title: "Siembra ",
            html: `
            <label for="station-name" class="swal2-label">Planta : ${arg.event.extendedProps.name}</label></br></br>
            <label for="station-name" class="swal2-label">Cantidad : ${arg.event.extendedProps.amount}</label>`,
            showCancelButton: false,
            confirmButtonColor: '#12B76A',
            // confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver',
        });
    }

    return (

        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            eventClick={handleEventClick}
            dayMaxEvents={2}
            unselectAuto='true'
            selectMirror='true'
            locale={esLocale}
            footerToolbar={{
                start: "",
                center: "",
                end: "dayGridMonth,timeGridWeek,listWeek"
            }}
            buttonText={{
                today: 'Hoy',
                month: 'Meses',
                week: 'Semanas',
                day: 'Dias',
                list: 'Listas'
            }}
            selectOverlap='true'
            events={eventos}
            height={'90vh'}
        />
    )
}

export default Calendar