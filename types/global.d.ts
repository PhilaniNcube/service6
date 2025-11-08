export {}

// Create a type for the roles
export type Roles = 'admin' | 'client' | 'doctor' | 'staff';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}