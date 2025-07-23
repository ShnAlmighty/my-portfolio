/**
 * Script to optimize images in the public directory
 * 
 * Usage:
 * node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const QUALITY = 80;

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('Sharp is not installed. Please install it with: npm install sharp');
  process.exit(1);
}

// Function to optimize an image
async function optimizeImage(filePath) {
  const sharp = require('sharp');
  const ext = path.extname(filePath).toLowerCase();
  const outputPath = filePath;
  
  console.log(`Optimizing: ${filePath}`);
  
  try {
    let image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if the image is too large
    if (metadata.width > 1920) {
      image = image.resize(1920);
    }
    
    // Apply appropriate compression based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg({ quality: QUALITY }).toFile(outputPath + '.tmp');
    } else if (ext === '.png') {
      await image.png({ quality: QUALITY }).toFile(outputPath + '.tmp');
    } else if (ext === '.webp') {
      await image.webp({ quality: QUALITY }).toFile(outputPath + '.tmp');
    }
    
    // Replace the original file
    fs.unlinkSync(filePath);
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

// Function to walk through the directory and find images
function findImages(dir) {
  const files = fs.readdirSync(dir);
  const images = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      images.push(...findImages(filePath));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      images.push(filePath);
    }
  }
  
  return images;
}

// Main function
async function main() {
  console.log('Finding images to optimize...');
  const images = findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images.`);
  
  if (images.length === 0) {
    console.log('No images to optimize.');
    return;
  }
  
  console.log('Optimizing images...');
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('Done!');
}

// Run the script
main().catch(console.error);