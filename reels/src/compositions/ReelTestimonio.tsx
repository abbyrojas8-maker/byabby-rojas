import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AvatarVideo } from "../components/AvatarVideo";
import { AnimatedText } from "../components/AnimatedText";
import { Estrellas } from "../components/Estrellas";
import { Logo } from "../components/Logo";
import type { ReelTestimonioProps } from "../types";

export const ReelTestimonio: React.FC<ReelTestimonioProps> = ({
  nombreCliente,
  ciudad,
  testimonio,
  estrellas,
  imagenProducto,
  colorFondo,
  urlAvatar,
  nombreNegocio,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const finalOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Texto del testimonio aparece letra a letra (typewriter)
  const testimonioVisible = testimonio.slice(
    0,
    Math.max(0, Math.floor(interpolate(frame, [40, 130], [0, testimonio.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })))
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${colorFondo} 0%, #f3eeff 100%)`,
        opacity: finalOpacity,
      }}
    >
      {/* Header */}
      <div style={{ position: "absolute", top: 60, left: 60, right: 60 }}>
        <Logo nombre={nombreNegocio} color="#6A0572" />
      </div>

      {/* Título */}
      <AnimatedText delay={5} direction="up">
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 60,
            right: 60,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: 48,
              color: "#6A0572",
            }}
          >
            Lo que dicen nuestros clientes 💬
          </span>
        </div>
      </AnimatedText>

      {/* Avatar */}
      <Sequence from={8}>
        <div
          style={{
            position: "absolute",
            top: 270,
            left: 60,
            width: 380,
            height: 420,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 16px 50px rgba(106,5,114,0.18)",
          }}
        >
          <AvatarVideo urlAvatar={urlAvatar} />
        </div>
      </Sequence>

      {/* Imagen del producto */}
      <Sequence from={15}>
        <div
          style={{
            position: "absolute",
            top: 270,
            right: 60,
            width: 300,
            height: 300,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            border: "4px solid #fff",
          }}
        >
          <Img
            src={imagenProducto}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Sequence>

      {/* Estrellas */}
      <div style={{ position: "absolute", top: 730, left: 60 }}>
        <Estrellas cantidad={estrellas} delay={30} />
      </div>

      {/* Tarjeta testimonio */}
      <Sequence from={35}>
        <div
          style={{
            position: "absolute",
            top: 820,
            left: 60,
            right: 60,
            background: "#fff",
            borderRadius: 24,
            padding: "36px 40px",
            boxShadow: "0 8px 32px rgba(106,5,114,0.12)",
            borderLeft: "6px solid #FF5E5B",
          }}
        >
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 36,
              color: "#2d1b4e",
              lineHeight: 1.5,
              marginBottom: 20,
              minHeight: 160,
            }}
          >
            "{testimonioVisible}"
          </p>
          <AnimatedText delay={130} direction="fade">
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: "#6A0572",
              }}
            >
              — {nombreCliente}, {ciudad}
            </p>
          </AnimatedText>
        </div>
      </Sequence>

      {/* CTA */}
      <AnimatedText delay={150} direction="up">
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 60,
            right: 60,
            background: "#FF5E5B",
            borderRadius: 20,
            padding: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "sans-serif",
              fontWeight: 900,
              fontSize: 36,
              color: "#fff",
            }}
          >
            ¡El próximo podés ser vos! 🎁
          </p>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 24,
              color: "rgba(255,255,255,0.85)",
              marginTop: 8,
            }}
          >
            Link en bio → byabbyrojas.com
          </p>
        </div>
      </AnimatedText>
    </AbsoluteFill>
  );
};
