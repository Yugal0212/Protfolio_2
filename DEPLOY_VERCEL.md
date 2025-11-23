# Deploying to Vercel (Free Tier)

This guide shows simple, reliable steps to deploy this Next.js portfolio to Vercel using their free tier. Vercel auto-detects Next.js apps, so deployment is fast.

Option A — Deploy via the Vercel Web UI (recommended)
1. Push your repository to GitHub (or GitLab/Bitbucket).
2. Go to https://vercel.com and sign up or log in.
3. Click **New Project** → **Import Git Repository** and select your repo.
4. Vercel will detect `Next.js`. Default settings are usually correct:
   - Framework: `Next.js`
   - Root Directory: `/` (leave blank if the project root)
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: (leave blank; Vercel uses Next.js output)
5. Add environment variables if you use any (this project currently doesn't require any).
6. Click **Deploy**. Vercel will run the install + build and provide a preview URL.

Option B — Deploy with Vercel CLI (useful for local preview and linking)
1. Install Vercel CLI:
   ```powershell
   npm i -g vercel
   ```
2. From the project root run:
   ```powershell
   vercel login
   vercel           ; # follow prompts to link or create a new project
   vercel --prod    ; # deploy to production
   ```

Notes and tips
- The `public/` folder is served as static assets — make sure `public/Yugal_jakasaniya_resume.pdf` is committed so it is available at `/Yugal_jakasaniya_resume.pdf`.
- `.vercel` is ignored by `.gitignore`. That's fine; Vercel stores project metadata in their dashboard.
- If you change build settings, update them in the Vercel project settings in the dashboard.
- For custom domains, add them in the Vercel project settings and follow the DNS instructions.

## Free Vercel Analytics & Monitoring

Your portfolio includes **free** Vercel Analytics and Speed Insights to track users and performance:

### What You Get for Free:
1. **Analytics** (tracks user behavior)
   - Page views and visits
   - Top pages by traffic
   - Referrer sources (where users come from)
   - Unique visitors count
   - Real-time data

2. **Speed Insights** (performance monitoring)
   - Real User Monitoring (RUM) scores
   - Core Web Vitals (LCP, FID, CLS)
   - Performance scores per page
   - Mobile vs Desktop performance
   - Geographic performance data

### How to Access Analytics:
1. Go to https://vercel.com/dashboard
2. Select your deployed project
3. Click the **Analytics** tab to see:
   - Total page views
   - Unique visitors
   - Top pages
   - Traffic sources
   - Geographic distribution
4. Click the **Speed Insights** tab to see:
   - Performance scores
   - Core Web Vitals
   - Page load times
   - Recommendations

### Free Tier Limits:
- Analytics: Up to 100k events/month (enough for most portfolios)
- Speed Insights: Unlimited real user monitoring
- Both features are **completely free** on Vercel's Hobby plan

The analytics are already installed in your app (`app/layout.tsx`) and will start tracking automatically once deployed!

Troubleshooting
- Build errors: open the Vercel build logs and check the reported errors. Run `npm run build` locally to reproduce issues.
- Missing static files: ensure files are inside the `public/` folder and committed to the repo.

That's it — once deployed, your site will be hosted on a Vercel domain. Want me to add a GitHub Actions workflow or a README badge showing the Vercel deployment status?