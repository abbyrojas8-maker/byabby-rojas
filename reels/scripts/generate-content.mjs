/**
 * generate-content.mjs
 *
 * Genera el contenido (texto, imágenes) para los reels del día usando IA.
 * Llama a la API de HeyGen para crear el video del avatar hablando,
 * y luego guarda la configuración lista para Remotion.
 *
 * Uso: node scripts/generate-content.mjs
 * Variables de entorno requeridas (crear archivo .env):
 *   HEYGEN_API_KEY=tu_clave_aqui
 *   AVATAR_ID=tu_avatar_id_aqui  (lo obtenés creando el avatar en HeyGen)
 *   VOICE_ID=tu_voz_id_aqui      (la voz clonada de HeyGen)
 */

import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Configuración ───────────────────────────────────────────────
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;
const AVATAR_ID = process.env.AVATAR_ID;
const VOICE_ID = process.env.VOICE_ID;

// ─── Scripts de ejemplo para los reels ───────────────────────────
// Personalizá estos textos para que el avatar los diga en cada reel
const SCRIPTS_DIARIOS = {
  reel1_producto: `¡Hola! Soy Abby de ByAbby Rojas. Hoy tenemos algo muy especial para vos:
  nuestra taza personalizada con tu foto favorita. El regalo perfecto para cumpleaños,
  aniversarios o simplemente para alegrarle el día a alguien. ¡Pedí la tuya hoy mismo!`,

  reel2_testimonio: `¿Sabías que cientos de clientes en todo Uruguay ya eligieron ByAbby Rojas
  para sus regalos? Escuchá lo que dicen: ¡quedaron encantados!
  Vos también podés sorprender a esa persona especial. Link en bio.`,
};

// ─── Función: Crear video de avatar en HeyGen ────────────────────
async function crearVideoAvatar(script, nombreArchivo) {
  console.log(`\n📹 Creando video avatar para: ${nombreArchivo}`);
  console.log(`   Script: "${script.slice(0, 60)}..."`);

  if (!HEYGEN_API_KEY) {
    console.log("   ⚠️  Sin HEYGEN_API_KEY — usando placeholder");
    return null;
  }

  // 1. Crear el video
  const response = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: {
      "X-Api-Key": HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: AVATAR_ID,
            avatar_style: "normal",
          },
          voice: {
            type: "text",
            input_text: script,
            voice_id: VOICE_ID,
            speed: 1.0,
          },
          background: {
            type: "color",
            value: "#faf7ff",
          },
        },
      ],
      dimension: { width: 1080, height: 1920 }, // vertical para reels
      aspect_ratio: null,
      test: false, // cambiar a true para pruebas (no gasta créditos)
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("   ❌ Error HeyGen:", data);
    return null;
  }

  const videoId = data.data?.video_id;
  console.log(`   ✅ Video iniciado. ID: ${videoId}`);

  // 2. Esperar a que esté listo (polling cada 10 segundos)
  return await esperarVideoListo(videoId);
}

async function esperarVideoListo(videoId) {
  console.log(`   ⏳ Esperando que HeyGen procese el video...`);

  for (let intento = 0; intento < 30; intento++) {
    await new Promise((r) => setTimeout(r, 10000)); // esperar 10s

    const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: { "X-Api-Key": HEYGEN_API_KEY },
    });

    const data = await response.json();
    const status = data.data?.status;

    console.log(`   → Estado: ${status} (intento ${intento + 1}/30)`);

    if (status === "completed") {
      const url = data.data.video_url;
      console.log(`   ✅ Video listo: ${url}`);
      return url;
    }

    if (status === "failed") {
      console.error("   ❌ Video falló:", data.data?.error);
      return null;
    }
  }

  console.error("   ❌ Timeout esperando video");
  return null;
}

// ─── Función principal ───────────────────────────────────────────
async function main() {
  console.log("🚀 ByAbby Reels — Generador de contenido diario");
  console.log("================================================");

  const hoy = new Date().toISOString().split("T")[0];
  const outputDir = join(__dirname, "..", "out", "daily", hoy);
  mkdirSync(outputDir, { recursive: true });

  // Generar los 2 videos de avatar en paralelo
  const [urlReel1, urlReel2] = await Promise.all([
    crearVideoAvatar(SCRIPTS_DIARIOS.reel1_producto, "reel1-producto"),
    crearVideoAvatar(SCRIPTS_DIARIOS.reel2_testimonio, "reel2-testimonio"),
  ]);

  // Guardar configuración para Remotion
  const config = {
    fecha: hoy,
    reels: [
      {
        id: "ReelProducto",
        outputFile: `out/daily/${hoy}/reel1-producto.mp4`,
        urlAvatar: urlReel1 || "",
        props: {
          titulo: "Taza personalizada con tu foto",
          descripcion: "El regalo perfecto para quien más querés 💛",
          precio: "$350",
          imagenProducto: "https://via.placeholder.com/500",
          colorFondo: "#faf7ff",
          nombreNegocio: "ByAbby Rojas",
          hashtags: "#regalospersonalizados #uruguay #florida #byabbyrojas",
        },
      },
      {
        id: "ReelTestimonio",
        outputFile: `out/daily/${hoy}/reel2-testimonio.mp4`,
        urlAvatar: urlReel2 || "",
        props: {
          nombreCliente: "María González",
          ciudad: "Montevideo",
          testimonio: "¡Me encantó la taza! La entrega fue súper rápida y el diseño quedó hermoso.",
          estrellas: 5,
          imagenProducto: "https://via.placeholder.com/400",
          colorFondo: "#fff9f0",
          nombreNegocio: "ByAbby Rojas",
        },
      },
    ],
  };

  const configPath = join(outputDir, "config.json");
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`\n✅ Configuración guardada en: ${configPath}`);
  console.log('\n▶️  Siguiente paso: ejecutá "npm run render:all" para generar los MP4');
}

main().catch(console.error);
