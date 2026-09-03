import { promises as fs } from "fs";
import path from "path";
import type { Lead, QuickLead } from "./schema";

export type StoredLead = (Lead | QuickLead) & {
  id: string;
  createdAt: string;
  ip: string;
  siteHost: string;
};

export type LeadStorageResult = {
  lead: StoredLead;
  durable: boolean;
  storage: "supabase" | "local_file" | "none";
};

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
let localWriteChain: Promise<void> = Promise.resolve();

async function ensureLocalStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

async function writeSupabase(stored: StoredLead) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: stored.id,
        created_at: stored.createdAt,
        source: stored.source,
        ip: stored.ip,
        site_host: stored.siteHost,
        payload: stored,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Supabase lead insert failed with ${res.status}: ${await res.text()}`);
    }
    return true;
  } finally {
    clearTimeout(timer);
  }
}

async function writeLocal(stored: StoredLead) {
  const task = localWriteChain.then(async () => {
    await ensureLocalStore();
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const all: StoredLead[] = JSON.parse(raw);
    all.push(stored);
    await fs.writeFile(LEADS_FILE, JSON.stringify(all, null, 2), "utf-8");
  });
  localWriteChain = task.catch(() => undefined);
  await task;
}

export async function saveLead(
  lead: Lead | QuickLead,
  meta: { ip: string; siteHost?: string }
): Promise<LeadStorageResult> {
  const stored: StoredLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ip: meta.ip,
    siteHost: meta.siteHost || "unknown",
  };

  if (await writeSupabase(stored)) {
    return { lead: stored, durable: true, storage: "supabase" };
  }

  // Local development can safely use the checked-out data file. Vercel and
  // other serverless filesystems are not durable, so never claim they are.
  if (!IS_SERVERLESS) {
    await writeLocal(stored);
    return { lead: stored, durable: true, storage: "local_file" };
  }

  return { lead: stored, durable: false, storage: "none" };
}
