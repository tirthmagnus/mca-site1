import { promises as fs } from "fs";
import path from "path";
import type { Lead } from "./schema";

// ---------------------------------------------------------------------
// LEAD STORAGE
// ---------------------------------------------------------------------
// This file is the ONE place leads get persisted. Right now it appends
// to a local JSON file so the site works out of the box with zero setup.
//
// Before this goes live for real, swap the body of `saveLead` for a
// real database (Postgres via Prisma/Drizzle is what I'd recommend,
// see README). Every other part of the app calls `saveLead` and
// `pushLeadToCRM`, neither of them, so the swap is contained to this
// one file.
// ---------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export type StoredLead = Lead & {
  id: string;
  createdAt: string;
  ip: string;
};

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function saveLead(
  lead: Lead,
  meta: { ip: string }
): Promise<StoredLead> {
  await ensureStore();

  const stored: StoredLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ip: meta.ip,
  };

  const raw = await fs.readFile(LEADS_FILE, "utf-8");
  const all: StoredLead[] = JSON.parse(raw);
  all.push(stored);
  await fs.writeFile(LEADS_FILE, JSON.stringify(all, null, 2), "utf-8");

  return stored;
}
