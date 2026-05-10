import type { SVGProps } from "react";

export const BrushUnderline = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 14" fill="none" {...props}>
    <path
      d="M2 9 C 30 2, 70 14, 118 6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const SketchScribble = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" fill="none" {...props}>
    <path
      d="M10 100 C 40 40, 80 160, 120 80 S 180 140, 195 60"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="40" cy="40" r="3" fill="currentColor" />
    <circle cx="160" cy="170" r="2" fill="currentColor" />
  </svg>
);

export const PencilDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" {...props}>
    <path
      d="M15 80 L60 35 L75 50 L30 95 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M60 35 L75 20 L90 35 L75 50" stroke="currentColor" strokeWidth="2" />
    <path d="M22 88 L33 92" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const StarDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2 L14.5 9 L22 9.5 L16 14 L18 21.5 L12 17.5 L6 21.5 L8 14 L2 9.5 L9.5 9 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const InkDrop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2 C 8 10, 4 14, 4 18 a8 8 0 0 0 16 0 c 0 -4 -4 -8 -8 -16 z" />
  </svg>
);

export const SolanaLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="sol" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9945FF" />
        <stop offset="1" stopColor="#14F195" />
      </linearGradient>
    </defs>
    <path d="M5 7 L19 7 L21 5 L7 5 Z" fill="url(#sol)" />
    <path d="M5 13 L19 13 L21 11 L7 11 Z" fill="url(#sol)" />
    <path d="M5 19 L19 19 L21 17 L7 17 Z" fill="url(#sol)" />
  </svg>
);

export const ScrollArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 5 v14 M6 13 l6 6 l6 -6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Particles = ({ count = 18 }: { count?: number }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => {
      const size = 4 + (i % 5) * 2;
      const left = (i * 53) % 100;
      const dur = 8 + (i % 7);
      const delay = (i * 0.6) % 8;
      return (
        <span
          key={i}
          className="particle"
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            animationDuration: `${dur}s`,
            animationDelay: `-${delay}s`,
            opacity: 0.7,
          }}
        />
      );
    })}
  </div>
);