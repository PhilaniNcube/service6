import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const contact_methods = [
  "email",
  "phone",
  "sms",
  "whatsapp",
  "video call",
] as const;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerk_id: text("clerk_id").unique().notNull(),
  email: text("email").unique().notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  country: text("country"),
  phone_number: text("phone_number"),
  next_of_kin_name: text("next_of_kin_name"),
  next_of_kin_contact: text("next_of_kin_contact"),
  preferred_contact_method: text("preferred_contact_method").$type<
    (typeof contact_methods)[number]
  >(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type ContactMethod = (typeof contact_methods)[number];
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const procedures = sqliteTable("procedures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type Procedure = typeof procedures.$inferSelect;
export type NewProcedure = typeof procedures.$inferInsert;

// create an enum for when the user is considering a procedure
export const treatment_timelines = [
  "immediate",
  "within a month",
  "within 3 months",
  "within 6 months",
  "not sure",
  "researching",
] as const;

export const genders = ["male", "female", "other"] as const;

export type TreatmentTimeline = (typeof treatment_timelines)[number];

export const diagnosis_statuses = ["yes", "no", "awaiting"] as const;

export type DiagnosisStatus = (typeof diagnosis_statuses)[number];

export const desired_procedures = sqliteTable("desired_procedures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),
  procedure_id: integer("procedure_id")
    .references(() => procedures.id)
    .notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  treatment_timeline: text("treatment_timeline").$type<TreatmentTimeline>(),
  pain_level: integer("pain_level").$type<number>(), // scale of 1-10
  diagnosis_status: text("diagnosis_status").$type<DiagnosisStatus>(),
});

export type DesiredProcedure = typeof desired_procedures.$inferSelect;
export type NewDesiredProcedure = typeof desired_procedures.$inferInsert;

export const allergies = sqliteTable("allergies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),
  allergy: text("allergy").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type Allergy = typeof allergies.$inferSelect;
export type NewAllergy = typeof allergies.$inferInsert;

export const past_surgeries = sqliteTable("past_surgeries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type PastSurgery = typeof past_surgeries.$inferSelect;
export type NewPastSurgery = typeof past_surgeries.$inferInsert;

export const medical_background = sqliteTable("medical_background", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  notes: text("notes"),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type MedicalBackground = typeof medical_background.$inferSelect;
export type NewMedicalBackground = typeof medical_background.$inferInsert;

export const medications = sqliteTable("medications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  start_date: integer("start_date", { mode: "timestamp" }),
  end_date: integer("end_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type Medication = typeof medications.$inferSelect;
export type NewMedication = typeof medications.$inferInsert;

// create a new table for medication linked to medical_background were there is a one to many relationship 
export const medical_background_medications = sqliteTable("medical_background_medications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),  
  medical_background_id: integer("medical_background_id")
    .references(() => medical_background.id)
    .notNull(),
  medication_id: integer("medication_id")
    .references(() => medications.id)
    .notNull(),
});

export type MedicalBackgroundMedication = typeof medical_background_medications.$inferSelect;
export type NewMedicalBackgroundMedication = typeof medical_background_medications.$inferInsert;

// create a table for other medical conditions which should then be linked to medical_background
// this is supposed to be a list of the following conditions:
//     • Other Medical Conditions:
// [Checkbox Grid]
// [ ] High Blood Pressure    [ ] Diabetes
// [ ] Heart Disease          [ ] Lung Disease
// [ ] Kidney Disease         [ ] Liver Disease
// [ ] Autoimmune Disorder    [ ] Cancer History
// [ ] Smoking (Current)      [ ] Alcohol Use
// [ ] None of the above

export const medical_conditions = sqliteTable("medical_conditions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  medical_background_id: integer("medical_background_id")
    .references(() => medical_background.id)
    .notNull(),
  condition: text("condition").notNull(),
});

export type MedicalCondition = typeof medical_conditions.$inferSelect;
export type NewMedicalCondition = typeof medical_conditions.$inferInsert;

// create a speciality table
export const specialties = sqliteTable("specialties", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export type Specialty = typeof specialties.$inferSelect;
export type NewSpecialty = typeof specialties.$inferInsert;

// add a table for the the refering physicians
export const referring_physicians = sqliteTable("referring_physicians", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  clerk_id: text("clerk_id")
    .references(() => users.clerk_id)
    .notNull(),
  full_name: text("full_name").notNull(),
  qualification: text("qualification").notNull(),
  specialty: integer("specialty")
    .references(() => specialties.id)
    .notNull(),
  medical_practice: text("medical_practice").notNull(),
  medical_council_number: text("medical_council_number").notNull(),
  country_of_practice: text("country_of_practice").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  preferred_contact_method: text(
    "preferred_contact_method"
  ).$type<ContactMethod>(),
  alternative_contact_number: text("alternative_contact_number"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type ReferringPhysician = typeof referring_physicians.$inferSelect;
export type NewReferringPhysician = typeof referring_physicians.$inferInsert;

export const patient_consent = ["written", "verbal", "pending", "emergency"] as const;

export type PatientConsent = (typeof patient_consent)[number];

export const patients = sqliteTable("patients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  referring_physician_id: integer("referring_physician_id")
    .references(() => referring_physicians.id)
    .notNull(),
  full_name: text("full_name").notNull(),
  date_of_birth: integer("date_of_birth", { mode: "timestamp" }).notNull(),
  gender: text("gender").$type<(typeof genders)[number]>(),
  nationality: text("nationality").notNull(),
  current_location: text("current_location").notNull(),
  patient_consent:
    text("patient_consent").$type<(typeof patient_consent)[number]>(),
  patient_language: text("patient_language").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;

export const complexity = ["straightforward", "moderate", "complex", "highly complex"];

export type CaseComplexity = (typeof complexity)[number];

export const referral_reason = [
  "procedure not available locally",
  "specialist expertise required",
  "cost considerations",
  "reduced waiting times",
  "patient preference",
  "second opinion",
  "complicated revision surgery",
  "other",
] as const;

export const patient_cases = sqliteTable("patient_cases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  patient_id: integer("patient_id")
    .references(() => patients.id)
    .notNull(),
  diagnosis_name: text("diagnosis_name").notNull(),
  icd_code: text("icd_code"),
  secondary_diagnoses: text("secondary_diagnoses"),
  case_complexity: text("case_complexity").$type<(typeof complexity)[number]>(),
  referral_reason:
    text("referral_reason").$type<(typeof referral_reason)[number]>(),
  recommended_procedure: text("recommended_procedure"),
  procedure_id: integer("procedure_id")
    .references(() => procedures.id)
    .notNull(),
  preferred_timeline: text("preferred_timeline").$type<TreatmentTimeline>(),  
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export type PatientCase = typeof patient_cases.$inferSelect;
export type NewPatientCase = typeof patient_cases.$inferInsert;
