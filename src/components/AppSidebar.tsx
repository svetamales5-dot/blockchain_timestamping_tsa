// src/components/AppSidebar.tsx
import React from 'react';
import AzareusLogo from './AzareusLogo';

type AppSidebarProps = {
  chainLength: number;
  headHash?: string;
  forks: { id: string; fromHash: string; blocks: number }[];
  apiKeys: { key: string; revoked: boolean }[];
  onCreateKey?: () => void;
  onCreateFork?: (fromHash?: string) => void;
};

export const AppSidebar: React.FC<AppSidebarProps> = ({
  chainLength,
  headHash,
  forks,
  apiKeys,
  onCreateKey,
  onCreateFork,
}) => {
  return (
    <aside style={{ width: 300, padding: 16, borderRight: '1px solid #eee' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <AzareusLogo size={40} />
        <div>
          <strong>Azareus</strong>
          <div style={{ fontSize: 12, color: '#666' }}>Blockchain UI</div>
        </div>
      </div>

      <section style={{ marginTop: 20 }}>
        <h4>Chain</h4>
        <div>Blocks: {chainLength}</div>
        <div style={{ wordBreak: 'break-all', fontSize: 12, color: '#444' }}>
          Head: {headHash ?? '—'}
        </div>
        <button onClick={() => onCreateFork?.(headHash)} style={{ marginTop: 8 }}>
          Create fork from head
        </button>
      </section>

      <section style={{ marginTop: 20 }}>
        <h4>Forks</h4>
        {forks.length === 0 ? (
          <div style={{ fontSize: 12, color: '#888' }}>No forks</div>
        ) : (
          <ul>
            {forks.map(f => (
              <li key={f.id}>
                {f.id.slice(0, 8)} — blocks: {f.blocks}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <h4>API keys</h4>
        <div style={{ fontSize: 12 }}>
          {apiKeys.length} keys
          <div style={{ marginTop: 8 }}>
            <button onClick={onCreateKey}>Create key</button>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default AppSidebar;
