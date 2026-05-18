import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";

const BRAND = {
  orange: "#FF6B35",
  magenta: "#E91E8C",
  purple: "#9C27B0",
  cyan: "#00B4D8",
  blue: "#0077FF",
  navy: "#060D26",
  navyMid: "#0B1130",
};

function easeOut(frame: number, start: number, dur: number): number {
  return interpolate(frame, [start, start + dur], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function Orb({
  cx,
  cy,
  r,
  color,
  floatAmp,
  floatSpeed,
  delay,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  floatAmp: number;
  floatSpeed: number;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = ((frame + delay * fps) / fps) * floatSpeed;
  const offsetY = Math.sin(t) * floatAmp;
  const offsetX = Math.cos(t * 0.7) * floatAmp * 0.4;

  return (
    <div
      style={{
        position: "absolute",
        left: cx - r,
        top: cy - r + offsetY,
        transform: `translateX(${offsetX}px)`,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}30 0%, transparent 70%)`,
        filter: `blur(${r * 0.15}px)`,
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
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}

function GradientLine({
  y,
  startFrame,
  color1,
  color2,
}: {
  y: number;
  startFrame: number;
  color1: string;
  color2: string;
}) {
  const frame = useCurrentFrame();
  const progress = easeOut(frame, startFrame, 40);
  const width = interpolate(progress, [0, 1], [0, 1920]);

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 0,
        width,
        height: 1.5,
        background: `linear-gradient(90deg, ${color1}, ${color2}, transparent)`,
        opacity: 0.5,
      }}
    />
  );
}

function WordMark() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = easeOut(frame, 0, 30);
  const alphaIn = easeOut(frame, 10, 35);
  const strategyIn = easeOut(frame, 22, 35);
  const groupIn = easeOut(frame, 34, 35);
  const taglineIn = easeOut(frame, 55, 30);

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: "50%",
        transform: `translateY(-50%)`,
        opacity: containerIn,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* ALPHA */}
        <div
          style={{
            display: "flex",
            gap: 0,
            overflow: "hidden",
          }}
        >
          {["A", "L", "P", "H", "A"].map((char, i) => {
            const charIn = easeOut(frame, 10 + i * 4, 25);
            return (
              <span
                key={i}
                style={{
                  fontSize: 148,
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "sans-serif",
                  letterSpacing: -4,
                  color: "#fff",
                  opacity: charIn,
                  transform: `translateY(${interpolate(charIn, [0, 1], [40, 0])}px)`,
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* STRATEGY */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: -12,
            overflow: "hidden",
          }}
        >
          {["S", "T", "R", "A", "T", "E", "G", "Y"].map((char, i) => {
            const charIn = easeOut(frame, 22 + i * 3, 22);
            return (
              <span
                key={i}
                style={{
                  fontSize: 148,
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "sans-serif",
                  letterSpacing: -4,
                  background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.magenta}, ${BRAND.cyan})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: charIn,
                  transform: `translateY(${interpolate(charIn, [0, 1], [40, 0])}px)`,
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* GROUP */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: -12,
            overflow: "hidden",
          }}
        >
          {["G", "R", "O", "U", "P"].map((char, i) => {
            const charIn = easeOut(frame, 34 + i * 3, 22);
            return (
              <span
                key={i}
                style={{
                  fontSize: 148,
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "sans-serif",
                  letterSpacing: -4,
                  color: "rgba(255,255,255,0.25)",
                  opacity: charIn,
                  transform: `translateY(${interpolate(charIn, [0, 1], [40, 0])}px)`,
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            opacity: taglineIn,
            transform: `translateX(${interpolate(taglineIn, [0, 1], [-20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              fontFamily: "sans-serif",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Business Strategy · Digital Marketing · Miami, USA
          </span>
        </div>
      </div>
    </div>
  );
}

function ServicePills() {
  const frame = useCurrentFrame();
  const services = [
    { label: "Business Strategy", color: BRAND.orange },
    { label: "Digital Marketing", color: BRAND.magenta },
    { label: "Web Design", color: BRAND.blue },
    { label: "Automation", color: BRAND.cyan },
    { label: "Business Training", color: BRAND.purple },
    { label: "Language Training", color: BRAND.orange },
  ];

  return (
    <div
      style={{
        position: "absolute",
        right: 120,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "flex-end",
      }}
    >
      {services.map((s, i) => {
        const appear = easeOut(frame, 45 + i * 12, 25);
        return (
          <div
            key={s.label}
            style={{
              opacity: appear,
              transform: `translateX(${interpolate(appear, [0, 1], [60, 0])}px)`,
              background: `linear-gradient(135deg, ${s.color}15, ${s.color}08)`,
              border: `1.5px solid ${s.color}40`,
              borderRadius: 100,
              padding: "12px 28px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: s.color,
                boxShadow: `0 0 12px ${s.color}`,
              }}
            />
            <span
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 700,
                fontFamily: "sans-serif",
                letterSpacing: 0.5,
              }}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BottomBar() {
  const frame = useCurrentFrame();
  const appear = easeOut(frame, 110, 30);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 120,
        right: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: appear,
      }}
    >
      <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
      <span
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 18,
          fontFamily: "sans-serif",
          letterSpacing: 4,
          padding: "0 32px",
          textTransform: "uppercase",
        }}
      >
        alphastrategygroup.com
      </span>
      <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

export const BrandLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in the whole scene
  const sceneIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle loop pulse on bg
  const t = frame / 30;
  const pulseScale = 1 + Math.sin(t * 0.3) * 0.03;

  return (
    <AbsoluteFill
      style={{
        background: BRAND.navy,
        opacity: sceneIn,
        overflow: "hidden",
      }}
    >
      <DotGrid />

      {/* Animated background orbs */}
      <Orb cx={200} cy={540} r={500} color={BRAND.magenta} floatAmp={30} floatSpeed={0.5} delay={0} />
      <Orb cx={1700} cy={540} r={580} color={BRAND.cyan} floatAmp={35} floatSpeed={0.4} delay={1.2} />
      <Orb cx={960} cy={200} r={350} color={BRAND.blue} floatAmp={20} floatSpeed={0.7} delay={0.5} />
      <Orb cx={960} cy={900} r={300} color={BRAND.orange} floatAmp={25} floatSpeed={0.6} delay={0.8} />

      {/* Accent gradient lines */}
      <GradientLine y={280} startFrame={30} color1={BRAND.orange} color2={BRAND.magenta} />
      <GradientLine y={800} startFrame={45} color1={BRAND.cyan} color2={BRAND.blue} />

      <WordMark />
      <ServicePills />
      <BottomBar />
    </AbsoluteFill>
  );
};
