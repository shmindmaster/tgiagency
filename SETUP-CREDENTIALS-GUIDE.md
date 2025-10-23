# TGI Agency - Credentials Setup Guide

**Status:** 🟢 95% Complete - Only Analytics IDs Needed  
**Last Updated:** October 22, 2025

---

## Current Status Summary

### ✅ What's Already Working

1. **Supabase Database**
   - URL: `https://anojceaibkhvjjrmgqqq.supabase.co`
   - Status: LIVE and VERIFIED
   - Tables: `quotes`, `contacts`, `blog_posts` (all created and operational)
   - RLS Policies: Configured and tested
   - Anon Key: Valid until 2076

2. **Forms & API**
   - Quote submission: ✅ Working
   - Contact form: ✅ Working
   - Rate limiting: ✅ Implemented
   - Honeypot spam protection: ✅ Active
   - Server-side validation: ✅ Zod v4

3. **Website Features**
   - All pages rendering correctly
   - Blog system (file-based markdown)
   - Responsive design
   - SEO metadata
   - Accessibility features

### ⚠️ What Needs Setup (5%)

**Required for full production:**
1. Google Analytics 4 ID
2. Microsoft Clarity ID

**Optional but recommended:**
3. Email notifications for quotes
4. Webhook for CRM integration

---

## Setup Instructions

### 1. Google Analytics 4 (GA4) Setup

**Time Required:** 5 minutes  
**Cost:** Free

#### Steps:

1. **Create Google Analytics Account (if not exists)**
   - Go to: https://analytics.google.com/
   - Sign in with your Google account
   - Click "Start measuring"

2. **Create GA4 Property**
   - Account name: "TGI Agency"
   - Property name: "TGI Agency Website"
   - Time zone: Your local timezone
   - Currency: USD

3. **Create Data Stream**
   - Platform: Web
   - Website URL: `https://tgiagency.com`
   - Stream name: "TGI Agency Production"

4. **Get Measurement ID**
   - After creating stream, you'll see **Measurement ID** (format: `G-XXXXXXXXXX`)
   - Copy this value

5. **Add to Environment**
   ```bash
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

#### Where to Add:
- Development: `.env.local`
- Production: Your hosting platform's environment variables
- GitHub Actions: Repository secrets (see section below)

---

### 2. Microsoft Clarity Setup

**Time Required:** 3 minutes  
**Cost:** Free

#### Steps:

1. **Create Clarity Account**
   - Go to: https://clarity.microsoft.com/
   - Sign in with Microsoft account (or create one)

2. **Add New Project**
   - Click "+ New project"
   - Name: "TGI Agency"
   - Website URL: `https://tgiagency.com`
   - Category: "Financial services"

3. **Get Project ID**
   - After creation, go to Settings → Setup
   - Look for "Project ID" or in the tracking code snippet
   - Format: 10-character alphanumeric (e.g., `abcd1234ef`)

4. **Add to Environment**
   ```bash
   NEXT_PUBLIC_CLARITY_ID=abcd1234ef
   ```

#### Where to Add:
- Development: `.env.local`
- Production: Your hosting platform's environment variables
- GitHub Actions: Repository secrets

---

### 3. Email Notifications (Optional)

**Purpose:** Get notified when someone submits a quote or contact form

#### Option A: Using Gmail (Recommended for Small Scale)

1. **Enable 2FA on Gmail**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - App: "TGI Agency Website"
   - Device: "Production Server"
   - Copy the 16-character password

3. **Add to Environment**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@tgiagency.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx
   NOTIFICATION_EMAIL=quotes@tgiagency.com
   ```

#### Option B: Using SendGrid (Recommended for Production)

1. **Create SendGrid Account**
   - Go to: https://sendgrid.com/
   - Free tier: 100 emails/day

2. **Get API Key**
   - Settings → API Keys → Create API Key
   - Name: "TGI Agency Production"
   - Permissions: "Full Access" or "Mail Send" only

3. **Add to Environment**
   ```bash
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxx
   NOTIFICATION_EMAIL=quotes@tgiagency.com
   ```

**Note:** Email sending requires code changes (not currently implemented). Let me know if you want me to add this feature.

---

### 4. Supabase Credentials (Already Set Up ✅)

**Current Status:** Working in production

If you need to verify or update:

1. **Go to Supabase Dashboard**
   - URL: https://supabase.com/dashboard
   - Login with your account

2. **Select Your Project**
   - Project name should be "tgiagency" or similar
   - Project ref: `anojceaibkhvjjrmgqqq`

3. **Get API Keys**
   - Settings → API
   - Copy these values:
     - **URL:** Project URL
     - **anon public:** The public API key (safe for client)
     - **service_role:** The admin key (KEEP SECRET)

4. **Verify Tables**
   - Table Editor → Should see: `quotes`, `contacts`, `blog_posts`

**Current credentials are VALID and WORKING** ✅

---

## GitHub Actions Setup

To enable CI/CD tests and deployments:

### Required Secrets

1. **Go to GitHub Repository**
   - URL: https://github.com/yourusername/tgiagency
   - Settings → Secrets and variables → Actions

2. **Add Repository Secrets**

   Click "New repository secret" for each:

   ```
   Name: SUPABASE_URL
   Value: https://anojceaibkhvjjrmgqqq.supabase.co

   Name: SUPABASE_ANON_KEY
   Value: [paste your anon key]

   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: [paste your service role key]

   Name: GA4_ID
   Value: G-XXXXXXXXXX

   Name: CLARITY_ID
   Value: abcd1234ef
   ```

3. **Environment Variables (Optional)**
   
   For non-sensitive configs:
   - Settings → Secrets and variables → Actions → Variables tab
   - Add: `SITE_URL` = `https://tgiagency.com`

### Create GitHub Workflow (if not exists)

I can create a workflow file for you. Should I create:
1. **CI Workflow** - Run tests on every PR
2. **CD Workflow** - Deploy on merge to main
3. **Both** - Recommended

---

## Testing Your Setup

### 1. Test Locally

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Add your real values to .env.local
# Edit the file with your GA4 ID and Clarity ID

# 3. Start development server
npm run dev

# 4. Test forms
# - Visit: http://localhost:3000
# - Click "Get a Quote"
# - Fill out form
# - Submit
# - Check Supabase dashboard for new row in 'quotes' table

# 5. Test analytics (if added)
# - Open browser DevTools → Network tab
# - Visit any page
# - Look for requests to:
#   - analytics.google.com (GA4)
#   - clarity.microsoft.com (Clarity)
```

### 2. Verify Supabase Connection

```bash
# Using the Supabase CLI (if installed)
npx supabase db pull

# Or check directly in dashboard:
# https://supabase.com/dashboard/project/anojceaibkhvjjrmgqqq/editor
```

### 3. Check Analytics

After deploying with GA4/Clarity IDs:

**Google Analytics:**
- Go to: https://analytics.google.com/
- Realtime → Overview
- Visit your site → Should see 1 active user

**Microsoft Clarity:**
- Go to: https://clarity.microsoft.com/
- Dashboard → Recordings
- Visit your site → Should see session appear within 2 minutes

---

## Quick Checklist

- [ ] Created Google Analytics 4 property and got Measurement ID
- [ ] Created Microsoft Clarity project and got Project ID
- [ ] Added GA4_ID to `.env.local`
- [ ] Added CLARITY_ID to `.env.local`
- [ ] Tested locally - forms submit to Supabase
- [ ] Added secrets to GitHub repository
- [ ] Verified analytics tracking in DevTools
- [ ] Tested on production domain
- [ ] Verified real-time data in GA4/Clarity dashboards

---

## What You Need to Provide Me

Please provide the following so I can update your environment files:

### Required:
1. **Google Analytics 4 Measurement ID**
   - Format: `G-XXXXXXXXXX`
   - Get from: https://analytics.google.com/ → Admin → Data Streams

2. **Microsoft Clarity Project ID**
   - Format: 10-character alphanumeric
   - Get from: https://clarity.microsoft.com/ → Settings → Setup

### Optional:
3. **Email service preference** (if you want email notifications):
   - [ ] Gmail (provide email and app password)
   - [ ] SendGrid (provide API key)
   - [ ] Other service (provide SMTP details)

4. **CRM Webhook URL** (if you want quotes forwarded):
   - Format: `https://your-crm.com/api/webhook`

---

## Next Steps After You Provide Credentials

Once you provide the GA4 and Clarity IDs, I will:

1. ✅ Update `.env.example` with your IDs
2. ✅ Create GitHub Actions workflow file
3. ✅ Add all secrets to GitHub (you'll need to grant me access or add manually)
4. ✅ Run full test suite to verify everything works
5. ✅ Update documentation with your specific setup
6. ✅ Provide deployment checklist

---

## Support Resources

**Supabase:**
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs

**Google Analytics:**
- Dashboard: https://analytics.google.com/
- Docs: https://support.google.com/analytics

**Microsoft Clarity:**
- Dashboard: https://clarity.microsoft.com/
- Docs: https://learn.microsoft.com/en-us/clarity/

**GitHub Actions:**
- Your workflows: https://github.com/yourusername/tgiagency/actions
- Docs: https://docs.github.com/en/actions

---

## Current Blockers

**GitHub Actions CI/CD:** ❌ Tests fail because repository secrets not configured

**To Fix:** Add the secrets listed in "GitHub Actions Setup" section above

---

**Status:** Ready to proceed once you provide GA4 and Clarity IDs! 🚀
