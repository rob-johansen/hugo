import cookieParser from 'cookie-parser'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'

import { getFunnyError } from '@/errors'
import { logger } from '@/logger'
import { RequestError } from '@hugo/types'
import { router as quotesV1 } from '@/routes/v1/quotes'

const PORT = process.env.PORT || 2222

const api = express()
api.disable('x-powered-by')
api.use(cookieParser())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use((_req: Request, res: Response, next: NextFunction): void => {
  res.set('Access-Control-Allow-Origin', process.env.HUGO_ORIGIN)
  res.set('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin')
  res.set('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, POST, PUT')
  res.set('Access-Control-Allow-Credentials', 'true')
  res.vary('Origin')
  next()
})

// API Routes
api.use('/api/v1/quotes', quotesV1)

// If no route above matches, naturally it's a 404.
api.use((_req: Request, res: Response): void => {
  res.status(404).send({ error: getFunnyError() })
})

// This handles all errors. Express requires four arguments for it to be considered an
// error handler. We disable the eslint check since we don't use the `_next` argument.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
api.use((err: RequestError, _req: Request, res: Response, _next: NextFunction): void => {
  // Although `err` is typed as `RequestError`, it might be another type thrown
  // by a third-party API, so we must check for the existence of `statusCode`.
  if (err.statusCode) {
    res.status(err.statusCode).send({ error: err.message })
    return
  }

  logger.error('500 error:', err)
  res.status(500).send({ error: getFunnyError() })
})

api.listen(PORT, (): void => {
  logger.info(`Hugo API server listening on ${PORT}`)
})
