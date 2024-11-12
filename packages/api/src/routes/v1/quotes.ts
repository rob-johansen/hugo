import { Router } from 'express'
import type { PoolClient } from 'pg'
import type { Request, Response } from 'express'

import { endTxn, startTxn } from '@/data/db'
import { startQuote, updateQuote } from '@/data/queries/quote'
import { validateDrivers } from '@hugo/validations'
import type { NewDriver, NewQuote, Quote } from '@hugo/types'

export const router: Router = Router()

router.post('/', async (
  req: Request<never, never, { drivers: NewDriver[] }>,
  res: Response<NewQuote>
): Promise<void> => {
  const drivers = validateDrivers(req.body.drivers)
  const quote = await startQuote(drivers)
  res.status(201).send(quote)
})

router.put('/:quoteId', async (
  req: Request<{ quoteId: string }, never, Partial<Quote>>,
  res: Response<Partial<Quote>>
): Promise<void> => {
  let client: PoolClient | undefined
  let commit = false

  try {
    // TODO: Validate all the input

    client = await startTxn()
    const quote = await updateQuote(req.params.quoteId, req.body, client)
    commit = true
    res.status(200).send(quote)
  } finally {
    await endTxn(client, { commit })
  }
})
