
// Paleta de cores suaves (Flat Design)
const COLORS = [
  '#FF6501', // Laranja (Brand)
  '#2D6DF6', // Azul (Brand)
  '#1F2937', // Cinza Escuro
  '#10B981', // Verde Esmeralda
  '#8B5CF6', // Roxo Suave
  '#F59E0B', // Âmbar
  '#EC4899', // Rosa
  '#6366F1', // Indigo
];

// Ícones SVG simplificados (Paths)
const ICONS = [
  // Shopping Bag
  '<path d="M140 160 H372 V432 C372 458.51 350.51 480 324 480 H188 C161.49 480 140 458.51 140 432 V160 Z M190 160 V120 C190 86.863 216.86 60 250 60 H262 C295.14 60 322 86.863 322 120 V160" stroke="white" stroke-width="32" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  // Utensils (Food)
  '<path d="M160 112 V304 C160 330 182 352 208 352 H224 V448 M352 112 V272 C352 298 330 320 304 320 H288 V448 M288 320 V112 M224 352 V112" stroke="white" stroke-width="32" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  // Zap (Electric/Fast)
  '<path d="M272 32 L160 256 H272 L240 480 L352 256 H240 L272 32 Z" fill="white"/>',
  // Heart (Health/Beauty)
  '<path d="M256 448 C256 448 416 320 416 192 C416 128 352 96 304 128 L256 160 L208 128 C160 96 96 128 96 192 C96 320 256 448 256 448 Z" fill="white"/>',
  // Star (Premium)
  '<path d="M256 48 L318 174 H456 L344 256 L388 384 L256 304 L124 384 L168 256 L56 174 H194 L256 48 Z" fill="white"/>',
  // Bone (Pet)
  '<path d="M144 144 C112 112 64 160 96 192 L224 320 L320 224 L192 96 C160 64 112 112 144 144 M368 368 C336 336 288 384 320 416 C352 448 400 400 368 368 M416 320 C384 288 336 336 368 368 C400 400 448 352 416 320" stroke="white" stroke-width="32" fill="none" stroke-linecap="round"/>',
  // Home (Construction/Decor)
  '<path d="M64 256 L256 64 L448 256 M128 192 V416 H208 V320 H304 V416 H384 V192" stroke="white" stroke-width="32" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  // Wrench (Tools)
  '<path d="M416 96 C416 140 380 176 336 176 C320 176 304 170 292 160 L140 312 L96 356 L156 416 L200 372 L352 220 C362 208 368 192 368 176" stroke="white" stroke-width="32" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M96 356 L156 416" stroke="white" stroke-width="32"/>',
  // Coffee
  '<path d="M96 176 V336 C96 380 132 416 176 416 H288 C332 416 368 380 368 336 V176 H96 Z M368 208 H416 C433 208 448 222 448 240 S433 272 416 272 H368 M160 80 L160 128 M232 64 V128 M304 80 L304 128" stroke="white" stroke-width="32" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  // Tag (Discount)
  '<path d="M432 192 L256 16 L64 16 L64 208 L240 384 L432 192 Z M144 112 C144 130 130 144 112 144 C94 144 80 130 80 112 C80 94 94 80 112 80 C130 80 144 94 144 112 Z" fill="white"/>'
];

/**
 * Gera uma string Base64 de um SVG com base em um índice.
 * Isso garante que o mesmo índice sempre gere o mesmo logo.
 * @param index - Um número para determinar deterministicamente a cor e o ícone.
 * @returns string (data:image/svg+xml;base64,...)
 */
export const getStoreLogo = (index: number): string => {
  // Garantir inteiros positivos
  const safeIndex = Math.abs(Math.floor(index));
  
  const color = COLORS[safeIndex % COLORS.length];
  const icon = ICONS[safeIndex % ICONS.length];
  
  const svgString = `
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="128" fill="${color}"/>
      <g transform="translate(56, 56) scale(0.78)">
        ${icon}
      </g>
    </svg>
  `.trim();

  // Converter para Base64 para usar como src de imagem
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
