CREATE TABLE `desired_procedures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`procedure_id` integer NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`treatment_timeline` text,
	`pain_level` integer,
	`diagnosis_status` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`procedure_id`) REFERENCES `procedures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medical_background` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`health_conditions` text,
	`allergerns` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`name` text NOT NULL,
	`dosage` text NOT NULL,
	`frequency` text NOT NULL,
	`start_date` integer,
	`end_date` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `procedures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `users` ADD `first_name` text;--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` text;--> statement-breakpoint
ALTER TABLE `users` ADD `country` text;--> statement-breakpoint
ALTER TABLE `users` ADD `phone_number` text;--> statement-breakpoint
ALTER TABLE `users` ADD `next_of_kin_name` text;--> statement-breakpoint
ALTER TABLE `users` ADD `next_of_kin_contact` text;--> statement-breakpoint
ALTER TABLE `users` ADD `preferred_contact_method` text;