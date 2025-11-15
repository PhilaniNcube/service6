// Type definitions for server action states
// This file contains type exports for use with server actions

// State types for useActionState hook
export type UpdateUserState = {
  success: boolean;
  message: string;
  errors?: {
    first_name?: string[];
    last_name?: string[];
    phone_number?: string[];
    country?: string[];
    preferred_contact_method?: string[];
    next_of_kin_name?: string[];
    next_of_kin_contact?: string[];
  };
};

export type AddMedicalBackgroundState = {
  success: boolean;
  message: string;
  errors?: {
    notes?: string[];
  };
};

export type UpdateUserRoleState = {
  success: boolean;
  message: string;
};

export type AddReferringPhysicianState = {
  success: boolean;
  message: string;
  errors?: {
    user_id?: string[];
    clerk_id?: string[];
    full_name?: string[];
    qualification?: string[];
    specialty?: string[];
    medical_practice?: string[];
    medical_council_number?: string[];
    country_of_practice?: string[];
    phone?: string[];
    email?: string[];
    preferred_contact_method?: string[];
    alternative_contact_number?: string[];
  };
};

export type CreatePatientState = {
  success: boolean;
  message: string;
  errors?: {
    user_id?: string[];
    referring_physician_id?: string[];
    patient_consent?: string[];
  };
};

export type AddPatientToReferringPhysicianState = {
  success: boolean;
  message: string;
  errors?: {
    patient_id?: string[];
    referring_physician_id?: string[];
  };
};
