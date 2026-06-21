// tests/apiKeyManager.test.ts
import { promises as fs } from 'fs';
import path from 'path';
import { FileApiKeyManager } from '../src/lib/apiKeyManagerFile';

const STORAGE = path.join(process.cwd(), 'data', 'apiKeys.json');

beforeEach(async () => {
  await fs.writeFile(STORAGE, JSON.stringify([]), 'utf-8');
});

test('create and revoke key', async () => {
  const m = new FileApiKeyManager();
  const k = await m.createKey({ owner: 'tester' });
  const list = await m.listKeys();
  expect(list.find(x => x.key === k.key)).toBeTruthy();
  expect(await m.validateKey(k.key)).toBe(true);
  await m.revokeKey(k.key);
  expect(await m.validateKey(k.key)).toBe(false);
});
