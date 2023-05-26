import { Response, Request } from 'express'
import * as availableService from '../services/available.service'

async function check(req: Request, res: Response) {
    // Verifier que les informations sont OK
    // Appeler le service

    availableService.check("2023-05-26", 1337)
}

export {
    check
}