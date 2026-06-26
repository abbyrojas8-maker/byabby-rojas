import { Composition } from "remotion";
import { ReelProducto } from "./compositions/ReelProducto";
import { ReelTestimonio } from "./compositions/ReelTestimonio";
import { ReelOferta } from "./compositions/ReelOferta";
import type { ReelProductoProps, ReelTestimonioProps, ReelOfertaProps } from "./types";

// 30 fps × 30 segundos = 900 frames por reel
const FPS = 30;
const DURACION_REEL = 30 * FPS;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelProducto"
        component={ReelProducto}
        durationInFrames={DURACION_REEL}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          titulo: "Taza personalizada con tu foto",
          descripcion: "El regalo perfecto para quien más querés 💛",
          precio: "$350",
          imagenProducto: "https://via.placeholder.com/500",
          colorFondo: "#faf7ff",
          urlAvatar: "",
          nombreNegocio: "ByAbby Rojas",
          hashtags: "#regalospersonalizados #uruguay #florida",
        } satisfies ReelProductoProps}
      />

      <Composition
        id="ReelTestimonio"
        component={ReelTestimonio}
        durationInFrames={DURACION_REEL}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          nombreCliente: "María González",
          ciudad: "Montevideo",
          testimonio: "¡Me encantó la taza! La entrega fue súper rápida y el diseño quedó hermoso. Volvería a comprar sin dudar.",
          estrellas: 5,
          imagenProducto: "https://via.placeholder.com/400",
          colorFondo: "#fff9f0",
          urlAvatar: "",
          nombreNegocio: "ByAbby Rojas",
        } satisfies ReelTestimonioProps}
      />

      <Composition
        id="ReelOferta"
        component={ReelOferta}
        durationInFrames={DURACION_REEL}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          titulo: "OFERTA ESPECIAL",
          subtitulo: "Solo por este fin de semana",
          descuento: "20%",
          productos: ["Tazas", "Llaveros", "Stickers"],
          precioDesde: "$280",
          colorFondo: "#FF5E5B",
          urlAvatar: "",
          nombreNegocio: "ByAbby Rojas",
          fechaLimite: "Domingo 29/06",
        } satisfies ReelOfertaProps}
      />
    </>
  );
};
