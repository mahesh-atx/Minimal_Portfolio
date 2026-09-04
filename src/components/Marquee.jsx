export default function Marquee({ children, reverse = false, duration = 30, pauseOnHover = false, className = '' }) {
  return (
    <div className={`overflow-hidden ${pauseOnHover ? 'marquee-hover-pause' : ''} ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
