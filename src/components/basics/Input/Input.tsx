import React from 'react';

export default function Input({ value, onChange }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input value={value} onChange={onChange} />
  );
}
