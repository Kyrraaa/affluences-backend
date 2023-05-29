import axios from "axios"
import { ReservationsData } from "../interfaces/reservation"
import { TimeTablesData } from "../interfaces/timetable"

async function check(currentDate: Date, resourceId: number) {
    const timetableResponse = await axios.get<TimeTablesData>('http://localhost:8080/timetables', {
        params: {
            date: currentDate,
            resourceId: resourceId
        }
    })
    
    if (!timetableResponse.data.open) {
        return {
            available: false
        }
    }
    
    const reservationResponse = await axios.get<ReservationsData>('http://localhost:8080/reservations', {
        params: {
            date: currentDate,
            resourceId: resourceId
        }
    })

    let available: boolean = true

    for (let index = 0; index < reservationResponse.data.reservations.length && available; index++) {
        const currentReservation = reservationResponse.data.reservations[index]

        // Make a valid instance of the date to make it comparable
        const startDate: Date = new Date(currentReservation.reservationStart)

        // Adjust the timezone bewteen the local computer time and the utc time
        const adjustedStartDate: Date = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000))

        // Make a valid instance of the date to make it comparable
        const endDate: Date = new Date(currentReservation.reservationEnd)

        // Adjust the timezone bewteen the local computer time and the utc time
        const adjustedEndDate: Date = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000))

        available = isAvailable(adjustedStartDate, adjustedEndDate, currentDate)
    }

    return {
        available: available
    }
}

function isAvailable(startDate: Date, endDate: Date, targetDate: Date): boolean {
    return targetDate < startDate || targetDate > endDate
}

export {
    check
}