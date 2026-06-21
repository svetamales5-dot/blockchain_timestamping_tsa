// src/lib/blockchain.ts

export type BlockData = any;

export interface Block {
  index: number;
  timestamp: string;
  data: BlockData;
  previousHash: string;
  hash: string;
  nonce: number;
}

export interface Fork {
  id: string;
  fromHash: string;
  blocks: Block[];
  createdAt: string;
}

function simpleHash(input: string): string {
  // djb2-like hash to keep things deterministic and dependency-free
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (h >>> 0).toString(16);
}

export class Blockchain {
  private chain: Block[] = [];
  private forks: Map<string, Fork> = new Map();

  constructor() {
    this.createGenesis();
  }

  private createGenesis() {
    const genesis: Block = {
      index: 0,
      timestamp: new Date(0).toISOString(),
      data: { genesis: true },
      previousHash: '0',
      nonce: 0,
      hash: simpleHash('genesis-0')
    };
    this.chain = [genesis];
  }

  getHead(): Block {
    return this.chain[this.chain.length - 1];
  }

  getChain(): Block[] {
    return [...this.chain];
  }

  addBlock(data: BlockData): Block {
    const prev = this.getHead();
    const block: Block = {
      index: prev.index + 1,
      timestamp: new Date().toISOString(),
      data,
      previousHash: prev.hash,
      nonce: 0,
      hash: ''
    };
    block.hash = simpleHash(JSON.stringify(block));
    this.chain.push(block);
    return block;
  }

  listForks(): Fork[] {
    return Array.from(this.forks.values());
  }

  createFork(fromHash: string): Fork {
    const found = this.findBlock(fromHash);
    if (!found) throw new Error('fromHash not found in any chain');

    const forkId = simpleHash(fromHash + Date.now().toString());
    const fork: Fork = {
      id: forkId,
      fromHash,
      blocks: [],
      createdAt: new Date().toISOString()
    };
    this.forks.set(forkId, fork);
    return fork;
  }

  addBlockToFork(forkId: string, data: BlockData): Block {
    const fork = this.forks.get(forkId);
    if (!fork) throw new Error('fork not found');

    const base = fork.blocks.length > 0 ? fork.blocks[fork.blocks.length - 1] : this.findBlock(fork.fromHash)!;
    const block: Block = {
      index: base.index + 1,
      timestamp: new Date().toISOString(),
      data,
      previousHash: base.hash,
      nonce: 0,
      hash: ''
    };
    block.hash = simpleHash(JSON.stringify(block));
    fork.blocks.push(block);
    return block;
  }

  mergeFork(forkId: string): boolean {
    // Simple rule: adopt fork if it's longer than main chain
    const fork = this.forks.get(forkId);
    if (!fork) throw new Error('fork not found');

    const forkLength = fork.blocks.length;
    const mainRemaining = this.chain.length - this.findIndexByHash(fork.fromHash) - 1;

    if (forkLength <= mainRemaining) return false; // do not merge

    // Build new chain by slicing up to fromHash and appending fork blocks
    const sliceIndex = this.findIndexByHash(fork.fromHash);
    if (sliceIndex === -1) throw new Error('fromHash not found in main chain');

    const newChain = this.chain.slice(0, sliceIndex + 1).concat(fork.blocks);
    this.chain = newChain;

    // remove fork
    this.forks.delete(forkId);
    return true;
  }

  private findIndexByHash(hash: string): number {
    return this.chain.findIndex(b => b.hash === hash);
  }

  private findBlock(hash: string): Block | null {
    const main = this.chain.find(b => b.hash === hash);
    if (main) return main;
    for (const fork of this.forks.values()) {
      const f = fork.blocks.find(b => b.hash === hash);
      if (f) return f;
    }
    return null;
  }

  validateChain(chain: Block[] = this.chain): boolean {
    for (let i = 1; i < chain.length; i++) {
      const cur = chain[i];
      const prev = chain[i - 1];
      if (cur.previousHash !== prev.hash) return false;
      if (simpleHash(JSON.stringify({ ...cur, hash: '' })) !== cur.hash && simpleHash(JSON.stringify(cur)) !== cur.hash) {
        // allow both hash formats for demo
        return false;
      }
    }
    return true;
  }
}
