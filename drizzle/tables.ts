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
