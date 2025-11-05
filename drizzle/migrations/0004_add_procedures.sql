-- Seed initial procedures with short descriptions
-- Timestamps are stored as milliseconds since epoch

INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'General surgery', 'Common abdominal and soft‑tissue operations such as hernia repair, gallbladder removal, and appendectomy.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'General surgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Orthopedic/Joint Replacement', 'Diagnosis and surgical treatment of bones and joints, including hip and knee replacements.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Orthopedic/Joint Replacement');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Ear/Nose/Throat Surgery', 'Surgical care for conditions of the ear, nose, throat, head, and neck (otolaryngology).', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Ear/Nose/Throat Surgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Urology', 'Surgical treatment of urinary tract and male reproductive system conditions.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Urology');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Cardiac Surgery', 'Operations on the heart and major vessels, such as bypass surgery and valve repair or replacement.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Cardiac Surgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Cosmetic/Plastic Surgery', 'Reconstructive and aesthetic procedures to restore or enhance form and function.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Cosmetic/Plastic Surgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Dental/Maxillofacial', 'Oral, dental, and facial surgery including extractions, implants, and corrective jaw procedures.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Dental/Maxillofacial');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Bariatric/Weight Loss', 'Metabolic and weight-loss procedures such as gastric sleeve and gastric bypass.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Bariatric/Weight Loss');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Oncology/Cancer Surgery', 'Surgical removal of tumors and cancerous tissue, often combined with staging and reconstruction.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Oncology/Cancer Surgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Spine Surgery', 'Procedures for spinal disorders including decompression, disc surgery, and spinal fusion.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Spine Surgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Neurosurgery', 'Surgical treatment of the brain, spine, and peripheral nerves.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Neurosurgery');
--> statement-breakpoint
INSERT INTO `procedures` ("name", "description", "created_at", "updated_at")
  SELECT 'Paediatric surgery', 'Surgical care for infants, children, and adolescents across a wide range of conditions.', CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
  WHERE NOT EXISTS (SELECT 1 FROM `procedures` WHERE "name" = 'Paediatric surgery');
