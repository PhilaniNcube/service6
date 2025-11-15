ALTER TABLE `patients` ADD `user_id` integer NOT NULL REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `full_name`;--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `date_of_birth`;--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `gender`;--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `nationality`;--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `current_location`;--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `patient_language`;