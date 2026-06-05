import React from 'react'
import AppointmentDetails from '@/features/appointment/components/appointment-details'

const AppointmentPage = ({params}:{params:Promise<{id: string}>}) => {
  return (
    <div>
        <AppointmentDetails params={params} />
    </div>
  )
}

export default AppointmentPage