import React, { Suspense } from 'react'
import { InvoicesList } from '@/features/invoice/components/invoices-list'
import { InvoicesTableSkeleton } from '@/features/invoice/components/invoices-table-skeleton'

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