interface IconProps {
  className?: string;
}

export function TwitchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 2 2.5 5.5v14H8V22l3-2.5h3.5L20 15V2H4Zm14.5 12-2.5 2.5h-4L9 19v-2.5H5.5v-12h13v9Z" />
      <path d="M15 6.5h1.75v5H15zm-4.25 0H12.5v5h-1.75z" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.48 2.87 8.28 6.84 9.62.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23 12s0-3.4-.43-5A2.78 2.78 0 0 0 20.6 5C18.88 4.5 12 4.5 12 4.5s-6.88 0-8.6.5A2.78 2.78 0 0 0 1.43 7 29 29 0 0 0 1 12a29 29 0 0 0 .43 5A2.78 2.78 0 0 0 3.4 19c1.72.5 8.6.5 8.6.5s6.88 0 8.6-.5a2.78 2.78 0 0 0 1.97-2 29 29 0 0 0 .43-5ZM9.75 15.5v-7L15.5 12Z" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.3 5.4A17.9 17.9 0 0 0 15.9 4c-.2.4-.4.9-.6 1.3a16.6 16.6 0 0 0-6.6 0c-.2-.4-.4-.9-.6-1.3-1.5.3-3 .8-4.4 1.4C1.1 9.6.4 13.6.7 17.6a18 18 0 0 0 5.4 2.7c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.9.1-.1.3-.2.4-.3a12.9 12.9 0 0 0 11 0l.4.3c-.5.4-1.1.7-1.7.9.3.7.7 1.3 1.1 1.9a18 18 0 0 0 5.4-2.7c.4-4.6-.8-8.6-3.8-12.2ZM8.7 15.2c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm6.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
    </svg>
  );
}
