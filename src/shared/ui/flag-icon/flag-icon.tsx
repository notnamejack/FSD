import { useId } from 'react';

import type { SupportedLanguage } from '@/shared/lib';

import './flag-icon.scss';

type FlagIconProps = {
  code: SupportedLanguage;
  className?: string;
};

export const FlagIcon = ({ code, className }: FlagIconProps) => {
  const clipId = useId();
  const classNames = ['flag-icon', className].filter(Boolean).join(' ');

  if (code === 'ru') {
    return (
      <svg
        className={classNames}
        viewBox="0 0 24 16"
        width="24"
        height="16"
        aria-hidden
      >
        <rect width="24" height="16" fill="#fff" />
        <rect y="5.33" width="24" height="5.34" fill="#0039a6" />
        <rect y="10.67" width="24" height="5.33" fill="#d52b1e" />
      </svg>
    );
  }

  return (
    <svg
      className={classNames}
      viewBox="0 0 60 30"
      width="24"
      height="16"
      aria-hidden
    >
      <clipPath id={clipId}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
};
