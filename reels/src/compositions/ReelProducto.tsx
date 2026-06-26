import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { AvatarVideo } from "../components/AvatarVideo";
import { AnimatedText } from "../components/AnimatedText";
import { Logo } from "../components/Logo";
import type { ReelProductoProps } from "../types";

export const ReelProducto: React.FC<ReelProductoProps> = ({
  titulo,
  descripcion,
  precio,
  imagenProducto,
  colorFondo,
  urlAvatar,
  nombreNegocio,
  hashtags,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fondo con gradiente animado sutil
  const gradientShift = interpolate(frame, [0, durationInFrames], [0, 10]);

  // Precio aparece con bounce
  const precioScale = spring({ frame: frame - 45, fps, config: { damping: 8, stiffness: 150 } });

  // Fade out final
  const finalOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${160 + gradientShift}deg, ${colorFondo} 0%, #e8e0f5 100%)`,
        opacity: finalOpacity,
      }}
    >
      {/* Header con logo */}
      <Sequence from={0}>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo nombre={nombreNegocio} color="#6A0572" />
          <div
            style={{
              background: "#FF5E5B",
              color: "#fff",
              fontFamily: "sans-serif",
              fontWeight: 800,
              fontSize: 22,
              padding: "8px 20px",
              borderRadius: 999,
            }}
          >
            NUEVO ✨
          </div>
        </div>
      </Sequence>

      {/* Avatar (aparece a los 10 frames) */}
      <Sequence from={10}>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 60,
            right: 60,
            height: 520,
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(106,5,114,0.2)",
          }}
        >
          <AvatarVideo urlAvatar={urlAvatar} />
        </div>
      </Sequence>

      {/* Imagen del producto */}
      <Sequence from={20}>
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 480,
            width: 260,
            height: 260,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            border: "4px solid #fff",
          }}
        >
          <Img
            src={imagenProducto}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Sequence>

      {/* Contenido de texto */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 60,
          right: 60,
        }}
      >
        <AnimatedText delay={15} direction="up">
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: 56,
              color: "#1A1025",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {titulo}
          </h1>
        </AnimatedText>

        <AnimatedText delay={25} direction="up">
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 34,
              color: "#6b5b82",
              marginBottom: 28,
            }}
          >
            {descripcion}
          </p>
        </AnimatedText>

        {/* Precio con animación bounce */}
        <div
          style={{
            transform: `scale(${precioScale})`,
            display: "inline-flex",
            alignItems: "center",
            background: "#6A0572",
            color: "#fff",
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: 52,
            padding: "16px 36px",
            borderRadius: 20,
            boxShadow: "0 8px 30px rgba(106,5,114,0.4)",
          }}
        >
          Solo {precio}
        </div>
      </div>

      {/* CTA y hashtags */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
        }}
      >
        <AnimatedText delay={60} direction="fade">
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 26,
              color: "#6b5b82",
              textAlign: "center",
            }}
          >
            {hashtags}
          </p>
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
