// Script to rename images (remove spaces) and convert to WebP
// Run: node scripts/convert-images-to-webp.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(process.cwd(), 'public/assets/images/landing');

// Images that need renaming and conversion
const imagesToProcess = [
  {
    oldName: 'Door1 8.02.03 PM.png',
    newName: 'door1.webp',
    description: 'Wood Core Door'
  },
  {
    oldName: 'Door3 8.02.03 PM.png',
    newName: 'door3.webp',
    description: 'Hollow Core Door'
  },
  {
    oldName: 'Door4 8.02.03 PM.png',
    newName: 'door4.webp',
    description: 'Fibre Glass Door'
  }
];

async function convertImage(oldPath, newPath, description) {
  try {
    console.log(`\n📸 Processing: ${description}`);
    console.log(`   From: ${path.basename(oldPath)}`);
    console.log(`   To:   ${path.basename(newPath)}`);
    
    // Get original file size
    const originalStats = fs.statSync(oldPath);
    const originalSize = (originalStats.size / 1024).toFixed(2);
    
    // Convert to WebP
    await sharp(oldPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(newPath);
    
    // Get new file size
    const newStats = fs.statSync(newPath);
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
  console.log('🚀 Starting image conversion to WebP...\n');
  console.log('=' .repeat(60));
  
  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Sharp not installed. Installing...');
    console.error('Run: npm install sharp --save-dev');
    process.exit(1);
  }
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let successCount = 0;
  let failCount = 0;
  
  for (const image of imagesToProcess) {
    const oldPath = path.join(IMAGES_DIR, image.oldName);
    const newPath = path.join(IMAGES_DIR, image.newName);
    
    // Check if original file exists
    if (!fs.existsSync(oldPath)) {
      console.log(`\n⚠️  File not found: ${image.oldName}`);
      failCount++;
      continue;
    }
    
    const result = await convertImage(oldPath, newPath, image.description);
    
    if (result.success) {
      totalOriginalSize += parseFloat(result.originalSize);
      totalNewSize += parseFloat(result.newSize);
      successCount++;
    } else {
      failCount++;
    }
    
    // Small delay between conversions
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 CONVERSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}/${imagesToProcess.length}`);
  console.log(`❌ Failed:     ${failCount}/${imagesToProcess.length}`);
  console.log(`\n📦 Total original size: ${totalOriginalSize.toFixed(2)} KB`);
  console.log(`📦 Total new size:      ${totalNewSize.toFixed(2)} KB`);
  console.log(`💾 Total savings:       ${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%`);
  
  console.log('\n✨ Conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update your code to use new filenames (door1.webp, door3.webp, door4.webp)');
  console.log('2. Test the images in your browser');
  console.log('3. Delete old PNG files once confirmed working');
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
