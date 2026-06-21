// src/lib/apiKeyManagerFile.ts
import { promises as fs } from 'fs';
import path from 'path';

export interface ApiKey {
  key: string;
  createdAt: string;
  revoked: boolean;
  meta?: Record<string, any>;
}

function generateKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return (crypto as any).randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const STORAGE_PATH = path.join(process.cwd(), 'data', 'apiKeys.json');

async function ensureStorage() {
  try {
    await fs.mkdir(path.dirname(STORAGE_PATH), { recursive: true });
    await fs.access(STORAGE_PATH);
  } catch (err) {
    await fs.writeFile(STORAGE_PATH, JSON.stringify([]), 'utf-8');
  }
}

async function readAll(): Promise<ApiKey[]> {
  await ensureStorage();
  const raw = await fs.readFile(STORAGE_PATH, 'utf-8');
  try {
    return JSON.parse(raw) as ApiKey[];
  } catch (err) {
    return [];
  }
}

async function writeAll(keys: ApiKey[]) {
  await ensureStorage();
  await fs.writeFile(STORAGE_PATH, JSON.stringify(keys, null, 2), 'utf-8');
}

export class FileApiKeyManager {
  async createKey(meta?: Record<string, any>): Promise<ApiKey> {
    const keys = await readAll();
    const key = generateKey();
    const item: ApiKey = { key, createdAt: new Date().toISOString(), revoked: false, meta };
    keys.push(item);
    await writeAll(keys);
    return item;
  }

  async listKeys(): Promise<ApiKey[]> {
    return await readAll();
  }

  async revokeKey(key: string): Promise<boolean> {
    const keys = await readAll();
    const idx = keys.findIndex(k => k.key === key);
    if (idx === -1) return false;
    keys[idx].revoked = true;
    await writeAll(keys);
    return true;
  }

  async validateKey(key: string): Promise<boolean> {
    const keys = await readAll();
    const k = keys.find(x => x.key === key);
    return !!k && !k.revoked;
  }
}
