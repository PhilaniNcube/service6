import { createClient } from '@libsql/client';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const nowMs = `CAST(strftime('%s','now') AS INTEGER) * 1000`;

// Idempotent inserts using INSERT ... SELECT ... WHERE NOT EXISTS
const statements = [
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'General surgery', 'Common abdominal and soft‑tissue operations such as hernia repair, gallbladder removal, and appendectomy.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'General surgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Orthopedic/Joint Replacement', 'Diagnosis and surgical treatment of bones and joints, including hip and knee replacements.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Orthopedic/Joint Replacement');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Ear/Nose/Throat Surgery', 'Surgical care for conditions of the ear, nose, throat, head, and neck (otolaryngology).', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Ear/Nose/Throat Surgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Urology', 'Surgical treatment of urinary tract and male reproductive system conditions.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Urology');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Cardiac Surgery', 'Operations on the heart and major vessels, such as bypass surgery and valve repair or replacement.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Cardiac Surgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Cosmetic/Plastic Surgery', 'Reconstructive and aesthetic procedures to restore or enhance form and function.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Cosmetic/Plastic Surgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Dental/Maxillofacial', 'Oral, dental, and facial surgery including extractions, implants, and corrective jaw procedures.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Dental/Maxillofacial');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Bariatric/Weight Loss', 'Metabolic and weight-loss procedures such as gastric sleeve and gastric bypass.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Bariatric/Weight Loss');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Oncology/Cancer Surgery', 'Surgical removal of tumors and cancerous tissue, often combined with staging and reconstruction.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Oncology/Cancer Surgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Spine Surgery', 'Procedures for spinal disorders including decompression, disc surgery, and spinal fusion.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Spine Surgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Neurosurgery', 'Surgical treatment of the brain, spine, and peripheral nerves.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Neurosurgery');`,
  `INSERT INTO \`procedures\` ("name", "description", "created_at", "updated_at")
     SELECT 'Paediatric surgery', 'Surgical care for infants, children, and adolescents across a wide range of conditions.', ${nowMs}, ${nowMs}
     WHERE NOT EXISTS (SELECT 1 FROM \`procedures\` WHERE "name" = 'Paediatric surgery');`,
];

(async () => {
  try {
    console.log('Seeding procedures...');
    for (const sql of statements) {
      await client.execute(sql);
    }
    console.log('Seeding completed.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
})();
