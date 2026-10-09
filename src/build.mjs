// Gera o site estático da Rubra a partir do protótipo (Main.dc.html) e dos modelos em src/.
// Uso: node src/build.mjs <caminho do Main.dc.html>
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dc = process.argv[2];
const src = readFileSync(dc, 'utf8');
const imgDir = join(dirname(dc), 'img');

const between = (a, b) => {
  const i = src.indexOf(a);
  const j = src.indexOf(b, i);
  if (i < 0 || j < 0) throw new Error('Trecho não encontrado: ' + a);
  return src.slice(i, j);
};

// CSS do protótipo + ajustes do site estático
let css = between('<style>', '</style>').slice('<style>'.length).trim();
css = css.replace('body{margin:0;', 'body{margin:0;-webkit-font-smoothing:antialiased;');
css += `
/* site estático */
[hidden]{display:none!important}
.page{width:100%;background:#4f0423;color:#ffffff;overflow:clip}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.tagp{font-size:11px;color:#260212;background:#ffc7c6;border-radius:15px;padding:3px 8px}
.menu-link{font-size:60px;line-height:1.05;padding:6px 0;border-bottom:1px solid #000000;color:#ffffff}
#menu-movel:not([hidden]){display:flex}
#totop:not([hidden]){display:flex}
`;

// Dados do cardápio, experiências, cozinha e dúvidas
const data = [
  between('const menu = [', 'const tabNames'),
  between('const expData = [', 'const nextDow'),
  between('const storyData = [', 'const story = '),
  between('const fq = [', 'const faqs = ')
].map((s) => '  ' + s.trim()).join('\n');

const out = (p) => { const f = join(root, p); mkdirSync(dirname(f), { recursive: true }); return f; };
writeFileSync(out('assets/css/style.css'), css + '\n');
writeFileSync(out('assets/js/main.js'), readFileSync(join(root, 'src/main.template.js'), 'utf8').replace('/*DATA*/', data));
// Versão nos links de CSS e JS para o navegador não usar uma cópia antiga depois de cada atualização
const ver = createHash('sha1').update(css + data + readFileSync(join(root, 'src/main.template.js'), 'utf8')).digest('hex').slice(0, 8);
writeFileSync(out('index.html'), readFileSync(join(root, 'src/index.template.html'), 'utf8').replace('assets/css/style.css', 'assets/css/style.css?v=' + ver).replace('assets/js/main.js', 'assets/js/main.js?v=' + ver));

// Imagens otimizadas (webp e a capa do vídeo) e o vídeo do topo
let n = 0;
for (const f of readdirSync(imgDir)) {
  if (f.endsWith('.src.jpg') || f === 'credits.json' || f.endsWith('.mp4')) continue;
  copyFileSync(join(imgDir, f), out('assets/img/' + f)); n++;
}
copyFileSync(join(imgDir, 'hero-grelha.mp4'), out('assets/video/hero-grelha.mp4'));
if (existsSync(join(imgDir, 'credits.json'))) copyFileSync(join(imgDir, 'credits.json'), out('assets/img/creditos-pixabay.json'));
console.log('css', css.length, 'js data', data.length, 'imagens', n);
