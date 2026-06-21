// src/components/AzareusLogo.tsx
import React from 'react';

export const AzareusLogo: React.FC<{ size?: number }> = ({ size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Azareus"
      className="rounded"
    >
      <rect width="48" height="48" rx="8" fill="#0f172a" />
      <g transform="translate(8,8)" fill="none" stroke="#06b6d4" strokeWidth="2">
        <path d="M2 14 C6 6, 18 6, 22 14" strokeLinecap="round" />
        <path d="M2 22 C6 14, 18 14, 22 22" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default AzareusLogo;
