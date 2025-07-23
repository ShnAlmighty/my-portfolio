# Deployment Guide

This document provides instructions for deploying the portfolio website to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Vercel CLI](https://vercel.com/docs/cli) installed globally: `npm i -g vercel`
3. An [EmailJS](https://www.emailjs.com/) account for the contact form

## Environment Variables

The following environment variables need to be set up in your Vercel project:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- `NEXT_PUBLIC_SITE_URL`: Your website's URL (e.g., https://shantanupatnaik.dev)

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in the Vercel dashboard
3. Push changes to the main branch to trigger automatic deployment

### Method 2: Manual Deployment via CLI

1. Create a `.env` file based on `.env.example` and fill in your values
2. Run the deployment script:
   ```
   npm run deploy
   ```

### Method 3: Manual Deployment via Vercel Dashboard

1. Build the project locally:
   ```
   npm run build
   ```
2. Upload the `.next` folder to Vercel via the dashboard

## Custom Domain Setup

1. Purchase a domain from a domain registrar
2. Add the domain in your Vercel project settings
3. Configure DNS settings as instructed by Vercel
4. Vercel will automatically provision an SSL certificate

## CI/CD Pipeline

This project includes a GitHub Actions workflow for CI/CD:

1. On pull requests: Runs linting and builds the project
2. On merges to main: Deploys to Vercel production

To set up the CI/CD pipeline, add these secrets to your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- `NEXT_PUBLIC_SITE_URL`: Your website's URL

## Troubleshooting

- **Build Failures**: Check the Vercel build logs for errors
- **Contact Form Issues**: Verify EmailJS credentials and template configuration
- **Performance Issues**: Run `npm run analyze` to identify bundle size problems