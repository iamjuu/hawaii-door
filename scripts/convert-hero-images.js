// Script to convert hero background images to WebP for faster loading
// Run: node scripts/convert-hero-images.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const conversions = [
  {
    input: 'public/assets/product/productmain.svg',
    output: 'public/assets/product/productmain.webp',
    description: 'Main Product Page Hero'
  },
  {
    input: 'public/assets/product/interior door hero image 3.svg',
    output: 'public/assets/product/interior-door-hero-3.webp',
    description: 'Interior Door Hero'
  },
  {
    input: 'public/assets/product/intertior/wood-interior.svg',
    output: 'public/assets/product/intertior/wood-interior.webp',
    description: 'Wood Interior Hero'
  },
  {
    input: 'public/assets/product/exterior/exterior.png',
    output: 'public/assets/product/exterior/exterior.webp',
    description: 'Exterior Hero'
  }
];

async function convertImage(input, output, description) {
  try {
    console.log(`\n📸 Converting: ${description}`);
    console.log(`   From: ${path.basename(input)}`);
    console.log(`   To:   ${path.basename(output)}`);
    
    if (!fs.existsSync(input)) {
      console.log(`   ⚠️  File not found: ${input}`);
      return { success: false, error: 'File not found' };
    }

    const originalStats = fs.statSync(input);
    const originalSize = (originalStats.size / 1024).toFixed(2);

    // For SVG, we need to render it first at a good resolution
    const isSvg = input.endsWith('.svg');
    
    if (isSvg) {
      // Render SVG at high resolution (1920px width)
      await sharp(input, { density: 300 })
        .resize(1920, null, { 
          fit: 'inside',
          withoutEnlargement: false 
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(output);
    } else {
      // For PNG/JPG, just convert
      await sharp(input)
        .webp({ quality: 85, effort: 6 })
        .toFile(output);
    }

    const newStats = fs.statSync(output);
    const newSize = (newStats.size / 1024).toFixed(2);
    const savings = (((originalStats.size - newStats.size) / originalStats.size) * 100).toFixed(1);

    console.log(`   ✅ Original: ${originalSize} KB`);
    console.log(`   ✅ WebP:     ${newSize} KB`);
    console.log(`   💾 Saved:    ${savings}% smaller`);

    return { success: true, originalSize, newSize, savings };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Converting hero background images to WebP...\n');
  console.log('=' .repeat(60));

  let totalOriginal = 0;
  let totalNew = 0;
  let successCount = 0;
  let failCount = 0;

  for (const conversion of conversions) {
    const result = await convertImage(
      conversion.input,
      conversion.output,
      conversion.description
    );

    if (result.success) {
      totalOriginal += parseFloat(result.originalSize);
      totalNew += parseFloat(result.newSize);
      successCount++;
    } else {
      failCount++;
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 CONVERSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}/${conversions.length}`);
  console.log(`❌ Failed:     ${failCount}/${conversions.length}`);
  console.log(`\n📦 Total original size: ${totalOriginal.toFixed(2)} KB`);
  console.log(`📦 Total new size:      ${totalNew.toFixed(2)} KB`);
  console.log(`💾 Total savings:       ${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%`);
  console.log(`\n⚡ Expected loading speed: 5-10x faster!`);
  console.log('\n✨ Conversion complete!');
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
