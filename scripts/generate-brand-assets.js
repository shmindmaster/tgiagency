/**
 * TGI Agency Brand Asset Generator
 *
 * Supports multiple AI image generation providers:
 * - OpenAI DALL-E 3 / GPT-Image-1 (high fidelity for logos, text, brands)
 * - Google Gemini 2.5 Flash Image (native multimodal image generation)
 * - Google Imagen 4 (specialized high-quality image generation)
 *
 * Generates missing brand assets:
 * 1. Logo Primary: /assets/brand/logo-primary.png
 * 2. Logo White: /assets/brand/logo-white.png
 * 3. Favicon: /assets/brand/icon-favicon.png
 */

import * as dotenv from 'dotenv';
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Configuration - prioritize OpenAI for logo/branding (better at text/logos)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// API URLs
const OPENAI_IMAGE_URL = 'https://api.openai.com/v1/images/generations';
const GEMINI_IMAGE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

// Ensure output directory exists
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'brand');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Validate API keys
if (!OPENAI_API_KEY && !GOOGLE_API_KEY) {
  console.error('❌ Error: No API keys found! Set either OPENAI_API_KEY or GOOGLE_API_KEY in .env file');
  process.exit(1);
}

const API_PROVIDER = OPENAI_API_KEY ? 'OpenAI GPT-Image-1' : 'Google Gemini Flash Image';
console.log(`🤖 Using: ${API_PROVIDER}\n`);

/**
 * Generate image using OpenAI DALL-E 3 / GPT-Image-1
 * Best for: Logos, branding, text-in-images, high fidelity
 */
async function generateWithOpenAI(prompt, size = '1024x1024') {
  console.log('  🎨 Calling OpenAI API...');

  const response = await fetch(OPENAI_IMAGE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1', // Latest model with high fidelity
      prompt: prompt,
      n: 1,
      size: size,
      quality: 'hd',
      response_format: 'b64_json'
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].b64_json;
}

/**
 * Generate image using Google Gemini 2.5 Flash Image
 * Best for: Fast generation, multimodal capabilities, conversational refinement
 */
async function generateWithGemini(prompt) {
  console.log('  🎨 Calling Google Gemini API...');

  const response = await fetch(`${GEMINI_IMAGE_URL}?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        responseModalities: ['image'],
        temperature: 0.4,
        topP: 0.95,
        topK: 40
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  // Extract image from response
  if (data.candidates && data.candidates[0].content.parts) {
    const imagePart = data.candidates[0].content.parts.find(p => p.inlineData);
    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    }
  }
  throw new Error('No image data in Gemini response');
}

/**
 * Generate image using appropriate API
 */
async function generateImage(prompt, type = 'logo') {
  if (OPENAI_API_KEY) {
    // Use OpenAI for better logo/text fidelity
    const size = type === 'favicon' ? '256x256' : '1024x1024';
    return await generateWithOpenAI(prompt, size);
  } else {
    // Fallback to Gemini
    return await generateWithGemini(prompt);
  }
}

async function generateAssets() {
  try {
    console.log('🚀 TGI Agency Brand Asset Generator\n');
    console.log(`📡 Provider: ${API_PROVIDER}`);
    console.log(`📁 Output: ${outputDir}\n`);

    // Enhanced prompts optimized for each asset type
    const prompts = {
      logo: `Create a professional, modern insurance agency logo for "Texas General Insurance" (TGI Agency).

CRITICAL REQUIREMENTS:
- Text "TGI" must be clearly visible and legible in a bold, modern sans-serif font
- Primary color: Navy blue (#002244) - conveys trust and professionalism
- Accent color: Burnt orange (#BF5700) - represents Texas heritage
- Include a subtle shield or Texas star icon integrated with the TGI letters
- Clean, minimalist design - corporate financial/insurance aesthetic
- Horizontal layout suitable for website header
- High contrast, professional appearance
- Works on both light backgrounds
- Vector-style clean lines, sharp edges
- NOT playful or casual - strictly professional business branding

Style: Corporate, trustworthy, modern, minimalist, insurance industry standard`,

      logoWhite: `Create a professional, modern insurance agency logo for "Texas General Insurance" (TGI Agency) - WHITE VERSION for dark backgrounds.

CRITICAL REQUIREMENTS:
- IDENTICAL design to primary logo but using white/light colors
- Text "TGI" must be clearly visible in white or very light gray
- Primary color: White (#FFFFFF) or light gray (#E8E8E8)
- Accent color: Light blue (#7BAFD4) - subtle accent for dark backgrounds
- Include the same shield or Texas star icon as primary logo, but in white
- Optimized for display on dark navy (#002244) backgrounds
- Clean, minimalist design - corporate financial/insurance aesthetic
- Horizontal layout suitable for dark website headers/footers
- High contrast against dark backgrounds
- Transparent background required
- Vector-style clean lines, sharp edges
- NOT playful or casual - strictly professional business branding

Style: Corporate, trustworthy, modern, minimalist, white-on-dark variant`,

      favicon: `Create a simple, minimalist favicon icon for "Texas General Insurance" (TGI Agency).

CRITICAL REQUIREMENTS:
- Simple monogram featuring just the letters "TGI" or "T"
- Navy blue (#002244) background
- White (#FFFFFF) or burnt orange (#BF5700) letters
- EXTREMELY simple - must be recognizable at 16x16 pixels
- Bold, thick letterforms for tiny size visibility
- Very high contrast for browser tab recognition
- Square format, centered composition
- Professional insurance/financial aesthetic
- Clean, corporate style
- NO complex details - keep it minimal for tiny sizes

Style: Minimalist icon, ultra-simple, high contrast, pixel-perfect at small sizes`
    };

    // 1. Generate Primary Logo
    console.log('📐 Generating primary logo (navy/orange)...');
    const logoBase64 = await generateImage(prompts.logo, 'logo');
    const logoBuffer = Buffer.from(logoBase64, "base64");
    const logoPath = path.join(outputDir, 'logo-primary.png');
    fs.writeFileSync(logoPath, logoBuffer);
    console.log(`  ✅ Saved: ${logoPath}\n`);

    // 2. Generate White Logo
    console.log('� Generating white logo variant (for dark backgrounds)...');
    const whiteLogoBase64 = await generateImage(prompts.logoWhite, 'logo');
    const whiteLogoBuffer = Buffer.from(whiteLogoBase64, "base64");
    const whiteLogoPath = path.join(outputDir, 'logo-white.png');
    fs.writeFileSync(whiteLogoPath, whiteLogoBuffer);
    console.log(`  ✅ Saved: ${whiteLogoPath}\n`);

    // 3. Generate Favicon
    console.log('🔷 Generating favicon icon...');
    const faviconBase64 = await generateImage(prompts.favicon, 'favicon');
    const faviconBuffer = Buffer.from(faviconBase64, "base64");
    const faviconPath = path.join(outputDir, 'icon-favicon.png');
    fs.writeFileSync(faviconPath, faviconBuffer);
    console.log(`  ✅ Saved: ${faviconPath}\n`);

    console.log('🎉 All brand assets generated successfully!\n');
    console.log('📋 Generated files:');
    console.log(`   • ${logoPath}`);
    console.log(`   • ${whiteLogoPath}`);
    console.log(`   • ${faviconPath}`);
    console.log('\n📋 Next steps:');
    console.log('1. Review generated assets in public/assets/brand/');
    console.log('2. If using SVG is required, convert PNG to SVG using:');
    console.log('   - https://www.pngtosvg.com/ (online)');
    console.log('   - Adobe Illustrator / Inkscape (desktop)');
    console.log('3. Optionally resize favicon to 32x32px for optimal browser display');
    console.log('4. Update app/layout.tsx if favicon path changed');
    console.log('5. Restart dev server: pnpm dev');
    console.log('6. Re-run QA tests to verify asset loading\n');

  } catch (error) {
    console.error('\n❌ Error generating assets:', error);
    if (error.message) {
      console.error('Details:', error.message);
    }

    console.log('\n💡 Troubleshooting:');
    if (!OPENAI_API_KEY && !GOOGLE_API_KEY) {
      console.log('- Set OPENAI_API_KEY or GOOGLE_API_KEY in .env file');
    }
    console.log('- Check API key validity and account status');
    console.log('- Verify network connectivity');
    console.log('- Check API rate limits');
    process.exit(1);
  }
}

// Run the generator
generateAssets();
