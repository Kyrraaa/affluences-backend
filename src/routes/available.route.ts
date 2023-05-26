import { Router, Request, Response } from 'express';
import * as availableController from '../controllers/available.controller'

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    availableController.check(req, res)
})

export default router