
import { Roles } from '@/types/global'
import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}

export const getUserRole = async (): Promise<Roles | null> => {
  const { sessionClaims } = await auth()
  return (sessionClaims?.metadata.role as Roles) || null
}