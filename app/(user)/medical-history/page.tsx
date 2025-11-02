import React, { Suspense } from 'react'
import MedicalHistoryComponent from '../_components/medical-history'

const MedicalHistory = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MedicalHistoryComponent />
      </Suspense>
    </div>
  )
}

export default MedicalHistory