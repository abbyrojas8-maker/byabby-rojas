import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AvatarVideo } from "../components/AvatarVideo";
import { AnimatedText } from "../components/AnimatedText";
import { Logo } from "../components/Logo";
import type { ReelOfertaProps } from "../types";

export const ReelOferta: React.FC<ReelOfertaProps> = ({
  titulo,
  subtitulo,
  descuento,
  productos,
  precioDesde,
  colorFondo,
  urlAvatar,
  nombreNegocio,
  fechaLimite,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const finalOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // El badge de descuento gira suavemente
  const badgeRotate = interpolate(frame, [0, durationInFrames], [-3, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgePulse = spring({
    frame: frame - 20,
    fps,
    config: { damping: 6, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colorFondo,
        opacity: finalOpacity,
      }}
    >
      {/* Círculos decorativos de fondo */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.08)",
        }}
      />

      {/* Header */}
      <div style={{ position: "absolute", top: 60, left: 60, right: 60 }}>
        <Logo nombre={nombreNegocio} color="#fff" />
      </div>

      {/* Badge descuento */}
      <Sequence from={10}>
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 60,
            transform: `rotate(${badgeRotate}deg) scale(${badgePulse})`,
          }}
        >
          <div
            style={{
              background: "#FFD166",
              width: 180,
              height: 180,
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ fontSize: 56, fontWeight: 900, fontFamily: "sans-serif", color: "#1A1025", lineHeight: 1 }}>
              -{descuento}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "sans-serif", color: "#1A1025" }}>
              OFF
            </span>
          </div>
        </div>
      </Sequence>

      {/* Título */}
      <AnimatedText delay={5} direction="left">
        <div style={{ position: "absolute", top: 170, left: 60, right: 260 }}>
          <p style={{ fontFamily: "sans-serif", fontWeight: 900, fontSize: 26, color: "rgba(255,255,255,0.7)", letterSpacing: 4, textTransform: "uppercase" }}>
            {subtitulo}
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 80, color: "#fff", lineHeight: 1 }}>
            {titulo}
          </h1>
        </div>
      </AnimatedText>

      {/* Avatar */}
      <Sequence from={12}>
        <div
          style={{
            position: "absolute",
            top: 380,
            left: 60,
            right: 60,
            height: 480,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <AvatarVideo urlAvatar={urlAvatar} />
        </div>
      </Sequence>

      {/* Lista de productos */}
      <div style={{ position: "absolute", top: 920, left: 60, right: 60 }}>
        {productos.map((prod, i) => (
          <AnimatedText key={prod} delay={30 + i * 10} direction="left">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#FFD166",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: 800,
                  fontSize: 38,
                  color: "#fff",
                }}
              >
                {prod}
              </span>
            </div>
          </AnimatedText>
        ))}
      </div>

      {/* Precio y fecha */}
      <AnimatedText delay={60} direction="up">
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 60,
            right: 60,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            borderRadius: 20,
            padding: "28px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <div>
            <p style={{ fontFamily: "sans-serif", color: "rgba(255,255,255,0.8)", fontSize: 22 }}>
              Desde
            </p>
            <p style={{ fontFamily: "sans-serif", fontWeight: 900, fontSize: 60, color: "#FFD166", lineHeight: 1 }}>
              {precioDesde}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "sans-serif", color: "rgba(255,255,255,0.8)", fontSize: 22 }}>
              Válido hasta
            </p>
            <p style={{ fontFamily: "sans-serif", fontWeight: 900, fontSize: 36, color: "#fff" }}>
              {fechaLimite}
            </p>
          </div>
        </div>
      </AnimatedText>
    </AbsoluteFill>
  );
};
