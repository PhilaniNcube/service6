import React, { Suspense } from 'react'
import { InvoiceDetails } from './invoice-details'
import { InvoiceActions } from './invoice-actions'
import { Skeleton } from '@/components/ui/skeleton'

const InvoicePage = async ({ params }: { params: Promise<{ invoice_id: string }> }) => {
  const { invoice_id } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoice #{invoice_id}</h1>
        <Suspense fallback={<InvoiceActionsSkeleton />}>
          <InvoiceActions params={params} />
        </Suspense>
      </div>
      <Suspense fallback={<InvoiceDetailsSkeleton />}>
        <InvoiceDetails params={params} />
      </Suspense>
    </div>
  )
}

function InvoiceActionsSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  )
}

function InvoiceDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
      <Skeleton className="h-[300px]" />
    </div>
  )
}

export default InvoicePage