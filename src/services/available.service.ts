import axios, { AxiosResponse } from "axios"
import TimeTable from "../interfaces/timetable"
import { log } from "console"
import Reservation from "../interfaces/reservation"


async function check(dateString: string, resourceId: number) {
    const timetableResponse = await axios.get<TimeTable>('http://localhost:8080/timetables', {
        params: {
            date: dateString,
            resourceId: resourceId
        }
    })
    if (!timetableResponse.data.open) {
        return {
            message: "Resource is closed"
        }
    }

    const reservationResponse = await axios.get<Reservation>('http://localhost:8080/reservations', {
        params: {
            date: dateString,
            resourceId: resourceId
        }
    })

    for (let index = 0; index < reservationResponse.data.reservations.length; index++) {
        const currentReservation = reservationResponse.data.reservations[index]
        // Je m'étais arrêtée là à la deadline (15h20)
        // const available: boolean = isDateBetween()
        
    }
}

function isDateBetween(startDateString: string, endDateString: string, targetDateString: string) {
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)
    const targetDate = new Date(targetDateString)

    return startDate <= targetDate && targetDate <= endDate
}

export {
    check
}