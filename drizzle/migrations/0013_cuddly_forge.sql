CREATE TABLE `doctor_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`clerk_id` text NOT NULL,
	`status` text NOT NULL,
	`reviewed_by` text,
	`reviewed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clerk_id`) REFERENCES `users`(`clerk_id`) ON UPDATE no action ON DELETE no action
);
