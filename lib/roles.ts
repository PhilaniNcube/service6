import { Roles } from '@/types/global'
import { auth } from '@clerk/nextjs/server'
import { cacheTag } from 'next/cache';

export const checkRole = async (role: Roles) => {
  "use cache: private";
  cacheTag("check-role");
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}

export const getUserRole = async (): Promise<Roles | null> => {
  "use cache: private";
  cacheTag("role");
  const { sessionClaims } = await auth()
  return (sessionClaims?.metadata.role as Roles) || null
}