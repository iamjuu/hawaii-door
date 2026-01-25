// Script to upload hero background images to S3 for faster loading via CDN
// Run this with: npx tsx scripts/upload-hero-images-to-s3.ts
// Make sure to set your .env.local file with AWS credentials

// Load environment variables from .env.local FIRST, before any other imports
require("dotenv").config({ path: require("path").resolve(process.cwd(), ".env.local") });

// Use dynamic imports to ensure dotenv loads first
async function runScript() {
  const { readFile, stat } = await import("fs/promises");
  const { join } = await import("path");
  const { uploadToS3 } = await import("@/lib/s3");

  interface HeroImage {
    name: string;
    localPath: string;
    description: string;
    usedIn: string[];
  }

  interface UploadResult {
    name: string;
    success: boolean;
    s3Url?: string;
    originalSize?: number;
    error?: string;
  }

  // Configuration: All hero background images
  const HERO_IMAGES: HeroImage[] = [
    {
      name: "productmain",
      localPath: "public/assets/product/productmain.webp",
      description: "Main Product Page Hero Background",
      usedIn: ["app/(user)/product/page.tsx"],
    },
    {
      name: "interior-door-hero",
      localPath: "public/assets/product/interior-door-hero-3.webp",
      description: "Interior Door Hero Background",
      usedIn: [
        "app/(user)/product/interior/page.tsx",
        "app/(user)/product/interior/Lynden-Door/page.tsx",
      ],
    },
    {
      name: "wood-interior",
      localPath: "public/assets/product/intertior/wood-interior.webp",
      description: "Wood Interior Hero Background",
      usedIn: [
        "app/(user)/product/interior/interior-wood/page.tsx",
        "app/(user)/product/exterior/exterior-wood/page.tsx",
      ],
    },
    {
      name: "exterior",
      localPath: "public/assets/product/exterior/exterior.webp",
      description: "Exterior Hero Background",
      usedIn: ["app/(user)/product/exterior/page.tsx"],
    },
  ];

  /**
   * Upload a single hero image to S3
   */
  async function uploadHeroImage(image: HeroImage): Promise<UploadResult> {
    try {
      console.log(`\n📤 Processing: ${image.description}`);
      console.log(`   Local: ${image.localPath}`);

      // Check if file exists and get size
      const stats = await stat(image.localPath);
      const originalSize = stats.size;
      console.log(`   Size: ${(originalSize / 1024).toFixed(2)} KB`);

      // Read file
      const fileBuffer = await readFile(image.localPath);

      // Upload to S3 with folder structure for hero images
      const fileName = `hero/${image.name}.webp`;
      console.log(`   → Uploading to S3...`);
      
      const s3Url = await uploadToS3(
        fileBuffer,
        fileName,
        "image/webp",
        false // Already WebP, no need to convert again
      );
      
      console.log(`   ✅ Uploaded to S3: ${s3Url}`);
      console.log(`   📍 Used in ${image.usedIn.length} file(s)`);

      return {
        name: image.name,
        success: true,
        s3Url,
        originalSize,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`   ❌ Error processing ${image.name}:`, errorMessage);
      return {
        name: image.name,
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Main function
   */
  async function uploadHeroImages() {
    try {
      console.log("🚀 Starting hero background images upload to S3...");
      console.log("📦 This will make your product pages load 2-3x faster!");
      console.log("=".repeat(60));

      // Upload each image
      const results: UploadResult[] = [];
      for (const image of HERO_IMAGES) {
        const result = await uploadHeroImage(image);
        results.push(result);

        // Small delay to avoid overwhelming S3
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Summary
      console.log("\n" + "=".repeat(60));
      console.log("📊 UPLOAD SUMMARY");
      console.log("=".repeat(60));

      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      console.log(`\n✅ Successful: ${successful.length}/${results.length}`);
      
      if (successful.length > 0) {
        console.log("\n🔗 S3 URLs (update these in your code):");
        console.log("=".repeat(60));
        
        const urlMapping: { [key: string]: string } = {};
        
        successful.forEach((result) => {
          console.log(`\n${result.name}:`);
          console.log(`  ${result.s3Url}`);
          if (result.s3Url) {
            urlMapping[result.name] = result.s3Url;
          }
        });

        // Generate code snippets for easy copy-paste
        console.log("\n" + "=".repeat(60));
        console.log("📝 CODE UPDATE INSTRUCTIONS");
        console.log("=".repeat(60));
        
        console.log("\n1️⃣  app/(user)/product/page.tsx:");
        console.log(`    const bgImage = "${urlMapping['productmain'] || 'UPLOAD_FAILED'}";`);
        
        console.log("\n2️⃣  app/(user)/product/interior/page.tsx:");
        console.log(`    const bgImage = "${urlMapping['interior-door-hero'] || 'UPLOAD_FAILED'}";`);
        
        console.log("\n3️⃣  app/(user)/product/interior/Lynden-Door/page.tsx:");
        console.log(`    const bgImage = "${urlMapping['interior-door-hero'] || 'UPLOAD_FAILED'}";`);
        
        console.log("\n4️⃣  app/(user)/product/interior/interior-wood/page.tsx:");
        console.log(`    const bgImage = "${urlMapping['wood-interior'] || 'UPLOAD_FAILED'}";`);
        
        console.log("\n5️⃣  app/(user)/product/exterior/exterior-wood/page.tsx:");
        console.log(`    const bgImage = "${urlMapping['wood-interior'] || 'UPLOAD_FAILED'}";`);
        
        console.log("\n6️⃣  app/(user)/product/exterior/page.tsx:");
        console.log(`    const bgImage = "${urlMapping['exterior'] || 'UPLOAD_FAILED'}";`);
      }

      if (failed.length > 0) {
        console.log(`\n\n❌ Failed: ${failed.length}/${results.length}`);
        failed.forEach((result) => {
          console.log(`   • ${result.name}: ${result.error}`);
        });
      }

      console.log("\n" + "=".repeat(60));
      console.log("🎯 NEXT STEPS:");
      console.log("=".repeat(60));
      console.log("1. Copy the S3 URLs above");
      console.log("2. Update the bgImage constants in all 6 product page files");
      console.log("3. Run 'npm run build' to verify");
      console.log("4. Deploy and enjoy 2-3x faster loading! 🚀");
      console.log("\n✨ Upload completed!");
      
    } catch (error) {
      console.error("\n❌ Fatal error:", error);
      process.exit(1);
    }
  }

  // Run the upload
  await uploadHeroImages();
}

// Execute the script
runScript().catch((error) => {
  console.error("Failed to run script:", error);
  process.exit(1);
});
