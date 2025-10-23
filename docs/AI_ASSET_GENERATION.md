# AI Asset Generation & Optimization Guide

This guide documents reproducible cURL-based workflows to (re)generate brand marks, favicons, social images, product/blog heroes, testimonial portraits, optional composites, and short videos using OpenAI `gpt-image-1`, Google Imagen 4 (`imagen-4.0-generate-001`), and Veo 3.1 (`veo-3.1-generate-preview`). It preserves model IDs confirmed in official documentation and adds post-processing optimization.

> Built with accessibility and performance in mind; please still manually test (e.g., Lighthouse + Accessibility Insights). Some generated images (especially people) require human review for representation, bias, and realism.

## 0. Prerequisites

Environment variables (never commit secrets):
```
OPENAI_API_KEY=<your key>
GEMINI_API_KEY=<your key>
```
Tools (choose platform):
```bash
# macOS
brew install jq imagemagick jpegoptim oxipng ffmpeg
# Debian/Ubuntu
apt-get update && apt-get install -y jq imagemagick jpegoptim oxipng ffmpeg
```
Directory scaffold:
```bash
mkdir -p public/assets/{blog,brand,general,partners,products,testimonials,videos}
```

## A. Brand Assets

### 1. Primary Logo (transparent PNG)
```bash
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "Design a clean, modern wordmark for \"TGI Agency\". Professional insurance brand. Sans-serif, geometric letterforms, balanced kerning, slight rounded corners. Primary colors: deep navy #0D1B2A and teal #1B9AAA. Flat vector look, no gradients or bevels.",
    "size": "1024x1024",
    "background": "transparent",
    "n": 1
  }' | jq -r '.data[0].b64_json' | base64 --decode > public/assets/brand/logo-primary.png
oxipng -o4 -Z public/assets/brand/logo-primary.png
```

### 2. Footer Logo (mono white)
```bash
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "Render the \"TGI Agency\" wordmark as a single-color WHITE mark for dark footers. Same geometry as primary. No glow or shadow.",
    "size": "1024x512",
    "background": "transparent",
    "n": 1
  }' | jq -r '.data[0].b64_json' | base64 --decode > public/assets/brand/logo-footer.png
oxipng -o4 -Z public/assets/brand/logo-footer.png
```

### 3. Favicon Master + Sizes
```bash
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "Create a crisp monogram icon combining T G I. Simple geometric forms, high contrast for tiny sizes, centered, no outer ring.",
    "size": "1024x1024",
    "background": "transparent",
    "n": 1
  }' | jq -r '.data[0].b64_json' | base64 --decode > public/assets/brand/icon-1024.png
magick public/assets/brand/icon-1024.png -resize 512 public/assets/brand/android-chrome-512x512.png
magick public/assets/brand/icon-1024.png -resize 192 public/assets/brand/android-chrome-192x192.png
magick public/assets/brand/icon-1024.png -resize 180 public/assets/brand/apple-touch-icon.png
magick public/assets/brand/icon-1024.png -resize 32 public/assets/brand/favicon-32x32.png
magick public/assets/brand/icon-1024.png -resize 16 public/assets/brand/favicon-16x16.png
oxipng -o4 -Z public/assets/brand/icon-1024.png public/assets/brand/*favicon* public/assets/brand/android-chrome-*.png public/assets/brand/apple-touch-icon.png
```

### 4. Social OG Image (1200x630 final)
```bash
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"instances":[{"prompt":"Polished OG banner: left side candid portrait of a friendly insurance agent in a modern Texas office; right side clean navy/teal space for text: \"TGI Agency\" and \"Coverage, clarity, confidence.\" Minimal, premium."}],"parameters":{"sampleCount":1,"aspectRatio":"16:9","imageSize":"2K","personGeneration":"allow_adult"}}' \
| jq -r '.predictions[0].bytesBase64' | base64 --decode > /tmp/tgi-og.png
magick /tmp/tgi-og.png -gravity center -crop 1200x630+0+0 +repage -strip -quality 85 public/assets/brand/og-image.jpg
jpegoptim --strip-all public/assets/brand/og-image.jpg
rm /tmp/tgi-og.png
```

## B. Blog Feature Images (16:9)
Repeat with prompts per article; optimize:
```bash
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"instances":[{"prompt":"Modern Texas suburban home at golden hour; warm, welcoming; family-friendly mood."}],"parameters":{"sampleCount":1,"aspectRatio":"16:9","imageSize":"2K"}}' \
| jq -r '.predictions[0].bytesBase64' | base64 --decode > public/assets/blog/home-insurance-guide-hero.jpg
# ... other posts
for img in public/assets/blog/*.jpg; do magick "$img" -strip -quality 85 "$img"; jpegoptim --strip-all "$img"; done
```

## C. Product Heroes (16:9)
Generate per product; keep consistent style; then optimize:
```bash
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"instances":[{"prompt":"Modern family car on a clean Texas highway at sunset; minimal motion blur; aspirational."}],"parameters":{"sampleCount":1,"aspectRatio":"16:9","imageSize":"2K"}}' \
| jq -r '.predictions[0].bytesBase64' | base64 --decode > public/assets/products/auto-hero.jpg
# ... remaining products
for img in public/assets/products/*.jpg; do magick "$img" -strip -quality 85 "$img"; jpegoptim --strip-all "$img"; done
```

## D. General Background & 404 Images
```bash
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"instances":[{"prompt":"Over-the-shoulder: friendly agent explaining a policy document at a desk; warm daylight; candid."}],"parameters":{"sampleCount":1,"aspectRatio":"4:3","imageSize":"2K","personGeneration":"allow_adult"}}' \
| jq -r '.predictions[0].bytesBase64' | base64 --decode > public/assets/general/agent-contract-bg.jpg
# ... more backgrounds
for img in public/assets/general/*.jpg; do magick "$img" -strip -quality 85 "$img"; jpegoptim --strip-all "$img"; done
```

## E. Testimonial Portraits (1:1)
```bash
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"instances":[{"prompt":"Corporate headshot, man in his 50s, professional attire, natural smile; modern office background; photorealistic."}],"parameters":{"sampleCount":1,"aspectRatio":"1:1","imageSize":"2K","personGeneration":"allow_adult"}}' \
| jq -r '.predictions[0].bytesBase64' | base64 --decode > public/assets/testimonials/businessman-50s.jpg
# ... repeat variations
for img in public/assets/testimonials/*.jpg; do magick "$img" -strip -quality 85 "$img"; jpegoptim --strip-all "$img"; done
```

## F. Optional Composites (Logo Overlay)
```bash
curl -s https://api.openai.com/v1/images/edits \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=gpt-image-1" \
  -F "image=@public/assets/brand/og-image.jpg" \
  -F "image[]=@public/assets/brand/logo-footer.png" \
  -F 'prompt=Place the white TGI logo in the top-right corner with balanced margins; subtle drop shadow for readability; keep rest untouched.' \
  -F "size=1200x630" | jq -r '.data[0].b64_json' | base64 --decode > public/assets/brand/og-image-branded.jpg
```

## G. Short Videos (Veo 3.1)
```bash
BASE_URL="https://generativelanguage.googleapis.com/v1beta"
OP=$(curl -s "${BASE_URL}/models/veo-3.1-generate-preview:predictLongRunning" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"instances":[{"prompt":"Upbeat montage: family enjoying time at home; tasteful cut to buckling seatbelts and driving safely; bright natural light; cinematic transitions; optimistic music."}]}' | jq -r .name)
while true; do
  STATUS=$(curl -s -H "x-goog-api-key: $GEMINI_API_KEY" "${BASE_URL}/${OP}")
  if [ "$(echo "$STATUS" | jq .done)" = "true" ]; then
    URI=$(echo "$STATUS" | jq -r '.response.generateVideoResponse.generatedSamples[0].video.uri')
    curl -L -H "x-goog-api-key: $GEMINI_API_KEY" "$URI" -o public/assets/videos/home-auto.mp4
    break
  fi
  sleep 10
done
ffmpeg -i public/assets/videos/home-auto.mp4 -vcodec libx264 -crf 23 -preset medium -acodec aac -b:a 128k -movflags +faststart public/assets/videos/home-auto-web.mp4
```

## H. Consistency & Prompt Guardrails
- Palette: Deep navy `#0D1B2A` and teal `#1B9AAA`; avoid heavy gradients.
- People: Request natural skin tones, candid expressions, soft daylight; enable `personGeneration` where needed.
- Social share: Output 1200x630 JPG at quality ~85, stripped EXIF.
- Partner logos: NEVER AI-generate trademarks; optimize original brand-kit assets only.
- Alt text: Provide concise, descriptive, non-sensational descriptions (avoid unnecessary demographic labeling unless contextually required).

## I. Verification Snippets
```bash
identify -format "%f %wx%h\n" public/assets/brand/*.png | sort
find public/assets -type f -name '*.jpg' -size +1500k -print
for f in public/assets/{blog,products,general,testimonials}/*.jpg; do magick "$f" -quality 82 "${f%.*}.webp"; done
```

## J. Accessibility & Review Checklist
- Alt text describes purpose/context (not aesthetics only).
- Sufficient contrast if image contains text (overlay designs).
- Avoid using color alone for meaning.
- Manual review for representation, bias, artifacts, watermarking.

## K. Updating References in Code
After regenerating assets ensure:
- Layout OG paths align (`app/layout.tsx` uses `/assets/brand/og-image.jpg`).
- Manifest icons present (`android-chrome-192x192.png`, `android-chrome-512x512.png`, `apple-touch-icon.png`, favicons).
- Replace any legacy `logo.png` references with `logo-primary.png` if appropriate.

## L. Source Attribution
- OpenAI Images API (`gpt-image-1`)
- Google Gemini API – Imagen 4, Veo 3.1

---
Generated instructions prepared for integration. Please keep this file under version control and update if model endpoints or parameters change.
