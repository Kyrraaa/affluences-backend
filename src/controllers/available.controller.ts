import { Response, Request } from 'express'
import * as availableService from '../services/available.service'
import moment = require('moment')

async function check(req: Request, res: Response) {
    const dateString: string = req.query.date
    const resourceId: string = req.query.resourceId

    if (!dateString || !resourceId) {
        res.status(400).json({ "error": "request parameters 'date' and 'resourceId' are required" })
        return
    }

    if (!moment(dateString, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param date" })
        return
    }

    const dateObject = new Date(dateString)
    const timezoneOffset = dateObject.getTimezoneOffset()
    const adjustedDate = new Date(dateObject.getTime() - (timezoneOffset * 60000))
    
    const check = availableService.check(adjustedDate, parseInt(resourceId))

    check.then((jsonResponse: any) => {
        res.status(200).json(jsonResponse)
    }).catch((error: any) => {
        res.status(400).json({ "error": `the resourceId ${resourceId} doesn't exist` })
    })
}

export {
    check
}