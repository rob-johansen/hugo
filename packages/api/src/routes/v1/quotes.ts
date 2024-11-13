import { Router } from 'express'
import type { PoolClient } from 'pg'
import type { Request, Response } from 'express'

import { endTxn, startTxn } from '@/data/db'
import { getQuote, startQuote, updatePrice, updateQuote } from '@/data/queries/quote'
import { validateDrivers, validateId } from '@hugo/validations'
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
    const quoteId = validateId(req.params.quoteId)

    // TODO: Validate all the input

    client = await startTxn()
    const quote = await updateQuote(quoteId, req.body, client)
    commit = true
    res.status(200).send(quote)
  } finally {
    await endTxn(client, { commit })
  }
})

router.get('/:quoteId', async (
  req: Request<{ quoteId: string }>,
  res: Response<Partial<Quote>>
): Promise<void> => {
  const quoteId = validateId(req.params.quoteId)
  const quote = await getQuote(quoteId)
  res.status(200).send(quote)
})

router.post('/finalize', async (
  req: Request<never, never, { quoteId: string }>,
  res: Response<{ price: number }>
): Promise<void> => {
  let client: PoolClient | undefined
  let commit = false

  try {
    const quoteId = validateId(req.body.quoteId)

    client = await startTxn()

    const quote = await getQuote(quoteId, client)

    // TODO: validate all parts of the quote

    const price = 21_176

    if (quote) {
      commit = await updatePrice(price, quoteId, client)
      res.status(200).send({ price })
    } else {
      res.status(404).send()
    }
  } finally {
    await endTxn(client, { commit })
  }
})
