import React, { Suspense } from 'react'
import { InvoicesList } from './_components/invoices-list'
import { InvoicesTableSkeleton } from './_components/invoices-table-skeleton'

const InvoicesPage = async () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesList />
      </Suspense>
    </div>
  )
}

export default InvoicesPage