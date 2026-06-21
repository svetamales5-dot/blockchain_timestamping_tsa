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
    <aside className="w-72 p-4 border-r bg-white">
      <div className="flex items-center gap-3">
        <AzareusLogo size={40} />
        <div>
          <div className="font-semibold">Azareus</div>
          <div className="text-xs text-gray-500">Blockchain UI</div>
        </div>
      </div>

      <section className="mt-6">
        <h4 className="font-medium text-sm">Chain</h4>
        <div className="text-sm">Blocks: {chainLength}</div>
        <div className="break-words text-xs text-gray-600">Head: {headHash ?? '—'}</div>
        <button onClick={() => onCreateFork?.(headHash)} className="mt-2 px-3 py-1 bg-sky-500 text-white rounded text-sm">
          Create fork from head
        </button>
      </section>

      <section className="mt-6">
        <h4 className="font-medium text-sm">Forks</h4>
        {forks.length === 0 ? (
          <div className="text-xs text-gray-400">No forks</div>
        ) : (
          <ul className="mt-2 space-y-1 text-xs">
            {forks.map(f => (
              <li key={f.id} className="truncate">
                {f.id.slice(0, 8)} — blocks: {f.blocks}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h4 className="font-medium text-sm">API keys</h4>
        <div className="text-xs text-gray-700">{apiKeys.length} keys</div>
        <div className="mt-2">
          <button onClick={onCreateKey} className="px-3 py-1 bg-emerald-500 text-white rounded text-sm">Create key</button>
        </div>
      </section>
    </aside>
  );
};

export default AppSidebar;
