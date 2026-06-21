// src/lib/apiKeyManager.ts
export interface ApiKey {
  key: string;
  createdAt: string;
  revoked: boolean;
  meta?: Record<string, any>;
}

function generateKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // browser/node >= 16.9
    // @ts-ignore
    return (crypto as any).randomUUID();
  }
  // fallback
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export class ApiKeyManager {
  private keys: Map<string, ApiKey> = new Map();

  createKey(meta?: Record<string, any>): ApiKey {
    const key = generateKey();
    const item: ApiKey = { key, createdAt: new Date().toISOString(), revoked: false, meta };
    this.keys.set(key, item);
    return item;
  }

  listKeys(): ApiKey[] {
    return Array.from(this.keys.values());
  }

  revokeKey(key: string): boolean {
    const k = this.keys.get(key);
    if (!k) return false;
    k.revoked = true;
    this.keys.set(key, k);
    return true;
  }

  validateKey(key: string): boolean {
    const k = this.keys.get(key);
    if (!k) return false;
    return !k.revoked;
  }

  // For demo/testing only: wipe all keys
  clear(): void {
    this.keys.clear();
  }
}
