export interface ReelProductoProps {
  titulo: string;
  descripcion: string;
  precio: string;
  imagenProducto: string;
  colorFondo: string;
  urlAvatar: string; // URL del video del avatar (HeyGen/D-ID)
  nombreNegocio: string;
  hashtags: string;
}

export interface ReelTestimonioProps {
  nombreCliente: string;
  ciudad: string;
  testimonio: string;
  estrellas: number;
  imagenProducto: string;
  colorFondo: string;
  urlAvatar: string;
  nombreNegocio: string;
}

export interface ReelOfertaProps {
  titulo: string;
  subtitulo: string;
  descuento: string;
  productos: string[];
  precioDesde: string;
  colorFondo: string;
  urlAvatar: string;
  nombreNegocio: string;
  fechaLimite: string;
}
