# Image Optimization Guide for Hawaii Door

## ✅ Changes Applied

### 1. Footer Logo Fixed
- **Removed** unused import causing build issues
- **Changed** from `fill` + `unoptimized` to explicit `width`/`height` with optimization
- **Added** `priority` prop for above-the-fold rendering
- **Added** `quality={90}` for crisp logo display

### 2. Door Categories Carousel
- **Added** `quality={85}` for balanced quality/performance
- **Added** conditional `loading` prop (eager for current, lazy for others)
- **Kept** `priority` for currently visible card

### 3. Next.js Image Configuration
- **Increased** `minimumCacheTTL` to 1 year for static images
- **Added** `output: 'standalone'` for smaller production builds
- **Enabled** AVIF/WebP formats (automatic conversion)
- **Added** proper SVG handling with security

---

## 🚀 Additional Performance Optimizations

### 1. **Convert Static Images to WebP/AVIF** (Recommended)
Use a tool to pre-convert your static images in `public/assets/`:

```bash
# Install sharp-cli globally
npm install -g sharp-cli

# Convert all PNGs to WebP (in your assets folder)
cd public/assets/images/landing
for file in *.png; do
  sharp -i "$file" -o "${file%.png}.webp" --webp
done

# For even better compression, also create AVIF versions
for file in *.png; do
  sharp -i "$file" -o "${file%.png}.avif" --avif
done
```

Then update your code to use WebP/AVIF:
```tsx
// Before
<Image src="/assets/images/landing/Door1 8.02.03 PM.png" ... />

// After (Next.js will automatically serve best format)
<Image src="/assets/images/landing/Door1 8.02.03 PM.webp" ... />
```

### 2. **Enable CloudFront CDN for Static Assets** (Highly Recommended)
Set up AWS CloudFront in front of your EC2 instance:

1. Create CloudFront distribution pointing to your EC2
2. Configure origin for `/assets/*` paths
3. Set cache behaviors for static assets (1 year TTL)
4. Enable Gzip/Brotli compression

**Expected improvement**: 50-80% faster load times globally

### 3. **Implement Image Preloading**
Add to `app/layout.tsx` for critical images:

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Preload critical images */}
        <link
          rel="preload"
          as="image"
          href="/assets/footer/footerimg 8.56.53 PM.png"
          type="image/png"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/landing/Door1 8.02.03 PM.png"
          type="image/png"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 4. **Add Proper Cache Headers in Nginx/Apache**
If using Nginx on EC2, add to your config:

```nginx
# In your server block
location ~* \.(jpg|jpeg|png|gif|ico|webp|avif|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

### 5. **Optimize Image Sizes**
Your current images might be larger than needed:

```bash
# Check current sizes
cd public/assets/images/landing
ls -lh

# Use ImageMagick to resize if needed
for file in *.png; do
  convert "$file" -resize "800x>" -quality 85 "optimized-$file"
done
```

### 6. **Enable Next.js Output File Tracing**
Already added in config, but ensure you're using it:

```bash
# After build
npm run build

# The .next/standalone folder is self-contained
# Copy public/ and .next/static/ folders to deployment
```

### 7. **Use a CDN for Static Assets** (Alternative to CloudFront)
If not using CloudFront, you can upload `/public/assets/` to S3 and serve from there:

```tsx
// Create an env variable
NEXT_PUBLIC_ASSETS_CDN=https://hawaai-doors-bucket.s3.us-west-2.amazonaws.com

// Update image paths
<Image 
  src={`${process.env.NEXT_PUBLIC_ASSETS_CDN}/images/landing/Door1.webp`}
  ...
/>
```

---

## 📊 Expected Performance Gains

| Optimization | Expected Improvement |
|-------------|---------------------|
| Next.js Image Optimization | 40-60% smaller size |
| WebP/AVIF Conversion | 25-35% additional savings |
| CDN Implementation | 50-80% faster delivery |
| Proper Cache Headers | 90%+ faster repeat visits |
| **Combined Effect** | **70-85% faster overall** |

---

## 🔍 Check Current Performance

1. **Lighthouse Test**
```bash
# Run in Chrome DevTools
# Aim for 90+ Performance score
```

2. **Check Image Sizes**
```bash
# In Chrome DevTools Network tab
# Filter by "Img"
# Sort by "Size" column
```

3. **WebPageTest.org**
- Test from multiple locations
- Check TTFB (Time to First Byte)
- Aim for < 200ms with CDN

---

## 🎯 Quick Wins for EC2 Deployment

1. **Enable Gzip/Brotli compression** in your web server
2. **Add Cache-Control headers** for static assets
3. **Use PM2 with cluster mode** for Node.js (if not using)
4. **Enable HTTP/2** in your web server
5. **Minimize redirects** (check if any unnecessary ones exist)

---

## 📝 Current Status

✅ Footer logo optimized with `width`/`height` and `priority`  
✅ Carousel images using `quality` and conditional `loading`  
✅ Next.js config optimized with AVIF/WebP and long cache  
✅ Standalone build mode enabled  
⏳ **Next steps**: Implement CDN and convert images to WebP

---

## 🚨 Important Notes

1. **After converting to WebP**, test on Safari (iOS < 14 doesn't support WebP, but Next.js will serve PNG fallback)
2. **CloudFront setup** may take 15-30 minutes to propagate
3. **Always test** on actual devices/networks, not just localhost
4. **Monitor S3 costs** if serving assets from there

---

## Need Help?

If you need assistance with:
- Setting up CloudFront
- Converting images in bulk
- Configuring Nginx/Apache
- Performance testing

Let me know!
