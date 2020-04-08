import React from 'react';

export default function Repository({ title, children }) {
  return (
    <header>
      <h1>{title}</h1>

      {children}
    </header>
  )
}