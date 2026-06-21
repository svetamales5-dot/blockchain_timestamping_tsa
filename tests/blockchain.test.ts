// tests/blockchain.test.ts
import { Blockchain } from '../src/lib/blockchain';

test('can add blocks and validate chain', () => {
  const bc = new Blockchain();
  const b1 = bc.addBlock({ tx: 'a->b:1' });
  const b2 = bc.addBlock({ tx: 'b->c:2' });
  expect(bc.getChain().length).toBe(3); // genesis + 2
  expect(bc.validateChain()).toBe(true);
  expect(b1.previousHash).toBe(bc.getChain()[1].previousHash);
});
