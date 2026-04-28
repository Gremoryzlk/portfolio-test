import React from 'react';

type Direction = 'left' | 'right' | 'down' | 'up-right';

interface Props {
  direction: Direction;
  size?: number;
  strokeWidth?: number;
}

const ROTATE: Partial<Record<Direction, string>> = {
  left:  'scaleX(-1)',
  down:  'rotate(90deg)',
};

/**
 * SVG-based arrow — pixel-identical on every browser and OS.
 * Unicode ← → ↓ render at inconsistent baselines depending on the system font.
 */
export default function ArrowIcon({ direction, size = 14, strokeWidth = 1.5 }: Props) {
  if (direction === 'up-right') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={ROTATE[direction] ? { transform: ROTATE[direction] } : undefined}
    >
      <path
        d="M2 7H12M12 7L7.5 3M12 7L7.5 11"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
