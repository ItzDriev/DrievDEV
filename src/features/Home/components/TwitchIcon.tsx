interface IconProps {
  className?: string;
}
export function TwitchWordmarkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 65 16" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M5 5V0H0v14l2 2h7v-5H5v-1h4V5H5zm17 0v6h-1V5h-5v6h-1V5h-5v9l2 2h15V5h-5zm11 0h-5v11h5V5zm0-5h-5v4h5V0zm13 5-2 2v7l2 2h7v-5h-4v-1h4V5h-7zm17 0h-4V0h-5v16h5v-6h1v6h5V7l-2-2zM39 5V0h-5v14l2 2h7v-5h-4v-1h4V5h-4z"
      />
    </svg>
  );
}
