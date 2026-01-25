# PowerShell script to convert PNG images to WebP
# Run: .\scripts\convert-to-webp.ps1

Write-Host "🚀 Converting images to WebP..." -ForegroundColor Cyan
Write-Host ("=" * 60)

# Change to project root
Set-Location $PSScriptRoot\..

# Install sharp if not already installed
Write-Host "`n📦 Checking for sharp package..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules\sharp")) {
    Write-Host "Installing sharp..." -ForegroundColor Yellow
    npm install sharp --save-dev
}

# Create a temporary Node.js script
$convertScript = @'
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = 'public/assets/images/landing';

const images = [
    { name: 'door22.png', output: 'door1.webp', desc: 'Wood Core Door' },
    { name: 'door33.png', output: 'door3.webp', desc: 'Hollow Core Door' },
    { name: 'door41.png', output: 'door4.webp', desc: 'Fiberglass Door' }
];

async function convertImage(inputFile, outputFile, description) {
    const inputPath = path.join(IMAGES_DIR, inputFile);
    const outputPath = path.join(IMAGES_DIR, outputFile);
    
    if (!fs.existsSync(inputPath)) {
        console.log(`❌ File not found: ${inputFile}`);
        return false;
    }
    
    try {
        const originalSize = fs.statSync(inputPath).size;
        
        await sharp(inputPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(outputPath);
        
        const newSize = fs.statSync(outputPath).size;
        const savings = Math.round(((originalSize - newSize) / originalSize) * 100);
        
        console.log(`✅ ${description}`);
        console.log(`   ${inputFile} → ${outputFile}`);
        console.log(`   ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${savings}% smaller)`);
        
        return true;
    } catch (error) {
        console.log(`❌ Error converting ${inputFile}: ${error.message}`);
        return false;
    }
}

(async () => {
    console.log('\n');
    let success = 0;
    for (const img of images) {
        if (await convertImage(img.name, img.output, img.desc)) {
            success++;
        }
        console.log('');
    }
    console.log(`\n📊 Converted ${success}/${images.length} images\n`);
})();
'@

# Write the script to a temp file
$tempScript = Join-Path $env:TEMP "convert-webp-$(Get-Random).js"
$convertScript | Out-File -FilePath $tempScript -Encoding UTF8

# Run the conversion
Write-Host "`n🔄 Converting images..." -ForegroundColor Green
node $tempScript

# Clean up
Remove-Item $tempScript

Write-Host "`n✨ Done!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update your code to use: door1.webp, door3.webp, door4.webp"
Write-Host "2. Test in browser"
Write-Host "3. Run: npm run build"
Write-Host ""
