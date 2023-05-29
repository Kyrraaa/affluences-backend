interface Timetable {
    opening: Date
    closing: Date
}

interface TimeTablesData {
    open: boolean
    timetables: Timetable[]
}

export {
    TimeTablesData
}