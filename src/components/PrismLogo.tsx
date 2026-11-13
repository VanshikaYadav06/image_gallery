import React from 'react';

interface PrismLogoProps {
  variant?: 'default' | 'light';
  className?: string;
}

export const PrismLogo: React.FC<PrismLogoProps> = ({ variant = 'default', className = '' }) => {
  const textColor =
    variant === 'light'
      ? 'text-[#F3EBDD]'
      : 'text-[#302B26] dark:text-[#F3EBDD]';

  const strokeColor =
    variant === 'light'
      ? '#F3EBDD'
      : 'currentColor';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${textColor} ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M14 3L25 22.5H3L14 3Z"
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M14 3L14 22.5"
          stroke={strokeColor}
          strokeWidth="1.1"
          strokeOpacity="0.55"
        />
        <path
          d="M14 13.5L21 22.5"
          stroke="#B98268"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M14 13.5L7.5 22.5"
          stroke="#929078"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-serif-editorial text-2xl font-semibold tracking-[0.18em] leading-none">
        PRISM
      </span>
    </span>
  );
};
