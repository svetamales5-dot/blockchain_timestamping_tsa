// src/components/TerminalShell.tsx
import React, { useState, useRef, useEffect } from 'react';

export type TerminalCommandHandler = (line: string) => Promise<string> | string;

export const TerminalShell: React.FC<{ onCommand: TerminalCommandHandler }> = ({ onCommand }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = async (cmd: string) => {
    setLines(prev => [...prev, `> ${cmd}`]);
    try {
      const res = await onCommand(cmd);
      setLines(prev => [...prev, String(res)]);
    } catch (err: any) {
      setLines(prev => [...prev, `Error: ${err?.message ?? String(err)}`]);
    }
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const t = input.trim();
    if (!t) return;
    void run(t);
    setInput('');
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-4 rounded font-mono">
      <div className="min-h-[200px] max-h-[320px] overflow-auto p-2 space-y-1">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">{l}</div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 mt-3">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
          placeholder="enter command (help)"
        />
        <button type="submit" className="px-3 py-2 bg-sky-600 text-white rounded">Run</button>
      </form>
    </div>
  );
};

export default TerminalShell;
