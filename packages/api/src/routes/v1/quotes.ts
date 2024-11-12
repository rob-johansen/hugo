import { Router } from 'express'
import type { Request, Response } from 'express'

import { startQuote } from '@/data/queries/quote'
import { validateDrivers } from '@hugo/validations'
import type { NewDriver, NewQuote } from '@hugo/types'

export const router: Router = Router()

router.post('/', async (
  req: Request<never, never, { drivers: NewDriver[] }>,
  res: Response<NewQuote>
): Promise<void> => {
  const drivers = validateDrivers(req.body.drivers)
  const quote = await startQuote(drivers)
  res.status(201).send(quote)
})

// TODO and WYLO: Implement the PUT request (accepts the quote id as a URL path parameter, and a quote object that may be full or partial)
