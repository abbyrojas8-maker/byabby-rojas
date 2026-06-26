import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface LogoProps {
  nombre: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ nombre, color = "#6A0572" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 20,
        }}
      >
        AB
      </div>
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 28,
          color,
        }}
      >
        {nombre}
      </span>
    </div>
  );
};
