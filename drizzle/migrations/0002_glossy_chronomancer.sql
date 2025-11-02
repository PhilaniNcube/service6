CREATE TABLE `allergies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`allergy` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medical_conditions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`medical_background_id` integer NOT NULL,
	`condition` text NOT NULL,
	FOREIGN KEY (`medical_background_id`) REFERENCES `medical_background`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `past_surgeries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `medical_background` DROP COLUMN `health_conditions`;--> statement-breakpoint
ALTER TABLE `medical_background` DROP COLUMN `allergerns`;