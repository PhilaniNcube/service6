ALTER TABLE `patients` ADD COLUMN `user_id` integer NOT NULL REFERENCES `users`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION;

-- Dropping columns in SQLite typically requires table recreation. If you're using Drizzle Kit, 
-- regenerate migrations to fully drop these fields, or handle via a manual migration.
-- For now, the application schema no longer uses:
--   full_name, date_of_birth, gender, nationality, current_location, patient_language
