import React from 'react'
import { InvoiceDetails } from './invoice-details'

const InvoicePage = async ({ params }: { params: Promise<{ invoice_id: string }> }) => {
  return (
    <InvoiceDetails params={params} />
  )
}

export default InvoicePage