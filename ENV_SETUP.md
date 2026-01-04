# Environment Variables Setup Guide

Complete guide to configuring environment variables for TechBucket website.

## Overview

Environment variables store sensitive information and configuration settings. They should never be committed to version control.

## File Structure

```
techbucket-website/
├── .env.example          # Template with all variables (commit this)
├── .env.local            # Local development (DO NOT commit)
├── .env.production       # Production settings (use in Render/hosting)
└── .gitignore            # Includes .env files
```

## Setup Steps

### 1. Create .env.local for Development

```bash
# Copy template
cp .env.example .env.local

# Edit with your values
nano .env.local  # or use your editor
```

### 2. Required Variables

#### Database

```
DATABASE_URL=mysql://user:password@localhost:3306/techbucket
```

**For Supabase:**
```
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
```

**For Local MySQL:**
```
DATABASE_URL=mysql://root:password@localhost:3306/techbucket
```

#### Email (Zoho Mail)

```
EMAIL_USER=ashim@techbucket.com.np
EMAIL_PASSWORD=Uzumaki@123
EMAIL_FROM=ashim@techbucket.com.np
ADMIN_EMAIL=sales@techbucket.com.np
```

#### Security

```
JWT_SECRET=your-very-long-random-secret-key-minimum-32-characters
```

Generate with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Node Environment

```
NODE_ENV=development  # or production
PORT=3000
```

### 3. Optional Variables

#### OAuth (Manus)

```
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Admin User
```

#### Site Configuration

```
SITE_URL=http://localhost:3000
SITE_NAME=TechBucket Pvt Ltd
```

#### Analytics

```
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

#### Forge API (Manus)

```
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-api-key
```

#### Branding

```
VITE_APP_TITLE=TechBucket
VITE_APP_LOGO=https://techbucket.com.np/logo.png
```

## Complete .env.local Example

```bash
# ============ DATABASE ============
DATABASE_URL=mysql://root:password@localhost:3306/techbucket

# ============ SECURITY ============
JWT_SECRET=your-very-long-random-secret-key-minimum-32-characters

# ============ EMAIL (ZOHO MAIL) ============
EMAIL_USER=ashim@techbucket.com.np
EMAIL_PASSWORD=Uzumaki@123
EMAIL_FROM=ashim@techbucket.com.np
ADMIN_EMAIL=sales@techbucket.com.np

# ============ NODE ============
NODE_ENV=development
PORT=3000

# ============ SITE ============
SITE_URL=http://localhost:3000
SITE_NAME=TechBucket Pvt Ltd

# ============ OAUTH (OPTIONAL) ============
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Admin User

# ============ BRANDING ============
VITE_APP_TITLE=TechBucket
VITE_APP_LOGO=https://techbucket.com.np/logo.png

# ============ ANALYTICS (OPTIONAL) ============
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# ============ FORGE API (OPTIONAL) ============
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-api-key
```

## Production Setup (Render)

### Step 1: Create .env.production

```bash
cp .env.example .env.production
```

### Step 2: Fill Production Values

```bash
# Use production database
DATABASE_URL=postgresql://user:pass@prod-db.supabase.co:5432/postgres

# Use strong JWT secret
JWT_SECRET=your-production-secret-key-very-long-and-random

# Email settings
EMAIL_USER=ashim@techbucket.com.np
EMAIL_PASSWORD=Uzumaki@123
ADMIN_EMAIL=sales@techbucket.com.np

# Production environment
NODE_ENV=production
PORT=3000

# Production URL
SITE_URL=https://yourdomain.com
```

### Step 3: Add to Render Dashboard

1. Go to Render dashboard
2. Select your service
3. Click "Environment"
4. Add all variables from .env.production
5. Click "Save"

## Database Connection Strings

### MySQL Local

```
DATABASE_URL=mysql://root:password@localhost:3306/techbucket
```

### MySQL Remote

```
DATABASE_URL=mysql://user:password@host.com:3306/database_name
```

### PostgreSQL (Supabase)

```
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
```

### PostgreSQL Remote

```
DATABASE_URL=postgresql://user:password@host.com:5432/database_name
```

## Email Configuration

### Zoho Mail SMTP

- **Host**: smtp.zoho.com
- **Port**: 465 (SSL)
- **Username**: ashim@techbucket.com.np
- **Password**: Uzumaki@123

### Gmail SMTP

- **Host**: smtp.gmail.com
- **Port**: 587 (TLS)
- **Username**: your-email@gmail.com
- **Password**: app-specific-password

### Other Providers

Check your email provider's SMTP settings.

## Generating Secure Secrets

### Generate JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -base64 32

# Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Generate API Keys

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"

# Using OpenSSL
openssl rand -base64 24
```

## Variable Types

### String Variables

```
EMAIL_USER=ashim@techbucket.com.np
SITE_NAME=TechBucket Pvt Ltd
```

### URL Variables

```
DATABASE_URL=mysql://user:pass@localhost:3306/db
SITE_URL=https://yourdomain.com
```

### Numeric Variables

```
PORT=3000
```

### Boolean Variables (as strings)

```
NODE_ENV=production
```

## Accessing Variables in Code

### Frontend (React)

```typescript
// Only variables prefixed with VITE_ are accessible
const appId = import.meta.env.VITE_APP_ID;
const siteUrl = import.meta.env.VITE_APP_TITLE;
```

### Backend (Node.js)

```typescript
// All variables accessible
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const emailUser = process.env.EMAIL_USER;
```

## Security Best Practices

### Do's ✅

- ✅ Use strong, random secrets
- ✅ Store sensitive data in environment variables
- ✅ Use different values for dev and production
- ✅ Rotate secrets periodically
- ✅ Use .gitignore to prevent committing .env files
- ✅ Use environment-specific files (.env.local, .env.production)

### Don'ts ❌

- ❌ Don't commit .env files to Git
- ❌ Don't share secrets via email or chat
- ❌ Don't use same secrets for dev and production
- ❌ Don't hardcode secrets in code
- ❌ Don't use weak or obvious secrets
- ❌ Don't expose secrets in logs

## Troubleshooting

### Variable Not Found

**Problem**: "process.env.VARIABLE_NAME is undefined"

**Solution**:
1. Check variable is in .env.local
2. Restart development server
3. Check variable name spelling
4. For frontend, ensure variable starts with VITE_

### Wrong Value in Production

**Problem**: Production using wrong database or email

**Solution**:
1. Verify .env.production has correct values
2. Check Render environment variables
3. Restart Render service
4. Check variable names match exactly

### Email Not Sending

**Problem**: Emails not being sent

**Solution**:
1. Verify EMAIL_USER and EMAIL_PASSWORD
2. Check ADMIN_EMAIL is set
3. Verify Zoho Mail credentials are correct
4. Check email logs in server

### Database Connection Failed

**Problem**: "Cannot connect to database"

**Solution**:
1. Verify DATABASE_URL format
2. Check database is running
3. Verify credentials are correct
4. Check firewall allows connection
5. Test connection string with database client

## Environment Variables Checklist

### Development (.env.local)

- [ ] DATABASE_URL set
- [ ] EMAIL_USER set
- [ ] EMAIL_PASSWORD set
- [ ] ADMIN_EMAIL set
- [ ] JWT_SECRET set
- [ ] NODE_ENV=development
- [ ] PORT set

### Production (.env.production)

- [ ] DATABASE_URL set (production database)
- [ ] EMAIL_USER set
- [ ] EMAIL_PASSWORD set
- [ ] ADMIN_EMAIL set
- [ ] JWT_SECRET set (strong, random)
- [ ] NODE_ENV=production
- [ ] SITE_URL set to production domain
- [ ] All Render environment variables added

## Additional Resources

- [Node.js Environment Variables](https://nodejs.org/en/knowledge/file-system/how-to-use-the-fs-module/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Supabase Connection Strings](https://supabase.com/docs/guides/database/connecting-to-postgres)

---

**Last Updated**: January 2026
**Version**: 1.0
