import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
  spring,
} from "remotion";

const BRAND = {
  orange: "#FF6B35",
  magenta: "#E91E8C",
  purple: "#9C27B0",
  cyan: "#00B4D8",
  blue: "#0077FF",
  green: "#28CA41",
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

function spr(frame: number, fps: number, delay: number): number {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
    from: 0,
    to: 1,
  });
}

function DotGrid() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    />
  );
}

function BrowserWindow() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowIn = spr(frame, fps, 10);
  const heroIn = easeOut(frame, 30, 25);
  const card1In = spr(frame, fps, 65);
  const card2In = spr(frame, fps, 78);
  const card3In = spr(frame, fps, 91);
  const ctaIn = spr(frame, fps, 110);
  const footerIn = easeOut(frame, 135, 20);

  const browserW = 900;
  const browserH = 560;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: browserW,
        height: browserH,
        transform: `translate(-50%, -50%) scale(${windowIn})`,
        opacity: interpolate(windowIn, [0, 0.3, 1], [0, 0.5, 1]),
        boxShadow:
          "0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,119,255,0.15), 0 0 80px rgba(0,119,255,0.1)",
        borderRadius: 16,
        overflow: "hidden",
        background: BRAND.navyMid,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          height: 44,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
            <div
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 6,
            height: 26,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: `1.5px solid ${BRAND.green}`,
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              fontFamily: "sans-serif",
            }}
          >
            yourclient.com
          </span>
        </div>
      </div>

      {/* Website body */}
      <div
        style={{
          height: browserH - 44,
          background: BRAND.navy,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Hero section */}
        <div
          style={{
            padding: "32px 40px 28px",
            background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navyMid})`,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            opacity: heroIn,
            transform: `translateY(${interpolate(heroIn, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              height: 10,
              width: "55%",
              borderRadius: 5,
              background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.magenta})`,
              marginBottom: 10,
            }}
          />
          <div
            style={{
              height: 7,
              width: "75%",
              borderRadius: 4,
              background: "rgba(255,255,255,0.1)",
              marginBottom: 6,
            }}
          />
          <div
            style={{
              height: 7,
              width: "50%",
              borderRadius: 4,
              background: "rgba(255,255,255,0.06)",
              marginBottom: 22,
            }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                height: 30,
                width: 110,
                borderRadius: 7,
                background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.magenta})`,
                boxShadow: `0 6px 20px ${BRAND.orange}50`,
              }}
            />
            <div
              style={{
                height: 30,
                width: 95,
                borderRadius: 7,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "24px 40px",
          }}
        >
          {[
            { color: { from: BRAND.orange, to: BRAND.magenta }, s: card1In },
            { color: { from: BRAND.cyan, to: BRAND.blue }, s: card2In },
            { color: { from: BRAND.purple, to: BRAND.magenta }, s: card3In },
          ].map(({ color, s }, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "18px 16px",
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [25, 0])}px) scale(${interpolate(s, [0, 1], [0.95, 1])})`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  height: 6,
                  width: "80%",
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.14)",
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  height: 5,
                  width: "60%",
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div
          style={{
            margin: "0 40px",
            padding: "18px 20px",
            background: `linear-gradient(135deg, ${BRAND.orange}18, ${BRAND.blue}18)`,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: ctaIn,
            transform: `scale(${interpolate(ctaIn, [0, 1], [0.97, 1])})`,
          }}
        >
          <div>
            <div
              style={{
                height: 7,
                width: 130,
                borderRadius: 4,
                background: "rgba(255,255,255,0.2)",
                marginBottom: 6,
              }}
            />
            <div
              style={{
                height: 5,
                width: 90,
                borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>
          <div
            style={{
              height: 30,
              width: 90,
              borderRadius: 7,
              background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.magenta})`,
              boxShadow: `0 4px 16px ${BRAND.orange}40`,
            }}
          />
        </div>

        {/* Footer bar */}
        <div
          style={{
            marginTop: "auto",
            height: 40,
            background: "rgba(0,0,0,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            opacity: footerIn,
          }}
        />
      </div>
    </div>
  );
}

function Label() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = easeOut(frame, 140, 25);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: appear,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          fontSize: 32,
          fontWeight: 800,
          fontFamily: "sans-serif",
          color: "#fff",
          letterSpacing: -0.5,
        }}
      >
        We Build Your Website
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "sans-serif",
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        Alpha Strategy Group · Miami, USA
      </span>
    </div>
  );
}

function Badge() {
  const frame = useCurrentFrame();
  const appear = easeOut(frame, 5, 20);

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: appear,
        background: `${BRAND.blue}15`,
        border: `1.5px solid ${BRAND.blue}35`,
        borderRadius: 100,
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: BRAND.cyan,
          boxShadow: `0 0 10px ${BRAND.cyan}`,
        }}
      />
      <span
        style={{
          color: BRAND.cyan,
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Web Design & Development
      </span>
    </div>
  );
}

export const WebShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BRAND.navy,
        opacity: sceneIn,
        overflow: "hidden",
      }}
    >
      <DotGrid />

      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.blue}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.magenta}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Badge />
      <BrowserWindow />
      <Label />
    </AbsoluteFill>
  );
};
