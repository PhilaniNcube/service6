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
