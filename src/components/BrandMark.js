import React from 'react';

// The dot catalog: 7 x 7 cells, filled cells draw a dress, the top-right cell is the approved shot.
// Rows from the design kit: i = filled, g = empty, a = selection blue.
const ROWS = ['gigggia', 'giiiiig', 'giiiiig', 'ggiiigg', 'giiiiig', 'giiiiig', 'iiiiiii'];

export default function BrandMark({ size = 22, condense = false, className = '' }) {
  const cells = [];
  ROWS.forEach((row, y) => {
    row.split('').forEach((kind, x) => {
      // Condensa: cells appear in a scattered order; the blue cell lands last.
      const order = kind === 'a' ? 49 : (x * 17 + y * 29) % 47;
      cells.push(
        <rect
          key={`${x}-${y}`}
          className={`bm-${kind}`}
          x={12.5 + x * 11}
          y={12.5 + y * 11}
          width="8.4"
          height="8.4"
          rx="2.4"
          style={condense ? { animationDelay: `${order * 38}ms` } : undefined}
        />,
      );
    });
  });
  return (
    <svg
      className={`brand-mark${condense ? ' brand-mark--condense' : ''} ${className}`}
      viewBox="6 6 88 88"
      width={size}
      height={size}
      aria-hidden="true">
      {cells}
    </svg>
  );
}
