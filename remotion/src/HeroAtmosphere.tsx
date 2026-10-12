import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Departures direction — ink + single amber accent, no text.
// Pure atmosphere: meant to sit behind the live site's hero copy and
// canvas route-map at low opacity, so it carries no readable content.
const INK_BG = "#12161C";
const ACCENT = "#E8A33D";
const LINE = "#F5F1E8";

type Node = { x: number; y: number };

const HUB: Node = { x: 0.15, y: 0.66 };
const SPOKES: Node[] = [
  { x: 0.6, y: 0.2 }, // Madrid
  { x: 0.84, y: 0.72 }, // São Paulo
  { x: 0.33, y: 0.86 }, // Bogotá
];

function quadPoint(p0: Node, p1: Node, p2: Node, t: number): Node {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  return { x, y };
}

function controlPoint(a: Node, b: Node): Node {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 0.14 };
}

function Orb({
  cx,
  cy,
  r,
  color,
  opacity,
  cyclesOverLoop,
  phase,
  durationInFrames,
  frame,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity: number;
  cyclesOverLoop: number;
  phase: number;
  durationInFrames: number;
  frame: number;
}) {
  // Integer cycles over the full loop duration => frame 0 and frame N match exactly.
  const t = (frame / durationInFrames) * Math.PI * 2 * cyclesOverLoop + phase;
  const offsetY = Math.sin(t) * r * 0.12;
  const offsetX = Math.cos(t * 0.6) * r * 0.08;

  return (
    <div
      style={{
        position: "absolute",
        left: cx - r + offsetX,
        top: cy - r + offsetY,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle at 38% 35%, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${r * 0.2}px)`,
      }}
    />
  );
}

function DotGrid() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${LINE}14 1.5px, transparent 1.5px)`,
        backgroundSize: "54px 54px",
      }}
    />
  );
}

function RouteMap({ width, height, frame, durationInFrames }: { width: number; height: number; frame: number; durationInFrames: number }) {
  const hub = { x: HUB.x * width, y: HUB.y * height };
  const spokes = SPOKES.map((s) => ({ x: s.x * width, y: s.y * height }));

  // 3 spokes, each gets an equal slice of the loop so motion never jumps at the seam.
  const segment = durationInFrames / spokes.length;
  const spokeIndex = Math.floor(frame / segment) % spokes.length;
  const localT = (frame % segment) / segment;
  const eased = 1 - Math.pow(1 - localT, 3);

  const target = spokes[spokeIndex];
  const control = controlPoint(hub, target);
  const dot = quadPoint(hub, control, target, eased);

  // No hard line strokes here — the live site's canvas already draws the
  // crisp route lines. This layer only contributes soft glow and depth so
  // the two don't visually double up when composited.
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      <circle cx={hub.x} cy={hub.y} r={46} fill={ACCENT} fillOpacity={0.05} />

      {/* Traveling glow, echoing the live canvas's flight dot at lower fidelity */}
      <circle cx={dot.x} cy={dot.y} r={34} fill={ACCENT} fillOpacity={0.07} />
    </svg>
  );
}

export const HeroAtmosphere: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: INK_BG, overflow: "hidden" }}>
      <DotGrid />

      <Orb cx={width * 0.12} cy={height * 0.75} r={420} color={ACCENT} opacity={0.1} cyclesOverLoop={1} phase={0} durationInFrames={durationInFrames} frame={frame} />
      <Orb cx={width * 0.85} cy={height * 0.25} r={480} color={ACCENT} opacity={0.07} cyclesOverLoop={1} phase={Math.PI} durationInFrames={durationInFrames} frame={frame} />
      <Orb cx={width * 0.55} cy={height * 0.6} r={260} color={LINE} opacity={0.035} cyclesOverLoop={2} phase={Math.PI / 2} durationInFrames={durationInFrames} frame={frame} />

      <RouteMap width={width} height={height} frame={frame} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
