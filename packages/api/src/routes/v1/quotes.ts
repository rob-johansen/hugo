import { Router } from 'express'
import type { Request, Response } from 'express'

import { startQuote } from '@/data/queries/quote'
import { validateDrivers } from '@hugo/validations'
import type { Driver } from '@hugo/types'

export const router: Router = Router()

router.post('/', async (
  req: Request<never, never, { drivers: Omit<Driver, 'id' | 'quoteId'>[] }>,
  res: Response<{ id: string }>
): Promise<void> => {
  const drivers = validateDrivers(req.body.drivers)
  const id = await startQuote(drivers)
  res.status(201).send({ id })
})
