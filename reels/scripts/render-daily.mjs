/**
 * render-daily.mjs
 *
 * Lee la configuración generada por generate-content.mjs
 * y renderiza los 2 reels del día con Remotion.
 *
 * Uso: node scripts/render-daily.mjs
 */

import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const hoy = new Date().toISOString().split("T")[0];
const configPath = join(__dirname, "..", "out", "daily", hoy, "config.json");

if (!existsSync(configPath)) {
  console.error(`❌ No existe config para hoy (${hoy})`);
  console.error(`   Ejecutá primero: npm run generate`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, "utf-8"));

console.log(`🎬 Renderizando ${config.reels.length} reels para ${hoy}...`);
console.log("====================================================");

for (const reel of config.reels) {
  console.log(`\n▶️  Renderizando ${reel.id}...`);

  // Construir los props como JSON inline para pasarle a Remotion
  const props = JSON.stringify({
    ...reel.props,
    urlAvatar: reel.urlAvatar,
  });

  const cmd = [
    "npx remotion render",
    "src/index.ts",
    reel.id,
    `--output "${reel.outputFile}"`,
    `--props '${props.replace(/'/g, "\\'")}'`,
    "--log quiet",
  ].join(" ");

  try {
    execSync(cmd, { stdio: "inherit", cwd: join(__dirname, "..") });
    console.log(`   ✅ Guardado en: ${reel.outputFile}`);
  } catch (err) {
    console.error(`   ❌ Error al renderizar ${reel.id}:`, err.message);
  }
}

console.log(`\n🎉 ¡Listo! Tus 2 reels del día están en: out/daily/${hoy}/`);
console.log("   Subílos a Instagram/TikTok/Facebook desde ahí.");
