CREATE TABLE `patient_cases` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`diagnosis_name` text NOT NULL,
	`icd_code` text,
	`secondary_diagnoses` text,
	`case_complexity` text,
	`referral_reason` text,
	`recommended_procedure` text,
	`procedure_id` integer NOT NULL,
	`preferred_timeline` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`procedure_id`) REFERENCES `procedures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`referring_physician_id` integer NOT NULL,
	`full_name` text NOT NULL,
	`date_of_birth` integer NOT NULL,
	`gender` text,
	`nationality` text NOT NULL,
	`current_location` text NOT NULL,
	`patient_consent` text,
	`patient_language` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`referring_physician_id`) REFERENCES `referring_physicians`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `referring_physicians` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`full_name` text NOT NULL,
	`qualification` text NOT NULL,
	`specialty` integer NOT NULL,
	`medical_practice` text NOT NULL,
	`medical_council_number` text NOT NULL,
	`country_of_practice` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`preferred_contact_method` text,
	`alternative_contact_number` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specialty`) REFERENCES `specialties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `specialties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
