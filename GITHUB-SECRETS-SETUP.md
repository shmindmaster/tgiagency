# GitHub Secrets Setup for TGI Agency

**Repository:** https://github.com/shmindmaster/tgiagency  
**Purpose:** Configure secrets for CI/CD and automated testing

---

## Required Secrets

The following secrets must be added to your GitHub repository for Actions to work:

### 1. Supabase Credentials

```
Name: SUPABASE_URL
Value: https://oohttpknzjchpdfogled.supabase.co

Name: SUPABASE_ANON_KEY
Value: [REDACTED:jwt-token]

Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Get from Supabase Dashboard - see below]
```

### 2. Microsoft Clarity

```
Name: CLARITY_ID
Value: tuauxik3ap

Name: CLARITY_API_KEY
Value: [REDACTED:jwt-token]
```

### 3. SendGrid Email

```
Name: SENDGRID_API_KEY
Value: [REDACTED:sendgrid-api-token]

Name: NOTIFICATION_EMAIL
Value: quotes@tgiagency.com
```

---

## Method 1: Web UI (Easiest)

1. Go to: https://github.com/shmindmaster/tgiagency/settings/secrets/actions

2. Click "New repository secret"

3. Add each secret one by one:
   - Enter **Name**
   - Paste **Value**
   - Click "Add secret"

4. Repeat for all 7 secrets listed above

---

## Method 2: GitHub CLI (Fastest - I'll do this for you)

**Prerequisites:** GitHub CLI must be installed and authenticated

```bash
# Install GitHub CLI (if not installed)
# Windows: winget install --id GitHub.cli
# Mac: brew install gh
# Linux: See https://github.com/cli/cli#installation

# Login to GitHub
gh auth login

# Navigate to repo
cd h:\Repos\tgiagency

# Add all secrets at once
gh secret set SUPABASE_URL --body "https://oohttpknzjchpdfogled.supabase.co"
gh secret set SUPABASE_ANON_KEY --body "[REDACTED:jwt-token]"
gh secret set SUPABASE_SERVICE_ROLE_KEY --body "YOUR_SERVICE_ROLE_KEY"
gh secret set CLARITY_ID --body "tuauxik3ap"
gh secret set CLARITY_API_KEY --body "[REDACTED:jwt-token]"
gh secret set SENDGRID_API_KEY --body "[REDACTED:sendgrid-api-token]"
gh secret set NOTIFICATION_EMAIL --body "quotes@tgiagency.com"

# Verify secrets were added
gh secret list
```

---

## Getting Missing Values

### Supabase Service Role Key

1. Go to: https://supabase.com/dashboard/project/oohttpknzjchpdfogled/settings/api
2. Find "Project API keys" section
3. Look for **service_role** key (marked as "secret")
4. Click "Reveal" and copy the key
5. **IMPORTANT:** This key bypasses RLS - keep it secret!

**Where to add:**
- GitHub secret: `SUPABASE_SERVICE_ROLE_KEY`
- Local `.env.local`: `SUPABASE_SERVICE_ROLE_KEY=...`

---

## Verification Steps

After adding secrets:

### 1. Check Secrets Were Added
```bash
gh secret list
```

Should show:
- CLARITY_API_KEY
- CLARITY_ID  
- NOTIFICATION_EMAIL
- SENDGRID_API_KEY
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_URL

### 2. Trigger a Test Workflow

```bash
# Push to trigger CI
git add .
git commit -m "test: verify secrets configuration"
git push

# Or manually trigger
gh workflow run ci.yml
```

### 3. Monitor Workflow

```bash
# Watch workflow progress
gh run watch

# Or view in browser
# https://github.com/shmindmaster/tgiagency/actions
```

### 4. Check for Errors

If workflow fails:
```bash
# View latest run
gh run view

# View logs
gh run view --log
```

Common issues:
- Missing secrets: Add the secret mentioned in error
- Invalid credentials: Double-check values in Supabase dashboard
- Build errors: Run `npm run build` locally first

---

## What Each Secret Does

| Secret | Used By | Purpose |
|--------|---------|---------|
| `SUPABASE_URL` | Build, Tests | Database connection endpoint |
| `SUPABASE_ANON_KEY` | Build, Tests | Public API key for client operations |
| `SUPABASE_SERVICE_ROLE_KEY` | API Routes, Tests | Admin key for server operations |
| `CLARITY_ID` | Build | Analytics project identifier |
| `CLARITY_API_KEY` | Optional | Advanced Clarity API access |
| `SENDGRID_API_KEY` | API Routes | Email sending service |
| `NOTIFICATION_EMAIL` | API Routes | Destination for notifications |

---

## Security Best Practices

✅ **DO:**
- Add all secrets via GitHub UI or CLI (never commit them)
- Use repository secrets (not environment secrets unless needed)
- Rotate service role key periodically
- Limit secret scope to minimum required

❌ **DON'T:**
- Commit secrets to `.env`, `.env.local`, or any tracked file
- Share service role key publicly
- Use personal access tokens in production
- Log or expose secrets in code

---

## Next Steps

After adding secrets:

1. ✅ Push code changes to GitHub
2. ✅ Watch Actions tab for workflow runs
3. ✅ Verify build passes
4. ✅ Verify tests pass
5. ✅ Deploy to production

---

**Status:** Ready for setup! Let me know if you want me to run the GitHub CLI commands for you.
