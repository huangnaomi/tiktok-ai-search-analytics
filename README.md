# TikTok Search Analytics — AI Diagnostic Tool

A product concept prototype demonstrating AI-powered search analytics for TikTok Studio.

## What this is

A working prototype of a "Search Analytics" tab for TikTok Studio that doesn't exist yet.
Built to demonstrate the product concept for a TikTok AI PM role application.

**Features:**
- Per-video search analytics dashboard
- Live-editable data table (click any number to change it)
- AI diagnosis powered by Gemini — reads whatever numbers are currently in the table
- Search vs. FYP viewer behavior comparison

## Project structure

```
tiktok-search-analytics/
  index.html       ← the entire frontend (UI + logic)
  api/
    diagnose.js    ← Vercel serverless proxy (keeps API key secret)
  README.md
```

## Setup

### 1. Get a free Gemini API key
- Go to aistudio.google.com
- Sign in with Google
- Click "Get API key" → "Create API key"
- Copy the key

### 2. Deploy to Vercel
- Push this repo to GitHub
- Go to vercel.com and import the repo
- In Vercel project settings → Environment Variables, add:
  - Name: `GEMINI_API_KEY`
  - Value: your key from step 1
- Deploy

### 3. Open the live URL
Vercel gives you a URL like `yourproject.vercel.app` — open it and click Run Diagnosis.
