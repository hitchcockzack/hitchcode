const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const optimizedDir = path.join(publicDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

const imageFiles = [
  'zack.png',
  '047B9985-47E4-457F-AE9A-E2F2910E8DBF.png',
  'IMG_1691.png',
  'IMG_1360.png',
  'IMG_6325.png',
  '3A28D7A4-D601-4B60-8B1B-ABF447146B9F.png',
  'IMG_1157.png',
  'IMG_1367.png',
  'IMG_8133.png'
];

async function optimizeImages() {
  console.log('Starting image optimization...');

  for (const filename of imageFiles) {
    const inputPath = path.join(publicDir, filename);
    const outputPath = path.join(optimizedDir, filename.replace('.png', '.webp'));

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${filename} - file not found`);
      continue;
    }

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024 / 1024).toFixed(2);

      // Determine optimal size based on usage
      let width, height, quality;

      if (filename === 'zack.png') {
        // Profile image - small and high quality
        width = 256;
        height = 256;
        quality = 90;
      } else if (filename.includes('047B9985') || filename.includes('IMG_1360')) {
        // Hero images - medium size
        width = 800;
        height = 600;
        quality = 85;
      } else {
        // Other images - smaller size
        width = 600;
        height = 400;
        quality = 80;
      }

      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);

      console.log(`✅ ${filename}: ${originalSize}MB → ${newSize}MB (${savings}% reduction)`);

    } catch (error) {
      console.error(`❌ Error processing ${filename}:`, error.message);
    }
  }

  console.log('\n🎉 Image optimization complete!');
  console.log('📁 Optimized images saved to /public/optimized/');
  console.log('💡 Update your components to use the optimized images for better performance.');
}

optimizeImages().catch(console.error);
