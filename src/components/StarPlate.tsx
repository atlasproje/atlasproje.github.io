import type { CSSProperties } from 'react';

// Geometry for the hero drawing — the eight-point star of the Atlas mark,
// constructed the way a draughtsman would: compass arcs, rule, dimensions.
const C = 320;
const R = 200;
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};
const pt = (r: number, deg: number) => polar(r, deg).map((v) => v.toFixed(2)).join(',');

const starPath = (outer: number) => {
  const inner = (outer * Math.cos(Math.PI / 4)) / Math.cos(Math.PI / 8);
  return (
    Array.from({ length: 16 }, (_, i) => `${i === 0 ? 'M' : 'L'}${pt(i % 2 ? inner : outer, i * 22.5)}`).join(' ') + ' Z'
  );
};

const square = (offset: number) =>
  Array.from({ length: 4 }, (_, i) => `${i === 0 ? 'M' : 'L'}${pt(R, offset + i * 90)}`).join(' ') + ' Z';

// Compass arc centred on (cx, cy), sweeping around an angle
const arc = (cx: number, cy: number, r: number, from: number, to: number) => {
  const p = (d: number) => [cx + r * Math.cos((d * Math.PI) / 180), cy + r * Math.sin((d * Math.PI) / 180)].map((v) => v.toFixed(2)).join(' ');
  return `M${p(from)} A${r} ${r} 0 0 1 ${p(to)}`;
};

const ticks = Array.from({ length: 24 }, (_, i) => {
  const [x1, y1] = polar(232, i * 15);
  const [x2, y2] = polar(i % 3 === 0 ? 248 : 240, i * 15);
  return { x1, y1, x2, y2 };
});

const COMPASS = 282.84; // |AB| / √2 — the arcs meet exactly at the star's top and bottom points

const i = (n: number) => ({ '--i': n }) as CSSProperties;

export const StarPlate = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 640 640" className={`drawing ${className}`} aria-hidden>
    <g filter="url(#rough)" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* construction */}
      <circle cx={C} cy={C} r={290} className="fade text-navy" stroke="currentColor" strokeOpacity=".28" strokeDasharray="2 7" style={i(0)} />
      <line x1={10} y1={C} x2={630} y2={C} className="ln text-navy" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8" pathLength={1} style={i(0)} />
      <line x1={C} y1={10} x2={C} y2={630} className="ln text-navy" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8" pathLength={1} style={i(1)} />
      <line x1={90} y1={90} x2={550} y2={550} className="fade text-navy" stroke="currentColor" strokeOpacity=".22" strokeDasharray="4 6" style={i(2)} />
      <line x1={550} y1={90} x2={90} y2={550} className="fade text-navy" stroke="currentColor" strokeOpacity=".22" strokeDasharray="4 6" style={i(2)} />

      <circle cx={C} cy={C} r={232} className="ln text-navy" stroke="currentColor" strokeOpacity=".55" strokeWidth="1" pathLength={1} style={i(2)} />
      {ticks.map((t, n) => (
        <line key={n} {...t} className="fade text-navy" stroke="currentColor" strokeOpacity=".45" strokeWidth=".8" style={i(4)} />
      ))}

      {/* compass arcs from A and B meeting at the top and bottom points */}
      <path d={arc(120, C, COMPASS, -58, -32)} className="ln text-oxblood" stroke="currentColor" strokeWidth="1" pathLength={1} style={i(5)} />
      <path d={arc(520, C, COMPASS, -148, -122)} className="ln text-oxblood" stroke="currentColor" strokeWidth="1" pathLength={1} style={i(6)} />
      <path d={arc(120, C, COMPASS, 32, 58)} className="ln text-oxblood" stroke="currentColor" strokeWidth="1" pathLength={1} style={i(7)} />
      <path d={arc(520, C, COMPASS, 122, 148)} className="ln text-oxblood" stroke="currentColor" strokeWidth="1" pathLength={1} style={i(8)} />

      {/* the two squares and the star they make */}
      <path d={square(0)} className="ln text-navy" stroke="currentColor" strokeOpacity=".5" strokeWidth=".9" pathLength={1} style={i(8)} />
      <path d={square(45)} className="ln text-navy" stroke="currentColor" strokeOpacity=".5" strokeWidth=".9" pathLength={1} style={i(9)} />
      <path d={starPath(R)} className="ln text-navy" stroke="currentColor" strokeWidth="1.8" pathLength={1} style={i(11)} />
      <path d={starPath(118)} className="fade text-gold" fill="currentColor" fillOpacity=".9" style={i(14)} />
      <path d={starPath(118)} className="ln text-navy" stroke="currentColor" strokeWidth="1.2" pathLength={1} style={i(13)} />
      <circle cx={C} cy={C} r={34} className="ln text-navy" stroke="currentColor" strokeWidth="1.2" pathLength={1} style={i(15)} />

      {/* angle arc */}
      <path d={arc(C, C, 76, 0, 45)} className="ln text-oxblood" stroke="currentColor" strokeWidth="1.1" pathLength={1} style={i(16)} />
      <line x1={C} y1={C} x2={polar(R, 45)[0]} y2={polar(R, 45)[1]} className="ln text-navy" stroke="currentColor" strokeWidth=".9" pathLength={1} style={i(16)} />

      {/* dimension line Ø 400 */}
      <line x1={120} y1={330} x2={120} y2={608} className="ln text-navy" stroke="currentColor" strokeOpacity=".5" strokeWidth=".7" pathLength={1} style={i(17)} />
      <line x1={520} y1={330} x2={520} y2={608} className="ln text-navy" stroke="currentColor" strokeOpacity=".5" strokeWidth=".7" pathLength={1} style={i(17)} />
      <line x1={120} y1={596} x2={520} y2={596} className="ln text-navy" stroke="currentColor" strokeWidth=".9" pathLength={1} style={i(18)} />
      <path d="M120 596 l10 -4 M120 596 l10 4 M520 596 l-10 -4 M520 596 l-10 4" className="fade text-navy" stroke="currentColor" strokeWidth=".9" style={i(19)} />
    </g>

    {/* annotations */}
    <g className="fade font-mono text-navy" fill="currentColor" style={i(18)}>
      <rect x={282} y={586} width={76} height={20} className="text-paper" fill="currentColor" />
      <text x={C} y={600} textAnchor="middle" fontSize="12" letterSpacing="1">Ø 400</text>
      <text x={C + 88} y={C - 14} fontSize="12" className="text-oxblood" fill="currentColor">45°</text>
      <text x={C + 60} y={C + 96} fontSize="11" opacity=".7" transform={`rotate(45 ${C + 60} ${C + 96})`}>r = 200</text>
    </g>
    <g className="fade text-navy" fill="currentColor" style={i(20)}>
      <text x={98} y={312} fontSize="20" fontStyle="italic" fontFamily="Fraunces, serif">A</text>
      <text x={530} y={312} fontSize="20" fontStyle="italic" fontFamily="Fraunces, serif">B</text>
      <text x={330} y={112} fontSize="20" fontStyle="italic" fontFamily="Fraunces, serif">C</text>
      <circle cx={120} cy={C} r={3} />
      <circle cx={520} cy={C} r={3} />
      <circle cx={C} cy={120} r={3} className="text-oxblood" fill="currentColor" />
    </g>
  </svg>
);
