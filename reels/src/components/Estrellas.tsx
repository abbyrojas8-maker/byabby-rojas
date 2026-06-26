import { useCurrentFrame } from "remotion";

interface EstrellasProps {
  cantidad: number;
  delay?: number;
  size?: number;
}

export const Estrellas: React.FC<EstrellasProps> = ({ cantidad, delay = 0, size = 36 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const appear = Math.max(0, frame - delay - i * 4);
        const opacity = Math.min(1, appear / 8);
        const scale = appear === 0 ? 0 : 0.5 + 0.5 * Math.min(1, appear / 8);
        return (
          <span
            key={i}
            style={{
              fontSize: size,
              opacity,
              transform: `scale(${scale})`,
              display: "inline-block",
              filter: i < cantidad ? "none" : "grayscale(1) opacity(0.3)",
            }}
          >
            ⭐
          </span>
        );
      })}
    </div>
  );
};
