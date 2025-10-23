# GitHub Secrets Setup Script for TGI Agency
# This script securely adds all required secrets to GitHub repository

Write-Host "Setting up GitHub Secrets for TGI Agency..." -ForegroundColor Cyan

# Repository
$repo = "shmindmaster/tgiagency"

# Non-sensitive secrets (can be in script)
gh secret set SUPABASE_URL --body "https://oohttpknzjchpdfogled.supabase.co" --repo $repo
gh secret set CLARITY_ID --body "tuauxik3ap" --repo $repo  
gh secret set NOTIFICATION_EMAIL --body "quotes@tgiagency.com" --repo $repo

Write-Host "✓ Set public configuration secrets" -ForegroundColor Green

# Sensitive secrets (read from environment or prompt)
Write-Host "`nAdding sensitive secrets from .env.local file..." -ForegroundColor Yellow

# Check if .env.local exists
if (Test-Path ".env.local") {
    Get-Content ".env.local" | ForEach-Object {
        if ($_ -match "^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)$") {
            gh secret set SUPABASE_ANON_KEY --body $matches[1] --repo $repo
            Write-Host "✓ Set SUPABASE_ANON_KEY" -ForegroundColor Green
        }
        elseif ($_ -match "^SUPABASE_SERVICE_ROLE_KEY=(.+)$") {
            gh secret set SUPABASE_SERVICE_ROLE_KEY --body $matches[1] --repo $repo
            Write-Host "✓ Set SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Green
        }
        elseif ($_ -match "^CLARITY_API_KEY=(.+)$") {
            gh secret set CLARITY_API_KEY --body $matches[1] --repo $repo
            Write-Host "✓ Set CLARITY_API_KEY" -ForegroundColor Green
        }
        elseif ($_ -match "^SENDGRID_API_KEY=(.+)$") {
            gh secret set SENDGRID_API_KEY --body $matches[1] --repo $repo
            Write-Host "✓ Set SENDGRID_API_KEY" -ForegroundColor Green
        }
    }
} else {
    Write-Host "ERROR: .env.local file not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your credentials first." -ForegroundColor Yellow
    exit 1
}

# Verify all secrets were added
Write-Host "`nVerifying secrets..." -ForegroundColor Cyan
gh secret list --repo $repo

Write-Host "`n✓ GitHub secrets setup complete!" -ForegroundColor Green
Write-Host "You can view them at: https://github.com/$repo/settings/secrets/actions" -ForegroundColor Cyan
