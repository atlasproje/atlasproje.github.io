import type { CSSProperties } from 'react';

// Hand-drawn line glyphs, one per discipline. They draw themselves in when revealed.
const i = (n: number) => ({ '--i': n }) as CSSProperties;
const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export type GlyphName = 'ai' | 'data' | 'mep' | 'training';

export const Glyph = ({ name, className = 'h-20 w-20' }: { name: GlyphName; className?: string }) => (
  <svg viewBox="0 0 96 96" className={`drawing ${className}`} aria-hidden>
    <g filter="url(#rough)" strokeWidth="1.4">
      {name === 'ai' && (
        <>
          <path d="M22 30 L48 18 L74 34 L62 70 L30 66 Z" {...line} className="ln text-navy" pathLength={1} style={i(0)} />
          <path d="M22 30 L62 70 M48 18 L30 66 M74 34 L30 66" {...line} className="ln text-navy" strokeOpacity=".4" pathLength={1} style={i(2)} />
          {[[22, 30], [48, 18], [74, 34], [62, 70], [30, 66]].map(([cx, cy], n) => (
            <circle key={n} cx={cx} cy={cy} r={4.5} className="fade text-paper" fill="currentColor" stroke="#233e65" strokeWidth="1.4" style={i(3 + n)} />
          ))}
          <path d="M48 40 l2.6 5.4 5.4 2.6 -5.4 2.6 -2.6 5.4 -2.6 -5.4 -5.4 -2.6 5.4 -2.6 Z" className="fade text-oxblood" fill="currentColor" style={i(8)} />
        </>
      )}
      {name === 'data' && (
        <>
          <path d="M16 14 V80 H84" {...line} className="ln text-navy" pathLength={1} style={i(0)} />
          <path d="M16 68 C 32 66, 38 50, 50 46 S 70 26, 82 20" {...line} className="ln text-oxblood" strokeWidth="1.6" pathLength={1} style={i(3)} />
          {[[26, 64], [34, 58], [42, 54], [48, 42], [58, 44], [64, 32], [74, 28], [80, 22], [38, 62], [56, 36]].map(([cx, cy], n) => (
            <circle key={n} cx={cx} cy={cy} r={2.2} className="fade text-navy" fill="currentColor" style={i(1 + n / 2)} />
          ))}
          <path d="M16 30 h-4 M16 46 h-4 M16 62 h-4 M36 80 v4 M56 80 v4 M76 80 v4" {...line} className="fade text-navy" style={i(2)} />
        </>
      )}
      {name === 'mep' && (
        <>
          {/* isometric pipe elbow with a valve */}
          <path d="M12 58 L40 42 L40 16" {...line} className="ln text-navy" pathLength={1} style={i(0)} />
          <path d="M20 66 L50 49 L50 16" {...line} className="ln text-navy" pathLength={1} style={i(1)} />
          <path d="M36 16 h18 M8 54 l8 14" {...line} className="ln text-navy" pathLength={1} style={i(2)} />
          <path d="M50 49 L84 68 M40 42 L76 62" {...line} className="ln text-navy" pathLength={1} style={i(3)} />
          <path d="M58 52 l10 12 l0 -12 l-10 12 Z" {...line} className="ln text-oxblood" pathLength={1} style={i(5)} />
          <path d="M63 58 v-12 M58 45 h10" {...line} className="ln text-oxblood" pathLength={1} style={i(6)} />
          <path d="M80 60 l6 10" {...line} className="ln text-navy" pathLength={1} style={i(4)} />
        </>
      )}
      {name === 'training' && (
        <>
          <path d="M48 32 C 38 26, 24 25, 12 28 V76 C 24 73, 38 74, 48 80 Z" {...line} className="ln text-navy" pathLength={1} style={i(0)} />
          <path d="M48 32 C 58 26, 72 25, 84 28 V76 C 72 73, 58 74, 48 80" {...line} className="ln text-navy" pathLength={1} style={i(1)} />
          <path d="M20 40 C 28 38, 34 39, 40 42 M20 50 C 28 48, 34 49, 40 52 M20 60 C 28 58, 34 59, 40 62" {...line} className="ln text-navy" strokeOpacity=".45" pathLength={1} style={i(3)} />
          <path d="M60 46 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 Z" className="fade text-gold" fill="currentColor" style={i(5)} />
          <path d="M48 20 V10 M36 16 l-4 -6 M60 16 l4 -6" {...line} className="ln text-oxblood" pathLength={1} style={i(6)} />
        </>
      )}
    </g>
  </svg>
);
