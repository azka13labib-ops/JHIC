const fs = require('fs');

const createSvg = (text, width, height, color) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="transparent" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="${color}" dominant-baseline="middle" text-anchor="middle">
    ${text}
  </text>
</svg>
`;

fs.writeFileSync('frontend/public/images/sponsors/jagoan-hosting.svg', createSvg('Jagoan Hosting', 200, 50, '#1e293b'));
fs.writeFileSync('frontend/public/images/sponsors/komdigi.svg', createSvg('Komdigi RI', 150, 50, '#1e293b'));
fs.writeFileSync('frontend/public/images/sponsors/ngalup.svg', createSvg('Ngalup.co', 140, 50, '#1e293b'));
fs.writeFileSync('frontend/public/images/sponsors/garuda-spark.svg', createSvg('Garuda Spark', 180, 50, '#1e293b'));
fs.writeFileSync('frontend/public/images/sponsors/jihc.svg', createSvg('JIHC', 80, 50, '#1e293b'));

console.log('SVGs created successfully.');
