import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "right" | "fade";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  style,
  direction = "up",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const transforms: Record<string, string> = {
    up: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
    left: `translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`,
    right: `translateX(${interpolate(progress, [0, 1], [60, 0])}px)`,
    fade: `scale(${interpolate(progress, [0, 1], [0.95, 1])})`,
  };

  return (
    <div
      style={{
        opacity,
        transform: transforms[direction],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
