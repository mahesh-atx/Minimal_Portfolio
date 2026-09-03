export default function ColoredBio({ text }) {
  return (
    <span>
      {text.split(' ').map((word, i) => (
        <span key={i} className={(i * 7 + 3) % 5 === 0 ? 'text-[#7c3aed] dark:text-[#a78bfa]' : ''}>
          {word}{' '}
        </span>
      ))}
    </span>
  );
}
