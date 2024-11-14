import Link from 'next/link'
import type React from 'react'

import type { Quote } from '@hugo/types'

type Props = {
  params: Promise<{ quoteId: string }>
}

async function getQuote(quoteId: string): Promise<Quote> {
  const response = await fetch(`${process.env.API_HOST}/api/v1/quotes/${quoteId}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.json()
}

export default async function Price({ params }: Props): Promise<React.JSX.Element> {
  const quoteId = (await params).quoteId
  const quote = await getQuote(quoteId)

  return (
    <div className="mx-auto max-w-[360px]">
      <div className="bg-gradient-to-r flex flex-col from-purple items-center mx-auto p-[20px] rounded-lg to-[#af43ab] text-white w-fit">
        <span className="font-semibold text-[3rem]">
          ${quote.price.toLocaleString('en-US')}/yr
        </span>
        <span className="font-semibold mt-[20px] text-[1.5rem]">
          ${(Math.trunc(quote.price / 12)).toLocaleString('en-US')}/mo
        </span>
      </div>
      <p className="mt-[40px]">
        Thank you for requesting a quote, {quote.drivers[0].firstName}! We'd be happy to provide you with car insurance at the above rate.
      </p>
      <div className="flex justify-center mt-[60px]">
        <Link className="hover:text-purple/[0.75] text-purple" href="/">
          Get another quote
        </Link>
      </div>
    </div>
  )
}
