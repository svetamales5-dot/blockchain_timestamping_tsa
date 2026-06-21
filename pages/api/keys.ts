// pages/api/keys.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { FileApiKeyManager } from '../../src/lib/apiKeyManagerFile';

const manager = new FileApiKeyManager();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const keys = await manager.listKeys();
      return res.status(200).json(keys);
    }

    if (req.method === 'POST') {
      // create new key. Body may contain meta
      const meta = req.body?.meta ?? {};
      const key = await manager.createKey(meta);
      return res.status(201).json(key);
    }

    if (req.method === 'DELETE') {
      const { key } = req.body || {};
      if (!key) return res.status(400).json({ error: 'key required' });
      const ok = await manager.revokeKey(key);
      return res.status(ok ? 200 : 404).json({ revoked: ok });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message ?? 'unknown' });
  }
}
