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
    <div style={{ background: '#0b1220', color: '#d1d5db', padding: 12, borderRadius: 6, fontFamily: 'monospace' }}>
      <div style={{ minHeight: 200, maxHeight: 320, overflow: 'auto', padding: 8 }}>
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 4 }}
          placeholder="enter command (help)"
        />
        <button type="submit">Run</button>
      </form>
    </div>
  );
};

export default TerminalShell;