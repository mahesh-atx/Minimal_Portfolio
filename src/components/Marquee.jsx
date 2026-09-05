/**
 * Lightweight CSS marquee. Keeping the loop on the compositor avoids a
 * JavaScript animation frame competing with page scrolling.
 */
export default function Marquee({ children, baseVelocity = 3, className = '' }) {
  const speed = Math.max(Math.abs(baseVelocity), 0.25);
  const duration = Math.max(18, 90 / speed);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: baseVelocity < 0 ? 'reverse' : 'normal',
        }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
