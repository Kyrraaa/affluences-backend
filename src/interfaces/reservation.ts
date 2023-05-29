interface Reservation {
    reservationStart: Date
    reservationEnd: Date
}

interface ReservationsData {
    reservations: Reservation[]
}

export {
    ReservationsData
}