# TechBucket Website - Complete Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Supabase Database Setup](#supabase-database-setup)
4. [Render Deployment](#render-deployment)
5. [Cloudflare DNS Configuration](#cloudflare-dns-configuration)
6. [Environment Variables](#environment-variables)
7. [Post-Deployment Testing](#post-deployment-testing)
8. [Troubleshooting](#troubleshooting)
9. [Maintenance](#maintenance)

---

## Prerequisites

Before starting the deployment process, ensure you have:

- A GitHub account (https://github.com)
- A Supabase account (https://supabase.com)
- A Render account (https://render.com)
- A Cloudflare account (https://cloudflare.com)
- Git installed on your local machine
- Node.js 18+ installed
- pnpm package manager installed

### Install Required Tools

```bash
# Install Node.js (if not already installed)
# Visit https://nodejs.org and download LTS version

# Install pnpm globally
npm install -g pnpm

# Install Git (if not already installed)
# Visit https://git-scm.com
```

---

## GitHub Setup

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `techbucket-website`
3. Add description: "TechBucket Pvt Ltd - Modern IT Solutions Website"
4. Choose **Public** or **Private** (recommend Private for security)
5. Click **"Create repository"**

### Step 2: Initialize Git and Push Code

```bash
# Navigate to project directory
cd /home/ubuntu/techbucket-website

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: TechBucket website with admin panel, products, services, and contact forms"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/techbucket-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Create .gitignore

Create a `.gitignore` file in the project root:

```
# Dependencies
node_modules/
pnpm-lock.yaml
yarn.lock
package-lock.json

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.next/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Database
*.db
*.sqlite
*.sqlite3

# Temporary files
tmp/
temp/
```

### Step 4: Protect Main Branch (Optional but Recommended)

1. Go to your GitHub repository
2. Click **Settings**
3. Go to **Branches**
4. Click **Add rule** under "Branch protection rules"
5. Set branch name pattern to `main`
6. Enable "Require pull request reviews before merging"
7. Click **Create**

---

## Supabase Database Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **"New Project"**
3. Fill in the project details:
   - **Project name**: `techbucket-prod`
   - **Database password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
4. Click **"Create new project"**
5. Wait for project initialization (5-10 minutes)

### Step 2: Get Database Connection String

1. In Supabase dashboard, click **"Settings"** (gear icon)
2. Go to **"Database"**
3. Under "Connection string", select **"URI"**
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password
6. Save this for later use

### Step 3: Create Database Tables

1. In Supabase, click **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste the schema from your project's `drizzle/schema.ts`
4. Execute the query

Alternatively, use Drizzle Kit to push migrations:

```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="your-supabase-connection-string"

# Push migrations
pnpm db:push
```

### Step 4: Create Admin User

1. In Supabase, go to **"SQL Editor"**
2. Create a new query to insert default admin:

```sql
INSERT INTO admin_credentials (username, password_hash, email, is_active)
VALUES ('admin', '$2b$10$YOUR_HASHED_PASSWORD', 'admin@techbucket.com.np', true);
```

To generate a hashed password, use:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin', 10));"
```

---

## Render Deployment

### Step 1: Connect Render to GitHub

1. Go to https://render.com
2. Sign up or log in
3. Click **"New +"** and select **"Web Service"**
4. Click **"Connect a repository"**
5. Authorize Render to access your GitHub account
6. Select your `techbucket-website` repository

### Step 2: Configure Web Service

1. Fill in the service configuration:

   **Basic Information:**
   - **Name**: `techbucket-website`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`

   **Build Command:**
   ```
   pnpm install && pnpm build
   ```

   **Start Command:**
   ```
   pnpm start
   ```

2. Click **"Create Web Service"**

### Step 3: Add Environment Variables

1. In your Render service dashboard, go to **"Environment"**
2. Add the following environment variables:

   ```
   DATABASE_URL=your-supabase-connection-string
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=production
   
   # Email Configuration
   EMAIL_USER=ashim@techbucket.com.np
   EMAIL_PASSWORD=Uzumaki@123
   
   # OAuth Configuration (if using Manus OAuth)
   VITE_APP_ID=your-app-id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
   
   # Admin Email
   ADMIN_EMAIL=sales@techbucket.com.np
   ```

3. Click **"Save"**

### Step 4: Deploy

1. Render will automatically deploy when you push to GitHub
2. Monitor the deployment in the **"Logs"** tab
3. Once deployment is complete, you'll see a green checkmark

### Step 5: Get Your Render URL

1. In your service dashboard, you'll see a URL like: `https://techbucket-website.onrender.com`
2. Save this URL for DNS configuration

---

## Cloudflare DNS Configuration

### Step 1: Add Your Domain to Cloudflare

1. Go to https://cloudflare.com
2. Click **"Add a Site"**
3. Enter your domain (e.g., `techbucket.com.np`)
4. Select your plan (Free plan is sufficient)
5. Cloudflare will scan your DNS records
6. Update your domain registrar's nameservers to Cloudflare's nameservers

### Step 2: Configure DNS Records

1. In Cloudflare dashboard, go to **"DNS"**
2. Add the following records:

   **For Render deployment:**
   - **Type**: CNAME
   - **Name**: `www`
   - **Target**: `techbucket-website.onrender.com`
   - **TTL**: Auto
   - **Proxy status**: Proxied (orange cloud)

   **Root domain (optional, for apex domain):**
   - **Type**: CNAME
   - **Name**: `@` (or your domain name)
   - **Target**: `techbucket-website.onrender.com`
   - **TTL**: Auto
   - **Proxy status**: Proxied

3. Click **"Save"**

### Step 3: Enable SSL/TLS

1. In Cloudflare, go to **"SSL/TLS"**
2. Select **"Flexible"** or **"Full"** (Full is recommended)
3. This ensures HTTPS encryption

### Step 4: Configure Page Rules (Optional)

1. Go to **"Rules"** → **"Page Rules"**
2. Add rules for caching and performance optimization:
   - Cache everything for static assets
   - Set cache TTL appropriately

### Step 5: Test Your Domain

1. Wait 24-48 hours for DNS propagation
2. Visit `https://yourdomain.com`
3. Verify the site loads correctly
4. Check SSL certificate is valid

---

## Environment Variables

### Complete Environment Variables List

Create a `.env.production` file with all required variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT & Security
JWT_SECRET=your-very-long-random-secret-key-min-32-chars

# Email Configuration (Zoho Mail)
EMAIL_USER=ashim@techbucket.com.np
EMAIL_PASSWORD=Uzumaki@123
EMAIL_FROM=ashim@techbucket.com.np
ADMIN_EMAIL=sales@techbucket.com.np

# Node Environment
NODE_ENV=production
PORT=3000

# OAuth (if using Manus)
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# Site Configuration
SITE_URL=https://yourdomain.com
SITE_NAME=TechBucket Pvt Ltd

# Optional: Analytics
ANALYTICS_ID=your-analytics-id
```

### Generating Secure Secrets

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate other secrets
openssl rand -base64 32
```

---

## Post-Deployment Testing

### Step 1: Verify Website Accessibility

1. Visit your domain: `https://yourdomain.com`
2. Check homepage loads correctly
3. Test navigation to all pages
4. Verify responsive design on mobile

### Step 2: Test Admin Panel

1. Go to `https://yourdomain.com/admin/login`
2. Log in with credentials:
   - Username: `admin`
   - Password: `admin` (or your custom password)
3. Test CRUD operations:
   - Create a test product
   - Edit the product
   - Delete the product
   - Repeat for services

### Step 3: Test Forms

1. **Quote Request**:
   - Go to a product page
   - Click "Get Quote"
   - Fill and submit form
   - Verify email received at `sales@techbucket.com.np`

2. **Contact Form**:
   - Go to contact page
   - Fill and submit form
   - Verify email received

3. **Support Form**:
   - Go to support page
   - Fill and submit form
   - Verify email received

### Step 4: Test Email Notifications

1. Submit a quote request
2. Check email inbox at `sales@techbucket.com.np`
3. Verify email contains correct information
4. Repeat for contact and support forms

### Step 5: Performance Testing

1. Use Google PageSpeed Insights: https://pagespeed.web.dev
2. Test on mobile and desktop
3. Aim for scores above 80
4. Optimize images if needed

### Step 6: SEO Testing

1. Check meta tags with browser inspector
2. Verify sitemap.xml is accessible
3. Test robots.txt
4. Submit sitemap to Google Search Console

---

## Troubleshooting

### Deployment Issues

#### Build Fails on Render

**Problem**: Build command fails with errors

**Solution**:
1. Check build logs in Render dashboard
2. Verify all dependencies are listed in `package.json`
3. Ensure environment variables are set correctly
4. Try building locally: `pnpm build`
5. Fix any errors and push to GitHub

#### Application Crashes After Deployment

**Problem**: Service shows as "crashed" or "failed"

**Solution**:
1. Check Render logs for error messages
2. Verify DATABASE_URL is correct
3. Ensure all required environment variables are set
4. Check database connection
5. Review application logs

#### DNS Not Resolving

**Problem**: Domain doesn't resolve to your site

**Solution**:
1. Verify DNS records in Cloudflare
2. Check nameservers at domain registrar
3. Wait for DNS propagation (up to 48 hours)
4. Use `nslookup` to verify DNS:
   ```bash
   nslookup yourdomain.com
   ```

### Email Issues

#### Emails Not Sending

**Problem**: Quote/contact/support forms submitted but no emails received

**Solution**:
1. Verify email credentials are correct
2. Check spam/junk folder
3. Verify ADMIN_EMAIL environment variable
4. Check Zoho Mail settings allow SMTP access
5. Review application logs for email errors

#### Emails Going to Spam

**Problem**: Emails are being marked as spam

**Solution**:
1. Add SPF record to DNS:
   ```
   v=spf1 include:zoho.com ~all
   ```
2. Add DKIM record (get from Zoho Mail settings)
3. Add DMARC record:
   ```
   v=DMARC1; p=none; rua=mailto:admin@yourdomain.com
   ```

### Database Issues

#### Cannot Connect to Database

**Problem**: "Database connection failed" error

**Solution**:
1. Verify DATABASE_URL is correct
2. Check database is running
3. Verify firewall allows connections
4. Test connection string locally
5. Check Supabase dashboard for issues

#### Migrations Not Applied

**Problem**: Database tables don't exist

**Solution**:
1. Run migrations manually:
   ```bash
   pnpm db:push
   ```
2. Check migration logs
3. Verify database user has permissions
4. Check for migration errors in logs

---

## Maintenance

### Regular Tasks

#### Weekly

- Check admin panel for new submissions
- Review and respond to quote requests
- Monitor application logs
- Test key functionality

#### Monthly

- Review and update products/services
- Check email delivery status
- Review analytics and performance
- Update security patches

#### Quarterly

- Full security audit
- Database backup verification
- Performance optimization review
- Update dependencies

### Backup Strategy

#### Database Backups

1. Supabase automatically backs up your database
2. Access backups in Supabase dashboard
3. Configure backup retention period
4. Test restore procedures regularly

#### Code Backups

1. GitHub serves as your code backup
2. Maintain regular commits
3. Tag releases: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tags: `git push origin --tags`

### Monitoring

#### Set Up Alerts

1. **Render**: Enable email notifications for deployment failures
2. **Cloudflare**: Monitor DNS and SSL status
3. **Supabase**: Set up database alerts
4. **Email**: Monitor email delivery rates

#### Check Logs Regularly

- Render application logs
- Supabase database logs
- Email service logs
- Browser console for frontend errors

### Updates and Patches

#### Update Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update packages
pnpm update

# Test thoroughly before deploying
pnpm test
pnpm build

# Commit and push
git add .
git commit -m "Update dependencies"
git push origin main
```

#### Security Updates

- Monitor security advisories
- Apply critical patches immediately
- Test updates in development first
- Document all changes

---

## Rollback Procedure

If something goes wrong after deployment:

### Option 1: Render Rollback

1. Go to Render dashboard
2. Click on your service
3. Go to **"Deployments"**
4. Find the previous successful deployment
5. Click **"Rollback"**

### Option 2: Manual Rollback

```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Push to GitHub
git push origin main

# Render will automatically redeploy
```

---

## Support and Resources

### Documentation

- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Cloudflare Docs**: https://developers.cloudflare.com
- **Drizzle ORM**: https://orm.drizzle.team

### Getting Help

1. Check application logs
2. Review this guide's troubleshooting section
3. Contact your hosting provider support
4. Check community forums and Stack Overflow

### Emergency Contacts

- **Render Support**: https://render.com/support
- **Supabase Support**: https://supabase.com/support
- **Cloudflare Support**: https://support.cloudflare.com

---

## Checklist for Successful Deployment

- [ ] GitHub repository created and code pushed
- [ ] Supabase project created with database tables
- [ ] Admin user created in database
- [ ] Render web service configured
- [ ] Environment variables set in Render
- [ ] Domain added to Cloudflare
- [ ] DNS records configured
- [ ] SSL/TLS enabled
- [ ] Website accessible via domain
- [ ] Admin panel accessible and working
- [ ] Forms tested and emails verified
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Documentation reviewed

---

**Last Updated**: January 2026
**Version**: 1.0
**Maintained By**: TechBucket Development Team
