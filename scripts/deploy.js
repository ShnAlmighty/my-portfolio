/**
 * Deployment script for the portfolio website
 * 
 * This script helps with manual deployments to Vercel
 * It checks for required environment variables before deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: .env file not found!');
  console.log('\x1b[33m%s\x1b[0m', `Please create a .env file based on the .env.example template.`);
  console.log(`You can copy the example file using: cp ${envExamplePath} ${envPath}`);
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');

// Extract required variables from .env.example
const requiredVars = envExampleContent
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(line => line.split('=')[0]);

// Check if all required variables are set
const missingVars = [];
for (const varName of requiredVars) {
  if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=`)) {
    missingVars.push(varName);
  }
}

if (missingVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`- ${varName}`);
  });
  console.log('\x1b[33m%s\x1b[0m', 'Please set these variables in your .env file before deploying.');
  process.exit(1);
}

// Run build
console.log('\x1b[36m%s\x1b[0m', '🔨 Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Build failed!');
  process.exit(1);
}

// Deploy to Vercel
console.log('\x1b[36m%s\x1b[0m', '🚀 Deploying to Vercel...');
try {
  execSync('npx vercel --prod', { stdio: 'inherit' });
  console.log('\x1b[32m%s\x1b[0m', '✅ Deployment successful!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Deployment failed!');
  process.exit(1);
}